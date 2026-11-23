# PF-012 Implementation Packet

## Goal

Remove the hero role title ("Web Developer") and the self-introduction paragraph, and drop the role from the page description.

## Why

Owner ruling (2026-11-23): 「肩書きとこの文を消しておいて」 (the self-introduction beginning 「はじめまして、中田慎吾です。…」).

## Scope

- `app/app/components/ProfileSection.tsx`: delete the role paragraph (`<p className="hero-details …">{profile.title}</p>`) and the self-introduction paragraph (`<p …>{profile.description}</p>`). Keep the name `<h1>` (per-character reveal), the accent rule, the 「中田 慎吾」 line and the social links with their existing classes and animation order. The first remaining element after the glows is the `<h1>`; keep the hero vertically centred as today.
- `app/app/types.ts`: remove `title` and `description` from the `Profile` interface only (the other interfaces keep their own `title` / `description`).
- `app/app/data/profile.ts`: remove the `title` and `description` fields.
- `app/app/layout.tsx`: `description` and `openGraph.description` become exactly `中田慎吾（Nakata Shingo）のポートフォリオサイトです。` (titles unchanged).

## Out of scope

- Any other copy, data, style or motion change.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`; `grep -rn "profile.title\|profile.description\|Web Developer" app/app` returns nothing.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md. ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
