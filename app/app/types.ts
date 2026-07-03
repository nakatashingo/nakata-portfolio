// --- プロフィール ---
export type SocialIconKey = "github" | "x" | "instagram";

export interface SocialLink {
  name: string;
  /** フッターなど、より短い表記が欲しい場所で使う省略ラベル(未指定なら name を使う) */
  shortName?: string;
  icon: SocialIconKey;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  description: string;
  avatarInitial: string;
  avatarNote: string;
  socialLinks: SocialLink[];
}

// --- Activities(経歴)セクション ---
export interface ActivityEntry {
  id: number;
  /** 例: "2023.04 -" や "2022.04 - 2023.03" */
  period: string;
  title: string;
  /** 学歴 / その他活動(サークル・受賞・資格など) の区別。タイムライン上のドット色分けに使用 */
  category: "education" | "activity";
  description?: string;
}

// --- Skillsセクション ---
export interface SkillCategory {
  label: string;
  items: string[];
}

// --- Newsセクション ---
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

// --- Worksセクション ---
export interface WorkItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
}
