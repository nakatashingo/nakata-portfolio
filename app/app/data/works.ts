import type { WorkItem } from "@/app/types";

export const worksItems: WorkItem[] = [
  {
    id: 1,
    title: "架空のカフェ公式サイト",
    description:
      "架空のカフェをテーマに制作したウェブサイト。React記法に慣れることを目標に、Styled-Componentsでコンポーネント単位のスタイル管理を意識しました。レスポンシブデザインに対応。",
    tags: ["React", "Styled-Components"],
    link: null,
  },
  {
    id: 2,
    title: "Todoアプリケーション",
    description:
      "TypeScriptとNext.jsで構築したシンプルなTodo管理アプリ。状態管理にZustandを導入し、propsのバケツリレーを減らす設計を学びました。",
    tags: ["TypeScript", "Next.js", "Zustand"],
    link: null,
  },
  {
    id: 3,
    title: "ポートフォリオサイト（当サイト）",
    description:
      "Next.js 15 (App Router) と Framer Motion を使用して制作。ローディング時のシャッフルアニメーションなど、細かいUIの動きにもこだわりました。このサイト自体が作品の一つです。",
    tags: ["Next.js", "Framer Motion", "TypeScript"],
    link: "https://github.com/nakatashingo",
  },
];
