# PF-011 Implementation Packet

## Goal

Keep the sticky header (and the PF-010 progress line on it) visible for the whole page.

## Why

Owner report (2026-11-23): the progress gauge disappears from Activities onward. Measured: at Skills/Works the header's bottom is at -743px / -1267px, i.e. the header has scrolled off, because `body { height: 100% }` caps the sticky range at one viewport (≈900px).

## Scope

- `app/app/globals.css` (`@layer base`): keep `width: 100%` for `html, body`, keep `height: 100%` on `html` only, and give `body` `min-height: 100%` instead of `height: 100%`, so the sticky header's containing block spans the whole document. Update the nearby Japanese comment if it mentions the height rule.
- `app/app/components/Header.tsx`: in the scroll-progress effect, also recompute when the document height changes (a `ResizeObserver` on `document.body`, rAF-throttled like the existing scroll/resize updates), and disconnect it in the cleanup.
- No other changes.

## Out of scope

- Any visual change to the header or the line.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`. Conductor re-measures the header position and line scale at each section.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md. ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
