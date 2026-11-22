# PF-003 Implementation Packet

## Goal

Show the site owner's name as "Nakata Shingo" everywhere it is displayed as a name.

## Why

Operator ruling (2026-11-22): 「中田 慎吾ではなくNakata Shingoにして」.

## Scope

- app/app/data/profile.ts: `name: "Nakata Shingo"` (leave `description` untouched).
- app/app/components/ProfileSection.tsx: the secondary line `Shingo Nakata` becomes `中田 慎吾`.
- app/app/components/Header.tsx: brand text `Nakata Shingo`.
- app/app/components/Footer.tsx: `© 2026 Nakata Shingo`.
- app/app/layout.tsx: title/openGraph.title `Nakata Shingo | Portfolio`; description/openGraph.description `Web Developer 中田慎吾（Nakata Shingo）のポートフォリオサイトです。`

## Out of scope

- Any styling change; the self-introduction prose.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`; `grep -rn "Shingo Nakata" app/app` empty.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md. ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
