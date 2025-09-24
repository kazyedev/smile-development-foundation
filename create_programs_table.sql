-- Create Programs Table for Ebtsama Development Foundation
-- Based on the Program interface in src/types/program.ts

-- Drop table if exists (for development only - remove in production)
-- DROP TABLE IF EXISTS programs CASCADE;

-- Create the programs table
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    title_en VARCHAR(500) NOT NULL,
    title_ar VARCHAR(500) NOT NULL,
    description_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    about_en TEXT,
    about_ar TEXT,
    goals_en TEXT[], -- Array of strings for goals
    goals_ar TEXT[], -- Array of strings for goals
    statics JSONB DEFAULT '[]', -- JSON array for statistics
    icon VARCHAR(100),
    color VARCHAR(20),
    implementation_location_en VARCHAR(500),
    implementation_location_ar VARCHAR(500),
    funding_providers JSONB DEFAULT '[]', -- JSON array for funding providers
    donors JSONB DEFAULT '[]', -- JSON array for donors
    partners JSONB DEFAULT '[]', -- JSON array for partners
    featured_image_url VARCHAR(1000),
    slides JSONB DEFAULT '[]', -- JSON array for slides
    slug_en VARCHAR(200) UNIQUE NOT NULL,
    slug_ar VARCHAR(200) UNIQUE NOT NULL,
    keywords_en TEXT[], -- Array of strings for keywords
    keywords_ar TEXT[], -- Array of strings for keywords
    tags_en TEXT[], -- Array of strings for tags
    tags_ar TEXT[], -- Array of strings for tags
    include_in_sitemap_en BOOLEAN DEFAULT true,
    include_in_sitemap_ar BOOLEAN DEFAULT true,
    page_views INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_programs_slug_en ON programs(slug_en);
CREATE INDEX idx_programs_slug_ar ON programs(slug_ar);
CREATE INDEX idx_programs_published ON programs(is_published);
CREATE INDEX idx_programs_created_at ON programs(created_at);
CREATE INDEX idx_programs_page_views ON programs(page_views);

-- Enable Row Level Security (RLS)
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow everyone to read published programs
CREATE POLICY "Allow public read access to published programs"
ON programs FOR SELECT
USING (is_published = true);

-- Allow authenticated users to read all programs
CREATE POLICY "Allow authenticated users to read all programs"
ON programs FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert programs
CREATE POLICY "Allow authenticated users to insert programs"
ON programs FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow users to update their own programs or if they have admin role
CREATE POLICY "Allow users to update their own programs"
ON programs FOR UPDATE
TO authenticated
USING (created_by = auth.uid());

-- Allow users to delete their own programs or if they have admin role
CREATE POLICY "Allow users to delete their own programs"
ON programs FOR DELETE
TO authenticated
USING (created_by = auth.uid());

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create function to increment page views atomically
CREATE OR REPLACE FUNCTION increment_program_page_views(program_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    new_views INTEGER;
BEGIN
    UPDATE programs 
    SET 
        page_views = COALESCE(page_views, 0) + 1,
        updated_at = NOW()
    WHERE id = program_id
    RETURNING page_views INTO new_views;
    
    RETURN new_views;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to the increment function
GRANT EXECUTE ON FUNCTION increment_program_page_views(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_program_page_views(INTEGER) TO anon;
