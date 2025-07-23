"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaGithub, FaInstagram, FaXTwitter, FaNewspaper, FaPaintbrush } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";

// カードごとのデータ
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
];

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
  return null;
};


// ページの本体
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // ローディング完了時の処理
  const handleLoadingComplete = () => {
    setIsLoading(false);
    // ローディング画面が消えるアニメーションと競合しないよう、少し遅れてアニメーションを開始
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  };

  // メインコンテナ（プロフィールカード）のアニメーション設定
  const mainContainerVariants = {
    center: {
      alignItems: 'center',
      minHeight: '100vh',
      paddingTop: '2rem',
    },
    top: {
      alignItems: 'flex-start',
      minHeight: 'auto',
      paddingTop: '10rem',
      transition: {
        duration: 1.0,
        ease: 'easeInOut'
      }
    }
  };

  // NewsとWorksセクションのコンテナ用アニメーション設定
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2 // 子要素を順番に表示
      }
    }
  };
  
    // NewsとWorksセクション内の各カードのアニメーション設定
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }

  return (
    <>
      {/* ローディングスクリーン */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="portfolio-container"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 100, // 最前面に表示
              backgroundColor: 'var(--background)'
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen onLoadingComplete={handleLoadingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* プロフィールカード */}
      <motion.main
        className="portfolio-container"
        variants={mainContainerVariants}
        initial="center"
        animate={isLoaded ? "top" : "center"}
      >
        {cardsData.map((card) => (
          <PortfolioCard key={card.id} card={card} />
        ))}
      </motion.main>
      
      {/* News & Works セクション */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            {/* Newsセクション */}
            <motion.section
              id="news"
              className="portfolio-container"
              style={{ backgroundColor: '#1f2937', minHeight: 'auto', paddingBlock: '5rem', flexDirection: 'column' }}
            >
              <h1 style={{ fontSize: '3rem', color: 'white', width: '100%', textAlign: 'center', marginBottom: '2rem' }}>News</h1>
              <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center'}}>
                {newsItems.map((item) => (
                  <motion.article
                    key={item.id}
                    className="portfolio-card"
                    style={{flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', width: 'clamp(350px, 80%, 700px)', aspectRatio: 'auto', padding: '2rem'}}
                    variants={itemVariants}
                  >
                     <h2 style={{fontSize: '4cqw', fontWeight: 'bold'}}>{item.title}</h2>
                     <time style={{fontSize: '2.5cqw', color: '#d1d5db'}}>{item.date}</time>
                     <p style={{fontSize: '2.8cqw', textAlign: 'left', lineHeight: 1.6}}>{item.content}</p>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            {/* Worksセクション */}
            <motion.section
              id="works"
              className="portfolio-container"
              style={{ backgroundColor: '#111827', minHeight: 'auto', paddingBlock: '5rem', flexDirection: 'column' }}
            >
              <h1 style={{ fontSize: '3rem', color: 'white', width: '100%', textAlign: 'center', marginBottom: '2rem' }}>Works</h1>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', width: '100%'}}>
                {worksItems.map((item) => (
                  <motion.a
                    href={item.link}
                    key={item.id}
                    className="portfolio-card"
                    style={{flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', gap: '0', padding: '0', textDecoration: 'none', color: 'white'}}
                    variants={itemVariants}
                  >
                    <figure>
                      <Image src={item.imageUrl} alt={item.title} width={450} height={253} style={{width: '100%', height: 'auto', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', objectFit: 'cover'}} />
                    </figure>
                     <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                       <h2 style={{fontSize: '3.5cqw', fontWeight: 'bold', textAlign: 'left'}}>{item.title}</h2>
                       <p style={{fontSize: '2.5cqw', textAlign: 'left', lineHeight: 1.5, color: '#d1d5db', marginTop: '0.5rem', flexGrow: 1}}>{item.description}</p>
                     </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}