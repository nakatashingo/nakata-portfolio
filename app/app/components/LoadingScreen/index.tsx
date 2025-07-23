"use client"; // useState, useEffect を使うため

import ShuffleAnimation from "@/app/components/ShuffleAnimation";
import { useState, useEffect } from "react";

// ローディング完了を通知するためのPropsを追加
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [animationState, setAnimationState] = useState<
    "initial" | "shuffling" | "piled"
  >("initial");
  
  // 表示するカードの枚数
  const cardCount = 78;
  const [cards] = useState<Card[]>(
    Array.from({ length: cardCount }, (_, i) => ({
      id: i + 1,
    }))
  );

  // ページが表示されたら自動でアニメーションを開始する
  useEffect(() => {
    setAnimationState("shuffling");
  }, []);

  /**
   * アニメーションが終わったら呼ばれる関数
   */
  const handleAnimationEnd = () => {
    setAnimationState("piled");
    // アニメーション完了後、少し待ってから親コンポーネントに通知
    setTimeout(() => {
      onLoadingComplete();
    }, 500); // 0.5秒待つ
  };

  return (
    <ShuffleAnimation
      cards={cards}
      onAnimationEnd={handleAnimationEnd}
      onCardClick={() => {}} // ローディング中はクリック操作不要
      animationState={animationState}
    />
  );
};

export default LoadingScreen;