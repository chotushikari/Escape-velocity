export type Platform = "Instagram" | "YouTube Shorts" | "LinkedIn" | "X";
export type Action = "STOP" | "LIKE" | "COMMENT" | "SHARE" | "SAVE" | "CLICK" | "FOLLOW" | "BUY" | "IGNORE" | "REJECT";

export interface ContentInput { text: string; imageUrl?: string; sourceUrl?: string; platform: Platform; targetAudience: string; }
export interface ContentDNA { hook: string; topic: string; promise: string; tone: string; emotion: string; cta: string; risks: string[]; strengths: string[]; }
export interface Persona { id: string; name: string; age: number; city: string; occupation: string; segment: string; interests: string[]; attentionSpan: number; skepticism: number; authenticityPreference: number; promotionalTolerance: number; color: string; }
export interface Reaction { personaId: string; action: Action; attentionScore: number; clarityScore: number; emotionalImpact: number; trustScore: number; shareIntent: number; commentIntent: number; saveIntent: number; purchaseIntent: number; emotion: string; strongestElement: string; biggestProblem: string; reasoning: string; thought: string; }
export interface Segment { name: string; size: number; positiveRate: number; stopRate: number; trust: number; shareIntent: number; purchaseIntent: number; insight: string; }
export interface Strategy { diagnosis: string; strongestSignal: string; biggestProblem: string; priorityChange: string; changes: string[]; newHook: string; newCTA: string; revisedContent: string; audienceStrategy: string; experimentIdeas: string[]; }
export interface SimulationResult { dna: ContentDNA; personas: Persona[]; reactions: Reaction[]; segments: Segment[]; strategy: Strategy; }
