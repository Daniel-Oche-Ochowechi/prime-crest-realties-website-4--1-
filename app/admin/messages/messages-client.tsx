"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Clock, Check, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateMessageStatus, updatePropertyMessageStatus } from "@/actions/messages"
import { useRouter } from "next/navigation"

export interface PropertyMessage {
    id: string
    property_id: string
    name: string
    email: string
    phone?: string
    message: string
    status: "unread" | "read" | "replied"
    created_at: string
}

export interface AdminMessage {
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

interface AdminMessagesClientProps {
    initialPropertyMessages: PropertyMessage[]
    initialUserMessages: AdminMessage[]
}

export default function AdminMessagesClient({ initialPropertyMessages, initialUserMessages }: AdminMessagesClientProps) {
    const [propertyMessages, setPropertyMessages] = useState<PropertyMessage[]>(initialPropertyMessages)
    const [userMessages, setUserMessages] = useState<AdminMessage[]>(initialUserMessages)
    const [unreadCount, setUnreadCount] = useState(0)
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        setPropertyMessages(initialPropertyMessages)
        setUserMessages(initialUserMessages)
        const unread = initialUserMessages.filter((m) => !m.is_read).length
        setUnreadCount(unread)
    }, [initialPropertyMessages, initialUserMessages])

    const handleUpdateMessageStatus = async (id: string, isRead = true, isReplied = false) => {
        try {
            await updateMessageStatus(id, isRead, isReplied)
            toast({
                title: "Success",
                description: "Message status updated",
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update message status",
                variant: "destructive",
            })
        }
    }

    const handleUpdatePropertyMessageStatus = async (id: string, status: "read" | "replied") => {
        try {
            await updatePropertyMessageStatus(id, status)
            toast({
                title: "Success",
                description: `Message marked as ${status}`,
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update message status",
                variant: "destructive",
            })
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
                                                    <Button size="sm" onClick={() => handleUpdateMessageStatus(msg.id, true, false)}>
                                                        <Check className="mr-1 h-3 w-3" />
                                                        Mark as Read
                                                    </Button>
                                                )}
                                                <Button size="sm" onClick={() => handleUpdateMessageStatus(msg.id, true, true)}>
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
                                                <Button size="sm" onClick={() => handleUpdatePropertyMessageStatus(message.id, "read")}>
                                                    <Check className="mr-1 h-3 w-3" />
                                                    Mark as Read
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleUpdatePropertyMessageStatus(message.id, "replied")}
                                                >
                                                    Mark as Replied
                                                </Button>
                                            </div>
                                        )}
                                        {message.status === "read" && (
                                            <Button size="sm" onClick={() => handleUpdatePropertyMessageStatus(message.id, "replied")}>
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
