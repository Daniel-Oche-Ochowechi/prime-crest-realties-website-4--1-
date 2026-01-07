"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createProperty(data: any) {
    const supabase = await createClient()
    const { error } = await supabase.from("properties").insert(data)
    if (error) throw error
    revalidatePath("/admin/properties")
    revalidatePath("/properties")
    revalidatePath("/admin") // Update dashboard stats
}

export async function updateProperty(id: string, data: any) {
    const supabase = await createClient()
    const { error } = await supabase.from("properties").update(data).eq("id", id)
    if (error) throw error
    revalidatePath("/admin/properties")
    revalidatePath("/properties")
}

export async function deleteProperty(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from("properties").delete().eq("id", id)
    if (error) throw error
    revalidatePath("/admin/properties")
    revalidatePath("/properties")
    revalidatePath("/admin")
}

export async function uploadPropertyImage(formData: FormData) {
    const file = formData.get("file") as File
    if (!file) throw new Error("No file provided")

    const supabase = await createClient()

    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error } = await supabase.storage
        .from("properties")
        .upload(filePath, file)

    if (error) {
        console.error("Upload error:", error)
        throw new Error(error.message)
    }

    const { data } = supabase.storage.from("properties").getPublicUrl(filePath)
    return data.publicUrl
}

export async function deleteProperties(ids: string[]) {
    const supabase = await createClient()
    const { error } = await supabase.from("properties").delete().in("id", ids)
    if (error) throw error
    revalidatePath("/admin/properties")
    revalidatePath("/properties")
    revalidatePath("/admin")
}

export async function updatePropertiesStatus(ids: string[], status: string) {
    const supabase = await createClient()
    const { error } = await supabase.from("properties").update({ status }).in("id", ids)
    if (error) throw error
    revalidatePath("/admin/properties")
    revalidatePath("/properties")
}
