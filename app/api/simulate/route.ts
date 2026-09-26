import { NextResponse } from "next/server";
import { getSimulationEngine } from "../../../lib/engines";
import { LocalSimulationEngine } from "../../../lib/engines/local-simulation-engine";
import { simulationRunSchema } from "../../../packages/contracts/src";
import { analyzeWithBestAvailableProvider } from "../../../lib/ai";

export async function POST(request: Request) {
  const parsed = simulationRunSchema.safeParse(await request.json());
  if (!parsed.success || !parsed.data.content.text.trim()) {
    return NextResponse.json({ error: "Provide content text or a caption to start a rehearsal." }, { status: 400 });
  }
  try {
    const simulation = await getSimulationEngine().simulate(parsed.data);
    const analysis = await analyzeWithBestAvailableProvider(parsed.data.content, simulation.dna);
    return NextResponse.json({ ...simulation, dna: analysis.dna, analysisProvider: analysis.provider });
  }
  catch {
    // An unavailable optional provider must not prevent the creator from rehearsing.
    const simulation = await new LocalSimulationEngine().simulate(parsed.data);
    const analysis = await analyzeWithBestAvailableProvider(parsed.data.content, simulation.dna);
    return NextResponse.json({ ...simulation, dna: analysis.dna, analysisProvider: analysis.provider });
  }
}
