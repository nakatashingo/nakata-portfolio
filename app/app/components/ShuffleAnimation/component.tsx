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
    },
    shuffling: {
      x: [
        Math.random() * 200 - 100,
        Math.random() * 300 - 150,
        Math.random() * 200 - 100,
        piles[index % 3] * 150 - 150,
      ],
      y: [
        Math.random() * 100 - 50,
        Math.random() * 150 - 75,
        Math.random() * 100 - 50,
        0,
      ],
      rotate: [
        Math.random() * 30 - 15,
        Math.random() * 45 - 20,
        Math.random() * 30 - 15,
        0,
      ],
    },
    piled: {
      x: piles[index % 3] * 150 - 150,
      y: 0,
      rotate: 0,
    },
  });

  const isShuffling = animationState === "shuffling";
  const isClickable = !isShuffling;

  // 関数の戻り値の型として : Transition を指定
  const transition = (index: number): Transition => ({
    duration: isShuffling ? 3 : 0.5,
    delay: isShuffling ? index * 0.05 * Math.exp(-index / 20) : 0,
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
          <div
            className={styles.cardImage}
            style={{ backgroundImage: `url(${card.image})` }}
          ></div>
        </motion.div>
      ))}
    </div>
  );
};

export default Component;