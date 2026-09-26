export const velloeDemoStages = ["INTRO", "CONTENT", "DNA", "AUDIENCE", "SIMULATION", "INSIGHTS", "STRATEGY", "VERSION_B", "RESIMULATION", "COMPARISON", "COMPLETE"] as const;
export type VelloeDemoStage = (typeof velloeDemoStages)[number];

/** Pure state transitions keep the presentation path deterministic and key-free. */
export function demoStageAt(index: number): VelloeDemoStage {
  return velloeDemoStages[Math.max(0, Math.min(index, velloeDemoStages.length - 1))];
}
export function nextDemoStage(index: number): number {
  return Math.min(index + 1, velloeDemoStages.length - 1);
}
