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
import { Metadata } from 'next';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';

  if (isEnglish) {
    return {
      title: 'Ibtisama Development Foundation - Creating Positive Change in Communities',
      description: 'Join our mission to create sustainable positive change in communities through education, healthcare, and social development programs. Discover our projects, activities, and success stories.',
      keywords: [
        'Ibtisama Development Foundation',
        'community development',
        'sustainable change',
        'education programs',
        'healthcare initiatives',
        'social development',
        'charity organization',
        'Yemen development',
        'community projects',
        'volunteer opportunities',
        'donation platform',
        'social impact'
      ],
      authors: [{ name: 'Ibtisama Development Foundation' }],
      creator: 'Ibtisama Development Foundation',
      publisher: 'Ibtisama Development Foundation',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://ibtisama.org'),
      alternates: {
        canonical: '/en',
        languages: {
          'en': '/en',
          'ar': '/ar',
        },
      },
      openGraph: {
        title: 'Ibtisama Development Foundation - Creating Positive Change in Communities',
        description: 'Join our mission to create sustainable positive change in communities through education, healthcare, and social development programs.',
        url: 'https://ibtisama.org/en',
        siteName: 'Ibtisama Development Foundation',
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: '/og-image-en.jpg',
            width: 1200,
            height: 630,
            alt: 'Ibtisama Development Foundation - Community Development Programs',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Ibtisama Development Foundation - Creating Positive Change',
        description: 'Join our mission to create sustainable positive change in communities through education, healthcare, and social development programs.',
        images: ['/og-image-en.jpg'],
        creator: '@ibtisama_dev',
        site: '@ibtisama_dev',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
        yahoo: 'your-yahoo-verification-code',
      },
    };
  } else {
    // Arabic locale
    return {
      title: 'مؤسسة ابتسامة للتنمية - إحداث تغيير إيجابي في المجتمعات',
      description: 'انضم إلى مهمتنا لإحداث تغيير إيجابي مستدام في المجتمعات من خلال برامج التعليم والرعاية الصحية والتنمية الاجتماعية. اكتشف مشاريعنا وأنشطتنا وقصص النجاح.',
      keywords: [
        'مؤسسة ابتسامة للتنمية',
        'تنمية المجتمع',
        'تغيير مستدام',
        'برامج التعليم',
        'مبادرات الرعاية الصحية',
        'التنمية الاجتماعية',
        'منظمة خيرية',
        'تنمية اليمن',
        'مشاريع المجتمع',
        'فرص التطوع',
        'منصة التبرع',
        'التأثير الاجتماعي'
      ],
      authors: [{ name: 'مؤسسة ابتسامة للتنمية' }],
      creator: 'مؤسسة ابتسامة للتنمية',
      publisher: 'مؤسسة ابتسامة للتنمية',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://ibtisama.org'),
      alternates: {
        canonical: '/ar',
        languages: {
          'en': '/en',
          'ar': '/ar',
        },
      },
      openGraph: {
        title: 'مؤسسة ابتسامة للتنمية - إحداث تغيير إيجابي في المجتمعات',
        description: 'انضم إلى مهمتنا لإحداث تغيير إيجابي مستدام في المجتمعات من خلال برامج التعليم والرعاية الصحية والتنمية الاجتماعية.',
        url: 'https://ibtisama.org/ar',
        siteName: 'مؤسسة ابتسامة للتنمية',
        locale: 'ar_SA',
        type: 'website',
        images: [
          {
            url: '/og-image-ar.jpg',
            width: 1200,
            height: 630,
            alt: 'مؤسسة ابتسامة للتنمية - برامج تنمية المجتمع',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'مؤسسة ابتسامة للتنمية - إحداث تغيير إيجابي',
        description: 'انضم إلى مهمتنا لإحداث تغيير إيجابي مستدام في المجتمعات من خلال برامج التعليم والرعاية الصحية والتنمية الاجتماعية.',
        images: ['/og-image-ar.jpg'],
        creator: '@ibtisama_dev',
        site: '@ibtisama_dev',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
        yahoo: 'your-yahoo-verification-code',
      },
    };
  }
}

export default async function HomePage({ params }: HomePageProps) {
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
