import { buildSimulation } from "../simulation";
import { SimulationEvent, SimulationResult } from "../types";
import { SimulationEngine, SimulationRun } from "./simulation-engine";

export const DEFAULT_AUDIENCE_ID = "content-room-v1";

function variantId(content: { text: string; platform: string }): string {
  let hash = 2166136261;
  for (const character of `${content.platform}:${content.text}`) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  }
  return `variant-${(hash >>> 0).toString(36)}`;
}

export class LocalSimulationEngine implements SimulationEngine {
  readonly name: string = "LocalSimulationEngine";

  async simulate(run: SimulationRun): Promise<SimulationResult> {
    const result = buildSimulation(run.content);
    const audienceId = run.sameAudienceId || DEFAULT_AUDIENCE_ID;
    return { ...result, audienceId, events: this.createEvents(result, audienceId, variantId(run.content)), engine: this.name };
  }

  events(result: SimulationResult): SimulationEvent[] {
    return this.createEvents(result, result.audienceId || DEFAULT_AUDIENCE_ID, "variant-default");
  }

  private createEvents(result: SimulationResult, audienceId: string, contentVariantId: string): SimulationEvent[] {
    // Fixed timestamps keep the zero-key demo reproducible. They represent the
    // ordered simulation clock, never the time a real person acted.
    const simulationStart = Date.UTC(2026, 0, 1);
    return result.reactions.map((reaction, index) => ({ simulationId: `sim-${audienceId}-${contentVariantId}`, personaId: reaction.personaId, contentVariantId, step: index, timestamp: new Date(simulationStart + index * 10).toISOString(), state: "ACTED", action: reaction.action, reasoning: reaction.reasoning, attention: reaction.attentionScore, clarity: reaction.clarityScore, trust: reaction.trustScore, shareIntent: reaction.shareIntent, saveIntent: reaction.saveIntent, purchaseIntent: reaction.purchaseIntent, emotion: reaction.emotion }));
  }
}
