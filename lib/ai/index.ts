import { ContentDNA, ContentInput } from "../types";
import { GeminiProvider } from "./gemini-provider";

/** Fallback is intentionally injected by the caller to keep demo behavior deterministic. */
export async function analyzeWithBestAvailableProvider(input: ContentInput, fallback: ContentDNA): Promise<{ dna: ContentDNA; provider: "gemini" | "deterministic" }> {
  if (!process.env.GEMINI_API_KEY) return { dna: fallback, provider: "deterministic" };
  try { return { dna: await new GeminiProvider().analyzeContent(input), provider: "gemini" }; }
  catch { return { dna: fallback, provider: "deterministic" }; }
}
