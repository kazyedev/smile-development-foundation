CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'contract', 'internship', 'volunteer');--> statement-breakpoint
CREATE TYPE "public"."volunteer_request_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_arabic" boolean DEFAULT false,
	"is_english" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"date" timestamp with time zone,
	"content_en" text NOT NULL,
	"content_ar" text NOT NULL,
	"other_images_url" text[] DEFAULT '{}',
	"program_id" bigint NOT NULL,
	"project_id" bigint,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "activities_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "activities_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "bank_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"bank_name_en" varchar(200) NOT NULL,
	"bank_name_ar" varchar(200) NOT NULL,
	"bank_logo" varchar(1000) NOT NULL,
	"account_number" varchar(100) NOT NULL,
	"account_name_en" varchar(200) NOT NULL,
	"account_name_ar" varchar(200) NOT NULL,
	"account_currency" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "director_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name_en" varchar(200) NOT NULL,
	"full_name_ar" varchar(200) NOT NULL,
	"position_en" varchar(200) NOT NULL,
	"position_ar" varchar(200) NOT NULL,
	"bio_en" text,
	"bio_ar" text,
	"avatar" varchar(1000),
	"linkedin" varchar(500),
	"twitter" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_en" text NOT NULL,
	"question_ar" text NOT NULL,
	"answer_en" text NOT NULL,
	"answer_ar" text NOT NULL,
	"views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "foundation_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(200) NOT NULL,
	"name_ar" varchar(200) NOT NULL,
	"address_en" varchar(500) NOT NULL,
	"address_ar" varchar(500) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"facebook" varchar(500),
	"twitter" varchar(500),
	"instagram" varchar(500),
	"linkedin" varchar(500),
	"youtube" varchar(500),
	"telegram" varchar(500),
	"bank_accounts" jsonb DEFAULT '[]'::jsonb,
	"statics" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "hero_slides" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"caption_en" text NOT NULL,
	"caption_ar" text NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"description_en" text NOT NULL,
	"description_ar" text NOT NULL,
	"available_positions" integer NOT NULL,
	"requirements_en" text[] DEFAULT '{}',
	"requirements_ar" text[] DEFAULT '{}',
	"responsibilities_en" text[] DEFAULT '{}',
	"responsibilities_ar" text[] DEFAULT '{}',
	"location_en" varchar(200) NOT NULL,
	"location_ar" varchar(200) NOT NULL,
	"type" "job_type" NOT NULL,
	"apply_url" varchar(1000) NOT NULL,
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "jobs_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "jobs_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "navigation_items" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"label" varchar(200) NOT NULL,
	"href" varchar(1000) NOT NULL,
	"children" jsonb
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"include_in_sitemap_en" boolean DEFAULT true,
	"include_in_sitemap_ar" boolean DEFAULT true,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"other_images_url" text[] DEFAULT '{}',
	"content_en" text NOT NULL,
	"content_ar" text NOT NULL,
	"category_id" bigint,
	"program_id" bigint,
	"project_id" bigint,
	"activity_id" bigint,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"read_time" integer DEFAULT 0,
	"page_views" integer DEFAULT 0,
	"author_id" uuid NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "news_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "news_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "news_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(200) NOT NULL,
	"name_ar" varchar(200) NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"color" varchar(20),
	"icon" varchar(100),
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "news_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "news_categories_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "newsletters" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"content_en" text NOT NULL,
	"content_ar" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "newsletter_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(200) NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "newsletter_members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(200) NOT NULL,
	"name_ar" varchar(200) NOT NULL,
	"logo_url" varchar(1000)
);
--> statement-breakpoint
CREATE TABLE "project_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "project_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "project_categories_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "publications" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"url" varchar(1000) NOT NULL,
	"program_id" bigint,
	"project_id" bigint,
	"activity_id" bigint,
	"category_id" bigint,
	"featured_image_url" varchar(1000),
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"page_views" integer DEFAULT 0,
	"downloads" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "publications_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "publications_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"url" varchar(1000) NOT NULL,
	"category_id" bigint,
	"featured_image_url" varchar(1000),
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"downloads" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "reports_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "reports_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "seo_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name_en" varchar(200) NOT NULL,
	"full_name_ar" varchar(200) NOT NULL,
	"position_en" varchar(200) NOT NULL,
	"position_ar" varchar(200) NOT NULL,
	"bio_en" text,
	"bio_ar" text,
	"avatar_url" varchar(1000),
	"linkedin" varchar(500),
	"twitter" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "volunteer_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_en" text NOT NULL,
	"question_ar" text NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "volunteer_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"cv_url" varchar(1000) NOT NULL,
	"questions_answers" jsonb DEFAULT '[]'::jsonb,
	"status" "volunteer_request_status" DEFAULT 'pending',
	"applied_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "success_stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"video" varchar(1000) NOT NULL,
	"program_id" bigint,
	"person_name_en" varchar(200) NOT NULL,
	"person_name_ar" varchar(200) NOT NULL,
	"person_age" integer NOT NULL,
	"person_location_en" varchar(200) NOT NULL,
	"person_location_ar" varchar(200) NOT NULL,
	"city_en" varchar(200) NOT NULL,
	"city_ar" varchar(200) NOT NULL,
	"other_images_url" text[] DEFAULT '{}',
	"content_en" text NOT NULL,
	"content_ar" text NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"read_time" integer DEFAULT 0,
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "success_stories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "success_stories_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_category_id_news_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."news_categories"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_project_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."project_categories"("id") ON DELETE set null ON UPDATE cascade;