import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages でホストできるよう、サイトを静的ファイルとして out/ にビルドする。
  output: "export",
};

export default nextConfig;
