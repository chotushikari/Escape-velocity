# Sprint 2 — Generic Content Ingestion

## TASK

Implement the generic ContentImporter layer and the first real content-ingestion flow.

The system must support arbitrary content types while using a real Velloe social-media post as the primary demo input.

## OBJECTIVE

Allow the user to:

1. paste a URL
2. upload content where supported
3. paste content manually
4. normalize it into a common ContentArtifact

## ARCHITECTURE

Create:

```text
ContentImporter
├── InstagramImporter
├── LinkedInImporter
├── XImporter
├── YouTubeImporter
├── WebImporter
└── ManualContentImporter
```

Use a capability-oriented design rather than pretending every platform has universal scraping.

## NORMALIZED MODEL

The normalized artifact should include fields such as:

```ts
id
type
source
sourceUrl
title
text
mediaUrl
author
platform
metadata
```

Supported content types should include:

- social_post
- video
- advertisement
- campaign
- landing_page
- email
- article
- script
- product_announcement
- creative_concept

## VELLOE DEMO

Create a demo configuration that points to the actual Velloe post/post URL supplied by the user.

Do not invent a fake Velloe post.

If the URL cannot be extracted reliably, provide a clean manual-paste fallback.

## UI

After ingestion, show:

- source/platform
- actual content preview
- title/author if available
- media if available
- extraction status
- fallback instructions when needed

Primary action:

> Analyze this content

## CONSTRAINTS

- Do not promise universal scraping.
- Treat imported external content as untrusted.
- Validate URL schemes and inputs.
- Do not expose secrets.
- Do not couple domain models to Velloe.
- Keep importers behind interfaces.
- Demo must work without live extraction through a deterministic Velloe fixture.

## TESTS

Test:

- valid URL
- invalid URL
- unsupported platform
- blocked/unavailable extraction
- empty manual content
- large input
- malformed importer response
- Velloe demo fixture

## BROWSER VERIFY

Test the complete path:

URL input → loading → success → preview → analyze.

Also test importer failure → manual fallback.

## FINAL REPORT

Report importers, fallback behavior, Velloe demo behavior, tests, browser verification, and limitations.
