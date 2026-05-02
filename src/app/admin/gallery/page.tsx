'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  ExternalLink,
  Instagram,
  Download,
  Link2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Settings,
} from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

interface GalleryPhoto {
  id: string
  url: string
  caption?: string | null
  category: string
  eventDate?: string | null
  isActive: boolean
  order: number
  source: string
  instagramPermalink?: string | null
  instagramMediaId?: string | null
}

const categories = [
  { value: 'all', label: 'All Photos' },
  { value: 'weddings', label: 'Weddings' },
  { value: 'parties', label: 'Parties' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'decoration', label: 'Decoration' },
  { value: 'food', label: 'Food' },
  { value: 'venue_spaces', label: 'Venue Spaces' },
]

const categoryColors: Record<string, string> = {
  weddings: 'bg-pink-100 text-pink-800 border-pink-200',
  parties: 'bg-purple-100 text-purple-800 border-purple-200',
  corporate: 'bg-blue-100 text-blue-800 border-blue-200',
  decoration: 'bg-amber-100 text-amber-800 border-amber-200',
  food: 'bg-orange-100 text-orange-800 border-orange-200',
  venue_spaces: 'bg-teal-100 text-teal-800 border-teal-200',
}

const gradientPlaceholders = [
  'from-pink-400 to-rose-400',
  'from-amber-400 to-orange-400',
  'from-teal-400 to-emerald-400',
  'from-purple-400 to-violet-400',
  'from-blue-400 to-cyan-400',
  'from-rose-400 to-pink-300',
]

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [instagramDialogOpen, setInstagramDialogOpen] = useState(false)
  const [instagramSettingsDialogOpen, setInstagramSettingsDialogOpen] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null)
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<{
    success: boolean
    message: string
    imported?: number
    skipped?: number
  } | null>(null)
  const [newPhoto, setNewPhoto] = useState({
    url: '',
    caption: '',
    category: 'weddings',
  })
  const [editForm, setEditForm] = useState({
    url: '',
    caption: '',
    category: 'weddings',
    eventDate: '',
    isActive: true,
  })
  const [instagramImport, setInstagramImport] = useState({
    postUrl: '',
    category: 'weddings',
  })
  const [instagramBulkUrls, setInstagramBulkUrls] = useState('')
  const [instagramSettings, setInstagramSettings] = useState({
    username: '',
    accessToken: '',
    category: 'weddings',
  })
  const [savingSettings, setSavingSettings] = useState(false)

  const fetchPhotos = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/gallery?all=true${activeCategory !== 'all' ? `&category=${activeCategory}` : ''}`)
      if (res.ok) {
        const json = await res.json()
        const result = json.data
        if (result?.photos) {
          setPhotos(result.photos)
        }
      }
    } catch {
      toast.error('Failed to load data from server. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [activeCategory])

  // Also fetch Instagram settings
  const fetchInstagramSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/instagram?limit=1')
      if (res.ok) {
        const json = await res.json()
        const result = json.data
        if (result?.username) {
          setInstagramSettings((prev) => ({ ...prev, username: result.username }))
        }
      }
    } catch {
      toast.error('Failed to load settings. Please try again.')
    }
  }, [])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  useEffect(() => {
    fetchInstagramSettings()
  }, [fetchInstagramSettings])

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory)

  const handleAddPhoto = async () => {
    if (!newPhoto.url || !newPhoto.category) return
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newPhoto, source: 'manual' }),
      })
      if (res.ok) {
        const json = await res.json()
        const created = json.data
        if (created) {
          setPhotos((prev) => [created, ...prev])
        }
        toast.success('Photo added successfully')
        setAddDialogOpen(false)
        setNewPhoto({ url: '', caption: '', category: 'weddings' })
      } else {
        toast.error('Failed to add photo. Please try again.')
      }
    } catch {
      toast.error('Failed to add photo. Please try again.')
    }
  }

  const handleDeletePhoto = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== id))
        toast.success('Photo deleted')
      } else {
        toast.error('Failed to delete photo. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    }
  }

  const openEditDialog = (photo: GalleryPhoto) => {
    setEditingPhoto(photo)
    setEditForm({
      url: photo.url,
      caption: photo.caption || '',
      category: photo.category,
      eventDate: photo.eventDate || '',
      isActive: photo.isActive,
    })
    setEditDialogOpen(true)
  }

  const handleEditPhoto = async () => {
    if (!editingPhoto) return
    try {
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingPhoto.id, ...editForm }),
      })
      if (res.ok) {
        const json = await res.json()
        const updated = json.data
        if (updated) {
          setPhotos((prev) =>
            prev.map((p) => (p.id === editingPhoto.id ? updated : p))
          )
        } else {
          setPhotos((prev) =>
            prev.map((p) => (p.id === editingPhoto.id ? { ...p, ...editForm } : p))
          )
        }
        toast.success('Photo updated successfully')
      } else {
        toast.error('Failed to update photo. Please try again.')
      }
    } catch {
      toast.error('Failed to update photo. Please try again.')
    }
    setEditDialogOpen(false)
    setEditingPhoto(null)
  }

  // ── Instagram Sync with Graph API ──
  const handleInstagramSync = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync_graph_api',
          accessToken: instagramSettings.accessToken || undefined,
          category: instagramSettings.category,
          limit: 24,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSyncResult({
          success: true,
          message: `Synced ${json.data.synced} photos from Instagram (@${json.data.username})`,
          imported: json.data.synced,
          skipped: json.data.skipped,
        })
        fetchPhotos()
      } else {
        setSyncResult({
          success: false,
          message: json.error || 'Failed to sync from Instagram',
        })
      }
    } catch {
      setSyncResult({
        success: false,
        message: 'Network error. Please try again.',
      })
    } finally {
      setSyncing(false)
    }
  }

  // ── Import from single Instagram post URL ──
  const handleInstagramUrlImport = async () => {
    if (!instagramImport.postUrl) return
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'import_url',
          postUrl: instagramImport.postUrl,
          category: instagramImport.category,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSyncResult({
          success: true,
          message: 'Instagram post imported successfully!',
          imported: 1,
        })
        setInstagramImport({ postUrl: '', category: 'weddings' })
        fetchPhotos()
      } else {
        setSyncResult({
          success: false,
          message: json.error || 'Failed to import Instagram post',
        })
      }
    } catch {
      setSyncResult({
        success: false,
        message: 'Network error. Please try again.',
      })
    } finally {
      setSyncing(false)
    }
  }

  // ── Bulk import from multiple Instagram URLs ──
  const handleBulkImport = async () => {
    const urls = instagramBulkUrls
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0)
    if (urls.length === 0) return
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'import_urls_bulk',
          urls,
          category: instagramImport.category,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSyncResult({
          success: true,
          message: `Imported ${json.data.imported} of ${urls.length} Instagram posts`,
          imported: json.data.imported,
          skipped: json.data.failed,
        })
        setInstagramBulkUrls('')
        fetchPhotos()
      } else {
        setSyncResult({
          success: false,
          message: json.error || 'Bulk import failed',
        })
      }
    } catch {
      setSyncResult({
        success: false,
        message: 'Network error. Please try again.',
      })
    } finally {
      setSyncing(false)
    }
  }

  // ── Save Instagram settings to SiteSetting ──
  const handleSaveInstagramSettings = async () => {
    setSavingSettings(true)
    try {
      const settingsToSave: Record<string, string> = {}
      if (instagramSettings.username) {
        settingsToSave.instagramUsername = instagramSettings.username
      }
      if (instagramSettings.accessToken) {
        settingsToSave.instagramAccessToken = instagramSettings.accessToken
      }
      // Also update the Instagram URL
      if (instagramSettings.username) {
        settingsToSave.instagramUrl = `https://instagram.com/${instagramSettings.username}`
      }
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: settingsToSave }),
      })
      setInstagramSettingsDialogOpen(false)
    } catch {
      toast.error('Failed to save Instagram settings. Please try again.')
    } finally {
      setSavingSettings(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Gallery Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your photo gallery and sync from Instagram
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={fetchPhotos}
            variant="outline"
            size="sm"
            className="text-burgundy border-burgundy/20 hover:bg-burgundy/5"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setInstagramDialogOpen(true)}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Instagram className="w-4 h-4 mr-2" />
            Import from Instagram
          </Button>
          <Button
            onClick={() => setAddDialogOpen(true)}
            size="sm"
            className="bg-burgundy hover:bg-burgundy-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Photo
          </Button>
        </div>
      </div>

      {/* Sync Result Banner */}
      {syncResult && (
        <Card className={`border-0 shadow-md ${syncResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <CardContent className="p-4 flex items-center gap-2">
            {syncResult.success ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span className={`text-sm font-medium ${syncResult.success ? 'text-green-800' : 'text-red-800'}`}>
              {syncResult.message}
            </span>
            <button
              onClick={() => setSyncResult(null)}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              &times;
            </button>
          </CardContent>
        </Card>
      )}

      {/* Category Tabs */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="flex flex-wrap h-auto gap-1 bg-ivory">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="data-[state=active]:bg-burgundy data-[state=active]:text-white text-sm"
                >
                  {cat.label}
                  {cat.value !== 'all' && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({photos.filter((p) => p.category === cat.value).length})
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo, index) => (
          <Card
            key={photo.id}
            className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all"
          >
            {/* Image or Placeholder */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {photo.url ? (
                <img
                  src={photo.url}
                  alt={photo.caption || 'Gallery photo'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${
                    gradientPlaceholders[index % gradientPlaceholders.length]
                  } flex items-center justify-center`}
                >
                  <ImageIcon className="w-12 h-12 text-white/60" />
                </div>
              )}
              {/* Instagram badge */}
              {photo.source === 'instagram' && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs flex items-center gap-1">
                    <Instagram className="w-3 h-3" />
                    Instagram
                  </Badge>
                </div>
              )}
              {/* Edit & Delete button overlay */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 shadow-lg bg-white/90 hover:bg-white"
                  onClick={() => openEditDialog(photo)}
                >
                  <Edit className="w-4 h-4 text-burgundy" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8 shadow-lg"
                  onClick={() => handleDeletePhoto(photo.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {/* Category badge */}
              <div className="absolute bottom-2 left-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    photo.source === 'instagram'
                      ? 'bg-white/80 backdrop-blur-sm text-purple-700 border-purple-200'
                      : categoryColors[photo.category] || 'bg-gray-100 text-gray-800 border-gray-200'
                  }`}
                >
                  {photo.source === 'instagram' ? (
                    <span className="flex items-center gap-1">
                      <Instagram className="w-3 h-3" />
                      {categories.find((c) => c.value === photo.category)?.label || photo.category}
                    </span>
                  ) : (
                    categories.find((c) => c.value === photo.category)?.label || photo.category
                  )}
                </Badge>
              </div>
            </div>
            {/* Caption */}
            <CardContent className="p-3">
              <p className="text-sm font-medium text-burgundy-dark truncate">
                {photo.caption || 'Untitled'}
              </p>
              <div className="flex items-center justify-between mt-1">
                {photo.instagramPermalink && (
                  <a
                    href={photo.instagramPermalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-500 hover:text-purple-700 flex items-center gap-1"
                  >
                    <Instagram className="w-3 h-3" />
                    View on Instagram
                  </a>
                )}
                {photo.url && !photo.instagramPermalink && (
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-marigold flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View original
                  </a>
                )}
                {!photo.url && <span />}
                <Badge variant="outline" className="text-xs">
                  {photo.isActive ? 'Active' : 'Hidden'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && !loading && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-burgundy font-serif">No Photos Found</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {activeCategory !== 'all'
                ? 'No photos in this category yet.'
                : 'Your gallery is empty. Add photos or import from Instagram!'}
            </p>
            <div className="flex gap-2 justify-center mt-4">
              <Button
                onClick={() => setInstagramDialogOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Import from Instagram
              </Button>
              <Button
                onClick={() => setAddDialogOpen(true)}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Photo Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Photo
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo-url">Image URL</Label>
              <Input
                id="photo-url"
                placeholder="https://example.com/photo.jpg"
                value={newPhoto.url}
                onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Enter the URL of the image you want to add
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo-caption">Caption</Label>
              <Textarea
                id="photo-caption"
                placeholder="Describe this photo..."
                value={newPhoto.caption}
                onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newPhoto.category}
                onValueChange={(value) => setNewPhoto({ ...newPhoto, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c.value !== 'all').map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddPhoto}
                disabled={!newPhoto.url || !newPhoto.category}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                Add Photo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Photo Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Photo
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-photo-url">Image URL</Label>
              <Input
                id="edit-photo-url"
                placeholder="https://example.com/photo.jpg"
                value={editForm.url}
                onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-photo-caption">Caption</Label>
              <Textarea
                id="edit-photo-caption"
                placeholder="Describe this photo..."
                value={editForm.caption}
                onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={editForm.category}
                onValueChange={(value) => setEditForm({ ...editForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c.value !== 'all').map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-photo-date">Event Date</Label>
              <Input
                id="edit-photo-date"
                type="date"
                value={editForm.eventDate}
                onChange={(e) => setEditForm({ ...editForm, eventDate: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="edit-photo-active">Active</Label>
              <input
                id="edit-photo-active"
                type="checkbox"
                checked={editForm.isActive}
                onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                className="rounded border-gray-300"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleEditPhoto}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Instagram Import Dialog */}
      <Dialog open={instagramDialogOpen} onOpenChange={setInstagramDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Instagram className="w-5 h-5 text-pink-500" />
              Import from Instagram
            </DialogTitle>
            <DialogDescription>
              Sync photos from your Instagram profile to the gallery
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Method 1: Auto Sync with Graph API */}
            <Card className="border border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Download className="w-4 h-4 text-purple-500" />
                  Auto Sync (Business Accounts)
                </CardTitle>
                <CardDescription className="text-xs">
                  Requires Instagram Business/Creator account with a Facebook Access Token
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm">Category for imported photos</Label>
                  <Select
                    value={instagramSettings.category}
                    onValueChange={(value) => setInstagramSettings({ ...instagramSettings, category: value })}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter((c) => c.value !== 'all').map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleInstagramSync}
                  disabled={syncing}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {syncing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <Instagram className="w-4 h-4 mr-2" />
                      Sync from Instagram
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Configure your Access Token in Instagram Settings below
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* Method 2: Single URL Import */}
            <Card className="border border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-blue-500" />
                  Import by Post URL
                </CardTitle>
                <CardDescription className="text-xs">
                  Paste an Instagram post URL to import that photo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm">Instagram Post URL</Label>
                  <Input
                    placeholder="https://www.instagram.com/p/ABC123..."
                    value={instagramImport.postUrl}
                    onChange={(e) => setInstagramImport({ ...instagramImport, postUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Category</Label>
                  <Select
                    value={instagramImport.category}
                    onValueChange={(value) => setInstagramImport({ ...instagramImport, category: value })}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter((c) => c.value !== 'all').map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleInstagramUrlImport}
                  disabled={syncing || !instagramImport.postUrl}
                  variant="outline"
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  {syncing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4 mr-2" />
                      Import Post
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Separator />

            {/* Method 3: Bulk URL Import */}
            <Card className="border border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-green-500" />
                  Bulk Import URLs
                </CardTitle>
                <CardDescription className="text-xs">
                  Paste multiple Instagram post URLs, one per line (max 25)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm">Instagram Post URLs</Label>
                  <Textarea
                    placeholder={"https://www.instagram.com/p/ABC123...\nhttps://www.instagram.com/p/DEF456...\nhttps://www.instagram.com/p/GHI789..."}
                    value={instagramBulkUrls}
                    onChange={(e) => setInstagramBulkUrls(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button
                  onClick={handleBulkImport}
                  disabled={syncing || !instagramBulkUrls.trim()}
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                >
                  {syncing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Import All URLs
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Separator />

            {/* Instagram Settings Button */}
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={() => {
                setInstagramDialogOpen(false)
                setInstagramSettingsDialogOpen(true)
              }}
            >
              <Settings className="w-4 h-4 mr-2" />
              Instagram Settings (Access Token & Username)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Instagram Settings Dialog */}
      <Dialog open={instagramSettingsDialogOpen} onOpenChange={setInstagramSettingsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Instagram Settings
            </DialogTitle>
            <DialogDescription>
              Configure your Instagram connection for auto-sync
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Instagram Username</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">@</span>
                <Input
                  placeholder="marigoldbanquet"
                  value={instagramSettings.username}
                  onChange={(e) =>
                    setInstagramSettings({ ...instagramSettings, username: e.target.value.replace('@', '') })
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Your Instagram username without the @ symbol
              </p>
            </div>

            <div className="space-y-2">
              <Label>Instagram Graph API Access Token</Label>
              <Input
                type="password"
                placeholder="IGQVJ..."
                value={instagramSettings.accessToken}
                onChange={(e) =>
                  setInstagramSettings({ ...instagramSettings, accessToken: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Required for auto-sync. Get your token from Facebook Developer Portal.
                Only needed if you have an Instagram Business/Creator account.
              </p>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">
                  How to get your Access Token:
                </h4>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Go to developers.facebook.com and create a Facebook App</li>
                  <li>Add Instagram Basic Display product to your app</li>
                  <li>Go to Settings and add your Instagram account as a test user</li>
                  <li>Generate a User Token with instagram_graph_user_media permission</li>
                  <li>Paste the token above and save</li>
                </ol>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  Note: You need an Instagram Business or Creator account for this.
                  If you have a personal account, use the &quot;Import by Post URL&quot; method instead.
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setInstagramSettingsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveInstagramSettings}
                disabled={savingSettings}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {savingSettings ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
