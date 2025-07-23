import Image from "next/image";
// アイコン名を正しく修正
import { FaGithub, FaInstagram, FaXTwitter, FaNewspaper, FaPaintbrush } from "react-icons/fa6";

// カードごとのデータを配列で管理
const cardsData = [
  {
    id: 1,
    type: "profile", 
    name: "中田 慎吾",
    title: "Web Developer",
    description: "初めまして、中田慎吾です！最近、フロントとエンドの勉強を始めました。HTML, CSSで基礎を学び、Reactの習得にも励んでいます。学習のまとめとして、ポートフォリオサイトを制作中です。",
    imageUrl: "https://placehold.jp/200x200.png",
    socialLinks: [
      { name: "GitHub", url: "https://github.com/nakatashingo", icon: <FaGithub /> },
      { name: "X (Twitter)", url: "#", icon: <FaXTwitter /> },
      { name: "Instagram", url: "#", icon: <FaInstagram /> },
    ],
  },
  {
    id: 2,
    type: "content",
    title: "News",
    description: "最新のお知らせやブログ記事などをこちらに掲載します。日々の学習の進捗や、新しい技術についての考察などを更新していく予定です。",
    icon: <FaNewspaper />, 
    link: "#", 
  },
  {
    id: 3,
    type: "content",
    title: "Works",
    description: "これまでに制作した作品をこちらで紹介します。Webサイトやアプリケーションなど、様々なプロジェクトを掲載予定です。",
    // こちらも正しく修正しました
    icon: <FaPaintbrush />, 
    link: "#", 
  },
];

// propsの型定義
interface PortfolioCardProps {
  card: (typeof cardsData)[0];
}

// ポートフォリオカードコンポーネント
const PortfolioCard = ({ card }: PortfolioCardProps) => {
  // プロフィールカードの場合
  if (card.type === "profile") {
    return (
      <div className="portfolio-card">
        <article className="introduction">
          <h1>{card.name}</h1>
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <nav className="social-icons">
            {card.socialLinks?.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </nav>
        </article>
        <figure className="profile-icon">
          <Image
            src={card.imageUrl!} 
            alt="My Icon"
            width={200}
            height={200}
          />
        </figure>
      </div>
    );
  }

  // News, Worksなどのコンテンツカードの場合
  return (
    <a href={card.link} className="portfolio-card content-card">
      <article className="content-introduction">
        <div className="content-icon">{card.icon}</div>
        <h1>{card.title}</h1>
        <p>{card.description}</p>
      </article>
    </a>
  );
};


// ページの本体
export default function Home() {
  return (
    <main className="portfolio-container">
      {cardsData.map((card) => (
        <PortfolioCard key={card.id} card={card} />
      ))}
    </main>
  );
}