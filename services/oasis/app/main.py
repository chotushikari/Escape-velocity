"""OASIS-backed simulation service for Content Room.

The API owns OASIS details. The Next.js app sees only Content Room events.
"""
import asyncio
import json
import os
import re
import sqlite3
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Literal

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Content Room OASIS Service", version="0.1.0")
DEFAULT_AUDIENCE_ID = "content-room-v1"
SUPPORTED_ACTIONS = {"STOP", "IGNORE", "LIKE", "COMMENT", "SHARE", "SAVE", "FOLLOW", "CLICK", "BUY", "REJECT"}

class Content(BaseModel):
    text: str
    platform: str = "Instagram"
    targetAudience: str = ""

class RunRequest(BaseModel):
    content: Content
    sameAudienceId: str | None = Field(default=None, pattern=r"^[A-Za-z0-9_-]{1,120}$")

class Event(BaseModel):
    simulationId: str = Field(min_length=1)
    personaId: str
    contentVariantId: str = Field(min_length=1)
    step: int = Field(ge=0)
    timestamp: str
    state: Literal["EXPOSED", "ATTENDING", "INTERPRETING", "DECIDING", "ACTED"]
    action: Literal["STOP", "IGNORE", "LIKE", "COMMENT", "SHARE", "SAVE", "FOLLOW", "CLICK", "BUY", "REJECT"]
    reasoning: str
    attention: int = Field(ge=0, le=100)
    clarity: int = Field(ge=0, le=100)
    trust: int = Field(ge=0, le=100)
    shareIntent: int = Field(ge=0, le=100)
    saveIntent: int = Field(ge=0, le=100)
    purchaseIntent: int = Field(ge=0, le=100)
    emotion: str

class SimulationResponse(BaseModel):
    """Stable service contract consumed by the TypeScript adapter."""
    engine: Literal["OASIS"] = "OASIS"
    audienceId: str = Field(pattern=r"^[A-Za-z0-9_-]{1,120}$")
    events: list[Event] = Field(min_length=1, max_length=500)

def profile_rows() -> list[dict[str, Any]]:
    """A stable population means Version A/B reuse the same agent population."""
    segments = [("Early adopter", 28), ("Industry professional", 56), ("Skeptic", 78), ("Creator", 38), ("Decision maker", 62)]
    return [{"user_id": str(i), "name": f"Audience {i + 1}", "bio": f"{segment}. Interested in product, work, and technology.", "interests": ["technology", "work", "products"], "skepticism": skepticism} for i, (segment, skepticism) in enumerate(segments * 20)]

def normalise_action(value: object) -> str | None:
    """Map OASIS action telemetry to the product's action vocabulary only."""
    raw = str(value).upper()
    if "DO_NOTHING" in raw or "IGNORE" in raw:
        return "IGNORE"
    for action in SUPPORTED_ACTIONS - {"IGNORE"}:
        if action in raw:
            return action
    return None

def action_metrics(action: str) -> tuple[int, int, int, int, int, int, str]:
    """Deterministic presentation metrics derived from an observed action.

    OASIS emits actions, not Content Room's attention/trust score taxonomy. These
    values are a documented display mapping, not measurements emitted by OASIS.
    """
    mapping = {
        "IGNORE": (25, 50, 45, 10, 10, 5, "neutral"),
        "STOP": (45, 50, 35, 5, 5, 2, "dismissive"),
        "REJECT": (65, 45, 20, 4, 2, 1, "skeptical"),
        "LIKE": (70, 65, 60, 35, 30, 20, "interested"),
        "COMMENT": (75, 65, 58, 28, 25, 15, "engaged"),
        "SHARE": (85, 72, 70, 82, 45, 28, "enthusiastic"),
        "SAVE": (75, 70, 65, 30, 84, 25, "interested"),
        "FOLLOW": (80, 68, 72, 42, 35, 30, "optimistic"),
        "CLICK": (78, 65, 62, 30, 32, 45, "curious"),
        "BUY": (88, 75, 82, 40, 40, 90, "confident"),
    }
    return mapping[action]

def content_variant_id(content: Content) -> str:
    # Stable, non-secret identifier used only to compare content variants.
    value = 2166136261
    for character in f"{content.platform}:{content.text}":
        value = ((value ^ ord(character)) * 16777619) & 0xFFFFFFFF
    alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"
    encoded = "0" if value == 0 else ""
    while value:
        value, remainder = divmod(value, 36)
        encoded = alphabet[remainder] + encoded
    return "variant-" + encoded

def event_timestamp(value: object) -> str:
    """Return a contract-valid ISO timestamp from OASIS persistence when present."""
    if value is not None:
        raw = str(value)
        try:
            parsed = datetime.fromisoformat(raw.replace("Z", "+00:00"))
            return parsed.astimezone(timezone.utc).isoformat()
        except ValueError:
            try:
                return datetime.fromtimestamp(float(raw), timezone.utc).isoformat()
            except (ValueError, OverflowError, OSError):
                pass
    return datetime.now(timezone.utc).isoformat()

