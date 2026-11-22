## Goal

Add AR花火 (the mobile/web app in NUTFes/ar-hanabi-mobile) to the Works section.

## Why This Slice Exists Now

The site owner asked to add the AR Hanabi mobile project to Works. It is a public team repository where the owner is the second-largest committer (107 commits).

## Current Observed State

- Works lists four items (Agent Agency, this portfolio, Enomo, NUTFES-MAP), all at the same size; AR花火 is not listed.

## Accepted Baseline You May Assume

- PF-004 is merged on `main`; no works are featured.
- Description facts come from the repository README and the owner's own commits (demo screen, QR-code keychain PDF generation, background removal and ink detection for hand-drawn images, QR scanning in the settings panel, a Go API endpoint).

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/data/works.ts`

Target part: `Works list gains the AR Hanabi entry`

## In Scope

Insert this entry as the second element of `worksItems` (directly after the Agent Agency entry), exactly as written:

```ts
  {
    id: 5,
    title: "AR花火（技大祭 企画局ワークショップ）",
    description:
      "技大祭の企画局ワークショップで使っている、紙に描いた絵を花火にしてスマホの AR で打ち上げるアプリのチーム開発。ユーザー画面（React Three Fiber・AR.js）、管理者画面（Next.js）、API（Go）で構成されています。デモ画面、QR コード付きキーホルダーの PDF 生成、手描き画像の背景除去とインク検出の改善などを担当しました。",
    tags: ["TypeScript", "React Three Fiber", "AR.js", "Go"],
    link: "https://github.com/NUTFes/ar-hanabi-mobile",
  },
```

## Out Of Scope

- Any other file, any change to existing entries, adding `featured` or `linkLabel`.

## Standalone Child Issue Contract

The PR adds exactly the AR花火 entry above to `app/app/data/works.ts` as the second work, leaving every existing entry and every other file unchanged; type check and build pass.

## Acceptance Criteria

- works.ts contains a new entry with id 5 placed second in the array (directly after Agent Agency), whose fields match the In Scope block exactly.
- The new entry has no `featured` and no `linkLabel` (so the card shows the default 「GitHubで見る」).
- All existing entries are unchanged in content and relative order; no other file changes.
- `npx tsc --noEmit` and `npm run build` succeed in app/, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check`.

## Related Links

- Source project: https://github.com/NUTFes/ar-hanabi-mobile
- Intent node: `intents/portfolio/intent-tree/01-content.md` (AR花火 section)

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
