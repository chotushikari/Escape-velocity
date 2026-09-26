import { buildSimulation } from "../simulation";
import { SimulationEvent, SimulationResult } from "../types";
import { SimulationEngine, SimulationRun } from "./simulation-engine";

export class LocalSimulationEngine implements SimulationEngine {
  readonly name: string = "LocalSimulationEngine";

  async simulate(run: SimulationRun): Promise<SimulationResult> {
    const result = buildSimulation(run.content);
    return { ...result, events: this.events(result), engine: this.name };
  }

  events(result: SimulationResult): SimulationEvent[] {
    const now = Date.now();
    return result.reactions.map((reaction, index) => ({ personaId: reaction.personaId, timestamp: new Date(now + index * 10).toISOString(), state: "ACTED", action: reaction.action, reasoning: reaction.reasoning, attention: reaction.attentionScore, clarity: reaction.clarityScore, trust: reaction.trustScore, shareIntent: reaction.shareIntent, saveIntent: reaction.saveIntent, purchaseIntent: reaction.purchaseIntent, emotion: reaction.emotion }));
  }
}
