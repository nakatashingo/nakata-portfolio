# PF-008 Implementation Packet

## Goal

Remove the Skills → 「使った作品」 popover (PF-007 B4) and its work-card highlight.

## Why

Operator ruling (2026-11-23): 「skillsのところで使った作品が表示されるのをやめて欲しいです。」

## Scope

- `SkillsSection.tsx`: drop the `worksItems` import and the `works` prop; keep `RevealObserver` and the section markup.
- `SkillRows.tsx`: render each skill as a plain `<li className="font-medium">{item}</li>` (as before PF-007) inside the existing row markup that keeps `data-reveal` and the `skill-row` grid. Remove the open state, pointer/focus/Escape/outside-click handlers, popover positioning and all popover markup. If the component no longer needs client state, it may become a server component or be folded back into `SkillsSection` — implementer's choice, but the Skills row reveal (A3) must keep working.
- `WorkCard.tsx`: remove the `highlights` Map, `highlightHash` / `highlightSameHash`, the highlight state/effect, the `work-highlight` span, and the `id="work-<id>"` / `tabIndex={-1}` attributes. Keep tilt, edge light, magnetic link and reveal exactly as they are.
- `globals.css`: remove only the B4-specific rules (`.skill-row:has([aria-expanded="true"])`, `.skill-popover`, `.work-highlight`, `.work-highlight-active`, `.work-card:target ... .work-highlight`, the reduced-motion `.work-highlight-active` rule and `@keyframes work-target-out`).

## Out of scope

- Every other PF-007 behaviour (A1-A4, B1-B3); data, copy, colours, dependencies.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`; `grep -rn "popover\|work-highlight\|worksItems" app/app/components app/app/globals.css` shows nothing related to B4.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md (Motion section). ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
