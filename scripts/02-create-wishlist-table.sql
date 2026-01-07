-- Create wishlist table to track saved properties for users

CREATE TABLE IF NOT EXISTS wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, property_id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_property_id ON wishlist(property_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_saved_at ON wishlist(saved_at DESC);
