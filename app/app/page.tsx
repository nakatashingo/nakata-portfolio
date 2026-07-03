import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProfileSection from "@/app/components/ProfileSection";
import ActivitiesSection from "@/app/components/ActivitiesSection";
import SkillsSection from "@/app/components/SkillsSection";
import WorksSection from "@/app/components/WorksSection";
import NewsSection from "@/app/components/NewsSection";
import { profile } from "@/app/data/profile";
import { activityEntries } from "@/app/data/activities";
import { skillCategories } from "@/app/data/skills";
import { worksItems } from "@/app/data/works";
import { newsItems } from "@/app/data/news";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ProfileSection profile={profile} />
        <ActivitiesSection entries={activityEntries} />
        <SkillsSection categories={skillCategories} />
        <WorksSection items={worksItems} />
        <NewsSection items={newsItems} />
      </main>
      <Footer socialLinks={profile.socialLinks} />
    </>
  );
}
