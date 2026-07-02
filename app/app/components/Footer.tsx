import type { SocialLink } from "@/app/types";
import SocialIcon from "@/app/components/SocialIcon";

interface FooterProps {
  socialLinks: SocialLink[];
}

const Footer = ({ socialLinks }: FooterProps) => (
  <footer className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-4 border-t border-white/8 p-8">
    <span className="text-[0.8125rem] text-gray-500">© 2026 Shingo Nakata</span>
    <nav className="flex gap-5">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[0.8125rem] text-gray-500 transition-colors hover:text-accent"
        >
          <SocialIcon icon={social.icon} className="h-3.5 w-3.5" />
          {social.shortName ?? social.name}
        </a>
      ))}
    </nav>
  </footer>
);

export default Footer;
