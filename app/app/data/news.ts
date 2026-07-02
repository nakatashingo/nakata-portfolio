import type { NewsItem } from "@/app/types";

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "ポートフォリオサイトをリニューアルしました！",
    date: "2025-07-24",
    content:
      "Next.jsとFramer Motionを使って、新しいポートフォリオサイトを構築しました。ぜひご覧ください。",
  },
  {
    id: 2,
    title: "Reactの学習記録 - useStateとuseEffect",
    date: "2025-07-20",
    content:
      "状態管理の基本であるuseStateと、ライフサイクルを扱うuseEffectについて学びました。コンポーネントの挙動を制御する上で非常に重要です。",
  },
  {
    id: 3,
    title: "Tailwind CSSの便利な使い方",
    date: "2025-07-15",
    content:
      "ユーティリティファーストなCSSフレームワーク、Tailwind CSSのセットアップ方法やカスタマイズについてまとめました。",
  },
];
