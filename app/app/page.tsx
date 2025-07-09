"use client"; // useState, useEffect を使うため

import Image from "next/image";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState, useEffect } from "react";
import LoadingScreen from "@/app/components/LoadingScreen"; // 作成したコンポーネントをインポート

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // LoadingScreenコンポーネントから呼ばれる関数
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // ローディング画面を表示する場合
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // ローディング完了後、ポートフォリオ本体を表示
  return (
    <div className="app">
      <div className="card">
        <div className="Introduction">
          <div className="myName">
            <p>中田　慎吾</p>
          </div>
          <div className="subName">
            <p>フロントエンド勉強中</p>
          </div>
          <div className="description">
            <p>初めまして，中田慎吾です！最近，フロントエンドの勉強を始めました．HTML，CSSで基礎を学び，Reactの習得にも励んでいます．学習のまとめとして，ポートフォリオサイトを制作中です．</p>
          </div>
          <div className="contactIcons">
            <div className="contactIconImage">
              <a href="https://github.com/nakatashingo" target="_blank" rel="noopener noreferrer"><FaGithub color="FFFFFF" size="60%"/></a>
            </div>
            <div className="contactIconImage">
              <a target="_blank" rel="noopener noreferrer"><FaXTwitter color="FFFFFF" size="60%"/></a>
            </div>
            <div className="contactIconImage">
              <a target="_blank" rel="noopener noreferrer"><FaInstagram color="FFFFFF" size="60%"/></a>
            </div>
          </div>
        </div>
        <div className="myIcon">
          {/* Next.jsのImageコンポーネントの利用を推奨します */}
          <Image src="https://placehold.jp/200x200.png" alt="My Icon" width={200} height={200} style={{ borderRadius: '100%' }} />
        </div>
      </div>
    </div>
  );
}