import { NextResponse } from "next/server";
import { analyzeContent } from "../../../lib/simulation";
import { contentInputSchema } from "../../../packages/contracts/src";
export async function POST(request: Request) {
  const parsed = contentInputSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid content input." }, { status: 400 });
  return NextResponse.json({ dna: analyzeContent(parsed.data) });
}
