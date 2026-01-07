# PrimeCrest Realties - Premium Real Estate Website

A luxury real estate platform built with Next.js 16, Convex, and Tailwind CSS featuring verified properties, seamless inspections booking, and premium user experiences.

## Features

### 🏠 Property Management
- Browse premium properties with advanced filtering (price, location, type, bedrooms)
- Detailed property pages with image galleries, amenities, and virtual tours
- Similar properties recommendations
- Property wishlist for saved favorites
- Location maps with Google Maps integration

### 👤 User Authentication & Dashboard
- User registration and login
- Personal dashboard with saved properties and inspection bookings
- Profile settings management
- Inspection booking system with status tracking

### 📱 Agent & Admin Tools
- Admin dashboard for property management (add, edit, delete)
- Message center for property inquiries
- Contact form with agent communication
- WhatsApp integration for quick contact

### 🎨 Design & UX
- Premium luxury aesthetic inspired by Mercedes, Rolex, Apple
- Fully responsive mobile-first design
- Smooth animations with Framer Motion
- Sticky navigation and sidebars
- Elegant typography with Raleway font
- Black, white, and grey color scheme

### 🗂️ Pages
- **Home** - Hero section, featured properties, why choose us, about preview
- **Properties** - Full property listing with advanced filters
- **Property Details** - Complete property showcase with amenities, map, messaging
- **About** - Company mission, stats, core values
- **Contact** - Contact form and agent information
- **Login/Signup** - User authentication
- **Dashboard** - User saved properties and inspections
- **Admin** - Property and message management

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Convex
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Maps**: Google Maps Embed

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd primecrest-realties

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Setup

Create a `.env.local` file with:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
```

## Project Structure

```
app/
├── page.tsx                 # Home page
├── properties/page.tsx      # Properties listing
├── property/[id]/page.tsx   # Property details
├── about/page.tsx           # About page
├── contact/page.tsx         # Contact page
├── login/page.tsx           # Login page
├── signup/page.tsx          # Sign up page
├── dashboard/page.tsx       # User dashboard
├── admin/page.tsx           # Admin dashboard
└── globals.css              # Global styles

components/
├── layout/                  # Navigation & Footer
├── home/                    # Home page sections
├── properties/              # Properties filtering & grid
├── property/                # Property details components
├── about/                   # About page sections
├── contact/                 # Contact form & info
├── auth/                    # Login & signup forms
├── dashboard/               # User & admin dashboards
└── ui/                      # shadcn/ui components

convex/
├── schema.ts                # Database schema
├── properties.ts            # Property queries & mutations
├── messages.ts              # Message handling
├── wishlist.ts              # Wishlist management
└── inspections.ts           # Inspection booking

lib/
├── mock-data.ts             # Mock properties for testing
└── utils.ts                 # Utility functions

public/
└── images/                  # Property images & assets
```

## Convex Integration

The Convex backend is fully configured with:

### Tables
- **properties** - Property listings with images, amenities, agent contact
- **users** - User profiles
- **messages** - Property inquiry messages
- **wishlist** - Saved properties per user
- **inspection_bookings** - Scheduled property inspections

### Queries
- `getProperties()` - Get all properties with filtering
- `getPropertyById()` - Get single property details
- `getUserWishlist()` - Get user's saved properties
- `getPropertyMessages()` - Get messages for a property
- `getUserInspections()` - Get user's inspection bookings

### Mutations
- `createProperty()` - Add new property
- `updateProperty()` - Edit property details
- `deleteProperty()` - Remove property
- `sendMessage()` - Send property inquiry message
- `addToWishlist()` / `removeFromWishlist()` - Manage wishlist
- `bookInspection()` - Schedule inspection
- `updateInspectionStatus()` - Update booking status

## Current Implementation Status

### Completed
- ✅ All pages and routes
- ✅ Complete component library
- ✅ Convex schema and functions
- ✅ Mock data for testing
- ✅ Design system and styling
- ✅ Navigation and layout
- ✅ Forms (with mock submission)

### To Integrate with Convex
- 🔄 Property queries in components
- 🔄 Authentication with Convex Auth
- 🔄 Message submission
- 🔄 Wishlist functionality
- 🔄 Inspection booking

## Design System

### Colors
- **Primary**: Black (#000000) - luxury, professional
- **Secondary**: White (#ffffff) - clean, premium
- **Neutral Accents**: Greys (#f5f5f5, #cfcfcf, #9a9a9a)

### Typography
- **Font**: Raleway (300-800 weights)
- **Letter Spacing**: 0.02em (premium tracking)
- **Heading Styles**: Bold with wide letter-spacing

### Components
- `.btn-primary` - Black background, white text
- `.btn-secondary` - White background, black text with border
- `.card-premium` - Elevated cards with subtle shadows

## Next Steps for Production

1. **Convex Setup**
   - Connect Convex project
   - Set up authentication
   - Add Row Level Security (RLS) policies

2. **Integration**
   - Replace mock data with real Convex queries
   - Implement actual form submissions
   - Add file uploads for property images

3. **Deployment**
   - Deploy to Vercel
   - Set environment variables
   - Configure custom domain

4. **Content**
   - Add real property data
   - Update contact information
   - Add company branding assets

## License

MIT

---

Built with Next.js, Convex, and Tailwind CSS
