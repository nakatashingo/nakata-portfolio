import type { Profile } from "@/app/types";
import Reveal from "@/app/components/Reveal";

interface ProfileSectionProps {
  profile: Profile;
}

const ProfileSection = ({ profile }: ProfileSectionProps) => (
  <section id="profile" className="mx-auto flex max-w-[1080px] items-center justify-center px-8 pb-22 pt-24">
    <Reveal className="w-full">
      <div className="card-surface flex w-full flex-wrap items-center gap-14 p-8 sm:p-14">
        <div className="flex basis-full flex-col gap-4 sm:min-w-70 sm:basis-0 sm:flex-[2]">
          <h1 className="m-0 text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-[-0.02em] text-white">
            {profile.name}
          </h1>
          <h2 className="m-0 text-[1.0625rem] font-medium text-white/75">{profile.title}</h2>
          <p className="m-0 text-base leading-[1.8] text-white/90">{profile.description}</p>
          <nav className="mt-2 flex flex-wrap gap-5">
            {profile.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.9375rem] font-medium text-white transition-opacity hover:opacity-80"
              >
                {social.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex basis-full flex-col items-center gap-2.5 sm:min-w-45 sm:basis-0 sm:flex-1">
          <div className="flex h-32 w-32 sm:h-50 sm:w-50 items-center justify-center rounded-full border border-dashed border-white/40 bg-white/12">
            <span className="text-4xl sm:text-[3.25rem] font-extrabold text-white/50">{profile.avatarInitial}</span>
          </div>
          <span className="text-xs text-white/60">{profile.avatarNote}</span>
        </div>
      </div>
    </Reveal>
  </section>
);

export default ProfileSection;
