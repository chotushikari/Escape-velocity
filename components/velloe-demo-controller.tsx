"use client";

import { useEffect, useState } from "react";
import { demoStageAt, nextDemoStage, velloeDemoStages } from "../lib/demo/velloe-demo-controller";

interface VelloeDemoControllerProps { onStart: () => void; }

/** A presentation controller; it never requests a provider and is safe offline. */
export function VelloeDemoController({ onStart }: VelloeDemoControllerProps) {
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (!active || paused || stageIndex >= velloeDemoStages.length - 1) return;
    const timer = window.setTimeout(() => setStageIndex(nextDemoStage), 9_000);
    return () => window.clearTimeout(timer);
  }, [active, paused, stageIndex]);

  function start() { setStageIndex(0); setPaused(false); setActive(true); onStart(); }
  function restart() { setStageIndex(0); setPaused(false); setActive(true); onStart(); }

  return <aside className="demo-controller" aria-label="90-second Velloe demo controller">
    <div><span>DEMO FIXTURE · SYNTHETIC RESULTS</span><b>{active ? demoStageAt(stageIndex).replace("_", " ") : "90-SECOND VELLOE REHEARSAL"}</b></div>
    <div className="demo-actions">
      {!active ? <button type="button" onClick={start}>START DEMO</button> : <><button type="button" onClick={() => setPaused(value => !value)}>{paused ? "RESUME" : "PAUSE"}</button><button type="button" onClick={() => setStageIndex(nextDemoStage)}>NEXT</button><button type="button" onClick={restart}>RESTART</button></>}
      <label>STAGE<select value={stageIndex} onChange={event => { setActive(true); setStageIndex(Number(event.target.value)); }}>{velloeDemoStages.map((stage, index) => <option key={stage} value={index}>{stage.replace("_", " ")}</option>)}</select></label>
    </div>
  </aside>;
}
