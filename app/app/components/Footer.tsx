import type { SocialLink } from "@/app/types";
import SocialIcon from "@/app/components/SocialIcon";

interface FooterProps {
  socialLinks: SocialLink[];
}

const Footer = ({ socialLinks }: FooterProps) => (
  <footer className="border-t border-line">
    <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-4 px-6 py-8 sm:px-8">
      <span className="text-[0.8125rem] text-muted">© 2026 Nakata Shingo</span>
      <nav className="flex gap-5">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[0.8125rem] text-muted transition-colors hover:text-accent-text"
          >
            <SocialIcon icon={social.icon} className="h-3.5 w-3.5" />
            {social.shortName ?? social.name}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
