-- Optional SQL function for atomic page view incrementation
-- This function can be created in your Supabase database for better performance
-- and to handle concurrent requests more reliably

-- Create the function to increment page views atomically
CREATE OR REPLACE FUNCTION increment_page_views(project_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    new_views INTEGER;
BEGIN
    UPDATE projects 
    SET 
        page_views = COALESCE(page_views, 0) + 1,
        updated_at = NOW()
    WHERE id = project_id
    RETURNING page_views INTO new_views;
    
    RETURN new_views;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to the authenticated users
GRANT EXECUTE ON FUNCTION increment_page_views(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_page_views(INTEGER) TO anon;

-- Example usage:
-- SELECT increment_page_views(1); -- This will increment page views for project with id=1
