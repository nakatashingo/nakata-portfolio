import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { SocialIconKey } from "@/app/types";

const ICONS: Record<SocialIconKey, IconType> = {
  github: FaGithub,
  x: FaXTwitter,
  instagram: FaInstagram,
};

interface SocialIconProps {
  icon: SocialIconKey;
  className?: string;
}

const SocialIcon = ({ icon, className }: SocialIconProps) => {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden />;
};

export default SocialIcon;
