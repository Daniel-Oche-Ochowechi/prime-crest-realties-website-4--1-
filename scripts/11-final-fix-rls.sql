-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 1. Create Bucket if not exists (safe insert)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('properties', 'properties', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop all restrictive policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
DROP POLICY IF EXISTS "Public storage access" ON storage.objects;
DROP POLICY IF EXISTS "Allow all public access to properties" ON storage.objects;

-- 3. Create ONE master policy for properties bucket
-- This allows anyone (anon or auth) to do ANYTHING with files in the properties bucket.
CREATE POLICY "Allow all public access to properties"
ON storage.objects
FOR ALL
TO public
USING ( bucket_id = 'properties' )
WITH CHECK ( bucket_id = 'properties' );

-- Fix RLS for Properties Table
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public properties access" ON properties;
DROP POLICY IF EXISTS "Public properties access 2" ON properties;
DROP POLICY IF EXISTS "Enable read access for all users" ON properties;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON properties;
DROP POLICY IF EXISTS "Enable update for users based on email" ON properties;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON properties;

CREATE POLICY "Public properties access 2"
ON properties
FOR ALL
TO public
USING (true)
WITH CHECK (true);
