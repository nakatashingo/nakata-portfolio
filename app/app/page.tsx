"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaGithub, FaInstagram, FaXTwitter, FaNewspaper, FaPaintbrush } from "react-icons/fa6";
import LoadingScreen from "./components/LoadingScreen";

// カードごとのデータを配列で管理
// ▼▼▼ 表示するカードをプロフィールカードのみに変更 ▼▼▼
const cardsData = [
  {
    id: 1,
    type: "profile",
    name: "中田 慎吾",
    title: "Web Developer",
    description: "初めまして、中田慎吾です！最近、フロントエンドの勉強を始めました。HTML, CSSで基礎を学び、Reactの習得にも励んでいます。学習のまとめとして、ポートフォリオサイトを制作中です。",
    imageUrl: "https://placehold.jp/200x200.png",
    socialLinks: [
      { name: "GitHub", url: "https://github.com/nakatashingo", icon: <FaGithub /> },
      { name: "X (Twitter)", url: "#", icon: <FaXTwitter /> },
      { name: "Instagram", url: "#", icon: <FaInstagram /> },
    ],
  },
  // {
  //   id: 2,
  //   type: "content",
  //   title: "News",
  //   description: "最新のお知らせやブログ記事などをこちらに掲載します。日々の学習の進捗や、新しい技術についての考察などを更新していく予定です。",
  //   icon: <FaNewspaper />,
  //   link: "#news",
  // },
  // {
  //   id: 3,
  //   type: "content",
  //   title: "Works",
  //   description: "これまでに制作した作品をこちらで紹介します。Webサイトやアプリケーションなど、様々なプロジェクトを掲載予定です。",
  //   icon: <FaPaintbrush />,
  //   link: "#works",
  // },
];
// ▲▲▲ 表示するカードをプロフィールカードのみに変更 ▲▲▲

// News記事のダミーデータ
const newsItems = [
  {
    id: 1,
    title: "ポートフォリオサイトをリニューアルしました！",
    date: "2025-07-24",
    content: "Next.jsとFramer Motionを使って、新しいポートフォリオサイトを構築しました。ぜひご覧ください。",
  },
  {
    id: 2,
    title: "Reactの学習記録 - useStateとuseEffect",
    date: "2025-07-20",
    content: "状態管理の基本であるuseStateと、ライフサイクルを扱うuseEffectについて学びました。コンポーネントの挙動を制御する上で非常に重要です。",
  },
  {
    id: 3,
    title: "Tailwind CSSの便利な使い方",
    date: "2025-07-15",
    content: "ユーティリティファーストなCSSフレームワーク、Tailwind CSSのセットアップ方法やカスタマイズについてまとめました。",
  },
];

// Worksのダミーデータ
const worksItems = [
  {
    id: 1,
    title: "架空のカフェ公式サイト",
    description: "ReactとStyled-Componentsを使用して制作した、モダンなデザインのカフェのウェブサイトです。レスポンシブデザインに対応しています。",
    imageUrl: "https://placehold.jp/450x253.png?text=Cafe+Website",
    link: "#",
  },
  {
    id: 2,
    title: "Todoアプリケーション",
    description: "TypeScriptとNext.jsで構築したシンプルなTodo管理アプリです。状態管理にはZustandを利用しています。",
    imageUrl: "https://placehold.jp/450x253.png?text=Todo+App",
    link: "#",
  },
  {
    id: 3,
    title: "ポートフォリオサイト（当サイト）",
    description: "Next.js 15 (App Router), Framer Motion, TypeScript を使用して制作しました。このサイト自体が私の作品の一つです。",
    imageUrl: "https://placehold.jp/450x253.png?text=My+Portfolio",
    link: "#",
  }
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
  // この部分は現在使用されませんが、将来の拡張のために残しておきます
  return (
    <a href={(card as any).link} className="portfolio-card content-card">
      <article className="content-introduction">
        <div className="content-icon">{(card as any).icon}</div>
        <h1>{(card as any).title}</h1>
        <p>{(card as any).description}</p>
      </article>
    </a>
  );
};


// ページの本体
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className="portfolio-container" style={{ height: "100vh" }}>
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      </div>
    );
  }

  return (
    <>
      <main className="portfolio-container">
        {cardsData.map((card) => (
          <PortfolioCard key={card.id} card={card} />
        ))}
      </main>

      {/* Newsセクション */}
      <section id="news" className="portfolio-container" style={{ backgroundColor: '#1f2937', minHeight: 'auto', paddingBlock: '5rem', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '3rem', color: 'white', width: '100%', textAlign: 'center', marginBottom: '2rem' }}>News</h1>
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center'}}>
          {newsItems.map((item) => (
            <article key={item.id} className="portfolio-card" style={{flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', width: 'clamp(350px, 80%, 700px)', aspectRatio: 'auto', padding: '2rem'}}>
               <h2 style={{fontSize: '4cqw', fontWeight: 'bold'}}>{item.title}</h2>
               <time style={{fontSize: '2.5cqw', color: '#d1d5db'}}>{item.date}</time>
               <p style={{fontSize: '2.8cqw', textAlign: 'left', lineHeight: 1.6}}>{item.content}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Worksセクション */}
      <section id="works" className="portfolio-container" style={{ backgroundColor: '#111827', minHeight: 'auto', paddingBlock: '5rem', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '3rem', color: 'white', width: '100%', textAlign: 'center', marginBottom: '2rem' }}>Works</h1>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', width: '100%'}}>
          {worksItems.map((item) => (
            <a href={item.link} key={item.id} className="portfolio-card" style={{flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', gap: '0', padding: '0', textDecoration: 'none', color: 'white'}}>
              <figure>
                <Image src={item.imageUrl} alt={item.title} width={450} height={253} style={{width: '100%', height: 'auto', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', objectFit: 'cover'}} />
              </figure>
               <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                 <h2 style={{fontSize: '3.5cqw', fontWeight: 'bold', textAlign: 'left'}}>{item.title}</h2>
                 <p style={{fontSize: '2.5cqw', textAlign: 'left', lineHeight: 1.5, color: '#d1d5db', marginTop: '0.5rem', flexGrow: 1}}>{item.description}</p>
               </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}