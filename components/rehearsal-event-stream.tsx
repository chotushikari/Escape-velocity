"use client";

const events = [
  ["CONTENT_SECURED", "Normalizing the content artifact"],
  ["DNA_EXTRACTED", "Reading hook, promise, proof, and friction"],
  ["AUDIENCE_COMPOSED", "Binding stable behavioral cohorts"],
  ["ROOM_OPEN", "Routing the artifact through synthetic feeds"],
  ["SIGNALS_AGGREGATED", "Detecting agreement and disagreement"],
];

export function RehearsalEventStream({ stage }: { stage: number }) {
  const current = Math.max(0, Math.min(stage, events.length - 1));

  return <section className="event-stream" aria-live="polite" aria-label="Simulation event stream">
    <div className="event-stream-head"><span>RUN EVENT STREAM</span><b><i /> LIVE ORCHESTRATION</b></div>
    <div className="event-stream-lines">
      {events.map(([event, detail], index) => {
        const state = index < current ? "complete" : index === current ? "active" : "queued";
        return <div className={`event-line ${state}`} key={event}>
          <span className="event-index">{String(index + 1).padStart(2, "0")}</span>
          <div><b>{event}</b><small>{detail}</small></div>
          <em>{state === "complete" ? "RECORDED" : state === "active" ? "PROCESSING" : "QUEUED"}</em>
        </div>;
      })}
    </div>
    <p>Each line represents a product workflow state, not hidden chain-of-thought.</p>
  </section>;
}
