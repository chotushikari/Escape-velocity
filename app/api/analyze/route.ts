import { NextResponse } from "next/server";
import { analyzeContent } from "../../../lib/simulation";
export async function POST(request: Request) { const input = await request.json(); return NextResponse.json({ dna: analyzeContent(input) }); }
