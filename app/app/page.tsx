import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProfileSection from "@/app/components/ProfileSection";
import CareerSection from "@/app/components/CareerSection";
import SkillsSection from "@/app/components/SkillsSection";
import WorksSection from "@/app/components/WorksSection";
import NewsSection from "@/app/components/NewsSection";
import { profile } from "@/app/data/profile";
import { careerEntries } from "@/app/data/career";
import { skillCategories } from "@/app/data/skills";
import { worksItems } from "@/app/data/works";
import { newsItems } from "@/app/data/news";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ProfileSection profile={profile} />
        <CareerSection entries={careerEntries} />
        <SkillsSection categories={skillCategories} />
        <WorksSection items={worksItems} />
        <NewsSection items={newsItems} />
      </main>
      <Footer socialLinks={profile.socialLinks} />
    </>
  );
}
