"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Calendar, Settings, Trash2, Mail } from "lucide-react"
import PropertyCard from "@/components/property-card"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import UserMessageAdmin from "@/components/dashboard/user-message-admin"

interface SavedProperty {
  id: string
  title: string
  location: string
  price: number
  thumbnail: string
  status: string
  bedrooms: number
  bathrooms: number
  saved_at: string
}

interface Booking {
  id: string
  propertyTitle: string
  date: string
  time: string
  status: "confirmed" | "pending" | "cancelled"
}

export default function UserDashboardContent() {
  const [user, setUser] = useState<any | null>(null)
  const [wishlist, setWishlist] = useState<SavedProperty[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [userSettings, setUserSettings] = useState({
    full_name: "",
    email: "",
    phone: "",
  })
  const [settingsSaved, setSettingsSaved] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const supabase = createClient()

    try {
      // Get current user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        window.location.href = "/login"
        return
      }

      setUser(authUser)
      setUserSettings((prev) => ({
        ...prev,
        email: authUser.email || "",
      }))

      // Fetch user profile
      const { data: userData } = await supabase.from("user_profiles").select("*").eq("id", authUser.id).single()

      if (userData) {
        setUserSettings((prev) => ({
          ...prev,
          full_name: userData.full_name || "",
          phone: userData.phone || "",
        }))
      }

      // Fetch wishlist
      const { data: wishlistData, error: wishlistError } = await supabase
        .from("wishlist")
        .select(
          `
          id,
          saved_at,
          property_id,
          properties (
            id,
            title,
            location,
            price,
            thumbnail,
            status,
            bedrooms,
            bathrooms
          )
        `,
        )
        .eq("user_id", authUser.id)
        .order("saved_at", { ascending: false })

      if (!wishlistError && wishlistData) {
        const formattedWishlist = wishlistData
          .filter((item: any) => item.properties)
          .map((item: any) => ({
            id: item.properties.id,
            title: item.properties.title,
            location: item.properties.location,
            price: item.properties.price,
            thumbnail: item.properties.thumbnail,
            status: item.properties.status,
            bedrooms: item.properties.bedrooms,
            bathrooms: item.properties.bathrooms,
            saved_at: item.saved_at,
          }))
        setWishlist(formattedWishlist)
      }

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from("inspection_bookings")
        .select(
          `
          id,
          date,
          time,
          status,
          properties (title)
        `,
        )
        .eq("user_id", authUser.id)
        .order("date", { ascending: true })

      if (bookingsData) {
        const formattedBookings = bookingsData
          .filter((item: any) => item.properties)
          .map((item: any) => ({
            id: item.id,
            propertyTitle: item.properties.title,
            date: item.date,
            time: item.time,
            status: item.status,
          }))
        setBookings(formattedBookings)
      }
    } catch (error) {
      console.error("[v0] Error fetching user data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromWishlist = async (propertyId: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("wishlist").delete().eq("property_id", propertyId).eq("user_id", user.id)

      if (error) throw error

      setWishlist((prev) => prev.filter((p) => p.id !== propertyId))
      toast({
        title: "Removed",
        description: "Property removed from wishlist",
      })
    } catch (error) {
      console.error("[v0] Error removing from wishlist:", error)
      toast({
        title: "Error",
        description: "Failed to remove property",
        variant: "destructive",
      })
    }
  }

  const handleSaveSettings = async () => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("user_profiles").update(userSettings).eq("id", user.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      setSettingsSaved(true)
      setTimeout(() => setSettingsSaved(false), 2000)
    } catch (error) {
      console.error("[v0] Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-neutral-gray">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4 tracking-wider">My Dashboard</h1>
        <p className="text-neutral-gray">Manage your saved properties and bookings</p>
      </div>

      <Tabs defaultValue="wishlist" className="w-full">
        <TabsList className="bg-secondary border border-neutral-light mb-8">
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart size={18} />
            Saved Properties ({wishlist.length})
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Calendar size={18} />
            Inspections ({bookings.length})
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <Mail size={18} />
            Support
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={18} />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Saved Properties Tab */}
        <TabsContent value="wishlist" className="space-y-6">
          {wishlist.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="h-12 w-12 mx-auto text-neutral-medium mb-4" />
                <p className="text-neutral-gray">You haven't saved any properties yet.</p>
                <a href="/properties" className="text-primary font-semibold hover:underline mt-4 inline-block">
                  Browse Properties
                </a>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    thumbnail={property.thumbnail}
                    status={property.status}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveFromWishlist(property.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Inspections Tab */}
        <TabsContent value="bookings" className="space-y-4">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-neutral-medium mb-4" />
                <p className="text-neutral-gray">You haven't scheduled any inspections yet.</p>
                <a href="/properties" className="text-primary font-semibold hover:underline mt-4 inline-block">
                  View Properties
                </a>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-secondary border border-neutral-light rounded-sm p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-primary mb-2">{booking.propertyTitle}</h3>
                  <p className="text-neutral-gray text-sm">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-sm text-sm font-semibold uppercase ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))
          )}
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <UserMessageAdmin />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="bg-secondary border border-neutral-light rounded-sm p-8 max-w-md">
            <h3 className="text-xl font-bold text-primary mb-6 tracking-wider">Profile Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userSettings.full_name}
                  onChange={(e) => setUserSettings({ ...userSettings, full_name: e.target.value })}
                  className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium text-primary"
                  placeholder="Your Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={userSettings.email}
                  disabled
                  className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium text-primary opacity-60 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Phone</label>
                <input
                  type="tel"
                  value={userSettings.phone}
                  onChange={(e) => setUserSettings({ ...userSettings, phone: e.target.value })}
                  className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium text-primary"
                  placeholder="Your Phone Number"
                />
              </div>
              <button
                onClick={handleSaveSettings}
                className={`btn-primary w-full py-3 transition-all ${settingsSaved ? "bg-green-600" : ""}`}
              >
                {settingsSaved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
