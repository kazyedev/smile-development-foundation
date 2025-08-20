'use client';

import { use } from 'react';
import { aboutUsContent } from '@/data/aboutUsData';
import {
  HeroSection,
  OverviewSection,
  ValuesSection,
  GoalsSection,
  PrinciplesSection,
  PoliciesSection,
  PartnersSection,
  SupportersSection
} from '@/components/website/sections/about-us';

interface AboutUsPageProps {
  params: Promise<{ locale: string }>;
}

export default function AboutUsPage({ params }: AboutUsPageProps) {
  const { locale } = use(params);
  const isLocaleEnglish = locale === 'en';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        title={aboutUsContent.hero.title}
        subtitle={aboutUsContent.hero.subtitle}
        description={aboutUsContent.hero.description}
        isLocaleEnglish={isLocaleEnglish}
      />

      {/* Overview Section */}
      <OverviewSection 
        overview={aboutUsContent.overview}
        story={aboutUsContent.story}
        mission={aboutUsContent.mission}
        vision={aboutUsContent.vision}
        locale={locale}
        isLocaleEnglish={isLocaleEnglish}
      />

      {/* Values Section */}
      <ValuesSection 
        values={aboutUsContent.values}
        isLocaleEnglish={isLocaleEnglish}
      />

      {/* Goals Section */}
      <GoalsSection 
        goals={aboutUsContent.goals}
        isLocaleEnglish={isLocaleEnglish}
      />

      {/* Principles Section */}
      <PrinciplesSection 
        principles={aboutUsContent.principles}
        isLocaleEnglish={isLocaleEnglish}
      />

      {/* Policies Section */}
      <PoliciesSection 
        policies={aboutUsContent.policies}
        isLocaleEnglish={isLocaleEnglish}
      />

      {/* Partners Section */}
      <PartnersSection 
        partners={aboutUsContent.partners}
        isLocaleEnglish={isLocaleEnglish}
      />

      {/* Supporters Section */}
      <SupportersSection 
        supporters={aboutUsContent.supporters}
        isLocaleEnglish={isLocaleEnglish}
      />
    </div>
  );
}