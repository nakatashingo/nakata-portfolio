## Goal

Polish the portfolio's visual design while keeping its dark + teal mood: Japanese-first typography, structure only where content has structure, a single hero motion moment, and Agent Agency featured in Works.

## Why This Slice Exists Now

The site owner asked to make the design better while keeping the current atmosphere. The PF-001 baseline still carries generic template traits (numbered mono all-caps eyebrows, identical rounded cards, numbered work thumbnails that are not a sequence, fade-up on every section, grid backdrop).

## Current Observed State

- Section headings are「01 ── 学歴・活動 / Activities」with monospace uppercase eyebrows.
- Skills are three identical rounded cards; Works cards have gradient thumbnails numbered 01–04.
- Every section fades up on scroll via `Reveal`; the hero has a grid pattern and a Scroll cue.
- Fonts: Geist, Geist Mono, Noto Sans JP.

## Accepted Baseline You May Assume

- PF-001 is merged on `main`: no hero avatar, `WorkItem.linkLabel` exists, Agent Agency is the first works entry.
- Next.js 15 App Router, React 19, Tailwind CSS v4, Framer Motion. No test suite; type check and build are the verification.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/globals.css app/app/layout.tsx app/app/components app/app/data/works.ts app/app/types.ts`

Target part: `Design tokens, typography, section layouts and hero motion of the single-page portfolio`

## In Scope

Everything in the design spec below.

## Design spec (architect, derived with the frontend-design guidance)

Subject / audience / job: a student engineer (高専 → 長岡技大, 機械学習理論研究室) who builds web apps and agentic AI systems. Readers are recruiters, hackathon peers and lab members. The page's job: in one scroll, show who he is and what he has built, with the hackathon work most visible.

### Tokens (replace the values in `app/app/globals.css` `:root`; keep the token names used by components, add the new ones)

| token | value | use |
|---|---|---|
| `--background` | `#0c1716` | page (dark ink with a teal undertone, replaces #0a0a0a) |
| `--surface-alt` | `#11201e` | alternate band (Skills section), header blur base |
| `--surface` | `#162a28` | featured work panel |
| `--line` | `#22403c` | hairlines, borders, timeline line |
| `--foreground` | `#e7efed` | body text |
| `--muted` | `#93a9a5` | secondary text (AA on all backgrounds above) |
| `--accent` | `#12a89c` | brand teal: rules, dots, focus ring, large text only |
| `--accent-text` | `#4fd1c3` | teal for small text (dates, tags, links) — AA on `--background` |

Remove `--card-gradient-start/end` and the `.hero-grid` class if nothing uses them after the change. Register new tokens in `@theme inline` as `--color-line`, `--color-accent-text`.

### Type

- One family: **Zen Kaku Gothic New** via `next/font/google` (weights 400, 500, 700, 900; `subsets: ["latin"]`, `variable: "--font-zen-kaku"`). Remove Geist, Geist_Mono and Noto_Sans_JP from `layout.tsx`; `--font-sans` points to the new variable. No monospace anywhere on the page.
- Scale (rem): 0.8125 meta · 0.9375 body-small · 1 body (line-height 1.9) · 1.25 h3 · clamp(1.75rem, 3.5vw, 2.25rem) h2 · clamp(3rem, 9vw, 5.5rem) hero name (weight 900, tracking -0.02em, line-height 1.05).
- Dates use `tabular-nums`. No all-caps text, no letter-spaced labels, no `→` appended to link text.
- Body text measure ≤ 36em (about 36 Japanese characters per line at 1rem is fine; cap description blocks at `max-w-[36em]`).

### Layout (single 1080px column, everything left-aligned; nothing centered except nothing)

