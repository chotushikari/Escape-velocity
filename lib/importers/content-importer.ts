import { ContentInput, Platform } from "../types";

export interface ImportPreview { sourceUrl: string; platform: Platform; mediaUrl?: string; mediaKind?: "image" | "video"; notice: string; }
export interface ContentImporter { canImport(url: URL): boolean; preview(url: URL): ImportPreview; }

function platformFor(host: string): Platform {
  if (host.includes("linkedin")) return "LinkedIn";
  if (host.includes("youtube")) return "YouTube Shorts";
  if (host === "x.com" || host.endsWith(".x.com") || host.includes("twitter")) return "X";
  return "Instagram";
}

export class WebContentImporter implements ContentImporter {
  canImport(url: URL) { return url.protocol === "https:" || url.protocol === "http:"; }
  preview(url: URL): ImportPreview {
    const path = url.pathname.toLowerCase();
    const mediaKind = /\.(mp4|webm|mov)$/.test(path) ? "video" : /\.(png|jpe?g|gif|webp|avif)$/.test(path) ? "image" : undefined;
    return { sourceUrl: url.toString(), platform: platformFor(url.hostname), ...(mediaKind ? { mediaUrl: url.toString(), mediaKind } : {}), notice: mediaKind ? "Direct media preview ready." : "URL recognized. Paste its caption, script, or page copy for a reliable rehearsal." };
  }
}

export function prepareUrlImport(sourceUrl: string): ImportPreview | null {
  try { const url = new URL(sourceUrl); const importer = new WebContentImporter(); return importer.canImport(url) ? importer.preview(url) : null; } catch { return null; }
}

export function applyImport(input: ContentInput, preview: ImportPreview): ContentInput {
  return { ...input, sourceUrl: preview.sourceUrl, platform: preview.platform, ...(preview.mediaUrl ? { mediaUrl: preview.mediaUrl, mediaKind: preview.mediaKind } : {}) };
}
