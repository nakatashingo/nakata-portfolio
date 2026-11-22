# PF-004 Implementation Packet

## Goal

Show every work at the same size by removing `featured: true` from the Agent Agency entry.

## Why

Operator ruling (2026-11-22): 「全作品を同じ大きさで並べて」. The featured treatment was an architect default in PF-002, not an owner decision.

## Scope

- app/app/data/works.ts: delete the line `featured: true,` from the Agent Agency entry.

## Out of scope

- Removing the `featured` mechanism from types.ts / WorksSection.tsx / WorkCard.tsx (kept so the owner can re-enable it with one line).
- Reordering works or changing any copy.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`; `grep -n featured app/app/data/works.ts` empty.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md. ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
