"use client";

// motion, Variants に加えて Transition をインポート
import { motion, Variants, Transition } from "framer-motion"; 
import styles from "./styles.module.css";

const Component = ({
  cards,
  onAnimationEnd,
  onCardClick,
  animationState,
}: ShuffleAnimationProps) => {
  const totalCards = cards.length;
  const piles = [0, 1, 2];

  const handleAnimationComplete = (index: number) => {
    if (animationState !== "shuffling") return;

    if (index === totalCards - 1) {
      onAnimationEnd();
    }
  };

  const variants = (index: number): Variants => ({
    initial: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 0, // 初期状態をスケール0に
    },
    shuffling: {
      x: [
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200,
        0,
      ],
      y: [
        Math.random() * 200 - 100,
        Math.random() * 300 - 150,
        Math.random() * 200 - 100,
        0,
      ],
      rotate: [
        Math.random() * 30 - 15,
        Math.random() * 45 - 20,
        Math.random() * 30 - 15,
        0,
      ],
      scale: 0.8, // シャッフル中は少し小さく
    },
    piled: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1, // 最終的に元のサイズに
    },
  });

  const isShuffling = animationState === "shuffling";
  const isClickable = !isShuffling;

  // 関数の戻り値の型として : Transition を指定
  const transition = (index: number): Transition => ({
    duration: isShuffling ? 3 : 0.5,
    delay: isShuffling ? index * 0.02 : 0, // シンプルなディレイに変更
    ease: "easeInOut",
  });

  return (
    <div className={styles.shuffleContainer}>
      {cards.map((card, index) => (
        <motion.div
          animate={animationState}
          className={`${styles.card} ${isClickable ? styles.clickable : ""}`}
          initial="initial"
          key={card.id}
          onClick={() => isClickable && onCardClick(card.id)}
          onAnimationComplete={() => handleAnimationComplete(index)}
          transition={transition(index)}
          variants={variants(index)}
        >
          {/* 子要素を空にして無地のカードにする */}
        </motion.div>
      ))}
    </div>
  );
};

export default Component;