def extract_action_events(database_path: Path, audience_id: str, content: Content) -> list[Event]:
    """Read persisted OASIS action telemetry without coupling to a table name.

    OASIS database table names vary across supported platform versions. The reader
    only accepts rows that expose both an actor identifier and a recognised action;
    it fails closed when that evidence is not present.
    """
    candidates: list[tuple[str, str, str | None, str | None]] = []
    with sqlite3.connect(database_path) as connection:
        tables = connection.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
        for (table_name,) in tables:
            if table_name.startswith("sqlite_"):
                continue
            quoted_table = '"' + table_name.replace('"', '""') + '"'
            columns = [row[1] for row in connection.execute(f"PRAGMA table_info({quoted_table})")]
            lower = {column.lower(): column for column in columns}
            actor_column = next((lower[name] for name in ("agent_id", "actor_id", "user_id", "agent", "actor") if name in lower), None)
            action_column = next((lower[name] for name in ("action_type", "action", "event_type", "type") if name in lower), None)
            timestamp_column = next((lower[name] for name in ("timestamp", "created_at", "time") if name in lower), None)
            if actor_column and action_column:
                candidates.append((table_name, actor_column, action_column, timestamp_column))

        events: list[Event] = []
        for table_name, actor_column, action_column, timestamp_column in candidates:
            quoted_table = '"' + table_name.replace('"', '""') + '"'
            query = f'SELECT "{actor_column}", "{action_column}"' + (f', "{timestamp_column}"' if timestamp_column else "") + f" FROM {quoted_table}"
            for row in connection.execute(query):
                action = normalise_action(row[1])
                if not action:
                    continue
                attention, clarity, trust, share, save, purchase, emotion = action_metrics(action)
                timestamp = event_timestamp(row[2] if timestamp_column else None)
                events.append(Event(
                    simulationId=f"sim-{audience_id}-{content_variant_id(content)}", personaId=str(row[0]),
                    contentVariantId=content_variant_id(content), step=len(events), timestamp=timestamp, state="ACTED", action=action,
                    reasoning="Observed OASIS action telemetry; Content Room scores are deterministic action-derived display signals.",
                    attention=attention, clarity=clarity, trust=trust, shareIntent=share,
                    saveIntent=save, purchaseIntent=purchase, emotion=emotion,
                ))
    if not events:
        raise RuntimeError("OASIS completed without supported action telemetry; refusing to invent reactions")
    return events

async def run_oasis(content: Content, audience_id: str) -> list[Event]:
    """Run an official OASIS agent graph and map it to Content Room event schema.

    OASIS is used for social-agent execution. Content scoring/strategy remains
    in the web application, so OASIS platform details do not leak across the boundary.
    """
    groq_key = os.getenv("GROQ_API_KEY")
    if groq_key:
        os.environ.setdefault("OPENAI_API_KEY", groq_key)
        os.environ.setdefault("OPENAI_API_BASE_URL", "https://api.groq.com/openai/v1")
    if not os.getenv("OPENAI_API_KEY"):
        raise RuntimeError("Set GROQ_API_KEY or OPENAI_API_KEY on the OASIS service")
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
        model = ModelFactory.create(
            model_platform=ModelPlatformType.OPENAI,
            model_type=os.getenv("OASIS_MODEL", "llama-3.3-70b-versatile"),
            url=os.getenv("OPENAI_API_BASE_URL"),
        )
        actions = [ActionType.LIKE_POST, ActionType.CREATE_COMMENT, ActionType.FOLLOW, ActionType.DO_NOTHING]
        graph = await generate_reddit_agent_graph(profile_path=str(profile_path), model=model, available_actions=actions)
        database_path = Path(directory) / "run.db"
        environment = oasis.make(agent_graph=graph, platform=oasis.DefaultPlatformType.REDDIT, database_path=str(database_path))
        await environment.reset()
        first_agent = environment.agent_graph.get_agent(0)
        await environment.step({first_agent: ManualAction(action_type=ActionType.CREATE_POST, action_args={"content": content.text})})
        await environment.step({agent: LLMAction() for _, agent in environment.agent_graph.get_agents()})
        await environment.close()
        return extract_action_events(database_path, audience_id, content)

@app.get("/health")
async def health() -> dict[str, str]:
    try:
        import oasis  # noqa: F401
        status = "ready" if os.getenv("GROQ_API_KEY") or os.getenv("OPENAI_API_KEY") else "configured_without_model_key"
    except ImportError:
        status = "oasis_not_installed"
    return {"status": status}

@app.get("/ready")
async def readiness() -> dict[str, str]:
    """Readiness is stricter than liveness so Railway can detect an unusable service."""
    health_state = await health()
    if health_state["status"] != "ready":
        raise HTTPException(status_code=503, detail=health_state["status"])
    return health_state

@app.post("/simulate", response_model=SimulationResponse)
async def simulate(request: RunRequest) -> SimulationResponse:
    try:
        audience_id = request.sameAudienceId or DEFAULT_AUDIENCE_ID
        return SimulationResponse(audienceId=audience_id, events=await run_oasis(request.content, audience_id))
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
