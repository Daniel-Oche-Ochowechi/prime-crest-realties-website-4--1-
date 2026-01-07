# PrimeCrest Realties - Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard with Supabase backend.

## Prerequisites

- Supabase project connected (already configured via v0)
- All environment variables are set (already configured)

## Database Setup

### Step 1: Run Database Schema Script

The database schema creates all necessary tables for the application. Run the following script:

**File:** `scripts/001_create_tables.sql`

This script creates:
- `properties` table - Stores all property listings
- `messages` table - Stores customer inquiries
- `inspection_bookings` table - Stores property viewing appointments

**To run in v0:**
The SQL scripts can be executed directly in the v0 preview environment.

### Step 2: Seed Sample Data

After creating the tables, populate them with sample properties:

**File:** `scripts/002_seed_properties.sql`

This script adds 6 sample properties including:
- Luxury 4-Bedroom Duplex (Lekki, Lagos) - ₦250M
- 3-Bedroom Terraced House (Ikoyi, Lagos) - ₦180M
- Commercial Plot (VI, Lagos) - ₦150M (Sold)
- Luxury 5-Bedroom Penthouse (Banana Island, Lagos) - ₦450M
- 2-Bedroom Apartment (Surulere, Lagos) - ₦75M
- Estate Plot (Ajah, Lagos) - ₦85M

## Admin Dashboard Features

### Access the Dashboard

Navigate to `/admin` to access the admin dashboard.

### Dashboard Overview (`/admin`)

View key statistics:
- Total properties count
- Active inquiries count
- Scheduled viewings count
- Recent activity feed

### Properties Management (`/admin/properties`)

**Features:**
- View all properties in a grid layout
- Search properties by title or location
- Filter by status (All, Available, Sold)
- Create new properties
- Edit existing properties
- Delete properties

**Property Form Fields:**
- Basic Info: Title, Location, Price, Status, Description
- Property Details: Bedrooms, Bathrooms, Square Feet, Parking
- Additional: Land Size, Document Status, Amenities
- Images: Thumbnail URL
- Agent Contact: Phone, WhatsApp, Email
- Location: Coordinates (Latitude, Longitude)

### Messages Management (`/admin/messages`)

**Features:**
- View all customer inquiries
- See message details (name, email, phone, message content)
- Track message status (Unread, Read, Replied)
- Update message status with one click

### Bookings Management (`/admin/bookings`)

**Features:**
- View all inspection bookings
- See booking details (name, email, phone, date, time, notes)
- Track booking status (Pending, Confirmed, Completed, Cancelled)
- Confirm pending bookings
- Mark bookings as complete
- Cancel bookings

## Technical Details

### Supabase Client

The application uses the Supabase SSR package for authentication and data operations:

- **Client-side:** `@/lib/supabase/client` - For client components
- **Server-side:** `@/lib/supabase/server` - For server components
- **Middleware:** `@/lib/supabase/proxy` - Session management and route protection

### Database Schema

**Properties Table:**
```sql
- id (UUID, Primary Key)
- title, location, price, status, description
- thumbnail, images[]
- bedrooms, bathrooms, sqft, parking
- amenities[], land_size, document_status
- video_url, lat, lng
- agent_phone, agent_whatsapp, agent_email
- created_at, updated_at
```

**Messages Table:**
```sql
- id (UUID, Primary Key)
- property_id (Foreign Key -> properties)
- name, email, phone, message
- status (unread, read, replied)
- created_at
```

**Inspection Bookings Table:**
```sql
- id (UUID, Primary Key)
- property_id (Foreign Key -> properties)
- name, email, phone
- date, time, notes
- status (pending, confirmed, completed, cancelled)
- created_at
```

### Type Definitions

All database types are defined in `@/lib/types/database.ts` for type safety.

## Common Tasks

### Adding a New Property

1. Go to `/admin/properties`
2. Click "Add Property"
3. Fill in all required fields
4. Click "Create Property"

### Managing Inquiries

1. Go to `/admin/messages`
2. View message details
3. Click "Mark as Read" or "Mark as Replied" to update status

### Managing Bookings

1. Go to `/admin/bookings`
2. View booking details
3. Click "Confirm" for pending bookings
4. Click "Mark Complete" for confirmed bookings

## Security

The admin routes are protected by Supabase authentication middleware. Users must be authenticated to access the admin dashboard. The middleware is configured in `proxy.ts`.

## Troubleshooting

### Tables not found
- Ensure you've run `scripts/001_create_tables.sql`
- Check Supabase connection in the v0 Vars section

### No data showing
- Run `scripts/002_seed_properties.sql` to add sample data
- Check browser console for errors

### Authentication issues
- Verify environment variables are set correctly
- Check that Supabase integration is connected in v0

## Next Steps

1. Run the database schema script
2. Seed sample data
3. Access the admin dashboard at `/admin`
4. Start managing your properties!

For any issues, check the browser console for detailed error messages.
