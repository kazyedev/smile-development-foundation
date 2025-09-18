const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL);

async function createVideoTables() {
  try {
    console.log('Creating media_categories table...');
    
    // Create media_categories table first
    await sql`
      CREATE TABLE IF NOT EXISTS "media_categories" (
        "id" bigserial PRIMARY KEY NOT NULL,
        "is_english" boolean DEFAULT true NOT NULL,
        "is_arabic" boolean DEFAULT true NOT NULL,
        "name_en" text NOT NULL,
        "name_ar" text NOT NULL,
        "slug_en" text NOT NULL,
        "slug_ar" text NOT NULL,
        "description_en" text,
        "description_ar" text,
        "image_url" text,
        "image_alt_en" text,
        "image_alt_ar" text,
        "color" text DEFAULT '#000000',
        "icon" text,
        "page_views" bigint DEFAULT 0,
        "is_published" boolean DEFAULT false,
        "published_at" timestamp with time zone,
        "created_at" timestamp with time zone DEFAULT now(),
        "updated_at" timestamp with time zone DEFAULT now(),
        CONSTRAINT "media_categories_slug_en_unique" UNIQUE("slug_en"),
        CONSTRAINT "media_categories_slug_ar_unique" UNIQUE("slug_ar")
      )
    `;
    
    console.log('✓ media_categories table created successfully');
    
    console.log('Creating videos table...');
    
    // Create videos table
    await sql`
      CREATE TABLE IF NOT EXISTS "videos" (
        "id" bigserial PRIMARY KEY NOT NULL,
        "title_en" text NOT NULL,
        "title_ar" text NOT NULL,
        "description_en" text,
        "description_ar" text,
        "mime_type" text DEFAULT 'video/mp4' NOT NULL,
        "size" bigint NOT NULL,
        "width" integer NOT NULL,
        "height" integer NOT NULL,
        "url" text NOT NULL,
        "location_en" text,
        "location_ar" text,
        "is_public" boolean DEFAULT true NOT NULL,
        "category_id" bigint,
        "slug_en" text NOT NULL,
        "slug_ar" text NOT NULL,
        "keywords_en" text[] DEFAULT '{}',
        "keywords_ar" text[] DEFAULT '{}',
        "tags_en" text[] DEFAULT '{}',
        "tags_ar" text[] DEFAULT '{}',
        "views" bigint DEFAULT 0,
        "is_published" boolean DEFAULT false,
        "published_at" timestamp with time zone,
        "created_at" timestamp with time zone DEFAULT now(),
        "updated_at" timestamp with time zone DEFAULT now(),
        CONSTRAINT "videos_slug_en_unique" UNIQUE("slug_en"),
        CONSTRAINT "videos_slug_ar_unique" UNIQUE("slug_ar")
      )
    `;
    
    console.log('✓ videos table created successfully');
    
    console.log('Adding foreign key constraint...');
    
    // Add foreign key constraint (check if it exists first)
    const constraintExists = await sql`
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'videos_category_id_media_categories_id_fk' 
      AND table_name = 'videos'
    `;
    
    if (constraintExists.length === 0) {
      await sql`
        ALTER TABLE "videos" 
        ADD CONSTRAINT "videos_category_id_media_categories_id_fk" 
        FOREIGN KEY ("category_id") REFERENCES "public"."media_categories"("id") 
        ON DELETE set null ON UPDATE cascade
      `;
    }
    
    console.log('✓ Foreign key constraint added successfully');
    
    console.log('🎉 All video tables created successfully!');
    
    // Verify tables exist
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('videos', 'media_categories')
      ORDER BY table_name
    `;
    
    console.log('📋 Created tables:', result.map(r => r.table_name));
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  } finally {
    await sql.end();
  }
}

createVideoTables();
