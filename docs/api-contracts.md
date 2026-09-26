# API contracts

`packages/contracts/src` is the single source of truth for client and simulation
shapes. API boundaries validate untrusted input with Zod before it reaches a
simulation engine. The OASIS adapter returns Content Room events and never exposes
OASIS platform-specific shapes to the UI.
