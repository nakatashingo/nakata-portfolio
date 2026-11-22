# PF-010 Implementation Packet

## Goal

Make the page feel alive even when idle: ambient hero glow, per-character name reveal, header scroll progress, per-skill reveal.

## Why

Operator ruling (2026-11-23): 「もっと動きがある感じにして欲しい」→「おすすめの4つで実装して」.

## Motion spec (architect)

General rules (same as PF-007): no new dependencies; animate only `transform` / `opacity`; content fully visible in server-rendered HTML and without JavaScript (any hidden "before" state applied only after hydration, or by CSS animations that end visible); everything static under `prefers-reduced-motion: reduce`; no layout shift; keyboard focus outlines unchanged. All existing PF-007 behaviour stays as is.

- **M1 Ambient hero glow** (`HeroGlow.tsx`, `globals.css`): wrap the existing pointer-following glow in an outer element that drifts on its own with a CSS keyframe loop (≈ 18s, ease-in-out, infinite, alternate): translate within ±48px and scale 1 → 1.12. The pointer-follow transform stays on the inner element so the two compose. Add one more, smaller and fainter glow (≈ 420×360px, `bg-accent/10`, blur ≈ 120px) near the hero's bottom-right with its own drift loop (≈ 24s, different phase) so the background gradient visibly shifts. Both drift on touch devices too (they are not pointer effects); both are static under reduced motion. Keep `overflow-hidden` on the hero so nothing causes horizontal scroll.
- **M2 Per-character name reveal** (`ProfileSection.tsx`, `globals.css`): render `profile.name` as one `<span aria-hidden="true">` per character (spaces preserved as normal spaces, wrapping unaffected) inside the `<h1>`, and give the `<h1>` `aria-label={profile.name}` so assistive tech reads the full name once. Each character animates `opacity 0→1` and `translateY(0.4em)→0` over 0.4s ease-out with delay `index × 0.035s` (CSS custom property `--i`), pure CSS so it runs without JavaScript and ends visible. This replaces the whole-word `.hero-name` animation. Shift `.hero-rule` delay to 0.5s and `.hero-details` delay to 0.7s so the sequence stays name → rule → details; durations unchanged. Under reduced motion: no animation (final state).
- **M3 Scroll progress line** (`Header.tsx` or a small client child, `globals.css`): a 2px `--accent` line along the bottom edge of the sticky header, `transform-origin: left`, whose `scaleX` equals `scrollY / (scrollHeight − innerHeight)` (clamped 0–1), updated from a passive scroll/resize listener throttled with `requestAnimationFrame`. It is decorative (`aria-hidden`). No transition is needed (it tracks scroll directly), so it also works under reduced motion. Without JavaScript it is simply not shown (scaleX 0).
- **M4 Per-skill reveal** (`SkillRows.tsx`, `motion.ts`/`RevealObserver.tsx`, `globals.css`): instead of revealing each Skills row as one block, reveal each skill name individually: when a row first enters the viewport, its `<li>` items fade `opacity 0→1` and `translateY(8px)→0` over 0.4s ease-out with a stagger of 0.04s between items in that row (the row's label `<dt>` appears with the first item). Use the existing hydration-safe pending/visible pattern so items are visible in SSR HTML, without JavaScript, and under reduced motion. Works rows keep the existing card reveal.

## Out of scope

- Marquee text bands, custom cursor, card border trace, hero parallax fade (offered, not chosen).
- Data, copy, colours, dependencies.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`. Conductor runs browser checks (desktop, 360px, reduced motion, JS disabled).

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md. ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
