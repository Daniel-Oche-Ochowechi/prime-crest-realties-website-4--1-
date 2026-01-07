-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to 'properties' bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'properties' );

-- Allow authenticated uploads to 'properties' bucket
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'properties' );

-- Allow public uploads (TEMPORARY FIX if auth is not fully working)
-- Only uncomment if strictly necessary
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK ( bucket_id = 'properties' );

-- Allow updates/deletes for authenticated users
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'properties' );

DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'properties' );
