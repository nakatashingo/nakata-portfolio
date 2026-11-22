# PF-009 Implementation Packet

## Goal

Replace three description strings with the yomiyasu-polished versions the owner approved.

## Why

Owner approval (2026-11-23): 「yomiyasuの3か所は反映して良いです」.

## Scope

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

## Out of scope

- The portfolio-site description and every other string.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md. ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
