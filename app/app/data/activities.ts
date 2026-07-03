import type { ActivityEntry } from "@/app/types";

/**
 * Activities(経歴)セクションのデータ(実データ)。
 * 資格・受賞・サークル・学会・ハッカソン参加など(category: "activity")が別途あれば、この配列に追加してください。
 * - period: "2023.04 -" のような表記、または "2022.04 - 2023.03" のような期間表記
 * - category: "education"(学歴) または "activity"(その他の活動)
 * - description: 補足したい場合のみ記載(任意)
 * 古い項目ほど上に来るよう、日付の古い順に並べています。idは1から順番に振ってください。
 */
export const activityEntries: ActivityEntry[] = [
  {
    id: 1,
    period: "2025.03",
    title: "大阪公立大学工業高等専門学校 総合工学システム学科 電子情報コース 卒業",
    category: "education",
    description:
      "2022年4月、大阪公立大学の開学に伴い大阪府立大学工業高等専門学校から校名変更。入学時は旧校名(大阪府立大学工業高等専門学校)。",
  },
  {
    id: 2,
    period: "2025.04 -",
    title: "長岡技術科学大学 工学部 工学課程 情報経営システム工学分野 3年次編入学",
    category: "education",
  },
  {
    id: 3,
    period: "2025.04 -",
    title: "技大祭実行委員会情報局（NUTMEG）所属",
    category: "activity",
  },
  {
    id: 4,
    period: "2025.09 -",
    title: "機械学習理論研究室 所属",
    category: "education",
  },
];
