// app/[locale]/page.tsx
// import HeroSection from "@/components/website/sections/HeroSection";
// import AboutSection from "@/components/website/sections/AboutSection";
import ProjectsSection from "@/components/website/sections/ProjectsSection";
import ActivitiesSection from "@/components/website/sections/ActivitiesSection";
import SuccessStoriesSection from "@/components/website/sections/SuccessStoriesSection";
import VideosSection from "@/components/website/sections/VideosSection";
import StaticSection from "@/components/website/sections/StaticSection";
import NewsSection from "@/components/website/sections/NewsSection";
import PrimaryCarousel from "@/components/website/carousels/PrimaryCarousel";
import { mockPrimaryCarouselCards } from "@/data/mockPrimaryCarouselCards";
import WhoWeAreSection from "@/components/website/sections/WhoWeAreSection";

import { mockWhoWeAreSection } from "@/data/mockWhoWeAreSection";

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  return (
    <main className="flex flex-col gap-4 ">
      <PrimaryCarousel locale={locale} cards={mockPrimaryCarouselCards} />
      {/* <HeroSection /> */}
      {/* <AboutSection locale={locale} /> */}
      <WhoWeAreSection {...mockWhoWeAreSection} locale={locale} />
      <ProjectsSection locale={locale} />
      <ActivitiesSection locale={locale} />
      <SuccessStoriesSection locale={locale} />
      <VideosSection locale={locale} />
      <StaticSection locale={locale} />
      <NewsSection locale={locale} />
    </main>
  );
}
