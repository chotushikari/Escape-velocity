import { ContentArtifact, ContentInput, ContentSource, Platform } from "../types";

/** Metadata-only boundary: restricted or private content is never claimed as extracted. */
export interface ImportPreview { artifact: ContentArtifact; sourceUrl: string; platform: Platform; mediaUrl?: string; mediaKind?: "image" | "video"; notice: string; }
export interface ContentImporter { readonly source: ContentSource; readonly name: string; canImport(url: URL): boolean; preview(url: URL): ImportPreview; }

function directMedia(url: URL): { mediaUrl?: string; mediaKind?: "image" | "video" } {
  const path = url.pathname.toLowerCase();
  if (/\.(mp4|webm|mov|m4v)$/.test(path)) return { mediaUrl: url.toString(), mediaKind: "video" };
  if (/\.(png|jpe?g|gif|webp|avif)$/.test(path)) return { mediaUrl: url.toString(), mediaKind: "image" };
  return {};
}
function previewFor(url: URL, platform: Platform, source: ContentSource, title: string): ImportPreview {
  const media = directMedia(url); const ready = Boolean(media.mediaUrl);
  return { sourceUrl: url.toString(), platform, ...media,
    notice: ready ? "Direct media preview is ready. Add the caption or script for a stronger interpretation." : "Link saved. Paste the visible caption, script, or page copy; Content Room does not scrape restricted platforms.",
    artifact: { id: `url-${url.hostname}-${url.pathname}`.replace(/[^a-z0-9-]/gi, "-").slice(0, 120), type: ready ? (media.mediaKind === "video" ? "video" : "social_post") : "social_post", source, title, platform, status: ready ? "ready" : "needs_copy", summary: ready ? "Direct media reference prepared; copy is still optional context." : "Metadata-only link reference; no inaccessible content was extracted.", sourceUrl: url.toString(), ...media, metadata: { host: url.hostname, importer: title, extraction: "metadata-only" } },
  };
}
abstract class UrlContentImporter implements ContentImporter {
  abstract readonly source: ContentSource; abstract readonly name: string; abstract readonly platform: Platform;
  abstract canImport(url: URL): boolean;
  preview(url: URL) { return previewFor(url, this.platform, this.source, this.name); }
}
export class InstagramContentImporter extends UrlContentImporter { readonly source = "url" as const; readonly name = "Instagram post"; readonly platform = "Instagram" as const; canImport(url: URL) { return /(^|\.)instagram\.com$/i.test(url.hostname); } }
export class LinkedInContentImporter extends UrlContentImporter { readonly source = "url" as const; readonly name = "LinkedIn post"; readonly platform = "LinkedIn" as const; canImport(url: URL) { return /(^|\.)linkedin\.com$/i.test(url.hostname); } }
export class XContentImporter extends UrlContentImporter { readonly source = "url" as const; readonly name = "X post"; readonly platform = "X" as const; canImport(url: URL) { return /(^|\.)(x\.com|twitter\.com)$/i.test(url.hostname); } }
export class YouTubeContentImporter extends UrlContentImporter { readonly source = "url" as const; readonly name = "YouTube video"; readonly platform = "YouTube Shorts" as const; canImport(url: URL) { return /(^|\.)(youtube\.com|youtu\.be)$/i.test(url.hostname); } }
export class WebContentImporter extends UrlContentImporter { readonly source = "url" as const; readonly name = "Web page"; readonly platform = "Web" as const; canImport(url: URL) { return url.protocol === "https:" || url.protocol === "http:"; } }
/** Manual is intentionally local-only: text and browser-selected media need no network. */
export class ManualContentImporter {
  readonly source = "paste" as const;
  readonly name = "Manual content";
  create(input: ContentInput) { return manualArtifact(input); }
}
export const defaultImporters: ContentImporter[] = [new InstagramContentImporter(), new LinkedInContentImporter(), new XContentImporter(), new YouTubeContentImporter(), new WebContentImporter()];

export function prepareUrlImport(sourceUrl: string, importers = defaultImporters): ImportPreview | null {
  try { const url = new URL(sourceUrl); return importers.find(importer => importer.canImport(url))?.preview(url) ?? null; } catch { return null; }
}
export function applyImport(input: ContentInput, preview: ImportPreview): ContentInput { return { ...input, sourceUrl: preview.sourceUrl, platform: preview.platform, ...(preview.mediaUrl ? { mediaUrl: preview.mediaUrl, mediaKind: preview.mediaKind } : {}) }; }
export function manualArtifact(input: ContentInput): ContentArtifact {
  return { id: "manual-content", type: input.mediaKind === "video" ? "video" : "social_post", source: input.mediaUrl ? "upload" : "paste", title: input.mediaUrl ? "Uploaded media" : "Pasted content", platform: input.platform, status: "ready", summary: input.mediaUrl ? "Local browser preview attached. Add supporting copy for a stronger rehearsal." : "Manual content is ready for rehearsal.", text: input.text, mediaUrl: input.mediaUrl, mediaKind: input.mediaKind, sourceUrl: input.sourceUrl, metadata: { importer: "manual" } };
}
