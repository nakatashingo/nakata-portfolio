## Goal

Replace three description strings on the site with the versions polished with yomiyasu and approved by the site owner.

## Why This Slice Exists Now

The site owner asked to polish the site copy with yomiyasu (v3.2.3) and approved the three resulting edits.

## Current Observed State

- The 高専 activity note ends in noun fragments (「…校名変更。入学時は旧校名(…)。」).
- In the Agent Agency description it is unclear what 「守らせる」 applies to.
- The AR花火 description compresses the subject into 「…アプリのチーム開発。」.

## Accepted Baseline You May Assume

- PF-011 is merged on `main`. Strings live in `app/app/data/activities.ts` and `app/app/data/works.ts`.
- yomiyasu run: lint 0 → 0 candidates, diff meaning-risk 0, final verified (`sha256:f393032b9b09`).

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/data/activities.ts app/app/data/works.ts`

Target part: `Three description strings polished with yomiyasu`

## In Scope

- `app/app/data/activities.ts` — the `description` string that currently reads exactly:
  ```
  2022年4月、大阪公立大学の開学に伴い大阪府立大学工業高等専門学校から校名変更。入学時は旧校名(大阪府立大学工業高等専門学校)。
  ```
  becomes exactly:
  ```
  2022年4月、大阪公立大学の開学に伴い大阪府立大学工業高等専門学校から校名が変わりました。入学したときの校名は大阪府立大学工業高等専門学校です。
  ```
- `app/app/data/works.ts` — the `description` string that currently reads exactly:
  ```
  第5回 Agentic AI Hackathon with Google Cloud にチーム「Agent Agency」として提出した作品。Slack の会話から繰り返される仕事を AI が見つけて任せ方を提案し、責任者が承認した範囲だけを AI の権限の上限として、LLM を使わないプログラムが毎回守らせる仕組みです。Cloud Run 上で Gemini と ADK を使って構築しました。
  ```
  becomes exactly:
  ```
  第5回 Agentic AI Hackathon with Google Cloud にチーム「Agent Agency」として提出した作品。Slack の会話から繰り返される仕事を AI が見つけて任せ方を提案し、責任者が承認した範囲だけを AI の権限の上限にする仕組みです。この上限は、LLM を使わないプログラムが毎回 AI に守らせます。Cloud Run 上で Gemini と ADK を使って構築しました。
  ```
- `app/app/data/works.ts` — the `description` string that currently reads exactly:
  ```
  技大祭の企画局ワークショップで使っている、紙に描いた絵を花火にしてスマホの AR で打ち上げるアプリのチーム開発。ユーザー画面（React Three Fiber・AR.js）、管理者画面（Next.js）、API（Go）で構成されています。デモ画面、QR コード付きキーホルダーの PDF 生成、手描き画像の背景除去とインク検出の改善などを担当しました。
  ```
  becomes exactly:
  ```
  紙に描いた絵を花火にしてスマホの AR で打ち上げるアプリで、技大祭の企画局ワークショップで使っています。チームで開発しました。ユーザー画面（React Three Fiber・AR.js）、管理者画面（Next.js）、API（Go）で構成されています。デモ画面、QR コード付きキーホルダーの PDF 生成、手描き画像の背景除去とインク検出の改善などを担当しました。
  ```

## Out Of Scope

- The portfolio-site work description (pending the owner's decision) and every other string.

## Standalone Child Issue Contract

The PR replaces exactly these three description strings with the new texts above, character for character, and changes nothing else; type check and build pass.

## Acceptance Criteria

- In activities.ts the 高専 entry description equals the new text exactly.
- In works.ts the Agent Agency description and the AR花火 description equal the new texts exactly.
- No other string, field, file or order changes (the portfolio-site description stays as is).
- `npx tsc --noEmit` and `npm run build` succeed in app/, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check`.

## Related Links

- Intent node: `intents/portfolio/intent-tree/01-content.md` (Copy polish with yomiyasu)
- yomiyasu: https://github.com/nanaism/yomiyasu (v3.2.3)

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
