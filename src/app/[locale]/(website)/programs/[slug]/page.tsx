import ProgramDetailClient from "@/components/website/programs/ProgramDetailClient";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Program } from "@/types/program";
import { Project } from "@/types/project";

// Helper functions to fetch data from APIs
async function fetchProgram(slug: string): Promise<Program | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/programs/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch program');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching program:', error);
    return null;
  }
}

async function fetchProjectsByProgram(programSlug: string): Promise<Project[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/programs/${encodeURIComponent(programSlug)}/projects`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      // If the specific endpoint fails, return empty array (program might not have projects)
      return [];
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching program projects:', error);
    return [];
  }
}

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

    // Decode the slug and fetch the program
    const decodedSlug = decodeURIComponent(slug);
    const isEn = locale === "en";
    
    // Fetch program and its linked projects in parallel
    const [program, linkedProjects] = await Promise.all([
      fetchProgram(decodedSlug),
      fetchProjectsByProgram(decodedSlug)
    ]);

    // If program not found, show 404
    if (!program) {
      notFound();
    }

    // Validate that we have the required data
    if (!program.titleEn || !program.titleAr || !program.descriptionEn || !program.descriptionAr) {
      console.error('Program data is incomplete:', program);
      notFound();
    }

    // Use the directly linked projects (already filtered by program_id in the API)
    const relatedProjects = linkedProjects.slice(0, 6); // Limit to 6 related projects

    // For now, we'll use empty stories array since we don't have stories in the database yet
    const relatedStories: any[] = [];

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
    const program = await fetchProgram(decodedSlug);

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
      title: `${title} - Smile Development Foundation`,
      description,
      openGraph: {
        title: `${title} - Smile Development Foundation`,
        description,
        type: 'website',
        locale: locale,
        images: program.featuredImageUrl ? [program.featuredImageUrl] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} - Smile Development Foundation`,
        description,
        images: program.featuredImageUrl ? [program.featuredImageUrl] : [],
      },
      keywords: locale === 'en' ? program.keywordsEn?.join(', ') : program.keywordsAr?.join(', '),
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Program - Smile Development Foundation',
      description: 'Learn more about our programs and initiatives.',
    };
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    // Fetch all programs from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/programs`);
    if (!response.ok) {
      console.error('Failed to fetch programs for static generation');
      return [];
    }
    
    const data = await response.json();
    const programs = data.items || [];
    
    const params: Array<{ slug: string; locale: string }> = [];
    
    // Generate params for all programs in both languages
    programs.forEach((program: Program) => {
      // English version
      if (program.slugEn) {
        params.push({
          slug: program.slugEn,
          locale: 'en'
        });
      }
      
      // Arabic version
      if (program.slugAr) {
        params.push({
          slug: program.slugAr,
          locale: 'ar'
        });
      }
    });

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}