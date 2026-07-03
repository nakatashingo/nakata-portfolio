import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProfileSection from "@/app/components/ProfileSection";
import ActivitiesSection from "@/app/components/ActivitiesSection";
import SkillsSection from "@/app/components/SkillsSection";
import WorksSection from "@/app/components/WorksSection";
import { profile } from "@/app/data/profile";
import { activityEntries } from "@/app/data/activities";
import { skillCategories } from "@/app/data/skills";
import { worksItems } from "@/app/data/works";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ProfileSection profile={profile} />
        <ActivitiesSection entries={activityEntries} />
        <SkillsSection categories={skillCategories} />
        <WorksSection items={worksItems} />
      </main>
      <Footer socialLinks={profile.socialLinks} />
    </>
  );
}
