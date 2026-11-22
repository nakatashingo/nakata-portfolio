## Goal

Add calm scroll-linked motion and pointer-reactive touches to the portfolio, including a Skills → Works link that shows which works used each skill.

## Why This Slice Exists Now

The site owner wants the site to feel more alive and chose proposal A (scroll-linked) + B (pointer-reactive), without a fireworks motif.

## Current Observed State

- The only motion is the hero's one-time load animation (CSS keyframes in `globals.css`).
- Header nav has no current-section indicator; timeline, Skills and Works are fully static; Skills items are plain text with no link to Works.

## Accepted Baseline You May Assume

- PF-006 is merged on `main`. Next.js 15 App Router, React 19, Tailwind CSS v4; `framer-motion` is installed but unused.
- All components are currently server components; adding small client components is expected.
- Works tags and Skills items are plain strings in `app/app/data/works.ts` and `app/app/data/skills.ts`.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/components app/app/globals.css`

Target part: `Motion: active nav, timeline progress, reveals, heading rules, card tilt, magnetic links, hero glow, skill-to-works popover`

## In Scope

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

## Out Of Scope

- Data files (`app/app/data/*`), copy, colours, typography, layout structure.
- Device-orientation effects, fireworks/particles, a page-load splash.

## Standalone Child Issue Contract

The PR adds the eight motion behaviours A1-A4 and B1-B4 exactly as specified above, using only existing dependencies, animating only transform/opacity, keeping all content visible without JavaScript, disabling motion under reduced-motion and pointer effects on touch devices, and leaving data, copy and visual design otherwise unchanged; type check and build pass.

## Acceptance Criteria

- A1: the current section's nav link has aria-current="true" and a sliding accent underline; updates while scrolling.
- A2: an accent progress line over the Activities timeline grows with scroll and dots light as it passes; full static timeline under reduced motion or without JS.
- A3: Skills rows and Works cards reveal once on entering the viewport with a 0.08s stagger; content is visible in server-rendered HTML.
- A4: each section heading shows a 48px accent rule that draws in once on entering the viewport; static under reduced motion.
- B1: work cards tilt (max 4deg) and show a pointer-following accent edge glow on fine pointers only, resetting on leave.
- B2: hero social pills and Works links move up to 6px toward the pointer on fine pointers only, via one reusable component/hook.
- B3: the hero glow eases toward the pointer inside the hero on fine pointers only; static on touch and under reduced motion; no device-orientation API.
- B4: skills that exactly match a work tag are buttons opening an accessible 「使った作品」 popover with links to #work-<id>; cards have id work-<id> and highlight for 1.2s when targeted; non-matching skills stay plain text; no data files change.
- Under prefers-reduced-motion: reduce, A1-A4 and B1-B3 render static final states; B4 works without animation.
- No new dependencies; only transform/opacity are animated; no horizontal scroll at 360px; keyboard focus outlines still visible.
- `npx tsc --noEmit` and `npm run build` succeed in app/, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check`. The conductor also checks screenshots at 1440px and 390px and with reduced motion emulated.

## Related Links

- Intent node: `intents/portfolio/intent-tree/01-content.md` (Motion section)
- Previous design unit: #3 (PF-002)

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
