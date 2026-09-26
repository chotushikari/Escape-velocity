import { LocalSimulationEngine } from "./local-simulation-engine";

/** Deterministic zero-cost fallback for demos and provider failures. */
export class DemoSimulationEngine extends LocalSimulationEngine {
  override readonly name: string = "DemoSimulationEngine";
}
