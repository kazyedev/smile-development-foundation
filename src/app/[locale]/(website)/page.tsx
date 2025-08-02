// app/[locale]/page.tsx
import HeroSection from "@/components/website/sections/HeroSection";
import AboutSection from "@/components/website/sections/AboutSection";
import ProjectsSection from "@/components/website/sections/ProjectsSection";
import ActivitiesSection from "@/components/website/sections/ActivitiesSection";
import SuccessStoriesSection from "@/components/website/sections/SuccessStoriesSection";
import VideosSection from "@/components/website/sections/VideosSection";
import StaticSection from "@/components/website/sections/StaticSection";
import NewsSection from "@/components/website/sections/NewsSection";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-4 ">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ActivitiesSection />
      <SuccessStoriesSection />
      <VideosSection />
      <StaticSection />
      <NewsSection />
    </main>
  );
}
