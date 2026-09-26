import { SimulationEngine, SimulationRun } from "./simulation-engine";
import { SimulationEvent, SimulationResult } from "../types";

/**
 * Adapter seam for the optional CAMEL OASIS runtime. It intentionally exposes
 * only Content Room's event contract; OASIS profiles/actions never leak into UI code.
 */
export class OasisSimulationEngine implements SimulationEngine {
  readonly name = "OasisSimulationEngine";
  async simulate(_run: SimulationRun): Promise<SimulationResult> { throw new Error("OASIS runtime is not installed in this deployment"); }
  events(_result: SimulationResult): SimulationEvent[] { return []; }
}
