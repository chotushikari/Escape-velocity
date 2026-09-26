import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({ url: z.string().url().max(2048) });

function privateAddress(address: string) {
  if (isIP(address) === 6) return address === "::1" || address.startsWith("fe80:") || address.startsWith("fc") || address.startsWith("fd");
  const parts = address.split(".").map(Number);
  return parts[0] === 10 || parts[0] === 127 || parts[0] === 0 || (parts[0] === 169 && parts[1] === 254) || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) || (parts[0] === 192 && parts[1] === 168);
}

function textMeta(html: string, key: string) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i")) || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["']`, "i"));
  return match?.[1]?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').trim();
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid http(s) URL." }, { status: 400 });
  const url = new URL(parsed.data.url);
  if (url.protocol !== "https:" && url.protocol !== "http:") return NextResponse.json({ error: "Only http(s) URLs are supported." }, { status: 400 });
  if (url.username || url.password || url.hostname === "localhost") return NextResponse.json({ error: "This URL cannot be imported." }, { status: 400 });
  try {
    const addresses = await lookup(url.hostname, { all: true });
    if (!addresses.length || addresses.some(({ address }) => privateAddress(address))) return NextResponse.json({ error: "Private network URLs cannot be imported." }, { status: 400 });
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 8_000);
    const response = await fetch(url, { redirect: "manual", signal: controller.signal, headers: { Accept: "text/html,application/xhtml+xml" } });
    clearTimeout(timeout);
    const type = response.headers.get("content-type") || "";
    const length = Number(response.headers.get("content-length") || 0);
    if (!response.ok || !type.includes("text/html") || length > 1_000_000) throw new Error("unavailable");
    const html = (await response.text()).slice(0, 1_000_000);
    const title = textMeta(html, "og:title") || html.match(/<title[^>]*>([\s\S]{1,300}?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() || url.hostname;
    const description = textMeta(html, "og:description") || textMeta(html, "description") || "Public web page imported as a content reference.";
    const image = textMeta(html, "og:image");
    return NextResponse.json({ artifact: { id: `web-${url.hostname}-${url.pathname}`.replace(/[^a-z0-9-]/gi, "-").slice(0, 120), type: "landing_page", source: "url", title, platform: "Web", status: "ready", summary: description, text: description, sourceUrl: url.toString(), ...(image ? { mediaUrl: image, mediaKind: "image" } : {}), metadata: { importer: "safe-open-graph", host: url.hostname, extraction: "public-metadata" } } });
  } catch {
    return NextResponse.json({ error: "We could not reliably import this web page. Paste the visible page copy to continue." }, { status: 422 });
  }
}
