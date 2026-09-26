import { NextResponse } from "next/server";
import { getSimulationEngine } from "../../../lib/engines";
import { LocalSimulationEngine } from "../../../lib/engines/local-simulation-engine";
import { simulationRunSchema } from "../../../packages/contracts/src";

export async function POST(request: Request) {
  const parsed = simulationRunSchema.safeParse(await request.json());
  if (!parsed.success || !parsed.data.content.text.trim()) {
    return NextResponse.json({ error: "Provide content text or a caption to start a rehearsal." }, { status: 400 });
  }
  try { return NextResponse.json(await getSimulationEngine().simulate(parsed.data)); }
  catch {
    // An unavailable optional provider must not prevent the creator from rehearsing.
    return NextResponse.json(await new LocalSimulationEngine().simulate(parsed.data));
  }
}
