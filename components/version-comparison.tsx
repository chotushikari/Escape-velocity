import { overview } from "../lib/simulation";
import { SimulationResult } from "../lib/types";

export function VersionComparison({ before, after, audienceId }: { before: SimulationResult; after: SimulationResult; audienceId: string }) {
  const baseline = overview(before.reactions); const improved = overview(after.reactions);
  const rows = [["Stop scrolling", baseline.stop, improved.stop], ["Clarity", baseline.clarity, improved.clarity], ["Trust", baseline.trust, improved.trust], ["Share intent", baseline.share, improved.share], ["Purchase intent", baseline.purchase, improved.purchase]];
  return <div className="comparison">
    <div className="comparison-head"><div><b>VERSION B · SIMULATED CHANGE</b><span>Same synthetic audience preserved</span></div><small>POPULATION {audienceId}</small></div>
    {rows.map(([label, beforeValue, afterValue]) => { const delta = Number(afterValue) - Number(beforeValue); return <div className="comparison-row" key={String(label)}><span>Simulated {label}</span><b>{beforeValue}%</b><i>→</i><strong>{afterValue}%</strong><em className={delta >= 0 ? "up" : "down"}>{delta >= 0 ? "+" : ""}{delta} pts</em></div>; })}
    <p className="comparison-note">Directional simulation only. Use the change to choose what to validate with a live creative test or audience research.</p>
  </div>;
}
