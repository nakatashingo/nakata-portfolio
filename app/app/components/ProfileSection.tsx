import type { Profile } from "@/app/types";
import Reveal from "@/app/components/Reveal";
import SocialIcon from "@/app/components/SocialIcon";

interface ProfileSectionProps {
  profile: Profile;
}

const ProfileSection = ({ profile }: ProfileSectionProps) => (
  <section id="profile" className="relative overflow-hidden">
    {/* 背景: うっすらしたグリッドとアクセント色のにじみ */}
    <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
    <div
      aria-hidden
      className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
    />

    <div className="relative mx-auto flex min-h-[calc(100svh-64px)] max-w-[1080px] flex-col items-start justify-center px-6 py-20 sm:px-8">
      <Reveal className="flex max-w-[600px] flex-col gap-6">
        <p className="m-0 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.title}
        </p>
        <h1 className="m-0 text-[clamp(2.75rem,8vw,4.75rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
          {profile.name}
          <span className="mt-3 block bg-gradient-to-r from-accent to-emerald-200 bg-clip-text text-[clamp(1.125rem,2.4vw,1.5rem)] font-semibold tracking-[-0.01em] text-transparent">
            Shingo Nakata
          </span>
        </h1>
        <p className="m-0 text-base leading-[1.9] text-gray-300">{profile.description}</p>
        <nav className="mt-2 flex flex-wrap gap-3">
          {profile.socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              <SocialIcon icon={social.icon} className="h-4 w-4" />
              {social.name}
            </a>
          ))}
        </nav>
      </Reveal>
    </div>

    <a
      href="#activities"
      aria-label="次のセクションへ"
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.6875rem] tracking-[0.2em] text-gray-500 uppercase transition-colors hover:text-accent md:flex"
    >
      Scroll
      <span className="h-8 w-px animate-pulse bg-current" />
    </a>
  </section>
);

export default ProfileSection;
