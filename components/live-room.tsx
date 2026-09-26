"use client";

import { useEffect, useMemo, useState } from "react";
import { Action, Reaction, SimulationResult } from "../lib/types";

const replayStates = ["IDLE", "WATCHING", "INTERPRETING", "REACTING", "DECIDING", "COMPLETED"] as const;
type ReplayState = (typeof replayStates)[number];

const actionLabel: Record<Action, string> = { STOP: "STOPPED", IGNORE: "SCROLLED ON", LIKE: "LIKED", COMMENT: "COMMENTED", SHARE: "SHARED", SAVE: "SAVED", FOLLOW: "FOLLOWED", CLICK: "CLICKED", BUY: "BOUGHT", REJECT: "REJECTED" };

function reachesState(reaction: Reaction, state: ReplayState) {
  if (state === "IDLE") return false;
  if (state === "WATCHING") return reaction.attentionScore >= 45;
  if (state === "INTERPRETING") return reaction.attentionScore >= 52;
  if (state === "REACTING") return reaction.clarityScore >= 58 || reaction.action === "REJECT";
  if (state === "DECIDING") return reaction.action !== "IGNORE" || reaction.attentionScore >= 55;
  return true;
}

function stateCopy(state: ReplayState) {
  return { IDLE: "The population is loaded with stable persona attributes and no response has been recorded.", WATCHING: "The post enters each persona’s feed context and competes for attention.", INTERPRETING: "Agents form a working read of the claim, evidence, and tone.", REACTING: "Emotion and relevance begin to shape a provisional response.", DECIDING: "Trust, relevance, and friction resolve into intent.", COMPLETED: "The simulated action is recorded for this run." }[state];
}

export function LiveRoom({ result }: { result: SimulationResult }) {
  const [stateIndex, setStateIndex] = useState(5);
  const [paused, setPaused] = useState(true);
  const [selectedId, setSelectedId] = useState(result.personas[0]?.id ?? "");
  useEffect(() => { setStateIndex(5); setPaused(true); setSelectedId(result.personas[0]?.id ?? ""); }, [result]);
  useEffect(() => { if (paused) return; const interval = window.setInterval(() => setStateIndex(value => (value + 1) % replayStates.length), 1100); return () => window.clearInterval(interval); }, [paused]);

  const activeState = replayStates[stateIndex];
  const selected = useMemo(() => result.personas.find(persona => persona.id === selectedId) ?? result.personas[0], [result.personas, selectedId]);
  const selectedReaction = result.reactions.find(reaction => reaction.personaId === selected?.id);
  const reached = result.reactions.filter(reaction => reachesState(reaction, activeState));
  const eventFeed = useMemo(() => reached.slice(0, 4).map(reaction => {
    const persona = result.personas.find(candidate => candidate.id === reaction.personaId);
    return { id: reaction.personaId, name: persona?.name ?? "Audience agent", action: actionLabel[reaction.action], state: activeState };
  }), [activeState, reached, result.personas]);

  return <section className="room room-live" id="room" aria-label="The Room live simulation replay">
    <div className="section-label"><span>THE ROOM IS LIVE</span><span>SIMULATED RUN REPLAY · 100 PERSONAS</span></div>
    <div className="room-stage">
      <div className="room-stage-head"><div><p className="eyebrow">{activeState} · {reached.length} / {result.personas.length} REACHED</p><h2>Watch the audience<br />form a response.</h2></div><div className="room-controls"><button type="button" className="replay-button" onClick={() => { setStateIndex(0); setPaused(false); }}>{paused ? "REPLAY RUN" : "RESTART"}</button><button type="button" className="pause-button" onClick={() => setPaused(value => !value)}>{paused ? "PLAY" : "PAUSE"}</button></div></div>
      <p className="room-state-copy">{stateCopy(activeState)} This is a structured simulation hypothesis, not a record of real audience behavior.</p>
      <div className="state-rail" aria-label="Simulation state progression">{replayStates.map((state, index) => <button key={state} type="button" onClick={() => { setStateIndex(index); setPaused(true); }} className={index === stateIndex ? "current" : index < stateIndex ? "complete" : ""}><i>{index + 1}</i><span>{state}</span></button>)}</div>
      <div className="room-board"><div className="agent-field" aria-label="Audience agent field">{result.personas.map((persona, index) => {
        const reaction = result.reactions[index]; const available = reachesState(reaction, activeState); const isSelected = persona.id === selectedId;
        return <button type="button" key={persona.id} onClick={() => setSelectedId(persona.id)} className={`agent-node ${available ? "reached" : "waiting"} ${isSelected ? "selected" : ""} ${reaction.action.toLowerCase()}`} style={{ "--agent-delay": `${(index % 20) * 38}ms`, "--agent-color": persona.color } as React.CSSProperties} aria-label={`${persona.name}: ${available ? actionLabel[reaction.action] : activeState.toLowerCase()}`}><span>{persona.name[0]}</span></button>;
      })}<div className="room-artifact" aria-label="Content artifact at the center of the room"><span>CONTENT IN ROOM</span><b>{result.dna.hook}</b><small>100 simulated feeds</small></div></div>
      {selected && selectedReaction && <aside className="agent-inspector"><div className="agent-inspector-head"><span className="avatar" style={{ background: selected.color }}>{selected.name[0]}</span><div><b>{selected.name}, {selected.age}</b><small>{selected.occupation} · {selected.segment}</small></div></div><div className="agent-state"><span>SIMULATED STATE</span><strong>{reachesState(selectedReaction, activeState) ? activeState === "COMPLETED" ? actionLabel[selectedReaction.action] : activeState : "WAITING"}</strong></div><p>“{selectedReaction.thought}”</p><dl><div><dt>Attention</dt><dd>{selectedReaction.attentionScore}</dd></div><div><dt>Clarity</dt><dd>{selectedReaction.clarityScore}</dd></div><div><dt>Trust</dt><dd>{selectedReaction.trustScore}</dd></div></dl><small className="inspector-note">Simulated persona response · click any node to inspect</small></aside>}</div>
      <div className="synthetic-event-feed" aria-live="polite"><div><span>SYNTHETIC EVENT FEED</span><small>OBSERVABLE RUN EVENTS</small></div>{eventFeed.map((event, index) => <p key={`${event.id}-${event.state}`}><i style={{ animationDelay: `${index * 140}ms` }} /> <b>{event.name}</b> reached <em>{event.state}</em>{activeState === "COMPLETED" ? ` · ${event.action}` : ""}</p>)}</div>
    </div>
    <div className="room-outcomes"><div><span>SIMULATED ACTION MIX</span><b>{result.reactions.filter(reaction => reaction.action !== "IGNORE" && reaction.action !== "REJECT").length} constructive actions</b></div><div><span>STRONGEST FRICTION</span><b>{result.strategy.biggestProblem}</b></div><div><span>RUN MODE</span><b>{result.engine === "DemoSimulationEngine" ? "Deterministic demo" : "Structured simulation"}</b></div></div>
  </section>;
}
