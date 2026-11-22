# PF-002 Implementation Packet

## Goal

Polish the portfolio's visual design while keeping its dark + teal mood, removing template tells (section numbers, mono all-caps labels, identical cards, fade-ins everywhere) and featuring Agent Agency.

## Why

Operator ruling (2026-11-22): 「今の雰囲気を残しつついい感じに」, using Claude's design guidance.

## Scope

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

## Out of scope

- Content text changes (profile, activities, skills, works copy) beyond adding `featured: true`.
- New dependencies.

## Verification

In `app/`: `npx tsc --noEmit`, `npm run build`. Repo root: `git diff --check`. `grep -rn "Reveal\|font-mono\|uppercase\|hero-grid" app/app` returns nothing.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md (visual direction section).
- ADR / Diagram / Docs: none.
- Closeout learning: none; write_back_required false.
- Guide reachability (G645): no role-facing surface.
