"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateMessageStatus(id: string, isRead = true, isReplied = false) {
    const supabase = await createClient()
    const { error } = await supabase
        .from("user_admin_messages")
        .update({ is_read: isRead, is_replied: isReplied })
        .eq("id", id)

    if (error) throw error
    revalidatePath("/admin/messages")
    revalidatePath("/admin")
}

export async function updatePropertyMessageStatus(id: string, status: "read" | "replied") {
    const supabase = await createClient()
    const { error } = await supabase.from("messages").update({ status }).eq("id", id)

    if (error) throw error
    revalidatePath("/admin/messages")
    revalidatePath("/admin")
}
