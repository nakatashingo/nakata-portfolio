## Goal

Keep the sticky header, and the scroll-progress line on it, visible for the whole page.

## Why This Slice Exists Now

The site owner reported that the header's progress gauge disappears from the Activities section onward.

## Current Observed State

- Measured on `main` (1440×900, Playwright): the header stays at the top at Profile and Activities, but at Skills its bottom edge is at -743px and at Works at -1267px, so the whole header, its progress line and the active-nav underline have scrolled off screen.
- Cause: `@layer base { html, body { width: 100%; height: 100%; } }` in `globals.css` fixes `body` to one viewport height, which caps the sticky header's range at about 900px.

## Accepted Baseline You May Assume

- PF-010 is merged on `main`. The header is `sticky top-0` as the first child of `body`; the progress line is an absolutely positioned `.scroll-progress` span updated from scroll/resize listeners in `Header.tsx`.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/globals.css app/app/components/Header.tsx`

Target part: `Sticky header range (body height) and progress-line recompute on height change`

## In Scope

- `app/app/globals.css` (`@layer base`): keep `width: 100%` for `html, body`, keep `height: 100%` on `html` only, and give `body` `min-height: 100%` instead of `height: 100%`, so the sticky header's containing block spans the whole document. Update the nearby Japanese comment if it mentions the height rule.
- `app/app/components/Header.tsx`: in the scroll-progress effect, also recompute when the document height changes (a `ResizeObserver` on `document.body`, rAF-throttled like the existing scroll/resize updates), and disconnect it in the cleanup.
- No other changes.

## Out Of Scope

- Any visual change to the header or the progress line.
- Any other component or data.

## Standalone Child Issue Contract

The PR replaces `body`'s fixed `height: 100%` with `min-height: 100%` so the sticky header stays visible across the whole document, and makes the progress line also recompute when the document height changes; nothing else changes and type check plus build pass.

## Acceptance Criteria

- html, body keep width:100%; only html keeps height:100%; body uses min-height:100% (no height:100%).
- With the page scrolled to Activities, Skills, Works and the bottom, the sticky header stays at the top of the viewport and its progress line is visible with scaleX matching scroll progress (≈1 at the bottom).
- The progress line also updates when the document height changes (ResizeObserver on document.body, rAF-throttled, disconnected on cleanup).
- No other layout changes: hero still fills the first viewport, no horizontal scroll at 360px, all PF-007/PF-010 motion still works.
- `npx tsc --noEmit` and `npm run build` succeed in app/, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check`. The conductor re-measures the header position and the line's scale at each section and at the bottom.

## Related Links

- Progress line added in #17 (PF-010)
- Intent node: `intents/portfolio/intent-tree/01-content.md` (Sticky header bug)

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
