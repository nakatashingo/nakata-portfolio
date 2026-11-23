## Goal

Remove the hero role title ("Web Developer") and the self-introduction paragraph, and drop the role from the page description.

## Why This Slice Exists Now

The site owner asked to delete the role title and the self-introduction text from the top of the page.

## Current Observed State

- The hero shows, top to bottom: 「Web Developer」 (`profile.title`), the name, an accent rule, 「中田 慎吾」, the self-introduction 「はじめまして、中田慎吾です。…」 (`profile.description`), and social links.
- `layout.tsx` description is 「Web Developer 中田慎吾（Nakata Shingo）のポートフォリオサイトです。」.

## Accepted Baseline You May Assume

- PF-009 is merged on `main`. The hero name uses the PF-010 per-character reveal; `.hero-details` elements fade in after the rule.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/components/ProfileSection.tsx app/app/types.ts app/app/data/profile.ts app/app/layout.tsx`

Target part: `Hero without role title and self-introduction; page description without the role`

## In Scope

- `app/app/components/ProfileSection.tsx`: delete the role paragraph (`<p className="hero-details …">{profile.title}</p>`) and the self-introduction paragraph (`<p …>{profile.description}</p>`). Keep the name `<h1>` (per-character reveal), the accent rule, the 「中田 慎吾」 line and the social links with their existing classes and animation order. The first remaining element after the glows is the `<h1>`; keep the hero vertically centred as today.
- `app/app/types.ts`: remove `title` and `description` from the `Profile` interface only (the other interfaces keep their own `title` / `description`).
- `app/app/data/profile.ts`: remove the `title` and `description` fields.
- `app/app/layout.tsx`: `description` and `openGraph.description` become exactly `中田慎吾（Nakata Shingo）のポートフォリオサイトです。` (titles unchanged).

## Out Of Scope

- Any other copy, data, style or motion change.

## Standalone Child Issue Contract

The PR removes the hero role title and self-introduction (markup, type fields and data), sets the page description to 「中田慎吾（Nakata Shingo）のポートフォリオサイトです。」, and changes nothing else; type check and build pass.

## Acceptance Criteria

- The hero no longer renders the role title or the self-introduction paragraph; it shows the name h1, the accent rule, the 「中田 慎吾」 line and the social links, still vertically centred.
- Profile in types.ts has no title/description, profile.ts has no title/description, and nothing references profile.title or profile.description.
- layout.tsx description and openGraph.description are exactly 「中田慎吾（Nakata Shingo）のポートフォリオサイトです。」; titles unchanged.
- The name reveal, rule and details animations and all other motion still work; no other copy, data or style changes.
- `npx tsc --noEmit` and `npm run build` succeed in app/, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check` and `grep -rn "profile.title\|profile.description\|Web Developer" app/app` (expect no output). The conductor checks the hero at 1440px and 360px.

## Related Links

- Intent node: `intents/portfolio/intent-tree/01-content.md`
- Previous copy unit: #21 (PF-009)

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
