"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, MessageSquare } from "lucide-react"
import { MOCK_PROPERTIES } from "@/lib/mock-data"

export default function AdminDashboardContent() {
  const [properties] = useState(MOCK_PROPERTIES)
  const [showAddForm, setShowAddForm] = useState(false)
  const [messages] = useState([
    {
      id: 1,
      propertyTitle: "Luxury 4-Bedroom Duplex",
      name: "John Doe",
      message: "I'm very interested in this property. Can we schedule a viewing?",
      date: "2025-01-10",
    },
  ])

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4 tracking-wider">Admin Dashboard</h1>
        <p className="text-neutral-gray">Manage properties, messages, and bookings</p>
      </div>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="bg-secondary border border-neutral-light mb-8">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare size={18} />
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary tracking-wider">All Properties</h2>
            <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary flex items-center gap-2">
              <Plus size={18} />
              Add Property
            </button>
          </div>

          {showAddForm && (
            <div className="bg-secondary border border-neutral-light rounded-sm p-8 mb-8">
              <h3 className="text-xl font-bold text-primary mb-6">Add New Property</h3>
              <div className="space-y-4">
                <input
                  placeholder="Title"
                  className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium"
                />
                <input
                  placeholder="Location"
                  className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium"
                />
                <input
                  placeholder="Price"
                  type="number"
                  className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium"
                />
                <textarea
                  placeholder="Description"
                  rows={4}
                  className="w-full py-3 px-4 bg-neutral-light border-b border-neutral-medium resize-none"
                />
                <div className="flex gap-3">
                  <button className="btn-primary flex-1">Save Property</button>
                  <button onClick={() => setShowAddForm(false)} className="btn-secondary flex-1">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-secondary border border-neutral-light rounded-sm p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-primary mb-2">{property.title}</h3>
                  <p className="text-neutral-gray text-sm">
                    {property.location} • ₦{(property.price / 1000000).toFixed(1)}M
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-sm text-sm font-semibold uppercase mr-4 ${
                    property.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {property.status}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 bg-primary text-secondary rounded-sm hover:opacity-80">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 bg-destructive text-secondary rounded-sm hover:opacity-80">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-sm p-8">
              <p className="text-neutral-gray">No messages yet.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-secondary border border-neutral-light rounded-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-primary">{msg.name}</h3>
                    <p className="text-sm text-neutral-gray">{msg.propertyTitle}</p>
                  </div>
                  <p className="text-xs text-neutral-gray">{msg.date}</p>
                </div>
                <p className="text-neutral-gray leading-relaxed">{msg.message}</p>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
