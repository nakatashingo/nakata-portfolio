## Goal

Show every work in the Works section at the same size, with no featured item.

## Why This Slice Exists Now

The site owner asked to list all works at the same size. Agent Agency was featured full width only because of a design default in PF-002 (#3), not an owner decision.

## Current Observed State

- `app/app/data/works.ts` sets `featured: true` on the Agent Agency entry, so it renders full width on a surface panel above the other three works.

## Accepted Baseline You May Assume

- PF-003 is merged on `main`; Next.js 15 App Router + Tailwind v4 under `app/`.
- `WorksSection` renders featured items first and the rest in a `grid-cols-1 md:grid-cols-2` grid; with no featured items everything goes into that grid.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/data/works.ts`

Target part: `Works list: no featured item`

## In Scope

- Delete the line `featured: true,` from the Agent Agency entry in `app/app/data/works.ts`.

## Out Of Scope

- Removing the `featured` support from `types.ts`, `WorksSection.tsx`, `WorkCard.tsx` (kept on purpose).
- Reordering works or changing any copy.

## Standalone Child Issue Contract

The PR removes only the `featured: true` line from the Agent Agency entry so that all four works render at the same size in the shared two-column grid; no other file or field changes, and type check plus build pass.

## Acceptance Criteria

- `works.ts` contains no `featured` property on any item; all other fields and the item order are unchanged.
- The `featured` support in `types.ts`, `WorksSection.tsx` and `WorkCard.tsx` is left as is (no other file changes).
- With no featured items, all four works render in the same two-column (md) grid at the same size.
- `npx tsc --noEmit` and `npm run build` succeed in `app/`, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check` and `grep -n featured app/app/data/works.ts` (expect no output).

## Related Links

- Introduced by #3 (PF-002)
- Intent node: `intents/portfolio/intent-tree/01-content.md` (Works presentation section)

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
