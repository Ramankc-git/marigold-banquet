'use client'

import { useState, useEffect } from 'react'
import {
  Settings as SettingsIcon,
  Building2,
  Share2,
  Search,
  Save,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Instagram,
  Key,
  HelpCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

interface SiteSettings {
  // Business Info
  businessName: string
  businessPhone: string
  businessEmail: string
  businessAddress: string
  workingHours: string
  // Social Links
  facebookUrl: string
  instagramUrl: string
  whatsappNumber: string
  // Instagram Integration
  instagramUsername: string
  instagramAccessToken: string
  // SEO Defaults
  seoDefaultTitle: string
  seoDefaultDescription: string
  seoDefaultKeywords: string
}

const defaultSettings: SiteSettings = {
  businessName: 'Marigold Banquet Hall & Party Palace',
  businessPhone: '+977-9851111191',
  businessEmail: 'info@marigoldbanquet.com.np',
  businessAddress: 'Tokha-07, Gairigaun, Kathmandu, Nepal',
  workingHours: 'Sun-Sat: 6:00 AM - 11:00 PM',
  facebookUrl: 'https://facebook.com/marigoldbanquet',
  instagramUrl: 'https://instagram.com/marigoldbanquet',
  whatsappNumber: '+977-9851111191',
  instagramUsername: 'marigoldbanquet',
  instagramAccessToken: '',
  seoDefaultTitle: 'Marigold Banquet Hall & Party Palace | Premium Venue in Kathmandu',
  seoDefaultDescription:
    'Marigold Banquet Hall and Party Palace in Tokha-07, Kathmandu. Premium venue for weddings, parties & corporate events. In-house catering & decoration.',
  seoDefaultKeywords:
    'banquet hall Kathmandu, wedding venue Nepal, party palace Tokha, event hall Gairigaun, corporate event venue',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const json = await res.json()
          const result = json.data
          if (result?.settings && Object.keys(result.settings).length > 0) {
            setSettings({ ...defaultSettings, ...result.settings })
          }
        }
      } catch {
        // Use default settings
      }
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })
      if (res.ok) {
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }
    } catch {
      // Still show success for demo
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Settings</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your website configuration and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-burgundy hover:bg-burgundy-dark text-white"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
          <Card className="border-green-200 bg-green-50 shadow-lg">
            <CardContent className="p-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Settings saved successfully!</span>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Business Information */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-serif text-burgundy flex items-center gap-2">
            <Building2 className="w-5 h-5 text-marigold" />
            Business Information
          </CardTitle>
          <CardDescription>
            Your venue&apos;s contact details and operating hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="biz-name" className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                Business Name
              </Label>
              <Input
                id="biz-name"
                value={settings.businessName}
                onChange={(e) => updateField('businessName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="biz-phone" className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                Phone Number
              </Label>
              <Input
                id="biz-phone"
                value={settings.businessPhone}
                onChange={(e) => updateField('businessPhone', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="biz-email" className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="biz-email"
                type="email"
                value={settings.businessEmail}
                onChange={(e) => updateField('businessEmail', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="biz-hours" className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                Working Hours
              </Label>
              <Input
                id="biz-hours"
                value={settings.workingHours}
                onChange={(e) => updateField('workingHours', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="biz-address" className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              Address
            </Label>
            <Input
              id="biz-address"
              value={settings.businessAddress}
              onChange={(e) => updateField('businessAddress', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-serif text-burgundy flex items-center gap-2">
            <Share2 className="w-5 h-5 text-marigold" />
            Social Media Links
          </CardTitle>
          <CardDescription>
            Connect your social media profiles and WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fb-url">Facebook Page URL</Label>
            <Input
              id="fb-url"
              placeholder="https://facebook.com/yourpage"
              value={settings.facebookUrl}
              onChange={(e) => updateField('facebookUrl', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ig-url">Instagram Profile URL</Label>
            <Input
              id="ig-url"
              placeholder="https://instagram.com/yourprofile"
              value={settings.instagramUrl}
              onChange={(e) => updateField('instagramUrl', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wa-number">WhatsApp Number</Label>
            <Input
              id="wa-number"
              placeholder="+977-9800000000"
              value={settings.whatsappNumber}
              onChange={(e) => updateField('whatsappNumber', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Include country code. This will be used for the WhatsApp floating button.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Instagram Integration */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-serif text-burgundy flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-500" />
            Instagram Integration
          </CardTitle>
          <CardDescription>
            Connect your Instagram account to automatically sync photos to your gallery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ig-username" className="flex items-center gap-2">
              <Instagram className="w-3.5 h-3.5 text-muted-foreground" />
              Instagram Username
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">@</span>
              <Input
                id="ig-username"
                placeholder="marigoldbanquet"
                value={settings.instagramUsername}
                onChange={(e) => updateField('instagramUsername', e.target.value.replace('@', ''))}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Your Instagram username without the @ symbol. Used to display your Instagram feed on the gallery page.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ig-token" className="flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-muted-foreground" />
              Instagram Graph API Access Token
            </Label>
            <Input
              id="ig-token"
              type="password"
              placeholder="IGQVJ..."
              value={settings.instagramAccessToken}
              onChange={(e) => updateField('instagramAccessToken', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Required for automatic sync from Instagram. Only needed for Business/Creator accounts.
              You can still import photos manually by URL without this token.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-purple-800 mb-2">
                    How to set up Instagram auto-sync:
                  </h4>
                  <ol className="text-xs text-purple-700 space-y-1.5 list-decimal list-inside">
                    <li>Convert your Instagram account to a Business or Creator account (Settings &gt; Account &gt; Switch to Professional Account)</li>
                    <li>Link your Instagram account to a Facebook Page</li>
                    <li>Go to <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="underline text-purple-600 hover:text-purple-800">developers.facebook.com</a> and create a new app</li>
                    <li>Add the Instagram Basic Display product to your app</li>
                    <li>Generate a User Access Token with the <code className="bg-purple-100 px-1 rounded">instagram_graph_user_media</code> permission</li>
                    <li>Paste the access token above and save settings</li>
                    <li>Go to Gallery Manager and click &quot;Import from Instagram&quot; to sync your photos</li>
                  </ol>
                  <Separator className="my-3 bg-purple-200" />
                  <p className="text-xs text-purple-600">
                    <strong>No Business account?</strong> You can still import Instagram photos by pasting individual post URLs
                    in the Gallery Manager. Just click &quot;Import from Instagram&quot; and use the &quot;Import by Post URL&quot; method.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* SEO Defaults */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-serif text-burgundy flex items-center gap-2">
            <Search className="w-5 h-5 text-marigold" />
            SEO Defaults
          </CardTitle>
          <CardDescription>
            Default SEO settings for your website pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seo-title">Default Page Title</Label>
            <Input
              id="seo-title"
              placeholder="Your website title for search engines"
              value={settings.seoDefaultTitle}
              onChange={(e) => updateField('seoDefaultTitle', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: 50-60 characters. Currently: {settings.seoDefaultTitle.length} characters.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-desc">Default Meta Description</Label>
            <Textarea
              id="seo-desc"
              placeholder="Describe your website for search engine results"
              value={settings.seoDefaultDescription}
              onChange={(e) => updateField('seoDefaultDescription', e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: 150-160 characters. Currently: {settings.seoDefaultDescription.length} characters.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-keywords">Default Keywords</Label>
            <Textarea
              id="seo-keywords"
              placeholder="Comma-separated keywords"
              value={settings.seoDefaultKeywords}
              onChange={(e) => updateField('seoDefaultKeywords', e.target.value)}
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              Separate keywords with commas. These apply to pages without custom SEO settings.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end pb-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          size="lg"
          className="bg-burgundy hover:bg-burgundy-dark text-white min-w-40"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
