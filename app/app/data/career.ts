import type { CareerEntry } from "@/app/types";

/**
 * 経歴セクションのデータ(ダミー)。
 * 以下は仮の項目です。ご自身の学歴・サークル/資格/受賞歴などに書き換えてください。
 * - period: "2023.04 -" のような表記、または "2022.04 - 2023.03" のような期間表記
 * - category: "education"(学歴) または "activity"(その他の活動)
 * - description: 補足したい場合のみ記載(任意)
 * 新しい項目ほど上に来るよう、日付の新しい順に並べるのがおすすめです。
 */
export const careerEntries: CareerEntry[] = [
  {
    id: 1,
    period: "2025.04 -",
    title: "◯◯大学 情報工学部 情報工学科 3年次",
    category: "education",
    description: "Webアプリケーション開発を中心に、フロントエンド技術を独学で学習中。",
  },
  {
    id: 2,
    period: "2024.10",
    title: "学内ハッカソン 優秀賞",
    category: "activity",
    description: "チームでのアイデアソン・開発を経験し、短期間でのプロトタイピング力を磨いた。",
  },
  {
    id: 3,
    period: "2024.06",
    title: "基本情報技術者試験 合格",
    category: "activity",
  },
  {
    id: 4,
    period: "2023.04 - 2025.03",
    title: "プログラミングサークル 所属",
    category: "activity",
    description: "週1回の勉強会運営や、部内での小規模開発プロジェクトに参加。",
  },
  {
    id: 5,
    period: "2023.04",
    title: "◯◯大学 情報工学部 情報工学科 入学",
    category: "education",
  },
];
