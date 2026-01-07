-- Create user-admin messages table
CREATE TABLE IF NOT EXISTS user_admin_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  is_replied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_admin_messages_user_id ON user_admin_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_user_admin_messages_admin_id ON user_admin_messages(admin_id);
CREATE INDEX IF NOT EXISTS idx_user_admin_messages_created_at ON user_admin_messages(created_at DESC);
