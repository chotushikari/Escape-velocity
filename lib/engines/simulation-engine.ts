import { ContentInput, Persona, SimulationEvent, SimulationResult } from "../types";

export interface SimulationRun { content: ContentInput; personas?: Persona[]; sameAudienceId?: string; }

/** Keeps Content Room independent from any third-party simulation runtime. */
export interface SimulationEngine {
  readonly name: string;
  simulate(run: SimulationRun): Promise<SimulationResult>;
  events(result: SimulationResult): SimulationEvent[];
}
