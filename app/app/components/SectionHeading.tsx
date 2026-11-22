import Reveal from "@/app/components/Reveal";

interface SectionHeadingProps {
  /** セクション番号(例: "01")。見出し上の小さなラベルに使う */
  index: string;
  title: string;
  subtitle: string;
}

// 全セクションで見出しの見た目を揃えるための共通コンポーネント
const SectionHeading = ({ index, title, subtitle }: SectionHeadingProps) => (
  <Reveal className="mb-12">
    <p className="m-0 mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
      <span>{index}</span>
      <span className="h-px w-10 bg-accent/50" />
      <span>{subtitle}</span>
    </p>
    <h2 className="m-0 text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-[-0.03em]">{title}</h2>
  </Reveal>
);

export default SectionHeading;