```
[Header]  中田 慎吾              Profile Activities Skills Works   (blur bar, unchanged behaviour)

[Hero]    Web Developer                       ← small muted text, no pill
          中田 慎吾                            ← huge, 900
          ━━━━━━                               ← 64px teal rule, draws in once
          Shingo Nakata                        ← muted, 1.125rem
          description (max 36em)
          [GitHub] [X] [Instagram]             ← existing pill links, keep
          (keep one soft teal glow top-left; remove grid pattern and Scroll cue)

[Activities]  Activities  学歴・活動           ← h2 English + muted JP on the same baseline
              ● 学歴  ○ 活動                   ← legend once, replaces per-item badge
              timeline (keep structure; dates tabular-nums in --accent-text, not mono)

[Skills band]  Skills  使用技術
              言語                 HTML  CSS  JavaScript  TypeScript
              ──────────────────────────────────────────────
              フレームワーク…       React  Next.js …
              ──────────────────────────────────────────────
              ツール               Git  GitHub
              (definition-list rows: label column 12rem on md+, stacked on mobile;
               hairline --line between rows; no cards, no shadows)

[Works]   Works  制作物
          ┌──────────── featured (full width, --surface bg, 1px --line border) ─────────┐
          │ Agent Agency（…）   h3 1.5rem                                               │
          │ description                                  tags                         │
          │ Zennで見る (underlined link)                                                │
          └────────────────────────────────────────────────────────────────────────────┘
          other works: 2-column grid on md (1 on mobile), each item = top 1px --line rule,
          title, description, tags, link. No thumbnails, no numbers, no card background,
          no hover lift. Link underline thickens / colour shifts on hover only.

[Footer]  unchanged structure, colours from tokens
```

### Section heading component

Rewrite `SectionHeading` to `({ title, subtitle })`: `<h2>` with `title` in foreground and `subtitle` as a muted `<span>` after it (same line, smaller, weight 500). Drop the `index` prop and every call site's index.

### Motion

- Delete `Reveal.tsx` and every use of it. Sections render statically.
- The only autoplay motion: on page load the hero name fades in (opacity 0→1, y 12→0, 0.6s), then the teal rule scales from 0 to full width (transform-origin left, 0.5s, delay 0.35s), then the rest of the hero fades in (delay 0.6s). Implement with Framer Motion in a small client component (e.g. `HeroIntro.tsx`) or CSS keyframes — implementer's choice.
- Wrap it so `prefers-reduced-motion: reduce` shows the final state with no animation (Framer `useReducedMotion` or a CSS media query).

### Data

- `WorkItem` gains `featured?: boolean`. Agent Agency (PF-001's entry) gets `featured: true`. `WorksSection` renders featured items first in the full-width style and the rest in the grid.

### Quality floor

- Visible keyboard focus on every link: `focus-visible:outline-2 outline-offset-4 outline-accent` (global rule in `@layer base` for `a:focus-visible` is fine).
- No horizontal scroll at 360px width.

## Out Of Scope

- Changing any copy (profile, activities, skills, works text) other than adding `featured: true` to Agent Agency.
- New dependencies.

## Standalone Child Issue Contract

The PR restyles the existing single page to the design spec in this issue: new color tokens and the Zen Kaku Gothic New typeface, a SectionHeading without index numbers, no `Reveal` fade-ins, a hero with a single load animation that respects reduced motion, a timeline with one legend, Skills as divided rows, and Works with Agent Agency featured full width and the rest in a quiet two-column list. Copy stays as is, and type check plus production build pass.

## Acceptance Criteria

- globals.css :root defines exactly the token values in the Design spec table; card-gradient tokens and .hero-grid are removed if unused.
- layout.tsx loads only Zen Kaku Gothic New (400/500/700/900) and the page contains no monospace text, no all-caps labels, and no section index numbers.
- SectionHeading takes { title, subtitle } and every section uses it; Reveal.tsx is deleted and unreferenced.
- Hero matches the spec: no grid pattern, no Scroll cue, one teal glow, name + teal rule + romanized name + description + social links, left-aligned.
- The hero intro animation is the only autoplay motion and is skipped under prefers-reduced-motion: reduce.
- Activities keeps the timeline with a single legend instead of per-item category badges; dates use tabular-nums.
- Skills renders as divided definition-list rows (no cards, no shadows).
- Works renders featured items (Agent Agency, featured: true) full width on --surface, and the others in a 2-column md grid without thumbnails, numbers, card backgrounds or hover lift.
- Every link shows a visible focus-visible outline; no horizontal scroll at 360px.
- `npx tsc --noEmit` and `npm run build` succeed in app/, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check` and `grep -rn "Reveal\|font-mono\|uppercase\|hero-grid" app/app` (expect no output).

## Related Links

- Depends on #1 (PF-001)

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
