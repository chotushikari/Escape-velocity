import { ContentDNA, ContentInput } from "../types";

export interface AIProvider {
  readonly name: string;
  analyzeContent(input: ContentInput): Promise<ContentDNA>;
}

export class AIProviderUnavailableError extends Error {}
