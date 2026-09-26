import { NextResponse } from "next/server";
import { getSimulationEngine } from "../../../lib/engines";
import { LocalSimulationEngine } from "../../../lib/engines/local-simulation-engine";
import { contentInputSchema } from "../../../packages/contracts/src";

export async function POST(request: Request) {
  const parsed = contentInputSchema.safeParse(await request.json());
  if (!parsed.success || !parsed.data.text.trim()) {
    return NextResponse.json({ error: "Provide content text or a caption to start a rehearsal." }, { status: 400 });
  }
  try { return NextResponse.json(await getSimulationEngine().simulate({ content: parsed.data })); }
  catch { return NextResponse.json(await new LocalSimulationEngine().simulate({ content: parsed.data, sameAudienceId: "fallback" })); }
}
