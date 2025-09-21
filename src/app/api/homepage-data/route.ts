import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { projects } from '@/lib/db/schema/projects';
import { activities } from '@/lib/db/schema/activities';
import { successStories } from '@/lib/db/schema/successStories';
import { videos } from '@/lib/db/schema/videos';
import { news } from '@/lib/db/schema/news';
import { eq, desc, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'en';
    
    const db = database();
    
    // Fetch all data in parallel
    const [
      projectsData,
      activitiesData,
      successStoriesData,
      videosData,
      newsData
    ] = await Promise.all([
      // Projects: Top 3 by page views
      db
        .select({
          id: projects.id,
          titleEn: projects.titleEn,
          titleAr: projects.titleAr,
          descriptionEn: projects.descriptionEn,
          descriptionAr: projects.descriptionAr,
          featuredImageUrl: projects.featuredImageUrl,
          color: projects.color,
          slugEn: projects.slugEn,
          slugAr: projects.slugAr,
          pageViews: projects.pageViews,
          publishedAt: projects.publishedAt,
          createdAt: projects.createdAt,
          updatedAt: projects.updatedAt,
        })
        .from(projects)
        .where(and(
          eq(projects.isPublished, true),
          locale === 'en' ? eq(projects.isEnglish, true) : eq(projects.isArabic, true)
        ))
        .orderBy(desc(projects.pageViews))
        .limit(3),

      // Activities: Top 3 by page views
      db
        .select({
          id: activities.id,
          titleEn: activities.titleEn,
          titleAr: activities.titleAr,
          contentEn: activities.contentEn,
          contentAr: activities.contentAr,
          featuredImageUrl: activities.featuredImageUrl,
          date: activities.date,
          slugEn: activities.slugEn,
          slugAr: activities.slugAr,
          pageViews: activities.pageViews,
          tagsEn: activities.tagsEn,
          tagsAr: activities.tagsAr,
          publishedAt: activities.publishedAt,
          createdAt: activities.createdAt,
          updatedAt: activities.updatedAt,
        })
        .from(activities)
        .where(and(
          eq(activities.isPublished, true),
          locale === 'en' ? eq(activities.isEnglish, true) : eq(activities.isArabic, true)
        ))
        .orderBy(desc(activities.pageViews))
        .limit(3),

      // Success Stories: Top 3 by page views
      db
        .select({
          id: successStories.id,
          titleEn: successStories.titleEn,
          titleAr: successStories.titleAr,
          contentEn: successStories.contentEn,
          contentAr: successStories.contentAr,
          featuredImageUrl: successStories.featuredImageUrl,
          video: successStories.video,
          personNameEn: successStories.personNameEn,
          personNameAr: successStories.personNameAr,
          personAge: successStories.personAge,
          personLocationEn: successStories.personLocationEn,
          personLocationAr: successStories.personLocationAr,
          cityEn: successStories.cityEn,
          cityAr: successStories.cityAr,
          slugEn: successStories.slugEn,
          slugAr: successStories.slugAr,
          pageViews: successStories.pageViews,
          tagsEn: successStories.tagsEn,
          tagsAr: successStories.tagsAr,
          readTime: successStories.readTime,
          publishedAt: successStories.publishedAt,
          createdAt: successStories.createdAt,
          updatedAt: successStories.updatedAt,
        })
        .from(successStories)
        .where(and(
          eq(successStories.isPublished, true),
          locale === 'en' ? eq(successStories.isEnglish, true) : eq(successStories.isArabic, true)
        ))
        .orderBy(desc(successStories.pageViews))
        .limit(3),

      // Videos: Top 3 by views
      db
        .select({
          id: videos.id,
          titleEn: videos.titleEn,
          titleAr: videos.titleAr,
          descriptionEn: videos.descriptionEn,
          descriptionAr: videos.descriptionAr,
          url: videos.url,
          width: videos.width,
          height: videos.height,
          locationEn: videos.locationEn,
          locationAr: videos.locationAr,
          slugEn: videos.slugEn,
          slugAr: videos.slugAr,
          views: videos.views,
          tagsEn: videos.tagsEn,
          tagsAr: videos.tagsAr,
          publishedAt: videos.publishedAt,
          createdAt: videos.createdAt,
          updatedAt: videos.updatedAt,
        })
        .from(videos)
        .where(and(
          eq(videos.isPublished, true),
          eq(videos.isPublic, true)
        ))
        .orderBy(desc(videos.views))
        .limit(3),

      // News: Latest 3
      db
        .select({
          id: news.id,
          titleEn: news.titleEn,
          titleAr: news.titleAr,
          contentEn: news.contentEn,
          contentAr: news.contentAr,
          featuredImageUrl: news.featuredImageUrl,
          slugEn: news.slugEn,
          slugAr: news.slugAr,
          pageViews: news.pageViews,
          readTime: news.readTime,
          publishedAt: news.publishedAt,
          createdAt: news.createdAt,
          updatedAt: news.updatedAt,
        })
        .from(news)
        .where(and(
          eq(news.isPublished, true),
          locale === 'en' ? eq(news.isEnglish, true) : eq(news.isArabic, true)
        ))
        .orderBy(desc(news.publishedAt))
        .limit(3),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        projects: projectsData,
        activities: activitiesData,
        successStories: successStoriesData,
        videos: videosData,
        news: newsData,
      },
    });
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch homepage data',
      },
      { status: 500 }
    );
  }
}
