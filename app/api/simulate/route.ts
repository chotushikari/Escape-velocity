import { NextResponse } from "next/server";
import { getSimulationEngine } from "../../../lib/engines";
import { LocalSimulationEngine } from "../../../lib/engines/local-simulation-engine";

export async function POST(request: Request) {
  const input = await request.json();
  try { return NextResponse.json(await getSimulationEngine().simulate({ content: input })); }
  catch { return NextResponse.json(await new LocalSimulationEngine().simulate({ content: input, sameAudienceId: "fallback" })); }
}
