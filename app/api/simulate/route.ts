import { NextResponse } from "next/server";
import { buildSimulation } from "../../../lib/simulation";
export async function POST(request: Request) { const input = await request.json(); return NextResponse.json(buildSimulation(input)); }
