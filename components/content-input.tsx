"use client";

import { ContentInput, Platform } from "../lib/types";

const platforms: Platform[] = ["Instagram", "YouTube Shorts", "LinkedIn", "X"];

interface ContentInputProps {
  value: ContentInput;
  busy: boolean;
  onChange: (value: ContentInput) => void;
  onRun: () => void;
}

export function ContentInputPanel({ value, busy, onChange, onRun }: ContentInputProps) {
  function preparePost() {
    const url = value.sourceUrl?.toLowerCase() ?? "";
    const platform: Platform = url.includes("linkedin") ? "LinkedIn" : url.includes("youtube") ? "YouTube Shorts" : url.includes("x.com") || url.includes("twitter") ? "X" : "Instagram";
    onChange({ ...value, platform });
  }

  function attachMedia(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    onChange({ ...value, mediaUrl: URL.createObjectURL(file), mediaKind: file.type.startsWith("video/") ? "video" : "image" });
  }

  return <section className="composer" aria-label="Content input">
    <div className="composer-head"><span>PUT A POST IN THE ROOM</span><small>URL import is assistive; paste content if a platform blocks extraction</small></div>
    <div className="url-row"><input value={value.sourceUrl ?? ""} onChange={e => onChange({ ...value, sourceUrl: e.target.value })} placeholder="Paste a social URL — LinkedIn, Instagram, X, YouTube" aria-label="Social post URL" /><button onClick={preparePost}>PREPARE POST</button></div>
    <textarea value={value.text} onChange={e => onChange({ ...value, text: e.target.value })} placeholder="Paste the caption, script, or content here…" />
    <div className="media-row"><label><input type="file" accept="image/*,video/*" onChange={attachMedia} />UPLOAD PHOTO OR VIDEO</label>{value.mediaUrl && <span>{value.mediaKind === "video" ? "VIDEO READY" : "IMAGE READY"}</span>}<small>Files stay in this browser session for the demo.</small></div>
    <div className="controls"><div className="platforms">{platforms.map(platform => <button className={value.platform === platform ? "active" : ""} key={platform} onClick={() => onChange({ ...value, platform })}>{platform}</button>)}</div><input value={value.targetAudience} onChange={e => onChange({ ...value, targetAudience: e.target.value })} aria-label="Target audience" /><button className="run" onClick={onRun} disabled={busy}>{busy ? "RUNNING ROOM…" : "ENTER THE ROOM →"}</button></div>
  </section>;
}
