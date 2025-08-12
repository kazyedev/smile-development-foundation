// app/[locale]/page.tsx
import HeroSection from "@/components/website/sections/HeroSection";
import AboutSection from "@/components/website/sections/AboutSection";
import ProjectsSection from "@/components/website/sections/ProjectsSection";
import ActivitiesSection from "@/components/website/sections/ActivitiesSection";
import SuccessStoriesSection from "@/components/website/sections/SuccessStoriesSection";
import VideosSection from "@/components/website/sections/VideosSection";
import StaticSection from "@/components/website/sections/StaticSection";
import NewsSection from "@/components/website/sections/NewsSection";

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  return (
    <main className="flex flex-col gap-4 ">
      <HeroSection />
      <AboutSection locale={locale} />
      <ProjectsSection locale={locale} />
      <ActivitiesSection locale={locale} />
      <SuccessStoriesSection locale={locale} />
      <VideosSection locale={locale} />
      <StaticSection locale={locale} />
      <NewsSection locale={locale} />
    </main>
  );
}
