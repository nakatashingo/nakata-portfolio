import type { WorkItem } from "@/app/types";

export const worksItems: WorkItem[] = [
  {
    id: 1,
    title: "ポートフォリオサイト（当サイト）",
    description:
      "Next.js 15 (App Router) と Framer Motion を使用して制作。ローディング時のシャッフルアニメーションなど、細かいUIの動きにもこだわりました。このサイト自体が作品の一つです。",
    tags: ["Next.js", "Framer Motion", "TypeScript"],
    link: "https://github.com/nakatashingo",
  },
  {
    id: 2,
    title: "Enomo（技育CAMPハッカソン）",
    description:
      "技育CAMPハッカソンでチーム開発したプロジェクト。Go製のAPIとTypeScript製のフロントエンド、DBをDocker Composeで構成し、複数人でのブランチ運用・PRレビューを経験しました。",
    tags: ["Go", "TypeScript", "Docker"],
    link: "https://github.com/developEnomo/Enomo",
  },
  {
    id: 3,
    title: "NUTFES-MAP（技大祭案内アプリ）",
    description:
      "NUTMEGハッカソンで開発した、技大祭の企画詳細や待ち時間を確認できるマップアプリ。",
    tags: ["Go", "TypeScript"],
    link: "https://github.com/legend-of-nobu/NUTFES-MAP",
  },
];
