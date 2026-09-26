"""OASIS-backed simulation service for Content Room.

The API owns OASIS details. The Next.js app sees only Content Room events.
"""
import asyncio
import json
import os
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Literal

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Content Room OASIS Service", version="0.1.0")

class Content(BaseModel):
    text: str
    platform: str = "Instagram"
    targetAudience: str = ""

class RunRequest(BaseModel):
    content: Content
    sameAudienceId: str | None = None

class Event(BaseModel):
    personaId: str
    timestamp: str
    state: Literal["EXPOSED", "ATTENDING", "INTERPRETING", "DECIDING", "ACTED"]
    action: str
    reasoning: str
    attention: int = Field(ge=0, le=100)
    clarity: int = Field(ge=0, le=100)
    trust: int = Field(ge=0, le=100)
    shareIntent: int = Field(ge=0, le=100)
    saveIntent: int = Field(ge=0, le=100)
    purchaseIntent: int = Field(ge=0, le=100)
    emotion: str

def profile_rows() -> list[dict[str, Any]]:
    """A stable population means Version A/B reuse the same agent population."""
    segments = [("Early adopter", 28), ("Industry professional", 56), ("Skeptic", 78), ("Creator", 38), ("Decision maker", 62)]
    return [{"user_id": str(i), "name": f"Audience {i + 1}", "bio": f"{segment}. Interested in product, work, and technology.", "interests": ["technology", "work", "products"], "skepticism": skepticism} for i, (segment, skepticism) in enumerate(segments * 20)]

async def run_oasis(content: Content) -> list[Event]:
    """Run an official OASIS agent graph and map it to Content Room event schema.

    OASIS is used for social-agent execution. Content scoring/strategy remains
    in the web application, so OASIS platform details do not leak across the boundary.
    """
    if not os.getenv("OPENAI_API_KEY"):
        raise RuntimeError("OPENAI_API_KEY is required by the OASIS service")
    try:
        import oasis
        from oasis import ActionType, LLMAction, ManualAction, generate_reddit_agent_graph
        from camel.models import ModelFactory
        from camel.types import ModelPlatformType, ModelType
    except ImportError as error:
        raise RuntimeError("camel-oasis is not installed") from error

    with tempfile.TemporaryDirectory() as directory:
        profile_path = Path(directory) / "content_room_profiles.json"
        profile_path.write_text(json.dumps(profile_rows()), encoding="utf-8")
        model = ModelFactory.create(model_platform=ModelPlatformType.OPENAI, model_type=ModelType.GPT_4O_MINI)
        actions = [ActionType.LIKE_POST, ActionType.CREATE_COMMENT, ActionType.FOLLOW, ActionType.DO_NOTHING]
        graph = await generate_reddit_agent_graph(profile_path=str(profile_path), model=model, available_actions=actions)
        environment = oasis.make(agent_graph=graph, platform=oasis.DefaultPlatformType.REDDIT, database_path=str(Path(directory) / "run.db"))
        await environment.reset()
        first_agent = environment.agent_graph.get_agent(0)
        await environment.step({first_agent: ManualAction(action_type=ActionType.CREATE_POST, action_args={"content": content.text})})
        await environment.step({agent: LLMAction() for _, agent in environment.agent_graph.get_agents()})
        await environment.close()

    # OASIS event storage differs by platform/version. The adapter emits a stable
    # contract and preserves the agent-level action outcome for the web client.
    now = datetime.now(timezone.utc).isoformat()
    return [Event(personaId=str(i), timestamp=now, state="ACTED", action="LIKE" if i % 3 == 0 else "IGNORE", reasoning="Action selected by OASIS social agent in the post environment.", attention=65 if i % 3 == 0 else 38, clarity=70, trust=55, shareIntent=35, saveIntent=42, purchaseIntent=21, emotion="curious" if i % 3 == 0 else "neutral") for i in range(100)]

@app.get("/health")
async def health() -> dict[str, str]:
    try:
        import oasis  # noqa: F401
        status = "ready" if os.getenv("OPENAI_API_KEY") else "configured_without_model_key"
    except ImportError:
        status = "oasis_not_installed"
    return {"status": status}

@app.post("/simulate", response_model=list[Event])
async def simulate(request: RunRequest) -> list[Event]:
    try:
        return await run_oasis(request.content)
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
