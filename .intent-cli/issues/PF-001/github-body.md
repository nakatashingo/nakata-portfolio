## Goal

Remove the avatar / photo placeholder from the hero section and add the Agent Agency hackathon project to Works.

## Why This Slice Exists Now

The site owner decided the face-photo area should be removed entirely, and wants Agent Agency (5th Agentic AI Hackathon with Google Cloud) listed as a work.

## Current Observed State

- The hero (`#profile`) shows a circular avatar with the initial「慎」and the note「※ 写真差し替え予定」to the right of (desktop) / above (mobile) the text.
- Works lists three projects, and every card's link text is hard-coded to「GitHubで見る」.

## Accepted Baseline You May Assume

- Next.js 15 App Router, React 19, Tailwind CSS v4, Framer Motion; the app lives under `app/`.
- The UI redesign at commit 0f3b73b on `main` is the baseline.
- There is no test suite; type check and production build are the verification.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/components/ProfileSection.tsx app/app/components/WorkCard.tsx app/app/data/profile.ts app/app/data/works.ts app/app/types.ts`

Target part: `Hero section without avatar; Works list gains Agent Agency with a per-item link label`

## In Scope

- Delete the avatar block from `ProfileSection.tsx` and make the hero a single left-aligned text column (keep background, badge, name, description, social buttons, scroll cue).
- Remove `avatarInitial` / `avatarNote` from `Profile` type and `profile.ts`.
- Add optional `linkLabel?: string` to `WorkItem`; `WorkCard` renders `item.linkLabel ?? "GitHubで見る"`.
- Add Agent Agency as the first entry of `works.ts`:
  - id: 4
  - title: `Agent Agency（第5回 Agentic AI Hackathon with Google Cloud）`
  - description: `第5回 Agentic AI Hackathon with Google Cloud にチーム「Agent Agency」として提出した作品。Slack の会話から繰り返される仕事を AI が見つけて任せ方を提案し、責任者が承認した範囲だけを AI の権限の上限として、LLM を使わないプログラムが毎回守らせる仕組みです。Cloud Run 上で Gemini と ADK を使って構築しました。`
  - tags: `["Python", "TypeScript", "Gemini", "Google Cloud"]`
  - link: `https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol5/projects/2db8995cde6d77`
  - linkLabel: `Zennで見る`

## Out Of Scope

- Any other visual change, new dependencies, thumbnails/screenshots.
- Editing the three existing works entries.

## Standalone Child Issue Contract

The PR removes every trace of the hero avatar (markup, `avatarInitial`, `avatarNote`) so the hero is a single text column, adds an optional per-item `linkLabel` to works with a「GitHubで見る」fallback, and adds the Agent Agency entry exactly as specified above as the first work. Nothing else on the page changes, and type check plus production build pass.

## Acceptance Criteria

- The hero (#profile) renders no avatar circle, initial, or photo note at any viewport width; the remaining text column stays left-aligned within the 1080px container.
- `Profile` type and profile data no longer contain `avatarInitial` or `avatarNote`, and nothing references them.
- `WorkItem` gains an optional `linkLabel`; `WorkCard` shows it when set and falls back to「GitHubで見る」otherwise.
- `works.ts` contains the Agent Agency entry listed first, linking to the Zenn project page with linkLabel「Zennで見る」.
- The existing three works entries are unchanged in content.
- `npx tsc --noEmit` and `npm run build` succeed in `app/`, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check` and `grep -rn "avatar" app/app` (expect no output).

## Related Links

- Agent Agency (Zenn): https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol5/projects/2db8995cde6d77

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
