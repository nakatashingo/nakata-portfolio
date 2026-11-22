# PF-006 Implementation Packet

## Goal

Add Go, Python and C# to the 言語 skills and Docker to the ツール skills.

## Why

Operator ruling (2026-11-22): 「go pytho c# dockerは入れて良いものとする」.

## Scope

- app/app/data/skills.ts:
  - 言語 items → ["HTML", "CSS", "JavaScript", "TypeScript", "Go", "Python", "C#"]
  - ツール items → ["Git", "GitHub", "Docker"]

## Out of scope

- The フレームワーク / ライブラリ category; any other file.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md. ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
