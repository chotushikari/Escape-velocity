import { NextResponse } from "next/server";
import { buildSimulation } from "../../../lib/simulation";
import { contentInputSchema } from "../../../packages/contracts/src";
export async function POST(request: Request) {
  const parsed = contentInputSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid content input." }, { status: 400 });
  return NextResponse.json({ strategy: buildSimulation(parsed.data).strategy });
}
