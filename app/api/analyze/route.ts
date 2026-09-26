import { NextResponse } from "next/server";
import { analyzeContent } from "../../../lib/simulation";
import { contentInputSchema } from "../../../packages/contracts/src";
import { analyzeWithBestAvailableProvider } from "../../../lib/ai";
export async function POST(request: Request) {
  const parsed = contentInputSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid content input." }, { status: 400 });
  const analysis = await analyzeWithBestAvailableProvider(parsed.data, analyzeContent(parsed.data));
  return NextResponse.json(analysis);
}
