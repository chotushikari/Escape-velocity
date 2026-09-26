import { SimulationEngine, SimulationRun } from "./simulation-engine";
import { buildSimulation } from "../simulation";
import { Action, SimulationEvent, SimulationResult } from "../types";

const actions = new Set<Action>(["STOP", "IGNORE", "LIKE", "COMMENT", "SHARE", "SAVE", "FOLLOW", "CLICK", "BUY", "REJECT"]);

function normaliseEvent(event: SimulationEvent): SimulationEvent {
  return { ...event, action: actions.has(event.action) ? event.action : "IGNORE" };
}

/**
 * Adapter seam for the optional CAMEL OASIS runtime. It intentionally exposes
 * only Content Room's event contract; OASIS profiles/actions never leak into UI code.
 */
export class OasisSimulationEngine implements SimulationEngine {
  readonly name = "OasisSimulationEngine";
  async simulate(run: SimulationRun): Promise<SimulationResult> {
    const baseUrl = process.env.OASIS_SERVICE_URL;
    if (!baseUrl) throw new Error("OASIS_SERVICE_URL is not configured");
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/simulate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(run) });
    if (!response.ok) throw new Error(`OASIS service failed: ${response.status}`);
    const events = (await response.json() as SimulationEvent[]).map(normaliseEvent);
    const baseline = buildSimulation(run.content);
    const eventByPersona = new Map(events.map((event) => [event.personaId, event]));

    return {
      ...baseline,
      reactions: baseline.reactions.map((reaction) => {
        const event = eventByPersona.get(reaction.personaId);
        if (!event) return reaction;
        return {
          ...reaction,
          action: event.action,
          attentionScore: event.attention,
          clarityScore: event.clarity,
          trustScore: event.trust,
          shareIntent: event.shareIntent,
          saveIntent: event.saveIntent,
          purchaseIntent: event.purchaseIntent,
          emotion: event.emotion,
          reasoning: event.reasoning,
        };
      }),
      events,
      engine: this.name,
    };
  }
  events(result: SimulationResult): SimulationEvent[] { return result.events; }
}
