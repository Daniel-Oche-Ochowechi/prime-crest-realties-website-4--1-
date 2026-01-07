-- Fix Everything RLS Script
-- This script aggressively drops and recreates policies to ensure public access for Admin debug.

-- SETTINGS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN 
    DROP POLICY IF EXISTS "Public can read settings" ON settings;
    DROP POLICY IF EXISTS "Admins can update settings" ON settings;
    DROP POLICY IF EXISTS "Admins can insert settings" ON settings;
    DROP POLICY IF EXISTS "Public can update settings" ON settings;
    DROP POLICY IF EXISTS "Public can insert settings" ON settings;
    DROP POLICY IF EXISTS "Public settings access" ON settings;
EXCEPTION 
    WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Public settings access" ON settings FOR ALL TO public USING (true) WITH CHECK (true);


-- PROPERTIES
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN 
    DROP POLICY IF EXISTS "Public properties access" ON properties;
    -- Drop other potential policies just in case
    DROP POLICY IF EXISTS "Enable read access for all users" ON properties;
    DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON properties;
    DROP POLICY IF EXISTS "Enable update for users based on email" ON properties;
    DROP POLICY IF EXISTS "Enable delete for users based on email" ON properties;
EXCEPTION 
    WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Public properties access" ON properties FOR ALL TO public USING (true) WITH CHECK (true);


-- STORAGE
-- Note: 'storage' schema might be protected.
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN 
    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
    DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
    DROP POLICY IF EXISTS "Public storage access" ON storage.objects;
EXCEPTION 
    WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Public storage access" ON storage.objects FOR ALL TO public USING (true) WITH CHECK (true);
