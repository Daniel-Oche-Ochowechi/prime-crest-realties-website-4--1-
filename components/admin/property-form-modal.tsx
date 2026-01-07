"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Upload, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import type { Property } from "@/lib/types/database"
import { useToast } from "@/hooks/use-toast"

interface PropertyFormModalProps {
  isOpen: boolean
  onClose: () => void
  property?: Property | null
}

export default function PropertyFormModal({ isOpen, onClose, property }: PropertyFormModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    status: "available" as "available" | "sold",
    description: "",
    thumbnail: "",
    images: [] as string[],
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    parking: "",
    amenities: [] as string[],
    land_size: "",
    document_status: "",
    video_url: "",
    lat: "",
    lng: "",
    phone: "",
    whatsapp: "",
    email: "",
  })

  const [currentAmenity, setCurrentAmenity] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        location: property.location || "",
        price: property.price.toString() || "",
        status: property.status || "available",
        description: property.description || "",
        thumbnail: property.thumbnail || "",
        images: property.images || [],
        bedrooms: property.bedrooms?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        sqft: property.sqft?.toString() || "",
        parking: property.parking?.toString() || "",
        amenities: property.amenities || [],
        land_size: property.land_size || "",
        document_status: property.document_status || "",
        video_url: property.video_url || "",
        lat: property.lat?.toString() || "",
        lng: property.lng?.toString() || "",
        phone: property.agent_phone || "",
        whatsapp: property.agent_whatsapp || "",
        email: property.agent_email || "",
      })
    } else {
      setFormData({
        title: "",
        location: "",
        price: "",
        status: "available",
        description: "",
        thumbnail: "",
        images: [],
        bedrooms: "",
        bathrooms: "",
        sqft: "",
        parking: "",
        amenities: [],
        land_size: "",
        document_status: "",
        video_url: "",
        lat: "6.5244",
        lng: "3.3792",
        phone: "+234 (0) 123 456 7890",
        whatsapp: "+234 (0) 123 456 7890",
        email: "agent@primecrest.com",
      })
    }
  }, [property, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const propertyData = {
        title: formData.title,
        location: formData.location,
        price: Number.parseFloat(formData.price),
        status: formData.status,
        description: formData.description,
        thumbnail: formData.thumbnail || "/luxury-property.png",
        images: formData.images.length > 0 ? formData.images : ["/luxury-interior.png"],
        bedrooms: Number.parseInt(formData.bedrooms) || 0,
        bathrooms: Number.parseInt(formData.bathrooms) || 0,
        sqft: Number.parseInt(formData.sqft) || 0,
        parking: Number.parseInt(formData.parking) || 0,
        amenities: formData.amenities,
        land_size: formData.land_size,
        document_status: formData.document_status,
        video_url: formData.video_url || null,
        lat: Number.parseFloat(formData.lat) || 6.5244,
        lng: Number.parseFloat(formData.lng) || 3.3792,
        agent_phone: formData.phone,
        agent_whatsapp: formData.whatsapp,
        agent_email: formData.email,
      }

      if (property) {
        const { error } = await supabase.from("properties").update(propertyData).eq("id", property.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "Property updated successfully",
        })
      } else {
        const { error } = await supabase.from("properties").insert(propertyData)

        if (error) throw error

        toast({
          title: "Success",
          description: "Property created successfully",
        })
      }

      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    const supabase = createClient()
    const newImages: string[] = []

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not an image`,
            variant: "destructive",
          })
          continue
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} is larger than 10MB`,
            variant: "destructive",
          })
          continue
        }

        const fileExt = file.name.split(".").pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from("properties")
          .upload(filePath, file)

        if (uploadError) {
          console.error("Upload error:", uploadError)
          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          })
          continue
        }

        const { data } = supabase.storage.from("properties").getPublicUrl(filePath)

        if (data) {
          newImages.push(data.publicUrl)
        }
      }

      if (newImages.length > 0) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages],
          // Set first image as thumbnail if none exists
          thumbnail: prev.thumbnail || newImages[0]
        }))
        toast({
          title: "Upload Complete",
          description: `Successfully uploaded ${newImages.length} images`,
        })
      }
    } catch (error) {
      console.error("Unexpected upload error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred during upload",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset input
      e.target.value = ""
    }
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      images: newImages,
      // Update thumbnail if we removed the current thumbnail
      thumbnail: formData.thumbnail === formData.images[index] ? newImages[0] || "" : formData.thumbnail
    })
  }

  const setAsThumbnail = (imageUrl: string) => {
    setFormData({ ...formData, thumbnail: imageUrl })
  }

  const addAmenity = () => {
    if (currentAmenity.trim()) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, currentAmenity.trim()],
      })
      setCurrentAmenity("")
    }
  }

  const removeAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index),
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold">{property ? "Edit Property" : "Add New Property"}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₦)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "available" | "sold") => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="video_url">Video URL (YouTube/Vimeo)</Label>
                   <Input
                     id="video_url"
                     value={formData.video_url}
                     onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                     placeholder="https://www.youtube.com/watch?v=..."
                   />
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Square Feet</Label>
                    <Input
                      id="sqft"
                      type="number"
                      value={formData.sqft}
                      onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parking">Parking</Label>
                    <Input
                      id="parking"
                      type="number"
                      value={formData.parking}
                      onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="land_size">Land Size</Label>
                    <Input
                      id="land_size"
                      placeholder="e.g., 1,200 sqm"
                      value={formData.land_size}
                      onChange={(e) => setFormData({ ...formData, land_size: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="document_status">Document Status</Label>
                    <Input
                      id="document_status"
                      placeholder="e.g., Governor Consent, C of O"
                      value={formData.document_status}
                      onChange={(e) => setFormData({ ...formData, document_status: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Amenities</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add amenity"
                    value={currentAmenity}
                    onChange={(e) => setCurrentAmenity(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                  />
                  <Button type="button" onClick={addAmenity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
                      {amenity}
                      <button type="button" onClick={() => removeAmenity(index)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Images</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                      disabled={isUploading}
                      className="bg-accent/10 hover:bg-accent/20 border-accent/20 text-accent"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Images
                        </>
                      )}
                    </Button>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                    <p className="text-sm text-muted-foreground">
                      Supported: JPG, PNG, WebP (Max 10MB)
                    </p>
                  </div>

                  {/* Image Preview Grid */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group border border-border rounded-lg overflow-hidden aspect-video bg-muted">
                          <img
                            src={image}
                            alt={`Property ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="h-8 w-8"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {formData.thumbnail !== image && (
                              <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="text-xs h-8"
                                onClick={() => setAsThumbnail(image)}
                              >
                                Set Main
                              </Button>
                            )}
                          </div>
                          {formData.thumbnail === image && (
                            <div className="absolute top-2 left-2 bg-accent text-primary text-xs px-2 py-1 rounded font-medium shadow-sm">
                              Main Image
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail URL (Auto-selected or Custom)</Label>
                    <Input
                      id="thumbnail"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      placeholder="/path/to/image.jpg"
                      className="bg-muted text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Agent Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 bg-transparent"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-accent text-primary hover:bg-accent/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : property ? "Update Property" : "Create Property"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
