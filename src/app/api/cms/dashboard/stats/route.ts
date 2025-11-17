import { NextResponse } from "next/server";
import { database } from "@/lib/db";
import { users, news, images, projects, programs, videos, publications, activities, faqs } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    const db = database();

    // Calculate statistics in parallel for better performance
    const [
      usersResult,
      newsResult,
      imagesResult,
      newsViewsResult,
      projectsViewsResult,
      programsViewsResult,
      imagesViewsResult,
      videosViewsResult,
      publicationsViewsResult,
      activitiesViewsResult,
      faqsViewsResult,
    ] = await Promise.all([
      // Total Users (excluding deleted) - use SQL COUNT aggregation
      db
        .select({ count: sql<number>`count(*)` })
        .from(users)
        .where(eq(users.isDeleted, false)),

      // Total Published News Articles
      db
        .select({ count: sql<number>`count(*)` })
        .from(news)
        .where(eq(news.isPublished, true)),

      // Total Images
      db.select({ count: sql<number>`count(*)` }).from(images),

      // Page Views from news - use SQL aggregation
      db
        .select({ sum: sql<number>`coalesce(sum(${news.pageViews}), 0)` })
        .from(news),

      // Page Views from projects
      db
        .select({ sum: sql<number>`coalesce(sum(${projects.pageViews}), 0)` })
        .from(projects),

      // Page Views from programs
      db
        .select({ sum: sql<number>`coalesce(sum(${programs.pageViews}), 0)` })
        .from(programs),

      // Views from images
      db
        .select({ sum: sql<number>`coalesce(sum(${images.views}), 0)` })
        .from(images),

      // Views from videos
      db
        .select({ sum: sql<number>`coalesce(sum(${videos.views}), 0)` })
        .from(videos),

      // Page Views from publications
      db
        .select({ sum: sql<number>`coalesce(sum(${publications.pageViews}), 0)` })
        .from(publications),

      // Page Views from activities
      db
        .select({ sum: sql<number>`coalesce(sum(${activities.pageViews}), 0)` })
        .from(activities),

      // Views from FAQs
      db
        .select({ sum: sql<number>`coalesce(sum(${faqs.views}), 0)` })
        .from(faqs),
    ]);

    // Extract counts and sums
    const totalUsers = Number(usersResult[0]?.count || 0);
    const totalPosts = Number(newsResult[0]?.count || 0);
    const totalImages = Number(imagesResult[0]?.count || 0);

    // Calculate total page views
    const totalPageViews =
      Number(newsViewsResult[0]?.sum || 0) +
      Number(projectsViewsResult[0]?.sum || 0) +
      Number(programsViewsResult[0]?.sum || 0) +
      Number(imagesViewsResult[0]?.sum || 0) +
      Number(videosViewsResult[0]?.sum || 0) +
      Number(publicationsViewsResult[0]?.sum || 0) +
      Number(activitiesViewsResult[0]?.sum || 0) +
      Number(faqsViewsResult[0]?.sum || 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalPosts,
        totalImages,
        totalPageViews,
      },
    });
  } catch (error) {
    console.error("Dashboard stats API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dashboard statistics",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

