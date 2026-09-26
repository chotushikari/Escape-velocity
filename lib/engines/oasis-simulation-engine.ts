import { SimulationEngine, SimulationRun } from "./simulation-engine";
import { SimulationEvent, SimulationResult } from "../types";

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
    return response.json() as Promise<SimulationResult>;
  }
  events(_result: SimulationResult): SimulationEvent[] { return []; }
}
