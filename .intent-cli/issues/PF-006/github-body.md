## Goal

Add Go, Python and C# to the 言語 skills and Docker to the ツール skills.

## Why This Slice Exists Now

The site owner approved these four skills after reviewing candidates drawn from repositories they committed to.

## Current Observed State

- `app/app/data/skills.ts`: 言語 = HTML, CSS, JavaScript, TypeScript; ツール = Git, GitHub.

## Accepted Baseline You May Assume

- PF-005 is merged on `main`. Skills renders each category's `items` in array order.
- Evidence (owner commits): Go — Enomo, NUTFES-MAP, FinanSu, AR花火 API; Python — research repos; C# — Unity projects; Docker — Docker Compose setups in Enomo / NUTFES-MAP / FinanSu / AR花火.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/data/skills.ts`

Target part: `Skills: 言語 and ツール items`

## In Scope

- 言語 `items` → `["HTML", "CSS", "JavaScript", "TypeScript", "Go", "Python", "C#"]`
- ツール `items` → `["Git", "GitHub", "Docker"]`

## Out Of Scope

- The フレームワーク / ライブラリ category and any other file.
- Other candidates (Hono, Cloudflare Workers, PyTorch, Unity, Gemini/ADK, …) — not approved.

## Standalone Child Issue Contract

The PR edits only `app/app/data/skills.ts` so that 言語 ends with Go, Python, C# and ツール ends with Docker, exactly as listed above; nothing else changes and type check plus build pass.

## Acceptance Criteria

- skills.ts 言語 items are exactly ["HTML", "CSS", "JavaScript", "TypeScript", "Go", "Python", "C#"].
- skills.ts ツール items are exactly ["Git", "GitHub", "Docker"].
- The フレームワーク / ライブラリ category, category order and labels are unchanged; no other file changes.
- `npx tsc --noEmit` and `npm run build` succeed in app/, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check`.

## Related Links

- Intent node: `intents/portfolio/intent-tree/01-content.md` (Skills section)
- Previous unit: #9 (PF-005)

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
