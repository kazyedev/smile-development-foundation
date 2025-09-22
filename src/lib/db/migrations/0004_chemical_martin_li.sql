CREATE TYPE "public"."currency_type" AS ENUM('USD', 'SAR', 'AED', 'YER');--> statement-breakpoint
CREATE TYPE "public"."section_action" AS ENUM('create', 'read', 'update', 'delete');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('super_admin', 'admin', 'content_manager', 'viewer', 'author', 'default');--> statement-breakpoint
CREATE TYPE "public"."user_section" AS ENUM('programs', 'projects', 'project_categories', 'activities', 'news', 'news_categories', 'email_newsletters', 'videos', 'images', 'publications', 'reports', 'success_stories', 'foundation_profile', 'admin_accounts', 'board_of_directors', 'team_members', 'jobs', 'faqs', 'statics', 'donations', 'partners');--> statement-breakpoint
CREATE TYPE "public"."job_application_status" AS ENUM('pending', 'reviewing', 'shortlisted', 'rejected', 'hired');--> statement-breakpoint
CREATE TABLE "activity_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_ar" varchar(255) NOT NULL,
	"slug_en" varchar(255) NOT NULL,
	"slug_ar" varchar(255) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"color" varchar(7) DEFAULT '#000000',
	"icon" varchar(255),
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "activity_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "activity_categories_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "donation_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"donation_id" integer,
	"method" varchar(20) NOT NULL,
	"file_name" varchar(500) NOT NULL,
	"content_type" varchar(200) NOT NULL,
	"size" integer NOT NULL,
	"bytes" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "donations" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"method" varchar(20) NOT NULL,
	"frequency" varchar(10) DEFAULT 'once' NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"donor_name" varchar(200),
	"donor_email" varchar(200) NOT NULL,
	"donor_note" text,
	"stripe_session_id" varchar(200),
	"stripe_payment_intent_id" varchar(200),
	"bank_account_id" integer,
	"has_transfer_file" boolean DEFAULT false,
	"has_deposit_file" boolean DEFAULT false,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_ar" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"image_url" varchar(500),
	"role" "user_role" DEFAULT 'default' NOT NULL,
	"allowed_sections" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"bio" text,
	"last_login" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "primary_carousel_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(255) NOT NULL,
	"title_ar" varchar(255) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"location_en" varchar(255),
	"location_ar" varchar(255),
	"image_url" varchar(500) NOT NULL,
	"link_en" varchar(500),
	"link_ar" varchar(500),
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "publication_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_ar" varchar(255) NOT NULL,
	"slug_en" varchar(255) NOT NULL,
	"slug_ar" varchar(255) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"color" varchar(7) DEFAULT '#000000',
	"icon" varchar(255),
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "publication_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "publication_categories_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "report_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_ar" varchar(255) NOT NULL,
	"slug_en" varchar(255) NOT NULL,
	"slug_ar" varchar(255) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"color" varchar(7) DEFAULT '#000000',
	"icon" varchar(255),
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "report_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "report_categories_slug_ar_unique" UNIQUE("slug_ar")
);
--> statement-breakpoint
CREATE TABLE "jobs_applies" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"years_of_experience" integer NOT NULL,
	"cover_letter" text NOT NULL,
	"cv_url" varchar(1000),
	"status" "job_application_status" DEFAULT 'pending',
	"applied_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "bank_accounts" ALTER COLUMN "account_currency" SET DEFAULT 'USD'::"public"."currency_type";--> statement-breakpoint
ALTER TABLE "bank_accounts" ALTER COLUMN "account_currency" SET DATA TYPE "public"."currency_type" USING "account_currency"::"public"."currency_type";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "title_en" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "title_ar" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "slug_en" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "slug_ar" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "description_en" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "description_ar" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "available_positions" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "location_en" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "location_ar" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "apply_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "expires_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "volunteer_requests" ALTER COLUMN "cv_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "volunteer_requests" ALTER COLUMN "applied_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "volunteer_requests" ALTER COLUMN "applied_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "hero_slides" ADD COLUMN "location_en" varchar(255);--> statement-breakpoint
ALTER TABLE "hero_slides" ADD COLUMN "location_ar" varchar(255);--> statement-breakpoint
ALTER TABLE "hero_slides" ADD COLUMN "link_text_en" varchar(100);--> statement-breakpoint
ALTER TABLE "hero_slides" ADD COLUMN "link_text_ar" varchar(100);--> statement-breakpoint
ALTER TABLE "hero_slides" ADD COLUMN "link_url_en" varchar(500);--> statement-breakpoint
ALTER TABLE "hero_slides" ADD COLUMN "link_url_ar" varchar(500);--> statement-breakpoint
ALTER TABLE "hero_slides" ADD COLUMN "slide_type" varchar(50) DEFAULT 'normal';--> statement-breakpoint
ALTER TABLE "hero_slides" ADD COLUMN "reference_id" integer;--> statement-breakpoint
ALTER TABLE "hero_slides" ADD COLUMN "sort_order" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "department_en" varchar(255);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "department_ar" varchar(255);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "experience" varchar(50);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary_min" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary_max" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary_currency" varchar(10);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "benefits_en" text[] DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "benefits_ar" text[] DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "urgent" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "posted_date" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "publications" ADD COLUMN "cover_image_url" varchar(1000);--> statement-breakpoint
ALTER TABLE "publications" ADD COLUMN "attachment_url" varchar(1000);--> statement-breakpoint
ALTER TABLE "publications" ADD COLUMN "content_en" text;--> statement-breakpoint
ALTER TABLE "publications" ADD COLUMN "content_ar" text;--> statement-breakpoint
ALTER TABLE "publications" ADD COLUMN "author_en" varchar(255);--> statement-breakpoint
ALTER TABLE "publications" ADD COLUMN "author_ar" varchar(255);--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD COLUMN "name" varchar(255);--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD COLUMN "email" varchar(255);--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD COLUMN "phone" varchar(50);--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD COLUMN "age" varchar(10);--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD COLUMN "interests" varchar;--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD COLUMN "availability" varchar(100);--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD COLUMN "experience" varchar;--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD COLUMN "motivation" varchar;--> statement-breakpoint
ALTER TABLE "donation_files" ADD CONSTRAINT "donation_files_donation_id_donations_id_fk" FOREIGN KEY ("donation_id") REFERENCES "public"."donations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donations" ADD CONSTRAINT "donations_bank_account_id_bank_accounts_id_fk" FOREIGN KEY ("bank_account_id") REFERENCES "public"."bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs_applies" ADD CONSTRAINT "jobs_applies_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;