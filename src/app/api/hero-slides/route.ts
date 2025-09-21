import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { heroSlides } from '@/lib/db/schema/heroSlides';
import { projects } from '@/lib/db/schema/projects';
import { programs } from '@/lib/db/schema/programs';
import { successStories } from '@/lib/db/schema/successStories';
import { activities } from '@/lib/db/schema/activities';
import { news } from '@/lib/db/schema/news';
import { eq, desc, and } from 'drizzle-orm';

// Helper function to generate URL based on slide type and locale
function generateSlideUrl(slideType: string, referenceId: number | null, slug: string, locale: string): string {
  const baseUrl = locale === 'en' ? '' : '/ar';
  
  switch (slideType) {
    case 'project':
      return `${baseUrl}/projects/${slug}`;
    case 'program':
      return `${baseUrl}/programs/${slug}`;
    case 'success_story':
      return `${baseUrl}/success-stories/${slug}`;
    case 'activity':
      return `${baseUrl}/activities/${slug}`;
    case 'news':
      return `${baseUrl}/news/${slug}`;
    default:
      return '#';
  }
}

// Helper function to get reference data based on slide type
async function getReferenceData(db: any, slideType: string, referenceId: number | null, locale: string) {
  if (!referenceId) return null;
  
  try {
    switch (slideType) {
      case 'project':
        const project = await db.select().from(projects).where(eq(projects.id, referenceId)).limit(1);
        return project[0] ? {
          slug: locale === 'en' ? project[0].slugEn : project[0].slugAr,
          title: locale === 'en' ? project[0].titleEn : project[0].titleAr
        } : null;
        
      case 'program':
        const program = await db.select().from(programs).where(eq(programs.id, referenceId)).limit(1);
        return program[0] ? {
          slug: locale === 'en' ? program[0].slugEn : program[0].slugAr,
          title: locale === 'en' ? program[0].titleEn : program[0].titleAr
        } : null;
        
      case 'success_story':
        const story = await db.select().from(successStories).where(eq(successStories.id, referenceId)).limit(1);
        return story[0] ? {
          slug: locale === 'en' ? story[0].slugEn : story[0].slugAr,
          title: locale === 'en' ? story[0].titleEn : story[0].titleAr
        } : null;
        
      case 'activity':
        const activity = await db.select().from(activities).where(eq(activities.id, referenceId)).limit(1);
        return activity[0] ? {
          slug: locale === 'en' ? activity[0].slugEn : activity[0].slugAr,
          title: locale === 'en' ? activity[0].titleEn : activity[0].titleAr
        } : null;
        
      case 'news':
        const newsItem = await db.select().from(news).where(eq(news.id, referenceId)).limit(1);
        return newsItem[0] ? {
          slug: locale === 'en' ? newsItem[0].slugEn : newsItem[0].slugAr,
          title: locale === 'en' ? newsItem[0].titleEn : newsItem[0].titleAr
        } : null;
        
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error fetching reference data for ${slideType}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'en';
    const slideType = searchParams.get('type') || 'normal';
    const limit = parseInt(searchParams.get('limit') || '10');

    // Fetch published hero slides ordered by sort_order
    const db = database();
    let slides = await db
      .select()
      .from(heroSlides)
      .where(eq(heroSlides.isPublished, true))
      .orderBy(heroSlides.sortOrder, desc(heroSlides.createdAt))
      .limit(limit);

    // Transform slides to match PrimaryCarouselCard interface with dynamic URLs
    const transformedSlides = await Promise.all(
      slides.map(async (slide) => {
        let linkUrlEn = slide.linkUrlEn || '#';
        let linkUrlAr = slide.linkUrlAr || '#';
        let linkTextEn = slide.linkTextEn || 'Learn More';
        let linkTextAr = slide.linkTextAr || 'اعرف أكثر';

        // If slide has a reference ID and type, generate dynamic URLs and text
        if (slide.slideType !== 'normal' && slide.referenceId) {
          const referenceData = await getReferenceData(db, slide.slideType, slide.referenceId, locale);
          
          if (referenceData) {
            linkUrlEn = generateSlideUrl(slide.slideType, slide.referenceId, referenceData.slug, 'en');
            linkUrlAr = generateSlideUrl(slide.slideType, slide.referenceId, referenceData.slug, 'ar');
            
            // Generate appropriate link text based on slide type
            switch (slide.slideType) {
              case 'project':
                linkTextEn = 'View Project';
                linkTextAr = 'عرض المشروع';
                break;
              case 'program':
                linkTextEn = 'View Program';
                linkTextAr = 'عرض البرنامج';
                break;
              case 'success_story':
                linkTextEn = 'Read Story';
                linkTextAr = 'اقرأ القصة';
                break;
              case 'activity':
                linkTextEn = 'View Activity';
                linkTextAr = 'عرض النشاط';
                break;
              case 'news':
                linkTextEn = 'Read News';
                linkTextAr = 'اقرأ الخبر';
                break;
            }
          }
        }

        return {
          id: slide.id,
          titleEn: slide.titleEn,
          titleAr: slide.titleAr,
          descriptionEn: slide.captionEn,
          descriptionAr: slide.captionAr,
          locationEn: slide.locationEn || '',
          locationAr: slide.locationAr || '',
          imageUrl: slide.featuredImageUrl,
          linkTextEn,
          linkTextAr,
          linkUrlEn,
          linkUrlAr,
          isPublished: slide.isPublished,
          publishedAt: slide.publishedAt,
          createdAt: slide.createdAt,
          updatedAt: slide.updatedAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: transformedSlides,
      total: transformedSlides.length,
    });
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hero slides',
      },
      { status: 500 }
    );
  }
}
