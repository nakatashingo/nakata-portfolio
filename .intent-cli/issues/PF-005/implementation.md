# PF-005 Implementation Packet

## Goal

Add AR花火 (NUTFes/ar-hanabi-mobile) to Works.

## Why

Operator ruling (2026-11-22): 「AR花火のモバイルの方を入れておいて」.

## Scope

Insert this entry as the second element of `worksItems` in app/app/data/works.ts (right after the Agent Agency entry):

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

## Out of scope

- Any other file; any change to existing entries; adding `featured` or `linkLabel`.

## Verification

In app/: `npx tsc --noEmit`, `npm run build`; repo root: `git diff --check`.

## Knowledge Maintenance (G461, optional)

- Intent placement: intents/portfolio/intent-tree/01-content.md. ADR/Diagram/Docs: none. Closeout learning: none.
- Guide reachability (G645): no role-facing surface.
