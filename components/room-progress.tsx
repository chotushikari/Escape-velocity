interface RoomProgressProps { stage: number; }

const stages = ["Preparing 100 audience members", "Analyzing content DNA", "Audience is reacting", "Finding patterns", "Generating strategy"];

export function RoomProgress({ stage }: RoomProgressProps) {
  return <section className="simulation-stage"><div className="progress"><p>SIMULATION IN PROGRESS</p>{stages.map((label, index) => <div className={index <= stage ? "progress-step done" : "progress-step"} key={label}><span>{index + 1}</span>{label}<em>{index < stage ? "complete" : index === stage ? "working" : "queued"}</em></div>)}</div><div className="audience-field"><div className="field-head"><span>LIVE AUDIENCE FIELD</span><b>{Math.min(100, (stage + 1) * 20)} / 100 ACTIVE</b></div><div className="agent-dots">{Array.from({ length: 100 }, (_, index) => <i key={index} className={index < (stage + 1) * 20 ? "active" : ""} style={{ animationDelay: `${(index % 17) * 55}ms` }} />)}</div><p>Agents activate in behavioral cohorts—not as a generic score.</p></div></section>;
}
