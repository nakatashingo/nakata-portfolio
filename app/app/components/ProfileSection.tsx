import type { Profile } from "@/app/types";
import SocialIcon from "@/app/components/SocialIcon";

interface ProfileSectionProps {
  profile: Profile;
}

const ProfileSection = ({ profile }: ProfileSectionProps) => (
  <section id="profile" className="relative overflow-hidden">
    {/* 左上の柔らかな光だけで奥行きを作り、文字の読みやすさを保つ */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[640px] rounded-full bg-accent/15 blur-[120px]"
    />

    <div className="relative mx-auto flex min-h-[calc(100svh-64px)] max-w-[1080px] flex-col items-start justify-center px-6 py-20 sm:px-8">
      <p className="hero-details m-0 mb-6 text-[0.9375rem] text-muted">{profile.title}</p>
      <h1 className="hero-name m-0 text-[clamp(3rem,9vw,5.5rem)] leading-[1.05] font-black tracking-[-0.02em]">
        {profile.name}
      </h1>
      <div aria-hidden className="hero-rule my-7 h-1 w-16 bg-accent" />
      <div className="hero-details flex w-full min-w-0 flex-col items-start gap-6">
        <p className="m-0 text-[1.125rem] text-muted">中田 慎吾</p>
        <p className="m-0 max-w-[36em] text-base leading-[1.9]">{profile.description}</p>
        <nav className="mt-2 flex flex-wrap gap-3">
          {profile.socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-line bg-surface-alt px-4 py-2 text-[0.9375rem] font-medium text-foreground transition-colors hover:border-accent hover:text-accent-text"
            >
              <SocialIcon icon={social.icon} className="h-4 w-4" />
              {social.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </section>
);

export default ProfileSection;
