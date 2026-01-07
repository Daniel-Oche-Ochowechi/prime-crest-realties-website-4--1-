-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price BIGINT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'sold')),
  description TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms INTEGER NOT NULL DEFAULT 0,
  sqft INTEGER NOT NULL DEFAULT 0,
  parking INTEGER NOT NULL DEFAULT 0,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  land_size TEXT NOT NULL,
  document_status TEXT NOT NULL,
  video_url TEXT,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  agent_phone TEXT NOT NULL,
  agent_whatsapp TEXT NOT NULL,
  agent_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inspection_bookings table
CREATE TABLE IF NOT EXISTS inspection_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_property_id ON messages(property_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON inspection_bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON inspection_bookings(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for properties
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
