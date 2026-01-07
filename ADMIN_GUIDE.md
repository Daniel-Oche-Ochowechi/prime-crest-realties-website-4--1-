# PrimeCrest Realties - Admin Dashboard Guide

## Getting Started

### Accessing the Admin Dashboard

Navigate to `/admin` to access the admin dashboard. The dashboard provides full CRUD functionality for managing your real estate properties.

## Database Seeding

### Initial Setup

To populate your database with sample properties, run:

```bash
npm run seed
```

This will create 8 sample properties with complete information including:
- Property details (title, location, price, status)
- Images and thumbnails
- Property highlights (bedrooms, bathrooms, square footage, parking)
- Amenities
- Agent contact information
- Map coordinates

### Clearing the Database

To remove all properties from the database:

```bash
npm run clear-db
```

**Warning:** This will permanently delete all property records.

## Admin Dashboard Features

### 1. Dashboard Overview (`/admin`)
- View statistics: Total properties, active inquiries, scheduled viewings, total users
- Recent activity feed
- Quick insights into your business metrics

### 2. Properties Management (`/admin/properties`)
- **View All Properties**: Browse all listings in a grid layout
- **Search**: Filter properties by title or location
- **Add New Property**: Click "Add Property" to open the creation form
- **Edit Property**: Click the edit button on any property card
- **Delete Property**: Remove properties with confirmation

#### Property Form Fields:
- **Basic Information**: Title, location, price, status, description
- **Property Details**: Bedrooms, bathrooms, square footage, parking spaces, land size, document status
- **Amenities**: Add multiple amenities with tags
- **Images**: Thumbnail URL (supports local paths or external URLs)
- **Agent Contact**: Phone, WhatsApp, email

### 3. Messages (`/admin/messages`)
- View all property inquiries from potential buyers
- See contact information (name, email, phone)
- Read full message content
- Timestamp for each inquiry

### 4. Bookings (`/admin/bookings`)
- Manage property inspection appointments
- View booking status (pending, confirmed, completed, cancelled)
- **Confirm bookings**: Approve inspection requests
- **Mark as complete**: Update after inspection is done
- **Cancel bookings**: Reject or cancel appointments
- See date, time, and notes for each booking

### 5. Users (`/admin/users`)
- User management interface (ready for future implementation)

### 6. Settings (`/admin/settings`)
- Configuration panel (ready for future implementation)

## Navigation

The admin sidebar includes:
- Quick navigation between all admin sections
- Active route highlighting
- Mobile-responsive design
- "Back to Site" link to return to the main website

## Property Status

Properties can have two statuses:
- **Available**: Property is actively listed and available for sale
- **Sold**: Property has been sold and is no longer available

## CRUD Operations

### Create
1. Go to `/admin/properties`
2. Click "Add Property"
3. Fill in all required fields
4. Click "Create Property"

### Read
- All properties are automatically fetched from Convex
- Real-time updates when properties change
- Properties display in grid layout with thumbnails

### Update
1. Click the "Edit" button on any property
2. Modify the desired fields
3. Click "Update Property"

### Delete
1. Click the "Delete" button on any property
2. Confirm the deletion
3. Property is permanently removed

## Technical Details

### Backend
- **Database**: Convex (real-time serverless database)
- **API**: Convex mutations and queries
- **Real-time**: Automatic UI updates when data changes

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui with Radix UI
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v4

### Data Structure
Properties include:
- Title, location, price, status
- Description
- Images array and thumbnail
- Highlights object (bedrooms, bathrooms, sqft, parking)
- Amenities array
- Land size and document status
- Map coordinates (latitude, longitude)
- Agent contact information
- Timestamps (created_at, updated_at)

## Best Practices

1. **Always add complete property information** for better user experience
2. **Use high-quality images** with appropriate dimensions
3. **Keep amenities concise** and relevant
4. **Update property status** promptly when sold
5. **Respond to inquiries** via the Messages section
6. **Confirm bookings quickly** to maintain customer satisfaction

## Troubleshooting

### Properties not appearing?
- Ensure Convex is properly configured
- Check that `NEXT_PUBLIC_CONVEX_URL` environment variable is set
- Try running the seed script: `npm run seed`

### Form submission errors?
- Verify all required fields are filled
- Check that price values are numeric
- Ensure coordinate values are valid numbers

### Images not displaying?
- Verify image paths are correct
- Check that images exist in the `public` folder
- Use placeholder images as fallback

## Support

For additional help or questions, contact the development team or refer to the Convex documentation at https://docs.convex.dev
