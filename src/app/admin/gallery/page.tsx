'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'
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

interface GalleryPhoto {
  id: string
  url: string
  caption?: string | null
  category: string
  eventDate?: string | null
  isActive: boolean
  order: number
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

const mockPhotos: GalleryPhoto[] = [
  { id: '1', url: '', caption: 'Grand Wedding Setup', category: 'weddings', eventDate: '2026-03-15', isActive: true, order: 1 },
  { id: '2', url: '', caption: 'Floral Mandap Decoration', category: 'weddings', eventDate: '2026-03-15', isActive: true, order: 2 },
  { id: '3', url: '', caption: 'Corporate Conference Setup', category: 'corporate', eventDate: '2026-02-20', isActive: true, order: 3 },
  { id: '4', url: '', caption: 'Birthday Party - Tropical Theme', category: 'parties', eventDate: '2026-03-01', isActive: true, order: 4 },
  { id: '5', url: '', caption: 'Nepali Thali Spread', category: 'food', eventDate: null, isActive: true, order: 5 },
  { id: '6', url: '', caption: 'Rose Gold Centerpiece', category: 'decoration', eventDate: null, isActive: true, order: 6 },
  { id: '7', url: '', caption: 'Main Banquet Hall View', category: 'venue_spaces', eventDate: null, isActive: true, order: 7 },
  { id: '8', url: '', caption: 'Engagement Ceremony', category: 'weddings', eventDate: '2026-02-28', isActive: true, order: 8 },
  { id: '9', url: '', caption: 'Kids Birthday Party', category: 'parties', eventDate: '2026-01-15', isActive: true, order: 9 },
  { id: '10', url: '', caption: 'Buffet Counter Setup', category: 'food', eventDate: null, isActive: true, order: 10 },
  { id: '11', url: '', caption: 'Marigold Flower Arch', category: 'decoration', eventDate: null, isActive: true, order: 11 },
  { id: '12', url: '', caption: 'Garden Terrace View', category: 'venue_spaces', eventDate: null, isActive: true, order: 12 },
]

const gradientPlaceholders = [
  'from-pink-400 to-rose-400',
  'from-amber-400 to-orange-400',
  'from-teal-400 to-emerald-400',
  'from-purple-400 to-violet-400',
  'from-blue-400 to-cyan-400',
  'from-rose-400 to-pink-300',
]

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(mockPhotos)
  const [activeCategory, setActiveCategory] = useState('all')
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null)
  const [loading, setLoading] = useState(false)
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
      // Use mock data
    } finally {
      setLoading(false)
    }
  }, [activeCategory])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory)

  const handleAddPhoto = async () => {
    if (!newPhoto.url || !newPhoto.category) return
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhoto),
      })
      if (res.ok) {
        const json = await res.json()
        const created = json.data
        if (created) {
          setPhotos((prev) => [created, ...prev])
        }
        setAddDialogOpen(false)
        setNewPhoto({ url: '', caption: '', category: 'weddings' })
      }
    } catch {
      // Add locally anyway
      const photo: GalleryPhoto = {
        id: `local-${Date.now()}`,
        url: newPhoto.url,
        caption: newPhoto.caption || null,
        category: newPhoto.category,
        isActive: true,
        order: 0,
      }
      setPhotos((prev) => [photo, ...prev])
      setAddDialogOpen(false)
      setNewPhoto({ url: '', caption: '', category: 'weddings' })
    }
  }

  const handleDeletePhoto = async (id: string) => {
    try {
      await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    } catch {
      // Continue with local delete
    }
    setPhotos((prev) => prev.filter((p) => p.id !== id))
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
      }
    } catch {
      setPhotos((prev) =>
        prev.map((p) => (p.id === editingPhoto.id ? { ...p, ...editForm } : p))
      )
    }
    setEditDialogOpen(false)
    setEditingPhoto(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Gallery Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your photo gallery across categories
          </p>
        </div>
        <div className="flex gap-2">
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
            onClick={() => setAddDialogOpen(true)}
            size="sm"
            className="bg-burgundy hover:bg-burgundy-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Photo
          </Button>
        </div>
      </div>

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
                    categoryColors[photo.category] || 'bg-gray-100 text-gray-800 border-gray-200'
                  }`}
                >
                  {categories.find((c) => c.value === photo.category)?.label || photo.category}
                </Badge>
              </div>
            </div>
            {/* Caption */}
            <CardContent className="p-3">
              <p className="text-sm font-medium text-burgundy-dark truncate">
                {photo.caption || 'Untitled'}
              </p>
              {photo.url && (
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-marigold flex items-center gap-1 mt-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  View original
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-burgundy font-serif">No Photos Found</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {activeCategory !== 'all'
                ? 'No photos in this category yet.'
                : 'Your gallery is empty. Add your first photo!'}
            </p>
            <Button
              onClick={() => setAddDialogOpen(true)}
              className="mt-4 bg-burgundy hover:bg-burgundy-dark text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
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
    </div>
  )
}
