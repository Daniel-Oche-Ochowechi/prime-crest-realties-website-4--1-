"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PropertyFormModal from "@/components/admin/property-form-modal"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import type { Property } from "@/lib/types/database"
import { useToast } from "@/hooks/use-toast"

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "sold">("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const { toast } = useToast()

  const fetchProperties = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive",
      })
    } else {
      setProperties(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return

    const supabase = createClient()
    const { error } = await supabase.from("properties").delete().eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Property deleted successfully",
      })
      fetchProperties()
    }
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setEditingProperty(null)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingProperty(null)
    fetchProperties()
  }

  const handleBulkDelete = async () => {
    if (selectedProperties.length === 0) return
    if (!confirm(`Delete ${selectedProperties.length} properties?`)) return

    const supabase = createClient()
    const { error } = await supabase.from("properties").delete().in("id", selectedProperties)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete properties",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `${selectedProperties.length} properties deleted`,
      })
      setSelectedProperties([])
      fetchProperties()
    }
  }

  const handleBulkStatusUpdate = async (newStatus: "available" | "sold") => {
    if (selectedProperties.length === 0) return

    const supabase = createClient()
    const { error } = await supabase.from("properties").update({ status: newStatus }).in("id", selectedProperties)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update properties",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `${selectedProperties.length} properties updated`,
      })
      setSelectedProperties([])
      fetchProperties()
    }
  }

  const togglePropertySelection = (id: string) => {
    setSelectedProperties((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(filteredProperties.map((p) => p.id))
    }
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading properties...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Properties Management</h2>
          <p className="text-muted-foreground mt-1">Manage all property listings</p>
        </div>
        <Button onClick={handleAdd} className="bg-accent text-primary hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedProperties.length > 0 && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-center justify-between">
          <span className="text-sm font-semibold">{selectedProperties.length} property/properties selected</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-transparent"
              onClick={() => handleBulkStatusUpdate("available")}
            >
              Mark Available
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-transparent"
              onClick={() => handleBulkStatusUpdate("sold")}
            >
              Mark Sold
            </Button>
            <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
              Delete Selected
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent" onClick={() => setSelectedProperties([])}>
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant={statusFilter === "all" ? "default" : "outline"} onClick={() => setStatusFilter("all")}>
            All
          </Button>
          <Button
            variant={statusFilter === "available" ? "default" : "outline"}
            onClick={() => setStatusFilter("available")}
          >
            Available
          </Button>
          <Button variant={statusFilter === "sold" ? "default" : "outline"} onClick={() => setStatusFilter("sold")}>
            Sold
          </Button>
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No properties found</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
              onChange={toggleSelectAll}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-muted-foreground">Select All</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <div className="absolute top-4 left-4 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={() => togglePropertySelection(property.id)}
                      className="rounded border-gray-300"
                    />
                  </div>
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={property.thumbnail || "/placeholder.svg?height=200&width=300&query=luxury+property"}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={property.status === "available" ? "bg-green-500" : "bg-red-500"}>
                          {property.status}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 truncate">{property.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
                      <p className="text-xl font-bold text-accent mb-4">₦{(property.price / 1000000).toFixed(1)}M</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => handleEdit(property)}
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-destructive hover:text-destructive bg-transparent"
                          onClick={() => handleDelete(property.id)}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Property Form Modal */}
      <PropertyFormModal isOpen={isFormOpen} onClose={handleFormClose} property={editingProperty} />
    </div>
  )
}
