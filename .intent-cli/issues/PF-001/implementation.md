# PF-001 Implementation Packet

## Goal

Remove the avatar / photo placeholder from the hero, and add the Agent Agency
hackathon project to Works with a link to its Zenn project page.

## Why

Operator ruling (2026-11-22): the face-photo area is not wanted at all, and
Agent Agency (5th Agentic AI Hackathon with Google Cloud) should be shown as a work.

## Scope

- `app/app/components/ProfileSection.tsx`: delete the avatar block (gradient ring,
  initial, avatarNote). Make the hero a single text column (drop the
  `flex-col-reverse md:flex-row md:justify-between` two-column arrangement).
  Keep the background grid/glow, badge, name, description, social buttons and
  scroll cue as they are.
- `app/app/types.ts`, `app/app/data/profile.ts`: remove `avatarInitial` and `avatarNote`.
- `app/app/types.ts`: add `linkLabel?: string` to `WorkItem` with a JSDoc comment in the
  file's existing Japanese comment style.
- `app/app/components/WorkCard.tsx`: render `item.linkLabel ?? "GitHubで見る"`.
- `app/app/data/works.ts`: add as the FIRST array element:
  - id: 4
  - title: "Agent Agency（第5回 Agentic AI Hackathon with Google Cloud）"
  - description: "第5回 Agentic AI Hackathon with Google Cloud にチーム「Agent Agency」として提出した作品。Slack の会話から繰り返される仕事を AI が見つけて任せ方を提案し、責任者が承認した範囲だけを AI の権限の上限として、LLM を使わないプログラムが毎回守らせる仕組みです。Cloud Run 上で Gemini と ADK を使って構築しました。"
  - tags: ["Python", "TypeScript", "Gemini", "Google Cloud"]
  - link: "https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol5/projects/2db8995cde6d77"
  - linkLabel: "Zennで見る"

## Out of scope

- Any other visual change, new dependencies, screenshots/thumbnails.
- Editing the existing three works entries.

## Verification

In `app/`: `npx tsc --noEmit`, `npm run build`. At repo root: `git diff --check`.
`grep -rn "avatar" app/app` returns nothing.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md (already written).
- ADR candidate: none.
- Diagram candidate: none.
- Docs update: none.
- Closeout learning: none; write_back_required false.
- Guide reachability (G645): no role-facing surface (`no_role_facing_surface: true`).
