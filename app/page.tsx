"use client";

import { useMemo, useState } from "react";
import { ContentInput, SimulationResult } from "../lib/types";
import { overview } from "../lib/simulation";
import { ContentInputPanel } from "../components/content-input";
import { RoomProgress } from "../components/room-progress";
import { LiveRoom } from "../components/live-room";
import { VersionComparison } from "../components/version-comparison";
import { VelloeDemoScenario } from "../lib/demo/velloe-demo-scenario";

const defaultContent = "AI that automatically finds and applies to jobs for you.";

export default function Home() {
  const [input, setInput] = useState<ContentInput>({ text: defaultContent, platform: "LinkedIn", targetAudience: "Early adopters, industry professionals, and decision makers" });
  const [audienceId, setAudienceId] = useState("room-population-v1");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [versionB, setVersionB] = useState<SimulationResult | null>(null);
  const [stage, setStage] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [resimulating, setResimulating] = useState(false);
  const metrics = useMemo(() => result ? overview(result.reactions) : null, [result]);

  async function run(content = input, populationId = audienceId) {
    if (!content.text.trim() || busy) return;
    setBusy(true); setResult(null); setVersionB(null); setStage(0);
    const timer = window.setInterval(() => setStage(value => Math.min(value + 1, 4)), 600);
    try {
      const response = await fetch("/api/simulate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content, sameAudienceId: populationId }) });
      if (!response.ok) throw new Error("Simulation unavailable");
      const data = await response.json() as SimulationResult;
      setStage(4); await new Promise(resolve => setTimeout(resolve, 350)); setResult(data);
    } finally { window.clearInterval(timer); setBusy(false); }
  }

  function runVelloeDemo() { setInput(VelloeDemoScenario.content); setAudienceId(VelloeDemoScenario.audienceId); void run(VelloeDemoScenario.content, VelloeDemoScenario.audienceId); }
  async function resimulate() {
    if (!result || resimulating) return;
    setResimulating(true);
    try {
      const versionBContent = { ...input, text: result.strategy.revisedContent };
      const response = await fetch("/api/simulate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: versionBContent, sameAudienceId: audienceId }) });
      if (!response.ok) throw new Error("Re-simulation unavailable");
      setVersionB(await response.json() as SimulationResult);
    } finally { setResimulating(false); }
  }

  return <main>
    <header><div className="brand"><span className="brand-mark">C</span><span>CONTENT ROOM</span></div><nav><a href="#room">Audience room</a><a href="#blueprint">System blueprint</a></nav><div className="mode"><i /> SYNTHETIC AUDIENCE SIMULATION</div></header>
    <section className="intro"><div><p className="eyebrow">PRE-PUBLICATION INTELLIGENCE</p><h1>Rehearse your content<br />before the real audience does.</h1><p className="sub">Generate hypotheses with 100 simulated audience members, understand the split, and test a sharper Version B before you publish.</p></div><div className="intro-note"><b>100</b><span>behavioral personas<br />in every room</span></div></section>
    <ContentInputPanel value={input} busy={busy} onChange={setInput} onRun={() => void run()} onDemo={runVelloeDemo} />
    {busy && <RoomProgress stage={stage} />}
    {result && metrics && <Results audienceId={audienceId} input={input} result={result} metrics={metrics} versionB={versionB} resimulating={resimulating} onResimulate={resimulate} />}
    {!result && !busy && <section className="empty"><span>01</span><p>Paste a campaign URL, add a photo or video, or write the content directly. The room always has a manual fallback.</p></section>}
    <footer>CONTENT ROOM · SYNTHETIC BEHAVIORAL SIMULATION · HYPOTHESES TO VALIDATE, NOT A REAL SURVEY</footer>
  </main>;
}

function Results({ audienceId, input, result, metrics, versionB, resimulating, onResimulate }: { audienceId: string; input: ContentInput; result: SimulationResult; metrics: ReturnType<typeof overview>; versionB: SimulationResult | null; resimulating: boolean; onResimulate: () => void }) {
  const liked = result.reactions.filter(reaction => reaction.trustScore >= 55).slice(0, 3);
  const rejected = result.reactions.filter(reaction => reaction.trustScore < 50).slice(0, 3);
  const high = result.segments.find(segment => segment.name === "Early adopter") ?? result.segments[0];
  const low = result.segments.find(segment => segment.name === "Industry professional") ?? [...result.segments].sort((a, b) => a.positiveRate - b.positiveRate)[0];
  return <div className="results">
    <section className="post-artifact">{input.mediaUrl && <div className="media-preview">{input.mediaKind === "video" ? <video src={input.mediaUrl} controls /> : <img src={input.mediaUrl} alt="Uploaded content preview" />}</div>}<div className="post-copy"><span>ORIGINAL CONTENT</span><b>{result.dna.hook}</b><p>“{result.dna.promise}”</p></div><dl><div><dt>SOURCE</dt><dd>{input.sourceUrl ? "Social URL + caption" : input.mediaUrl ? "Uploaded media + caption" : "Pasted content"}</dd></div><div><dt>CONTENT TYPE</dt><dd>{input.mediaKind === "video" ? "Video / short" : input.mediaKind === "image" ? "Image post" : "Product / marketing"}</dd></div><div><dt>AUDIENCE HYPOTHESIS</dt><dd>Contextual behavioral cohorts</dd></div></dl></section>
    <section className="overview"><div className="section-label">WHAT HAPPENED? <span>100 simulated audience members</span></div><div className="simulated-badge">SIMULATED HYPOTHESES · VALIDATE WITH REAL AUDIENCE SIGNALS</div><div className="metric-grid"><Metric label="Simulated stop scrolling" value={metrics.stop} /><Metric label="Simulated clarity" value={metrics.clarity} /><Metric label="Simulated trust" value={metrics.trust} tone="warn" /><Metric label="Simulated share intent" value={metrics.share} /><Metric label="Simulated purchase intent" value={metrics.purchase} /></div></section>
    <LiveRoom result={result} />
    <section className="insights two-col"><Panel title="SIMULATED POSITIVE SIGNALS"><p className="big-quote">“{liked[0]?.strongestElement}.”</p><ul>{liked.map(reaction => <li key={reaction.personaId}>{reaction.thought}</li>)}</ul></Panel><Panel title="SIMULATED FRICTION"><p className="big-quote">“{rejected[0]?.biggestProblem}.”</p><ul>{rejected.map(reaction => <li key={reaction.personaId}>{reaction.thought}</li>)}</ul></Panel></section>
    <section className="split"><div><p className="eyebrow">SIMULATED AUDIENCE SPLIT</p><h2>{high.name} are in.<br /><span>{low.name} need proof.</span></h2><p>The same promise produces different interpretations because personas bring different confidence, context, and tolerance for automation.</p></div><div className="split-data"><SegmentBar segment={high} /><SegmentBar segment={low} /></div></section>
    <section className="why"><div className="section-label">WHY THIS HAPPENED <span>SIMULATED SIGNAL INTERPRETATION</span></div><div className="why-grid"><div><span>01</span><h3>The hook earns a pause</h3><p>{result.dna.strengths[0]}.</p></div><div><span>02</span><h3>The claim outruns the proof</h3><p>{result.strategy.biggestProblem}</p></div><div><span>03</span><h3>Control is the missing message</h3><p>People want to know what the system does—and what they can review.</p></div></div></section>
    <section className="strategy"><div className="strategy-top"><div><p className="eyebrow">CONTENT ROOM RECOMMENDATION</p><h2>Change these three things.</h2></div><p>{result.strategy.diagnosis}</p></div><div className="strategy-evidence"><span>GROUNDED IN SIMULATED SIGNAL</span><b>{result.strategy.strongestSignal}</b></div><div className="changes">{result.strategy.changes.map((change, index) => <div key={change}><span>0{index + 1}</span>{change}</div>)}</div></section>
    <section className="revision"><div className="section-label">IMPROVED VERSION <span>RECOMMENDED CONTENT · VERSION B</span></div><div className="revision-grid"><article><small>VERSION A · ORIGINAL</small><p>{input.text}</p></article><article className="recommended"><small>VERSION B · PROPOSED</small><p>{result.strategy.revisedContent}</p><button type="button" onClick={() => navigator.clipboard?.writeText(result.strategy.revisedContent)}>COPY VERSION B</button></article></div></section>
    <section className="resim"><div><p className="eyebrow">CLOSE THE LOOP</p><h2>Test Version B<br />before it leaves the room.</h2><p className="audience-lock">SAME AUDIENCE LOCKED · POPULATION PRESERVED</p><p>Version B is run against the same synthetic personas. This comparison is a simulated directional hypothesis, designed to inform—not replace—live validation.</p></div>{versionB ? <VersionComparison before={result} after={versionB} audienceId={audienceId} /> : <button className="resim-button" onClick={onResimulate} disabled={resimulating}>{resimulating ? "RE-SIMULATING…" : "RE-SIMULATE SAME AUDIENCE →"}</button>}</section>
    <Architecture />
  </div>;
}

function Metric({ label, value, tone }: { label: string; value: number; tone?: string }) { return <div className={tone ? `metric ${tone}` : "metric"}><b>{value}%</b><span>{label}</span><i><em style={{ width: `${value}%` }} /></i></div>; }
function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <article className="panel"><div className="section-label">{title}</div>{children}</article>; }
function SegmentBar({ segment }: { segment: SimulationResult["segments"][number] }) { return <div className="segment"><div><b>{segment.name}</b><span>Simulated {segment.positiveRate}% positive</span></div><i><em style={{ width: `${segment.positiveRate}%` }} /></i><p>{segment.insight}</p></div>; }
function Architecture() { return <section className="blueprint" id="blueprint"><div className="section-label">SYSTEM BLUEPRINT <span>PRESENTATION-READY ARCHITECTURE</span></div><div className="blueprint-head"><div><p className="eyebrow">HOW CONTENT ROOM WORKS</p><h2>Not prompts in a row.<br />A contained simulation system.</h2></div><p>Content Room separates the creator experience, orchestration, agent reasoning, and evidence layers—so each simulated output can be inspected and improved.</p></div><div className="layers"><article className="experience"><small>01 · EXPERIENCE</small><b>Next.js creator workspace</b><span>Content upload · Simulation room · Audience intelligence</span></article><article className="orchestration"><small>02 · ORCHESTRATION</small><b>Analyze → simulate → aggregate → strategize</b><span>Coordinates one observable run from input to revised content</span></article><div className="engine-row"><article><small>03A · CONTENT ENGINE</small><b>Content DNA</b><span>Hook · promise · tone · CTA · risk</span></article><article><small>03B · PERSONA ENGINE</small><b>100 behavioral agents</b><span>Identity · interests · attention · trust</span></article><article><small>03C · SIMULATION ENGINE</small><b>Perceive, reason, act</b><span>Stop · save · share · ignore · reject</span></article></div><article className="analytics"><small>04 · AUDIENCE INTELLIGENCE</small><b>Aggregate · segment · detect divergence</b><span>Reaction events become evidence, not a single sentiment score</span></article><article className="strategy-layer"><small>05 · STRATEGY ENGINE</small><b>Diagnose · recommend · rewrite · experiment</b><span>Grounds Version B in the observed simulated friction</span></article></div><p className="blueprint-note">Conceptual lineage: OASIS-inspired agent profiles and action spaces; MiroFish-inspired seed → world → simulation → report journey. Content Room remains purpose-built for pre-publication audience intelligence.</p></section>; }
