## Day 1 — 2026-05-06

**Hours worked:** 4

**What I did:**
Set up the Next.js 14 project with TypeScript and Tailwind CSS. Initialized the GitHub
repository and pushed the first commit. Created all required markdown files as empty
shells (README, ARCHITECTURE, REFLECTION, TESTS, PRICING_DATA, PROMPTS, GTM,
ECONOMICS, USER_INTERVIEWS, LANDING_COPY, METRICS). Researched and filled
PRICING_DATA.md by visiting each vendor's official pricing page — Cursor, GitHub
Copilot, Claude, Anthropic API, ChatGPT, OpenAI API, Gemini, and Windsurf — and
recorded verified prices with source URLs and today's date. Set up Vercel deployment
and confirmed the live URL is reachable. Added the GitHub Actions CI workflow file.
Chose Next.js 14 (App Router) as the framework given prior experience and its
built-in API routes, which simplifies the backend for lead capture and audit storage.

**What I learned:**
Windsurf's pricing structure changed recently — their free tier is more limited than I
initially assumed, which will affect how I write the audit recommendation logic for
users on that plan. Also confirmed that Anthropic API pricing is per-token (not flat
subscription), which means the audit engine needs a different evaluation approach
for API-direct users vs. claude.ai subscribers.

**Blockers / what I'm stuck on:**
Resend requires a verified domain to send emails from a custom address. The free
tier only allows sending to the account owner's email during development. Will
decide tomorrow whether to use a subdomain or accept this limitation for the MVP
and document it as a known constraint.

**Plan for tomorrow:**
Build the spend input form — tool selector, plan dropdown, monthly spend, seat
count, team size, and use case fields. Implement localStorage persistence so form
state survives page reloads. Define the full TypeScript types for AuditInput and
AuditResult. Begin sketching the audit engine rules for at least 3 tools.

## Day 2 — 2026-05-07

**Hours worked:** 5

**What I did:**
Defined all TypeScript types for AuditInput, ToolEntry, and UseCase. Built the
tool options config covering all 8 required tools with their respective plans.
Implemented a usePersistedForm hook that reads from localStorage on mount and
syncs on every state change — added a hydration flag to prevent the flash of
default values before localStorage loads. Built the full spend input form: tool
selector as toggle buttons, per-tool fields (plan dropdown, monthly spend, seats),
team size and use case selectors. Added validation before form submission.
Created the /audit/preview route as a placeholder for Day 3.

**What I learned:**
Next.js App Router requires 'use client' on any component using useState or
localStorage. Initially forgot this and got a hydration error. Also learned that
reading localStorage during SSR causes a mismatch — the hydrated flag pattern
solves this cleanly by deferring the read to useEffect.

**Blockers / what I'm stuck on:**
The plan dropdown for Anthropic API and OpenAI API only has one option
(Pay-as-you-go) since they are token-based. Need to decide how to handle spend
input for these — likely just a monthly spend field with no seats, since per-token
billing doesn't map to seat count. Will address this in the audit engine tomorrow.

**Plan for tomorrow:**
Build the audit engine as a pure TypeScript function. Write defensible rules for
all 8 tools covering wrong-plan-for-team-size, cheaper-same-vendor-plan, and
cheaper-alternative recommendations. Write all 5+ audit engine tests. Begin the
results page layout.