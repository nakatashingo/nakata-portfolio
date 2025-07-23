interface Card {
  id: number;
}

interface ShuffleAnimationProps {
  cards: Card[];
  onAnimationEnd: () => void;
  // クリックイベントはローディングでは使わないため削除またはコメントアウトしてもOK
  onCardClick: (id: number) => void; 
  animationState: "initial" | "shuffling" | "piled";
}