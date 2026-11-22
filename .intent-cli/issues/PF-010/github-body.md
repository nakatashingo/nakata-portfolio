## Goal

Make the portfolio feel alive even while the visitor is only reading: an ambient hero glow, a per-character name reveal, a scroll-progress line under the header, and Skills names revealed one by one.

## Why This Slice Exists Now

The site owner asked for more motion after PF-007 and chose these four of the proposed ideas.

## Current Observed State

- PF-007/PF-008 motion is in place, but it only reacts to scrolling into view or to the pointer; the page is static while idle.
- The hero name animates as one block; the hero glow moves only when a fine pointer moves; there is no scroll-progress indicator; Skills rows reveal as whole rows.

## Accepted Baseline You May Assume

- PF-008 is merged on `main`. `HeroGlow.tsx` sets an inline `transform` for pointer follow; `observeReveals` in `motion.ts` provides the hydration-safe pending/visible reveal pattern used by `RevealObserver`.
- Next.js 15 App Router, React 19, Tailwind CSS v4.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/components app/app/globals.css`

Target part: `Motion round 2: hero ambient glow, name character reveal, header scroll progress, per-skill reveal`

## In Scope

## Motion spec (architect)

General rules (same as PF-007): no new dependencies; animate only `transform` / `opacity`; content fully visible in server-rendered HTML and without JavaScript (any hidden "before" state applied only after hydration, or by CSS animations that end visible); everything static under `prefers-reduced-motion: reduce`; no layout shift; keyboard focus outlines unchanged. All existing PF-007 behaviour stays as is.

- **M1 Ambient hero glow** (`HeroGlow.tsx`, `globals.css`): wrap the existing pointer-following glow in an outer element that drifts on its own with a CSS keyframe loop (≈ 18s, ease-in-out, infinite, alternate): translate within ±48px and scale 1 → 1.12. The pointer-follow transform stays on the inner element so the two compose. Add one more, smaller and fainter glow (≈ 420×360px, `bg-accent/10`, blur ≈ 120px) near the hero's bottom-right with its own drift loop (≈ 24s, different phase) so the background gradient visibly shifts. Both drift on touch devices too (they are not pointer effects); both are static under reduced motion. Keep `overflow-hidden` on the hero so nothing causes horizontal scroll.
- **M2 Per-character name reveal** (`ProfileSection.tsx`, `globals.css`): render `profile.name` as one `<span aria-hidden="true">` per character (spaces preserved as normal spaces, wrapping unaffected) inside the `<h1>`, and give the `<h1>` `aria-label={profile.name}` so assistive tech reads the full name once. Each character animates `opacity 0→1` and `translateY(0.4em)→0` over 0.4s ease-out with delay `index × 0.035s` (CSS custom property `--i`), pure CSS so it runs without JavaScript and ends visible. This replaces the whole-word `.hero-name` animation. Shift `.hero-rule` delay to 0.5s and `.hero-details` delay to 0.7s so the sequence stays name → rule → details; durations unchanged. Under reduced motion: no animation (final state).
- **M3 Scroll progress line** (`Header.tsx` or a small client child, `globals.css`): a 2px `--accent` line along the bottom edge of the sticky header, `transform-origin: left`, whose `scaleX` equals `scrollY / (scrollHeight − innerHeight)` (clamped 0–1), updated from a passive scroll/resize listener throttled with `requestAnimationFrame`. It is decorative (`aria-hidden`). No transition is needed (it tracks scroll directly), so it also works under reduced motion. Without JavaScript it is simply not shown (scaleX 0).
- **M4 Per-skill reveal** (`SkillRows.tsx`, `motion.ts`/`RevealObserver.tsx`, `globals.css`): instead of revealing each Skills row as one block, reveal each skill name individually: when a row first enters the viewport, its `<li>` items fade `opacity 0→1` and `translateY(8px)→0` over 0.4s ease-out with a stagger of 0.04s between items in that row (the row's label `<dt>` appears with the first item). Use the existing hydration-safe pending/visible pattern so items are visible in SSR HTML, without JavaScript, and under reduced motion. Works rows keep the existing card reveal.

## Out Of Scope

- Marquee text bands, custom cursor, card border trace, hero parallax fade (offered, not chosen).
- Data, copy, colours, dependencies.

## Standalone Child Issue Contract

The PR adds the four motion behaviours M1-M4 exactly as specified above while keeping every PF-007 behaviour, using only existing dependencies, animating only transform/opacity, keeping all content visible without JavaScript and static under reduced motion, and leaving data, copy and colours unchanged; type check and build pass.

## Acceptance Criteria

- M1: the hero has two glows that drift on their own via CSS keyframe loops (≈18s and ≈24s), composing with the existing pointer follow; static under reduced motion; no horizontal scroll at 360px.
- M2: the hero h1 has aria-label equal to the name and renders one aria-hidden span per character that reveals with a 0.035s stagger via CSS only; .hero-rule and .hero-details delays are 0.5s and 0.7s; no animation under reduced motion; text visible without JavaScript.
- M3: a 2px accent progress line at the bottom of the sticky header scales with scroll position (rAF-throttled passive listener); aria-hidden.
- M4: Skills names reveal individually with a 0.04s stagger within each row when the row first enters the viewport; visible in SSR HTML, without JavaScript and under reduced motion.
- All PF-007 behaviour (active nav, timeline progress, Works reveal, heading rules, card tilt/edge light, magnetic links, glow pointer-follow) still works.
- No new dependencies; only transform/opacity are animated; no data, copy or colour changes; keyboard focus outlines still visible.
- `npx tsc --noEmit` and `npm run build` succeed in app/, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check`. The conductor runs browser checks at 1440px and 360px, with reduced motion emulated, and with JavaScript disabled.

## Related Links

- Builds on #13 (PF-007) and #15 (PF-008)
- Intent node: `intents/portfolio/intent-tree/01-content.md` (More motion, round 2)

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
