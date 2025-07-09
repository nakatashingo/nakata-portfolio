interface Card {
  id: number;
  image: string;
}

interface ShuffleAnimationProps {
  cards: Card[];
  onAnimationEnd: () => void;
  // クリックイベントはローディングでは使わないため削除またはコメントアウトしてもOK
  onCardClick: (id: number) => void; 
  animationState: "initial" | "shuffling" | "piled";
}