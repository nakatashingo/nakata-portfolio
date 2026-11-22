import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

// 和文と欧文を一つの書体に揃え、日本語を主役にする
const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "中田慎吾 | Portfolio",
  description: "Web Developer 中田慎吾のポートフォリオサイトです。",
  openGraph: {
    title: "中田慎吾 | Portfolio",
    description: "Web Developer 中田慎吾のポートフォリオサイトです。",
    type: "website",
    locale: "ja_JP",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body className={`${zenKaku.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
