import { mockPrograms } from "@/data/mockPrograms";
import { mockProjects } from "@/data/mockProjects";
import { mockStories } from "@/data/mockStories";
import ProgramDetailClient from "@/components/website/programs/ProgramDetailClient";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Loading skeleton component for better UX
function ProgramDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section Skeleton */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Skeleton className="w-20 h-20 rounded-full mx-auto" />
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-1/3 mx-auto" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            
            <Skeleton className="h-8 w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ProgramDetailPageProps {
  params: Promise<{ 
    slug: string; 
    locale: string 
  }>;
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  try {
    const { slug, locale } = await params;
    
    // Validate locale
    if (!['en', 'ar'].includes(locale)) {
      notFound();
    }

    // Decode the slug and find the program
    const decodedSlug = decodeURIComponent(slug);
    const isEn = locale === "en";
    
    const program = mockPrograms.find((p) => 
      p.slugEn === decodedSlug || p.slugAr === decodedSlug
    );

    // If program not found, show 404
    if (!program) {
      notFound();
    }

    // Check if program is available in the current locale
    const isAvailableInLocale = isEn 
      ? (program as any).isEnglish !== false // Default to true if not specified
      : (program as any).isArabic !== false; // Default to true if not specified

    if (!isAvailableInLocale) {
      // Redirect to programs list if not available in current locale
      return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {isEn ? "Program Not Available" : "البرنامج غير متاح"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {isEn 
                ? "This program is not available in the selected language. Please check our programs list."
                : "هذا البرنامج غير متاح باللغة المحددة. يرجى التحقق من قائمة برامجنا."
              }
            </p>
            <a 
              href={`/${locale}/programs`}
              className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-colors"
            >
              {isEn ? "View All Programs" : "عرض جميع البرامج"}
            </a>
          </div>
        </div>
      );
    }

    // Get related content
    const relatedProjects = mockProjects.filter((p) => p.programId === program.id);
    const relatedStories = mockStories.filter((s) => s.programId === program.id);

    // Validate that we have the required data
    if (!program.titleEn || !program.titleAr || !program.descriptionEn || !program.descriptionAr) {
      console.error('Program data is incomplete:', program);
      notFound();
    }

    return (
      <Suspense fallback={<ProgramDetailSkeleton />}>
        <ProgramDetailClient 
          program={program} 
          relatedProjects={relatedProjects} 
          relatedStories={relatedStories} 
          locale={locale} 
        />
      </Suspense>
    );

  } catch (error) {
    console.error('Error in ProgramDetailPage:', error);
    
    // Fallback error UI
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">
            We encountered an error while loading this program. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProgramDetailPageProps) {
  try {
    const { slug, locale } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const program = mockPrograms.find((p) => 
      p.slugEn === decodedSlug || p.slugAr === decodedSlug
    );

    if (!program) {
      return {
        title: locale === 'en' ? 'Program Not Found' : 'البرنامج غير موجود',
        description: locale === 'en' 
          ? 'The requested program could not be found.' 
          : 'لم يتم العثور على البرنامج المطلوب.'
      };
    }

    const title = locale === 'en' ? program.titleEn : program.titleAr;
    const description = locale === 'en' 
      ? program.descriptionEn.substring(0, 160) 
      : program.descriptionAr.substring(0, 160);

    return {
      title: `${title} - Ibtisama Foundation`,
      description,
      openGraph: {
        title: `${title} - Ibtisama Foundation`,
        description,
        type: 'website',
        locale: locale,
        images: program.featuredImageUrl ? [program.featuredImageUrl] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} - Ibtisama Foundation`,
        description,
        images: program.featuredImageUrl ? [program.featuredImageUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Program - Ibtisama Foundation',
      description: 'Learn more about our programs and initiatives.',
    };
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  const params: Array<{ slug: string; locale: string }> = [];
  
  // Generate params for all programs in both languages
  mockPrograms.forEach((program) => {
    // English version
    if (program.slugEn && (program as any).isEnglish !== false) {
      params.push({
        slug: program.slugEn,
        locale: 'en'
      });
    }
    
    // Arabic version
    if (program.slugAr && (program as any).isArabic !== false) {
      params.push({
        slug: program.slugAr,
        locale: 'ar'
      });
    }
  });

  return params;
}