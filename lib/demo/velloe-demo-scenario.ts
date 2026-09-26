import { ContentInput } from "../types";

/** A no-network, deterministic rehearsal used for the 90-second judge demo. */
export const VelloeDemoScenario = {
  audienceId: "velloe-demo-population-v1",
  content: {
    text: "AI that automatically finds relevant jobs, drafts tailored applications, and keeps you in control before anything is sent.",
    platform: "LinkedIn",
    targetAudience: "Career switchers, ambitious graduates, and job-searching professionals",
  } satisfies ContentInput,
} as const;
