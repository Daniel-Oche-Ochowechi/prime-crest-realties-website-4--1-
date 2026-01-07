-- Smart RLS Fix
-- Uses PL/pgSQL to check for policy existence before creating, avoiding 42710 errors.

-- SETTINGS
DO $$
BEGIN
    -- Permit all
    ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
    
    -- Drop restrictive policies if they exist (best effort)
    DROP POLICY IF EXISTS "Public can read settings" ON settings;
    DROP POLICY IF EXISTS "Admins can update settings" ON settings;
    DROP POLICY IF EXISTS "Admins can insert settings" ON settings;

    -- Create permissive policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'settings' AND policyname = 'Public settings access'
    ) THEN
        CREATE POLICY "Public settings access" ON settings FOR ALL TO public USING (true) WITH CHECK (true);
    END IF;
END $$;

-- PROPERTIES
DO $$
BEGIN
    ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
    
    -- Drop potentially conflicting policies
    DROP POLICY IF EXISTS "Enable read access for all users" ON properties;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Public properties access'
    ) THEN
        CREATE POLICY "Public properties access" ON properties FOR ALL TO public USING (true) WITH CHECK (true);
    END IF;
END $$;

-- STORAGE
-- We need to check schema existence first? No, storage schema usually exists.
DO $$
BEGIN
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public storage access'
    ) THEN
        CREATE POLICY "Public storage access" ON storage.objects FOR ALL TO public USING (true) WITH CHECK (true);
    END IF;
END $$;
