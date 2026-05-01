'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Palette,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Gem,
  Layers,
  CheckCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Switch } from '@/components/ui/switch'

interface Decoration {
  id: string
  name: string
  slug: string
  category: string
  tier: string
  description?: string | null
  includes?: string | null
  price: number
  isActive: boolean
  order: number
  createdAt: string
}

const decorationCategories = [
  { value: 'royal', label: 'Royal' },
  { value: 'floral', label: 'Floral' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'traditional_nepali', label: 'Traditional Nepali' },
  { value: 'modern_glam', label: 'Modern Glam' },
  { value: 'rustic', label: 'Rustic' },
  { value: 'garden', label: 'Garden' },
]

const decorationTiers = [
  { value: 'basic', label: 'Basic' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxury' },
]

const tierColors: Record<string, string> = {
  basic: 'bg-blue-100 text-blue-700 border-blue-200',
  premium: 'bg-marigold/10 text-marigold-dark border-marigold/30',
  luxury: 'bg-purple-100 text-purple-700 border-purple-200',
}

const mockDecorations: Decoration[] = [
  {
    id: '1', name: 'Royal Mughal', slug: 'royal-mughal', category: 'royal', tier: 'luxury',
    description: 'Opulent Mughal-inspired decoration with rich fabrics and ornate details.',
    includes: '["Stage backdrop","Floral archway","Crystal centerpieces","Draped ceiling","LED lighting"]',
    price: 350000, isActive: true, order: 1, createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: '2', name: 'Enchanted Garden', slug: 'enchanted-garden', category: 'floral', tier: 'premium',
    description: 'A fairy-tale garden setup with lush florals and greenery.',
    includes: '["Floral archway","Garden pathway","Table centerpieces","Hanging installations","Candle accents"]',
    price: 250000, isActive: true, order: 2, createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: '3', name: 'Minimal Elegance', slug: 'minimal-elegance', category: 'minimalist', tier: 'basic',
    description: 'Clean lines and subtle elegance for the modern couple.',
    includes: '["Simple stage setup","White draping","Minimal floral accents","LED uplighting"]',
    price: 100000, isActive: true, order: 3, createdAt: '2026-02-01T08:00:00Z',
  },
  {
    id: '4', name: 'Traditional Newari', slug: 'traditional-newari', category: 'traditional_nepali', tier: 'premium',
    description: 'Authentic Newari cultural decoration with traditional elements.',
    includes: '["Traditional oil lamps","Marigold garlands","Newari motifs","Brass utensils","Hand-woven textiles"]',
    price: 200000, isActive: true, order: 4, createdAt: '2026-02-10T08:00:00Z',
  },
  {
    id: '5', name: 'Modern Glamour', slug: 'modern-glamour', category: 'modern_glam', tier: 'luxury',
    description: 'Glamorous modern design with metallic accents and dramatic lighting.',
    includes: '["Sequin backdrop","Crystal chandeliers","Gold-rimmed tableware","Fog machine","Pin-spot lighting"]',
    price: 400000, isActive: true, order: 5, createdAt: '2026-03-01T08:00:00Z',
  },
  {
    id: '6', name: 'Rustic Charm', slug: 'rustic-charm', category: 'rustic', tier: 'basic',
    description: 'Warm, earthy decoration with wood and natural textures.',
    includes: '["Wooden accents","Burlap runners","Mason jar centerpieces","Fairy lights","Wildflower arrangements"]',
    price: 120000, isActive: false, order: 6, createdAt: '2026-03-15T08:00:00Z',
  },
]

function getCategoryLabel(value: string) {
  return decorationCategories.find((c) => c.value === value)?.label || value
}

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString('en-NP')}`
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const emptyForm = {
  name: '',
  slug: '',
  category: 'royal',
  tier: 'basic',
  description: '',
  includes: '',
  price: 0,
  isActive: true,
  order: 0,
}

export default function DecorationPage() {
  const [decorations, setDecorations] = useState<Decoration[]>(mockDecorations)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingDecoration, setEditingDecoration] = useState<Decoration | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const fetchDecorations = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/decorations?all=true')
      if (res.ok) {
        const data = await res.json()
        if (data.decorations && data.decorations.length > 0) {
          setDecorations(data.decorations)
        }
      }
    } catch {
      // Use mock data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDecorations()
  }, [fetchDecorations])

  const handleNameChange = (name: string) => {
    setForm((prev) => ({ ...prev, name, slug: generateSlug(name) }))
  }

  const openNewDialog = () => {
    setEditingDecoration(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (decoration: Decoration) => {
    setEditingDecoration(decoration)
    let includesStr = ''
    if (decoration.includes) {
      try {
        const parsed = JSON.parse(decoration.includes)
        if (Array.isArray(parsed)) {
          includesStr = parsed.join(', ')
        } else {
          includesStr = decoration.includes
        }
      } catch {
        includesStr = decoration.includes
      }
    }
    setForm({
      name: decoration.name,
      slug: decoration.slug,
      category: decoration.category,
      tier: decoration.tier,
      description: decoration.description || '',
      includes: includesStr,
      price: decoration.price,
      isActive: decoration.isActive,
      order: decoration.order,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.category || !form.tier) return

    const includesArray = form.includes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const includesJson = JSON.stringify(includesArray)

    const payload = {
      ...form,
      includes: includesJson,
    }

    try {
      if (editingDecoration) {
        const res = await fetch('/api/decorations', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingDecoration.id, ...payload }),
        })
        if (res.ok) {
          setDecorations((prev) =>
            prev.map((d) =>
              d.id === editingDecoration.id
                ? ({ ...d, ...payload } as Decoration)
                : d
            )
          )
        }
      } else {
        const res = await fetch('/api/decorations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const data = await res.json()
          if (data.decoration) {
            setDecorations((prev) => [data.decoration, ...prev])
          }
        }
      }
    } catch {
      // Local update fallback
      if (editingDecoration) {
        setDecorations((prev) =>
          prev.map((d) =>
            d.id === editingDecoration.id
              ? ({ ...d, ...payload } as Decoration)
              : d
          )
        )
      } else {
        const newDecoration: Decoration = {
          id: `local-${Date.now()}`,
          ...payload,
          createdAt: new Date().toISOString(),
        }
        setDecorations((prev) => [newDecoration, ...prev])
      }
    }

    setFormDialogOpen(false)
    setEditingDecoration(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/decorations?id=${id}`, { method: 'DELETE' })
    } catch {
      // Continue with local delete
    }
    setDecorations((prev) => prev.filter((d) => d.id !== id))
  }

  const toggleActive = async (decoration: Decoration) => {
    const newStatus = !decoration.isActive
    const updated = { ...decoration, isActive: newStatus }

    try {
      await fetch('/api/decorations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: decoration.id, isActive: newStatus }),
      })
    } catch {
      // Continue with local update
    }

    setDecorations((prev) =>
      prev.map((d) => (d.id === decoration.id ? updated : d))
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Decoration Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage decoration themes and packages
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchDecorations}
            variant="outline"
            size="sm"
            className="text-burgundy border-burgundy/20 hover:bg-burgundy/5"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={openNewDialog}
            size="sm"
            className="bg-burgundy hover:bg-burgundy-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Theme
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{decorations.length}</p>
            <p className="text-xs text-muted-foreground">Total Themes</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {decorations.filter((d) => d.isActive).length}
            </p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-marigold-dark">
              {new Set(decorations.map((d) => d.category)).size}
            </p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {decorations.filter((d) => d.tier === 'luxury').length}
            </p>
            <p className="text-xs text-muted-foreground">Luxury Tier</p>
          </CardContent>
        </Card>
      </div>

      {/* Decorations Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {decorations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No decoration themes yet. Add your first theme!
                    </TableCell>
                  </TableRow>
                ) : (
                  decorations.map((decoration) => (
                    <TableRow key={decoration.id}>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-burgundy-dark truncate">{decoration.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{decoration.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs bg-ivory border-burgundy/10 text-burgundy">
                          <Palette className="w-3 h-3 mr-1" />
                          {getCategoryLabel(decoration.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${tierColors[decoration.tier] || ''}`}>
                          {decoration.tier.charAt(0).toUpperCase() + decoration.tier.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm font-semibold text-marigold-dark">
                        {formatPrice(decoration.price)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {decoration.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 border">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                              Inactive
                            </Badge>
                          )}
                          <button
                            onClick={() => toggleActive(decoration)}
                            className="text-muted-foreground hover:text-burgundy"
                            title={decoration.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {decoration.isActive ? (
                              <ToggleRight className="w-5 h-5 text-green-600" />
                            ) : (
                              <ToggleLeft className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(decoration)}
                            className="text-burgundy hover:bg-burgundy/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(decoration.id)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Palette className="w-5 h-5" />
              {editingDecoration ? 'Edit Decoration Theme' : 'New Decoration Theme'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="dec-name">Name</Label>
              <Input
                id="dec-name"
                placeholder="Enter decoration theme name..."
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="dec-slug">Slug</Label>
              <Input
                id="dec-slug"
                placeholder="auto-generated-from-name"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">Auto-generated from name. You can customize it.</p>
            </div>

            {/* Category & Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {decorationCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tier</Label>
                <Select
                  value={form.tier}
                  onValueChange={(value) => setForm({ ...form, tier: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {decorationTiers.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="dec-description">Description</Label>
              <Textarea
                id="dec-description"
                placeholder="Describe the decoration theme..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Includes */}
            <div className="space-y-2">
              <Label htmlFor="dec-includes">Includes (comma-separated)</Label>
              <Textarea
                id="dec-includes"
                placeholder="Stage backdrop, Floral archway, Crystal centerpieces, LED lighting"
                value={form.includes}
                onChange={(e) => setForm({ ...form, includes: e.target.value })}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Separate each item with a comma. Stored as a list.</p>
            </div>

            {/* Price & Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dec-price">Price (NPR)</Label>
                <Input
                  id="dec-price"
                  type="number"
                  placeholder="350000"
                  value={form.price || ''}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dec-order">Display Order</Label>
                <Input
                  id="dec-order"
                  type="number"
                  placeholder="0"
                  value={form.order || ''}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-sm font-medium">Active</Label>
                <p className="text-xs text-muted-foreground">
                  {form.isActive
                    ? 'This theme is visible to visitors'
                    : 'This theme is hidden from visitors'}
                </p>
              </div>
              <Switch
                checked={form.isActive}
                onCheckedChange={(checked) => setForm({ ...form, isActive: checked })}
              />
            </div>

            {/* Save/Cancel */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setFormDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!form.name || !form.category || !form.tier}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {editingDecoration ? 'Update Theme' : 'Create Theme'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
