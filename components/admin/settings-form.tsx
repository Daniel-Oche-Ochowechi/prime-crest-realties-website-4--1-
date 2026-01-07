"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function SettingsForm() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    site_name: "PrimeCrest Realties",
    site_description: "Premium Real Estate Solutions",
    contact_email: "info@primecrest.com",
    contact_phone: "+234 (0) 123 456 7890",
    contact_whatsapp: "+234 (0) 123 456 7890",
    office_address: "Lagos, Nigeria",
    business_hours: "Mon - Fri: 9:00 AM - 6:00 PM",
    maintenance_mode: false,
    allow_property_submissions: true,
    require_email_verification: true,
    auto_approve_properties: false,
    max_upload_size: 10,
    support_email: "support@primecrest.com",
    privacy_policy_url: "/privacy",
    terms_url: "/terms",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("settings").select("*").single()

    if (error && error.code !== "PGRST116") {
      console.error("[v0] Error fetching settings:", error)
    }
    if (data) {
      setSettings((prev) => ({ ...prev, ...data }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    const supabase = createClient()

    try {
      const { error: fetchError } = await supabase.from("settings").select("id").single()

      if (fetchError?.code === "PGRST116") {
        const { error } = await supabase.from("settings").insert(settings)
        if (error) throw error
      } else {
        const { error } = await supabase.from("settings").update(settings).eq("id", 1)
        if (error) throw error
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    } catch (error) {
      console.error("[v0] Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">Site Name</Label>
              <Input
                id="site_name"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_description">Site Description</Label>
              <Input
                id="site_description"
                value={settings.site_description}
                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="office_address">Office Address</Label>
            <Textarea
              id="office_address"
              value={settings.office_address}
              onChange={(e) => setSettings({ ...settings, office_address: e.target.value })}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business_hours">Business Hours</Label>
            <Input
              id="business_hours"
              value={settings.business_hours}
              onChange={(e) => setSettings({ ...settings, business_hours: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support_email">Support Email</Label>
              <Input
                id="support_email"
                type="email"
                value={settings.support_email}
                onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Phone Number</Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_whatsapp">WhatsApp Number</Label>
              <Input
                id="contact_whatsapp"
                value={settings.contact_whatsapp}
                onChange={(e) => setSettings({ ...settings, contact_whatsapp: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground mt-1">Disable site for maintenance</p>
            </div>
            <Switch
              checked={settings.maintenance_mode}
              onCheckedChange={(value) => setSettings({ ...settings, maintenance_mode: value })}
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <Label>Allow Property Submissions</Label>
              <p className="text-sm text-muted-foreground mt-1">Users can submit new properties</p>
            </div>
            <Switch
              checked={settings.allow_property_submissions}
              onCheckedChange={(value) => setSettings({ ...settings, allow_property_submissions: value })}
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <Label>Require Email Verification</Label>
              <p className="text-sm text-muted-foreground mt-1">Users must verify email</p>
            </div>
            <Switch
              checked={settings.require_email_verification}
              onCheckedChange={(value) => setSettings({ ...settings, require_email_verification: value })}
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <Label>Auto-Approve Properties</Label>
              <p className="text-sm text-muted-foreground mt-1">Automatically approve new listings</p>
            </div>
            <Switch
              checked={settings.auto_approve_properties}
              onCheckedChange={(value) => setSettings({ ...settings, auto_approve_properties: value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload & Storage Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Upload & Storage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="max_upload_size">Max Upload Size (MB)</Label>
            <Input
              id="max_upload_size"
              type="number"
              value={settings.max_upload_size}
              onChange={(e) => setSettings({ ...settings, max_upload_size: Number(e.target.value) })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Legal & Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Legal & Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="privacy_policy_url">Privacy Policy URL</Label>
              <Input
                id="privacy_policy_url"
                value={settings.privacy_policy_url}
                onChange={(e) => setSettings({ ...settings, privacy_policy_url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms_url">Terms & Conditions URL</Label>
              <Input
                id="terms_url"
                value={settings.terms_url}
                onChange={(e) => setSettings({ ...settings, terms_url: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="bg-accent text-primary hover:bg-accent/90" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
        <Button variant="outline" onClick={fetchSettings} disabled={isSaving} className="bg-transparent">
          Reset
        </Button>
      </div>
    </div>
  )
}
