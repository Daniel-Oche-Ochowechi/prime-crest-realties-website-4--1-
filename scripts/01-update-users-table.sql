-- Update users table to match application schema
-- Add missing columns that don't exist yet

ALTER TABLE users
ADD COLUMN IF NOT EXISTS id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'agent', 'admin')),
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive'));

-- Create index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
