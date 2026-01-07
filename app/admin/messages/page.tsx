"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Clock, Check, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PropertyMessage {
  id: string
  property_id: string
  name: string
  email: string
  phone?: string
  message: string
  status: "unread" | "read" | "replied"
  created_at: string
}

interface AdminMessage {
  id: string
  user_id: string
  user_email?: string
  user_name?: string
  subject: string
  message: string
  is_read: boolean
  is_replied: boolean
  created_at: string
}

export default function AdminMessagesPage() {
  const [propertyMessages, setPropertyMessages] = useState<PropertyMessage[]>([])
  const [userMessages, setUserMessages] = useState<AdminMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const { toast } = useToast()

  const fetchAllMessages = async () => {
    const supabase = createClient()

    try {
      // Fetch property inquiry messages
      const { data: propData, error: propError } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (!propError && propData) {
        setPropertyMessages(propData)
      }

      // Fetch user-admin messages with user info
      const { data: userMsgData, error: userMsgError } = await supabase
        .from("user_admin_messages")
        .select(
          `
          id,
          user_id,
          subject,
          message,
          is_read,
          is_replied,
          created_at,
          users:user_id (
            email,
            full_name
          )
        `,
        )
        .order("created_at", { ascending: false })

      if (!userMsgError && userMsgData) {
        const formattedMessages = userMsgData.map((msg: any) => ({
          id: msg.id,
          user_id: msg.user_id,
          user_email: msg.users?.email || "Unknown",
          user_name: msg.users?.full_name || "Unknown User",
          subject: msg.subject,
          message: msg.message,
          is_read: msg.is_read,
          is_replied: msg.is_replied,
          created_at: msg.created_at,
        }))
        setUserMessages(formattedMessages)

        const unread = formattedMessages.filter((m) => !m.is_read).length
        setUnreadCount(unread)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllMessages()
  }, [])

  const updateMessageStatus = async (id: string, isRead = true, isReplied = false) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("user_admin_messages")
      .update({ is_read: isRead, is_replied: isReplied })
      .eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Message status updated",
      })
      fetchAllMessages()
    }
  }

  const updatePropertyMessageStatus = async (id: string, status: "read" | "replied") => {
    const supabase = createClient()
    const { error } = await supabase.from("messages").update({ status }).eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Message marked as ${status}`,
      })
      fetchAllMessages()
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground mt-1">View all inquiries and user messages</p>
      </div>

      <Tabs defaultValue="user-messages" className="w-full">
        <TabsList>
          <TabsTrigger value="user-messages" className="flex items-center gap-2">
            <MessageCircle size={16} />
            User Messages {unreadCount > 0 && <Badge className="ml-2 bg-red-500">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="property-inquiries" className="flex items-center gap-2">
            <Mail size={16} />
            Property Inquiries
          </TabsTrigger>
        </TabsList>

        {/* User Admin Messages Tab */}
        <TabsContent value="user-messages" className="space-y-4">
          {userMessages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No user messages yet</p>
              </CardContent>
            </Card>
          ) : (
            userMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`hover:shadow-md transition-shadow ${!msg.is_read ? "border-blue-500 bg-blue-50/50" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{msg.user_name}</h3>
                          {!msg.is_read && <Badge className="bg-blue-500">New</Badge>}
                          {msg.is_replied && <Badge className="bg-green-500">Replied</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{msg.user_email}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(msg.created_at)}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-primary mb-2">Subject: {msg.subject}</h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                    {!msg.is_replied && (
                      <div className="flex gap-2">
                        {!msg.is_read && (
                          <Button size="sm" onClick={() => updateMessageStatus(msg.id, true, false)}>
                            <Check className="mr-1 h-3 w-3" />
                            Mark as Read
                          </Button>
                        )}
                        <Button size="sm" onClick={() => updateMessageStatus(msg.id, true, true)}>
                          Mark as Replied
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        {/* Property Inquiries Tab */}
        <TabsContent value="property-inquiries" className="space-y-4">
          {propertyMessages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No property inquiries yet</p>
              </CardContent>
            </Card>
          ) : (
            propertyMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{message.name}</h3>
                          <Badge
                            className={
                              message.status === "replied"
                                ? "bg-green-500"
                                : message.status === "read"
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                            }
                          >
                            {message.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                        {message.phone && <p className="text-sm text-muted-foreground">{message.phone}</p>}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(message.created_at)}
                      </div>
                    </div>
                    <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm leading-relaxed">{message.message}</p>
                    </div>
                    {message.status === "unread" && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => updatePropertyMessageStatus(message.id, "read")}>
                          <Check className="mr-1 h-3 w-3" />
                          Mark as Read
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePropertyMessageStatus(message.id, "replied")}
                        >
                          Mark as Replied
                        </Button>
                      </div>
                    )}
                    {message.status === "read" && (
                      <Button size="sm" onClick={() => updatePropertyMessageStatus(message.id, "replied")}>
                        Mark as Replied
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
