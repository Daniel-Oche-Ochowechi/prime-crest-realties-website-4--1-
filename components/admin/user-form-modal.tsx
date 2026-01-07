"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface UserFormModalProps {
  isOpen: boolean
  onClose: () => void
  user?: any | null
}

export default function UserFormModal({ isOpen, onClose, user }: UserFormModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    phone: "",
    role: "user" as "user" | "agent" | "admin",
    status: "active" as "active" | "inactive",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        full_name: user.full_name || "",
        phone: user.phone || "",
        role: user.role || "user",
        status: user.status || "active",
      })
    } else {
      setFormData({
        email: "",
        full_name: "",
        phone: "",
        role: "user",
        status: "active",
      })
    }
  }, [user, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      if (user) {
        const { error } = await supabase.from("user_profiles").update(formData).eq("id", user.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "User updated successfully",
        })
      } else {
        const { error } = await supabase.from("user_profiles").insert(formData)

        if (error) throw error

        toast({
          title: "Success",
          description: "User created successfully",
        })
      }

      onClose()
    } catch (error) {
      console.error("[v0] Error saving user:", error)
      toast({
        title: "Error",
        description: "Failed to save user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
            className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold">{user ? "Edit User" : "Add New User"}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">User Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: "user" | "agent" | "admin") => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

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
                  {isSubmitting ? "Saving..." : user ? "Update User" : "Create User"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
