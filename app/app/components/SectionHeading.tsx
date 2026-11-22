import HeadingRule from "@/app/components/HeadingRule";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

// 全セクションで見出しの見た目を揃えるための共通コンポーネント
const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <h2 className="relative m-0 mb-12 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[clamp(1.75rem,3.5vw,2.25rem)] leading-[1.4] font-bold text-foreground">
    {title}
    <span className="text-base font-medium text-muted">{subtitle}</span>
    <HeadingRule />
  </h2>
);

export default SectionHeading;
