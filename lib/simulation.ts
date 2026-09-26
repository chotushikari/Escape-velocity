import { ContentDNA, ContentInput, Persona, Reaction, Segment, SimulationResult, Strategy } from "./types";

const archetypes = [
  ["Early adopter", "University student", 18, 24, 25, 42, ["career", "saving money"]], ["Creator", "Content creator", 21, 31, 35, 46, ["tools", "trends"]],
  ["Industry professional", "Operations professional", 27, 45, 62, 28, ["career", "productivity"]], ["Decision maker", "Startup founder", 25, 42, 58, 35, ["growth", "automation"]],
  ["Marketer", "Brand marketer", 24, 40, 48, 50, ["campaigns", "audience"]], ["Designer", "Product designer", 22, 38, 44, 37, ["design", "culture"]],
  ["Fitness", "Fitness coach", 20, 36, 32, 51, ["wellness", "habits"]], ["Parent", "Working parent", 30, 48, 55, 33, ["family", "time saving"]],
  ["Shopper", "Value-conscious shopper", 22, 50, 53, 30, ["deals", "reviews"]], ["Early adopter", "Tech early adopter", 20, 39, 38, 57, ["AI", "gadgets"]],
  ["Casual", "Casual social user", 19, 52, 28, 40, ["entertainment", "friends"]], ["Skeptic", "Compliance analyst", 28, 54, 74, 22, ["privacy", "evidence"]],
  ["Business owner", "Small business owner", 29, 52, 60, 39, ["growth", "efficiency"]], ["Fashion", "Style-conscious shopper", 19, 34, 36, 45, ["fashion", "trends"]],
  ["Engineer", "Software engineer", 23, 46, 67, 27, ["technology", "automation"]], ["Career switcher", "Career switcher", 24, 45, 46, 38, ["jobs", "learning"]],
  ["Premium buyer", "Premium customer", 29, 55, 58, 36, ["quality", "convenience"]], ["Trend seeker", "Trend seeker", 18, 32, 29, 58, ["viral", "newness"]],
  ["Creator", "Freelance creator", 21, 40, 40, 53, ["income", "community"]], ["Professional", "Team lead", 30, 55, 65, 31, ["leadership", "work"]]
] as const;
const firstNames = ["Aisha", "Maya", "Arjun", "Noah", "Priya", "Liam", "Zara", "Ishan", "Sofia", "Owen"];
const cities = ["Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "London", "Toronto", "Austin", "Singapore"];
const colors = ["#d97757", "#4b8b85", "#d3a64d", "#7d6eb5", "#c95c70", "#4e87b6", "#78945b", "#ad7656"];
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const avg = (values: number[]) => Math.round(values.reduce((a, b) => a + b, 0) / values.length);

export function createPersonas(): Persona[] {
  return archetypes.flatMap(([segment, occupation, minAge, maxAge, skepticism, tolerance, interests], group) => Array.from({ length: 5 }, (_, variant) => ({
    id: `p-${group}-${variant}`, name: firstNames[(group * 3 + variant * 2) % firstNames.length], age: minAge + ((group * 7 + variant * 3) % (maxAge - minAge + 1)), city: cities[(group + variant * 3) % cities.length], occupation,
    segment, interests: [...interests], attentionSpan: 35 + ((group * 11 + variant * 9) % 55), skepticism: clamp(skepticism + variant * 3 - 6), authenticityPreference: 45 + ((group * 9 + variant * 7) % 45), promotionalTolerance: clamp(tolerance + variant * 4 - 8), color: colors[(group + variant) % colors.length]
  })));
}

export function analyzeContent(input: ContentInput): ContentDNA {
  const first = input.text.trim().split(/[.!?]/)[0] || "Your message";
  const hasAi = /\b(ai|automatically|automation)\b/i.test(input.text);
  const hasProof = /\d+%|\d+\s*(days|hours|minutes)|case study|customers|proof/i.test(input.text);
  return { hook: first.slice(0, 90), topic: hasAi ? "AI-powered career automation" : "Audience-focused social content", promise: hasAi ? "Less effort in a high-friction process" : "A clear, useful outcome", tone: /!/g.test(input.text) ? "energetic" : "direct", emotion: "relief and curiosity", cta: /apply|try|start|learn|link/i.test(input.text) ? "present" : "missing", risks: [hasProof ? "Specific proof may need context" : "The promise is broad without proof", "Privacy and control questions are unanswered"], strengths: ["A clear outcome appears early", "The topic is relevant to the stated audience"] };
}

function simulateOne(persona: Persona, content: ContentInput, i: number): Reaction {
  const isJobs = /job|career|apply|resume|hiring/i.test(content.text);
  const relevant = isJobs && ["Early adopter", "Career switcher", "Industry professional", "Creator"].includes(persona.segment);
  const novelty = /ai|automatic|automate/i.test(content.text) ? 12 : 4;
  const attention = clamp(39 + novelty + (relevant ? 20 : 0) + persona.promotionalTolerance / 4 - persona.skepticism / 5 + ((i * 13) % 19) - 9);
  const clarity = clamp(67 + (content.text.length < 160 ? 10 : -4) + (i % 4) * 3);
  // A bold automation claim starts with a modest trust penalty; highly skeptical
  // personas still reject it, while people with a strong career need can engage.
  const trust = clamp(75 - persona.skepticism / 2 + (relevant ? 4 : 0) + (/privacy|secure|control/i.test(content.text) ? 4 : -3) + ((i * 7) % 14) - 7);
  const emotional = clamp(38 + (relevant ? 24 : 0) + novelty + ((i * 5) % 20) - 8);
  const share = clamp((attention + trust + emotional) / 3 - 18 + (persona.segment === "Creator" ? 13 : 0));
  const save = clamp((attention + clarity) / 2 - 10 + (relevant ? 10 : 0));
  const purchase = clamp((trust + emotional) / 2 - 22 + (persona.segment === "Student" ? -7 : 0));
  const comment = clamp(35 + persona.skepticism / 2 + (attention > 65 ? 8 : 0) - (i % 4) * 5);
  let action: Reaction["action"] = "IGNORE";
  if (trust < 42 && attention > 50) action = "REJECT";
  else if (purchase > 58) action = "BUY";
  else if (share > 62) action = "SHARE";
  else if (save > 60) action = "SAVE";
  else if (attention > 58) action = "LIKE";
  const doubtful = trust < 50;
  const thought = doubtful ? "Useful idea, but I need to know what happens to my data." : relevant ? "This could remove a genuinely tedious part of my week." : "The promise is interesting, but it needs a sharper reason to care.";
  return { personaId: persona.id, action, attentionScore: attention, clarityScore: clarity, emotionalImpact: emotional, trustScore: trust, shareIntent: share, commentIntent: comment, saveIntent: save, purchaseIntent: purchase, emotion: doubtful ? "skeptical curiosity" : relevant ? "relief" : "curiosity", strongestElement: "The fast, outcome-led promise", biggestProblem: doubtful ? "No visible explanation of privacy or user control" : "The claim needs a concrete proof point", reasoning: thought, thought };
}

export function buildSimulation(input: ContentInput): SimulationResult {
  const personas = createPersonas(); const reactions = personas.map((p, i) => simulateOne(p, input, i)); const dna = analyzeContent(input);
  const segments = [...new Set(personas.map(p => p.segment))].map(name => { const ids = personas.filter(p => p.segment === name).map(p => p.id); const rs = reactions.filter(r => ids.includes(r.personaId)); const positive = rs.filter(r => !["IGNORE", "REJECT"].includes(r.action)).length; const trust = avg(rs.map(r => r.trustScore)); return { name, size: rs.length, positiveRate: Math.round(positive / rs.length * 100), stopRate: Math.round(rs.filter(r => r.attentionScore >= 55).length / rs.length * 100), trust, shareIntent: avg(rs.map(r => r.shareIntent)), purchaseIntent: avg(rs.map(r => r.purchaseIntent)), insight: trust < 50 ? "They question privacy, accuracy, and the lack of proof." : name === "Student" ? "They value the time-saving promise most." : "They respond to the outcome but want clearer evidence." }; }).sort((a, b) => b.positiveRate - a.positiveRate);
  const strategy: Strategy = { diagnosis: "The outcome-led hook earns attention, but the broad automation claim creates a trust gap before people can act.", strongestSignal: "Career-minded students and creators strongly value relief from repetitive applications.", biggestProblem: "Skeptical professionals do not see proof, privacy safeguards, or enough user control.", priorityChange: "Put a concrete outcome and explicit control mechanism in the opening frame.", changes: ["Lead with the exact outcome, not the AI category.", "Add one proof point: time saved, success rate, or a short user story.", "Answer the privacy objection in the caption or second frame."], newHook: "Apply smarter—not blindly. Review every application before it goes out.", newCTA: "See how your application queue stays in your control.", revisedContent: "Stop spending evenings repeating the same job applications.\n\nCONTENT ROOM helps you tailor and organize applications faster—while you review every submission before it is sent.\n\nSee exactly what is shared, stay in control, and get your time back.\n\nTry your first tailored application queue.", audienceStrategy: "Keep the relief message for students and career switchers; pair it with proof and control language when targeting professionals.", experimentIdeas: ["Test a 12-second before/after workflow video.", "Compare a privacy-first hook against a time-saved hook.", "Add a specific proof point to the first frame."] };
  return { dna, personas, reactions, events: [], segments, strategy };
}

export const overview = (reactions: Reaction[]) => ({ stop: Math.round(reactions.filter(r => r.attentionScore >= 55).length / reactions.length * 100), ignore: Math.round(reactions.filter(r => r.action === "IGNORE").length / reactions.length * 100), attention: avg(reactions.map(r => r.attentionScore)), clarity: avg(reactions.map(r => r.clarityScore)), trust: avg(reactions.map(r => r.trustScore)), share: avg(reactions.map(r => r.shareIntent)), purchase: avg(reactions.map(r => r.purchaseIntent)) });
