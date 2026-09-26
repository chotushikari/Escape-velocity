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
  async function preparePost() {
    const preview = value.sourceUrl ? prepareUrlImport(value.sourceUrl) : null;
    if (!preview) { setNotice("Enter a valid http(s) URL, or paste content manually."); return; }
    const imported = applyImport(value, preview);
    if (preview.platform === "Web" && !preview.mediaUrl) {
      try {
        const response = await fetch("/api/content/import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: preview.sourceUrl }) });
        const payload = await response.json() as { artifact?: ContentArtifact; error?: string };
        if (response.ok && payload.artifact) {
          const artifact = payload.artifact;
          onChange({ ...imported, text: value.text.trim() ? value.text : artifact.text || artifact.summary, ...(artifact.mediaUrl ? { mediaUrl: artifact.mediaUrl, mediaKind: artifact.mediaKind } : {}) });
          setArtifact(artifact); setNotice("Public page metadata imported. Review or add the page copy before rehearsal."); return;
        }
        setNotice(payload.error || preview.notice);
      } catch { setNotice("Website import is unavailable. Paste the page copy to continue."); }
    }
    onChange(imported); setArtifact(preview.artifact); setNotice(preview.notice);
  }

  async function attachMedia(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const base = { ...value, mediaUrl: URL.createObjectURL(file), mediaKind: file.type.startsWith("video/") ? "video" as const : "image" as const, mediaMimeType: file.type };
    if (file.size > 2_500_000) { onChange(base); setArtifact(manualArtifact(base)); setNotice("Large media preview is ready locally. Paste a caption or script for semantic analysis; only small media is sent to an optional AI provider."); return; }
    const mediaData = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onerror = () => reject(reader.error); reader.onload = () => resolve(String(reader.result)); reader.readAsDataURL(file); });
    const next = { ...base, mediaData };
    onChange(next); setArtifact(manualArtifact(next)); setNotice("Media preview is ready. With a configured server-side Gemini key, this small file can be included in semantic analysis.");
  }

  return <section className="composer" id="content" aria-label="Content input">
    <div className="composer-head"><span>PUT CONTENT IN THE ROOM</span><small>Links are referenced, never scraped; paste copy when needed</small><button type="button" className="demo-trigger" onClick={onDemo}>RUN VELLOE DEMO</button></div>
    <VelloeDemoController onStart={onDemo} />
    <div className="url-row"><input value={value.sourceUrl ?? ""} onChange={e => onChange({ ...value, sourceUrl: e.target.value })} placeholder="Paste a URL — Instagram, LinkedIn, X, YouTube, or a web page" aria-label="Content URL" /><button type="button" onClick={() => void preparePost()}>PREPARE LINK</button></div>{notice && <p className="import-notice">{notice}</p>}
    {artifact && <aside className="content-artifact" aria-live="polite"><span>{artifact.source === "upload" ? "LOCAL MEDIA" : artifact.title.toUpperCase()} · {artifact.platform ?? "Manual"}</span><b>{artifact.status === "ready" ? "READY FOR REHEARSAL" : "COPY NEEDED"}</b><p>{artifact.summary}{artifact.author ? ` Author: ${artifact.author}.` : ""}</p></aside>}
    <textarea value={value.text} onChange={e => onChange({ ...value, text: e.target.value })} placeholder="Paste the caption, script, or content here…" />
    <div className="media-row"><label><input type="file" accept="image/*,video/*" onChange={attachMedia} />UPLOAD PHOTO OR VIDEO</label>{value.mediaUrl && <span>{value.mediaKind === "video" ? "VIDEO READY" : "IMAGE READY"}</span>}<small>Files stay in this browser session for the demo.</small></div>
    <div className="controls"><div className="platforms">{platforms.map(platform => <button className={value.platform === platform ? "active" : ""} key={platform} onClick={() => onChange({ ...value, platform })}>{platform}</button>)}</div><input value={value.targetAudience} onChange={e => onChange({ ...value, targetAudience: e.target.value })} aria-label="Target audience" /><button className="run" onClick={onRun} disabled={busy}>{busy ? "RUNNING ROOM…" : "ENTER THE ROOM →"}</button></div>
  </section>;
}
