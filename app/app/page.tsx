import Image from "next/image";
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

// 表示するデータをオブジェクトとして管理
const portfolioData = {
  name: "中田 慎吾",
  title: "Web Developer",
  description: "初めまして、中田慎吾です！最近、フロントとエンドの勉強を始めました。HTML, CSSで基礎を学び、Reactの習得にも励んでいます。学習のまとめとして、ポートフォリオサイトを制作中です。",
  imageUrl: "https://placehold.jp/200x200.png", // 画像URLは適宜変更してください
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/nakatashingo",
      icon: <FaGithub />, // sizeプロパティを削除
    },
    {
      name: "X (Twitter)",
      url: "#", // ご自身のURLを入力してください
      icon: <FaXTwitter />, // sizeプロパティを削除
    },
    {
      name: "Instagram",
      url: "#", // ご自身のURLを入力してください
      icon: <FaInstagram />, // sizeプロパティを削除
    },
  ],
};

// ポートフォリオカード部分をコンポーネントとして分離
const PortfolioCard = () => (
  <section className="portfolio-card">
    <article className="introduction">
      <h1>{portfolioData.name}</h1>
      <h2>{portfolioData.title}</h2>
      <p>{portfolioData.description}</p>
      <nav className="social-icons">
        {portfolioData.socialLinks.map((social) => (
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
        src={portfolioData.imageUrl}
        alt="My Icon"
        width={200} // widthとheightはCSSで制御するためこの値は使われませんが、必須プロパティなので残します
        height={200}
      />
    </figure>
  </section>
);


// ページの本体
export default function Home() {
  return (
    <main className="portfolio-container">
      <PortfolioCard />
    </main>
  );
}