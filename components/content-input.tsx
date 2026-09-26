"use client";

import { useState } from "react";
import { ContentArtifact, ContentInput, Platform } from "../lib/types";
import { applyImport, manualArtifact, prepareUrlImport } from "../lib/importers/content-importer";
import { VelloeDemoController } from "./velloe-demo-controller";

const platforms: Platform[] = ["Instagram", "YouTube Shorts", "LinkedIn", "X"];

interface ContentInputProps {
  value: ContentInput;
  busy: boolean;
  onChange: (value: ContentInput) => void;
  onRun: () => void;
  onDemo: () => void;
}

export function ContentInputPanel({ value, busy, onChange, onRun, onDemo }: ContentInputProps) {
  const [notice, setNotice] = useState("");
  const [artifact, setArtifact] = useState<ContentArtifact | null>(null);
  function preparePost() {
    const preview = value.sourceUrl ? prepareUrlImport(value.sourceUrl) : null;
    if (!preview) { setNotice("Enter a valid http(s) URL, or paste content manually."); return; }
    onChange(applyImport(value, preview)); setArtifact(preview.artifact); setNotice(preview.notice);
  }

  function attachMedia(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const next = { ...value, mediaUrl: URL.createObjectURL(file), mediaKind: file.type.startsWith("video/") ? "video" as const : "image" as const };
    onChange(next); setArtifact(manualArtifact(next)); setNotice("Local media prepared. It stays in this browser session and is never uploaded by the importer.");
  }

  return <section className="composer" aria-label="Content input">
    <div className="composer-head"><span>PUT CONTENT IN THE ROOM</span><small>Links are referenced, never scraped; paste copy when needed</small><button type="button" className="demo-trigger" onClick={onDemo}>RUN VELLOE DEMO</button></div>
    <VelloeDemoController onStart={onDemo} />
    <div className="url-row"><input value={value.sourceUrl ?? ""} onChange={e => onChange({ ...value, sourceUrl: e.target.value })} placeholder="Paste a URL — Instagram, LinkedIn, X, YouTube, or a web page" aria-label="Content URL" /><button type="button" onClick={preparePost}>PREPARE LINK</button></div>{notice && <p className="import-notice">{notice}</p>}
    {artifact && <aside className="content-artifact" aria-live="polite"><span>{artifact.source === "upload" ? "LOCAL MEDIA" : artifact.title.toUpperCase()} · {artifact.platform ?? "Manual"}</span><b>{artifact.status === "ready" ? "READY FOR REHEARSAL" : "COPY NEEDED"}</b><p>{artifact.summary}{artifact.author ? ` Author: ${artifact.author}.` : ""}</p></aside>}
    <textarea value={value.text} onChange={e => onChange({ ...value, text: e.target.value })} placeholder="Paste the caption, script, or content here…" />
    <div className="media-row"><label><input type="file" accept="image/*,video/*" onChange={attachMedia} />UPLOAD PHOTO OR VIDEO</label>{value.mediaUrl && <span>{value.mediaKind === "video" ? "VIDEO READY" : "IMAGE READY"}</span>}<small>Files stay in this browser session for the demo.</small></div>
    <div className="controls"><div className="platforms">{platforms.map(platform => <button className={value.platform === platform ? "active" : ""} key={platform} onClick={() => onChange({ ...value, platform })}>{platform}</button>)}</div><input value={value.targetAudience} onChange={e => onChange({ ...value, targetAudience: e.target.value })} aria-label="Target audience" /><button className="run" onClick={onRun} disabled={busy}>{busy ? "RUNNING ROOM…" : "ENTER THE ROOM →"}</button></div>
  </section>;
}
