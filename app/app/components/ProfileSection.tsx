import type { CSSProperties } from "react";
import HeroGlow from "@/app/components/HeroGlow";
import MagneticLink from "@/app/components/MagneticLink";
import type { Profile } from "@/app/types";
import SocialIcon from "@/app/components/SocialIcon";

interface ProfileSectionProps {
  profile: Profile;
}

const ProfileSection = ({ profile }: ProfileSectionProps) => (
  <section id="profile" className="relative overflow-hidden">
    {/* 大小の柔らかな光で奥行きを作り、文字の読みやすさを保つ */}
    <HeroGlow />

    <div className="relative mx-auto flex min-h-[calc(100svh-64px)] max-w-[1080px] flex-col items-start justify-center px-6 py-20 sm:px-8">
      <p className="hero-details m-0 mb-6 text-[0.9375rem] text-muted">{profile.title}</p>
      <h1 aria-label={profile.name} className="m-0 text-[clamp(3rem,9vw,5.5rem)] leading-[1.05] font-black tracking-[-0.02em]">
        {/* 単語内をひとまとまりにし、通常の空白での折り返しを保つ */}
        {profile.name.split(/(\s)/u).map((part, partIndex, parts) => {
          const offset = Array.from(parts.slice(0, partIndex).join("")).length;
          return (
            <span key={partIndex} className={/\s/u.test(part) ? undefined : "inline-block whitespace-nowrap"}>
              {Array.from(part).map((character, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className={`hero-name-character${/\s/u.test(character) ? "" : " inline-block"}`}
                  style={{ "--i": offset + index } as CSSProperties}
                >
                  {character}
                </span>
              ))}
            </span>
          );
        })}
      </h1>
      <div aria-hidden className="hero-rule my-7 h-1 w-16 bg-accent" />
      <div className="hero-details flex w-full min-w-0 flex-col items-start gap-6">
        <p className="m-0 text-[1.125rem] text-muted">中田 慎吾</p>
        <p className="m-0 max-w-[36em] text-base leading-[1.9]">{profile.description}</p>
        <nav className="mt-2 flex flex-wrap gap-3">
          {profile.socialLinks.map((social) => (
            <MagneticLink
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-line bg-surface-alt px-4 py-2 text-[0.9375rem] font-medium text-foreground hover:border-accent hover:text-accent-text"
            >
              <SocialIcon icon={social.icon} className="h-4 w-4" />
              {social.name}
            </MagneticLink>
          ))}
        </nav>
      </div>
    </div>
  </section>
);

export default ProfileSection;
