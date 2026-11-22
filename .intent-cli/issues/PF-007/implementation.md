# PF-007 Implementation Packet

## Goal

Add calm scroll-linked motion (A1-A4) and pointer-reactive touches (B1-B4) to the portfolio.

## Why

Operator ruling (2026-11-22): 「もっと動きがある感じに」→「案A+Bで実装して」 (no fireworks motif).

## Motion spec (architect)

General rules (apply to every item):
- No new dependencies. `framer-motion` is already installed and may be used; plain React hooks + CSS are equally fine.
- Animate only `transform` / `opacity` (and CSS custom properties driving them). Pointer/scroll handlers are `passive` and throttled with `requestAnimationFrame`.
- Content must be fully visible and usable when JavaScript has not run (SSR HTML) — a hidden "before reveal" state may only be applied after hydration (e.g. a class/attribute set in `useEffect`), never in server-rendered markup.
- Under `prefers-reduced-motion: reduce`: every item below renders its final, static state (no transitions, no pointer effects), except B4 which still works without animation.
- Pointer effects (B1–B3) run only when `(hover: hover) and (pointer: fine)` matches; on touch devices they are inert.
- Keep keyboard focus outlines working; no layout shift (CLS) from any effect.

### A. Scroll-linked (calm)

- **A1 Active nav indicator** (`Header`): track which of `#profile #activities #skills #works` is current (IntersectionObserver). The current link gets `aria-current="true"`, foreground colour, and a 2px `--accent` underline that slides horizontally between links (transform/width transition 0.3s). Header becomes a client component (or wraps a small client child).
- **A2 Timeline progress** (`ActivitiesSection`): overlay a 1px `--accent` line on the existing `border-line` timeline whose `scaleY` (origin top) follows scroll progress through the `<ol>` (0 when the list top reaches 70% of the viewport height, 1 when the list bottom does). Each dot gets a lit state (ring `0 0 0 4px rgb(18 168 156 / .25)`, 0.3s) once the progress line passes it. Reduced motion / no JS: full line and all dots shown as today (no lit ring needed).
- **A3 Staggered reveal** (`SkillsSection` rows, `WorksSection` cards): when an item first enters the viewport (once), fade `opacity 0→1` and `translateY 16px→0` over 0.5s ease-out, stagger 0.08s between siblings.
- **A4 Heading rule** (`SectionHeading`): a 48px × 2px `--accent` rule below each `<h2>` that scales `scaleX 0→1` (origin left, 0.5s) when the heading first enters the viewport. Static (full width) under reduced motion / no JS. Keep `SectionHeading` usable from server components (put the observer in a small client child).

### B. Pointer-reactive (texture)

- **B1 Work card tilt + edge light** (`WorkCard`): on pointer move over a card, rotate up to ±4deg (rotateX/rotateY with `perspective(800px)`) toward the pointer, and show a soft radial `--accent` glow (≈ 240px radius, ≤ 18% opacity) on the card's top border/edge that follows the pointer x position. Reset smoothly (0.4s) on leave. Give non-featured cards enough padding/border context that the glow reads (e.g. glow on the existing `border-t`).
- **B2 Magnetic links**: hero social pills and each Works link move toward the pointer by at most 6px while hovered (proportional to pointer offset from centre), springing back on leave (0.3s). Implement once as a reusable client component/hook.
- **B3 Hero glow follows pointer** (`ProfileSection`): the existing top-left glow eases (lerp ≈ 0.08 per frame) toward the pointer position inside the hero; returns to its original position when the pointer leaves the hero. Touch / reduced motion: stays where it is today. No device-orientation API.
- **B4 Skill → works popover** (`SkillsSection` + `WorksSection`): a skill item whose name exactly equals (case-sensitive) a tag in at least one work becomes a `<button type="button">` with `aria-expanded` and `aria-controls`. Hover (fine pointer) or focus or click/tap opens a small popover under it (bg `--surface`, 1px `--line` border, 0.8125rem text) titled 「使った作品」 listing those works' titles as links to `#work-<id>`. Escape, outside click, or moving focus/pointer away closes it; only one popover open at a time. Skills with no matching work stay plain text (no affordance). Every `WorkCard` root gets `id="work-<id>"`; when navigated to via such a link (or any `#work-` hash), the card shows a highlight (`--accent` 1px outline + soft glow) that fades out after 1.2s (static outline for 1.2s under reduced motion).
  - Expected matches with current data: TypeScript, Go, Python, Docker, Next.js, Framer Motion. Do not change any data file to create more matches.

## Out of scope

- Data files (`app/app/data/*`), copy, colours, typography, layout structure.
- Device-orientation effects, fireworks/particles, page-load splash.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`. Conductor checks screenshots at 1440px and 390px, and with reduced motion emulated.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md (Motion section). ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
