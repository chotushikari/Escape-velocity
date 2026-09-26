import { SimulationEngine, SimulationRun } from "./simulation-engine";
import { buildSimulation } from "../simulation";
import { Action, SimulationEvent, SimulationResult } from "../types";
import { oasisSimulationResponseSchema } from "../../packages/contracts/src";

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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);
    let response: Response;
    try {
      response = await fetch(`${baseUrl.replace(/\/$/, "")}/simulate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(run), signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
    if (!response.ok) throw new Error(`OASIS service failed: ${response.status}`);
    const payload = oasisSimulationResponseSchema.safeParse(await response.json());
    if (!payload.success) throw new Error("OASIS service returned an invalid event contract");
    const events = payload.data.events.map(normaliseEvent);
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
      audienceId: payload.data.audienceId,
      engine: this.name,
    };
  }
  events(result: SimulationResult): SimulationEvent[] { return result.events; }
}
