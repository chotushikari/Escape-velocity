import { z } from "zod";

export const platformSchema = z.enum(["Instagram", "YouTube Shorts", "LinkedIn", "X", "Web", "Manual"]);
export const actionSchema = z.enum(["STOP", "IGNORE", "LIKE", "COMMENT", "SHARE", "SAVE", "FOLLOW", "CLICK", "BUY", "REJECT"]);
export const contentSourceSchema = z.enum(["url", "upload", "paste", "demo"]);
export const importStatusSchema = z.enum(["ready", "needs_copy", "unsupported", "invalid"]);
export const contentTypeSchema = z.enum(["social_post", "video", "advertisement", "campaign", "landing_page", "email", "article", "script", "product_announcement", "creative_concept"]);

export const contentInputSchema = z.object({
  text: z.string().max(20_000),
  imageUrl: z.string().url().optional(),
  mediaUrl: z.string().min(1).optional(),
  mediaKind: z.enum(["image", "video"]).optional(),
  sourceUrl: z.string().url().optional(),
  platform: platformSchema,
  targetAudience: z.string().max(2_000),
});

export const simulationEventSchema = z.object({
  personaId: z.string(),
  timestamp: z.string().datetime(),
  state: z.enum(["EXPOSED", "ATTENDING", "INTERPRETING", "DECIDING", "ACTED"]),
  action: actionSchema,
  reasoning: z.string(),
  attention: z.number().min(0).max(100),
  clarity: z.number().min(0).max(100),
  trust: z.number().min(0).max(100),
  shareIntent: z.number().min(0).max(100),
  saveIntent: z.number().min(0).max(100),
  purchaseIntent: z.number().min(0).max(100),
  emotion: z.string(),
});

export type Platform = z.infer<typeof platformSchema>;
export type Action = z.infer<typeof actionSchema>;
export type ContentSource = z.infer<typeof contentSourceSchema>;
export type ImportStatus = z.infer<typeof importStatusSchema>;
export type ContentType = z.infer<typeof contentTypeSchema>;
export type ContentInput = z.infer<typeof contentInputSchema>;
export type SimulationEvent = z.infer<typeof simulationEventSchema>;

export interface ContentArtifact {
  id: string;
  type: ContentType;
  source: ContentSource;
  title: string;
  status: ImportStatus;
  summary: string;
  author?: string;
  platform?: Platform;
  text?: string;
  mediaUrl?: string;
  mediaKind?: "image" | "video";
  sourceUrl?: string;
  metadata: Record<string, unknown>;
}
export interface ContentDNA { hook: string; topic: string; promise: string; tone: string; emotion: string; cta: string; risks: string[]; strengths: string[]; }
export interface Persona { id: string; name: string; age: number; city: string; occupation: string; segment: string; interests: string[]; attentionSpan: number; skepticism: number; authenticityPreference: number; promotionalTolerance: number; color: string; }
export interface Reaction { personaId: string; action: Action; attentionScore: number; clarityScore: number; emotionalImpact: number; trustScore: number; shareIntent: number; commentIntent: number; saveIntent: number; purchaseIntent: number; emotion: string; strongestElement: string; biggestProblem: string; reasoning: string; thought: string; }
export interface Segment { name: string; size: number; positiveRate: number; stopRate: number; trust: number; shareIntent: number; purchaseIntent: number; insight: string; }
export interface Strategy { diagnosis: string; strongestSignal: string; biggestProblem: string; priorityChange: string; changes: string[]; newHook: string; newCTA: string; revisedContent: string; audienceStrategy: string; experimentIdeas: string[]; }
export interface SimulationResult { dna: ContentDNA; personas: Persona[]; reactions: Reaction[]; events: SimulationEvent[]; segments: Segment[]; strategy: Strategy; engine?: string; }
