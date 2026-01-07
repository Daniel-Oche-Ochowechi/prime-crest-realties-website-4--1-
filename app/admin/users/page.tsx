"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit, Trash2, Search, Shield, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import UserFormModal from "@/components/admin/user-form-modal"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "agent" | "admin">("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const { toast } = useToast()

  const fetchUsers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    const supabase = createClient()
    const { error } = await supabase.from("user_profiles").delete().eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "User deleted successfully",
      })
      fetchUsers()
    }
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setEditingUser(null)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingUser(null)
    fetchUsers()
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      default:
        return <UserIcon className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500"
      case "agent":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-500" : "bg-red-500"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
          <p className="text-muted-foreground mt-1">View and manage user accounts</p>
        </div>
        <Button onClick={handleAdd} className="bg-accent text-primary hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant={roleFilter === "all" ? "default" : "outline"} onClick={() => setRoleFilter("all")}>
            All
          </Button>
          <Button variant={roleFilter === "user" ? "default" : "outline"} onClick={() => setRoleFilter("user")}>
            Users
          </Button>
          <Button variant={roleFilter === "agent" ? "default" : "outline"} onClick={() => setRoleFilter("agent")}>
            Agents
          </Button>
          <Button variant={roleFilter === "admin" ? "default" : "outline"} onClick={() => setRoleFilter("admin")}>
            Admins
          </Button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <UserIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No users found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{user.full_name || "N/A"}</h3>
                          <Badge className={getRoleColor(user.role)}>
                            <span className="flex items-center gap-1">
                              {getRoleIcon(user.role)}
                              {user.role}
                            </span>
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                        {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent" onClick={() => handleEdit(user)}>
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive bg-transparent"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <UserFormModal isOpen={isFormOpen} onClose={handleFormClose} user={editingUser} />
    </div>
  )
}
