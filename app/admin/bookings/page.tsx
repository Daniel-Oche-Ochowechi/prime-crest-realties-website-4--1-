"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react"
import type { InspectionBooking } from "@/lib/types/database"
import { useToast } from "@/hooks/use-toast"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<InspectionBooking[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchBookings = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("inspection_bookings").select("*").order("date", { ascending: true })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      })
    } else {
      setBookings(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleStatusUpdate = async (id: string, status: "confirmed" | "completed" | "cancelled") => {
    const supabase = createClient()
    const { error } = await supabase.from("inspection_bookings").update({ status }).eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Booking ${status}`,
      })
      fetchBookings()
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading bookings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Inspection Bookings</h2>
        <p className="text-muted-foreground mt-1">Manage property viewing appointments</p>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No bookings yet</p>
            </CardContent>
          </Card>
        ) : (
          bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{booking.name}</h3>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.email}</p>
                      <p className="text-sm text-muted-foreground">{booking.phone}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(booking.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {booking.time}
                        </div>
                      </div>
                      {booking.notes && <p className="text-sm text-muted-foreground mt-2">Notes: {booking.notes}</p>}
                    </div>
                  </div>
                  {booking.status === "pending" && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                      >
                        <XCircle className="mr-1 h-3 w-3" />
                        Cancel
                      </Button>
                    </div>
                  )}
                  {booking.status === "confirmed" && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleStatusUpdate(booking.id, "completed")}
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Mark Complete
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
