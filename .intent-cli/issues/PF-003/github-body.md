## Goal

Show the site owner's name as "Nakata Shingo" wherever it is displayed as a name (hero, header, footer, page title).

## Why This Slice Exists Now

The site owner asked to use "Nakata Shingo" instead of 「中田 慎吾」 as the displayed name.

## Current Observed State

- Hero `<h1>` shows 「中田 慎吾」 (from `profile.name`) with a secondary line "Shingo Nakata".
- Header brand is 「中田 慎吾」; footer reads "© 2026 Shingo Nakata".
- Page title is 「中田慎吾 | Portfolio」.

## Accepted Baseline You May Assume

- PF-002 is merged on `main`; Next.js 15 App Router + Tailwind v4 under `app/`.
- No test suite; type check and production build are the verification.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/data/profile.ts app/app/components/ProfileSection.tsx app/app/components/Header.tsx app/app/components/Footer.tsx app/app/layout.tsx`

Target part: `Display name in hero, header, footer and page metadata`

## In Scope

- `profile.ts`: `name: "Nakata Shingo"` (do not touch `description`).
- `ProfileSection.tsx`: secondary line text `Shingo Nakata` → `中田 慎吾`.
- `Header.tsx`: brand text → `Nakata Shingo`.
- `Footer.tsx`: → `© 2026 Nakata Shingo`.
- `layout.tsx`: `title` and `openGraph.title` → `Nakata Shingo | Portfolio`; `description` and `openGraph.description` → `Web Developer 中田慎吾（Nakata Shingo）のポートフォリオサイトです。`

## Out Of Scope

- Any styling or layout change.
- The self-introduction prose (「はじめまして、中田慎吾です。…」 stays).

## Standalone Child Issue Contract

The PR changes only the name strings listed above so the site displays "Nakata Shingo" as the owner's name in the hero, header, footer and page title, with 「中田 慎吾」 kept once as the hero's secondary line; nothing else changes and type check plus build pass.

## Acceptance Criteria

- `profile.ts` name is "Nakata Shingo"; the hero `<h1>` therefore shows Nakata Shingo.
- The hero secondary line under the name reads 中田 慎吾 instead of Shingo Nakata.
- Header brand link text is Nakata Shingo; footer reads © 2026 Nakata Shingo.
- `layout.tsx` metadata title and openGraph.title are "Nakata Shingo | Portfolio"; both descriptions are 「Web Developer 中田慎吾（Nakata Shingo）のポートフォリオサイトです。」
- The self-introduction text in `profile.ts` is unchanged, and `grep -rn "Shingo Nakata" app/app` returns nothing.
- `npx tsc --noEmit` and `npm run build` succeed in `app/`, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check` and `grep -rn "Shingo Nakata" app/app` (expect no output).

## Related Links

- None

## Knowledge Maintenance

- Intent placement: `intents/portfolio/intent-tree/01-content.md`
- ADR candidate: none
- Diagram candidate: none
- Docs update: none
- Closeout writeback expected: no

## Guide Reachability (G645)

No role-facing surface is added (`no_role_facing_surface: true`).

## Base Branch Policy

Policy: `direct-main`
Expected PR base branch: `main`

Open all child PRs against `main` directly.
