"use client"

import { motion } from "framer-motion"
import { Building2, MessageSquare, Calendar, TrendingUp, ArrowUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardStats {
    properties: number
    messages: number
    bookings: number
    users: number
}

interface ActivityItem {
    type: string
    message: string
    time: string
}

interface AdminDashboardClientProps {
    stats: DashboardStats
    recentActivity: ActivityItem[]
}

export default function AdminDashboardClient({ stats, recentActivity }: AdminDashboardClientProps) {
    const statsCards = [
        {
            title: "Total Properties",
            value: stats.properties.toString(),
            change: "+12%",
            icon: Building2,
        },
        {
            title: "Active Inquiries",
            value: stats.messages.toString(),
            change: "+5",
            icon: MessageSquare,
        },
        {
            title: "Scheduled Viewings",
            value: stats.bookings.toString(),
            change: "+2",
            icon: Calendar,
        },
        {
            title: "Total Users",
            value: stats.users.toString(),
            change: "+8%",
            icon: Users,
        },
    ]

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-border/50 hover:border-accent/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                <stat.icon className="h-4 w-4 text-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <ArrowUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                                    <span className="text-xs text-muted-foreground ml-1">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-accent" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
                            ) : (
                                recentActivity.map((activity, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0 border-border/50"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                                        <div className="flex-1">
                                            <p className="text-sm text-foreground">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
