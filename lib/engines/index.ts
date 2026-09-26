import { DemoSimulationEngine } from "./demo-simulation-engine";
import { LocalSimulationEngine } from "./local-simulation-engine";
import { OasisSimulationEngine } from "./oasis-simulation-engine";
import { SimulationEngine } from "./simulation-engine";

export function getSimulationEngine(): SimulationEngine {
  if (process.env.SIMULATION_ENGINE === "oasis") return new OasisSimulationEngine();
  if (process.env.SIMULATION_ENGINE === "local") return new LocalSimulationEngine();
  return new DemoSimulationEngine();
}
