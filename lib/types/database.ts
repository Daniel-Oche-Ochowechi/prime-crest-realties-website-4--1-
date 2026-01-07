export interface Property {
  id: string
  title: string
  location: string
  price: number
  status: "available" | "sold"
  description: string
  thumbnail: string
  images: string[]
  bedrooms: number
  bathrooms: number
  sqft: number
  parking: number
  amenities: string[]
  land_size: string
  document_status: string
  video_url?: string
  lat: number
  lng: number
  agent_phone: string
  agent_whatsapp: string
  agent_email: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  property_id: string
  name: string
  email: string
  phone?: string
  message: string
  status: "unread" | "read" | "replied"
  created_at: string
}

export interface InspectionBooking {
  id: string
  property_id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  notes?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  created_at: string
}
