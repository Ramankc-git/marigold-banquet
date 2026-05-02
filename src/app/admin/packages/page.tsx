'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Package,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Filter,
} from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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

interface PackageItem {
  id: string
  name: string
  slug: string
  category: string
  tier: string
  description?: string | null
  price: number
  priceUnit: string
  includes?: string | null
  isActive: boolean
  order: number
  createdAt: string
}

const categories = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'party', label: 'Party' },
  { value: 'corporate', label: 'Corporate' },
]

const tiers = [
  { value: 'silver', label: 'Silver' },
  { value: 'gold', label: 'Gold' },
  { value: 'platinum', label: 'Platinum' },
  { value: 'basic', label: 'Basic' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxury' },
]

const priceUnits = [
  { value: 'per_plate', label: 'Per Plate' },
  { value: 'per_event', label: 'Per Event' },
  { value: 'half_day', label: 'Half Day' },
  { value: 'full_day', label: 'Full Day' },
]

const tierColors: Record<string, string> = {
  silver: 'bg-gray-100 text-gray-700 border-gray-300',
  gold: 'bg-marigold/10 text-marigold-dark border-marigold/30',
  platinum: 'bg-purple-100 text-purple-700 border-purple-300',
  basic: 'bg-blue-100 text-blue-700 border-blue-300',
  premium: 'bg-rose-gold/10 text-rose-gold border-rose-gold/30',
  luxury: 'bg-amber-100 text-amber-700 border-amber-300',
}

const categoryColors: Record<string, string> = {
  wedding: 'bg-pink-100 text-pink-700 border-pink-200',
  party: 'bg-orange-100 text-orange-700 border-orange-200',
  corporate: 'bg-teal-100 text-teal-700 border-teal-200',
}

const mockPackages: PackageItem[] = [
  {
    id: '1', name: 'Silver Wedding', slug: 'silver-wedding',
    category: 'wedding', tier: 'silver', description: 'Essential wedding package with elegant touches.',
    price: 2500, priceUnit: 'per_plate',
    includes: '["Venue Decoration","Basic Lighting","Buffet Dinner","Sound System"]',
    isActive: true, order: 1, createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: '2', name: 'Gold Wedding', slug: 'gold-wedding',
    category: 'wedding', tier: 'gold', description: 'Premium wedding experience with luxurious details.',
    price: 3500, priceUnit: 'per_plate',
    includes: '["Premium Decoration","LED Lighting","Multi-Cuisine Buffet","DJ Setup","Bridal Room"]',
    isActive: true, order: 2, createdAt: '2026-01-16T08:00:00Z',
  },
  {
    id: '3', name: 'Platinum Wedding', slug: 'platinum-wedding',
    category: 'wedding', tier: 'platinum', description: 'Ultra-luxury wedding with every detail perfected.',
    price: 5000, priceUnit: 'per_plate',
    includes: '["Grand Decoration","Crystal Lighting","Live Counters","Live Band","Bridal Suite","Fireworks"]',
    isActive: true, order: 3, createdAt: '2026-01-17T08:00:00Z',
  },
  {
    id: '4', name: 'Basic Party', slug: 'basic-party',
    category: 'party', tier: 'basic', description: 'Fun party package for casual celebrations.',
    price: 50000, priceUnit: 'per_event',
    includes: '["Venue","Basic Sound","Snack Buffet"]',
    isActive: true, order: 4, createdAt: '2026-02-10T08:00:00Z',
  },
  {
    id: '5', name: 'Premium Party', slug: 'premium-party',
    category: 'party', tier: 'premium', description: 'Premium party with full entertainment setup.',
    price: 100000, priceUnit: 'per_event',
    includes: '["Themed Decoration","DJ & Lighting","Full Buffet","Photo Booth","Cocktail Bar"]',
    isActive: true, order: 5, createdAt: '2026-02-11T08:00:00Z',
  },
  {
    id: '6', name: 'Corporate Basic', slug: 'corporate-basic',
    category: 'corporate', tier: 'basic', description: 'Essential corporate event setup.',
    price: 80000, priceUnit: 'half_day',
    includes: '["Projector","Sound System","Tea & Snacks","Whiteboard"]',
    isActive: true, order: 6, createdAt: '2026-03-05T08:00:00Z',
  },
  {
    id: '7', name: 'Corporate Premium', slug: 'corporate-premium',
    category: 'corporate', tier: 'premium', description: 'Full-day corporate event with all amenities.',
    price: 150000, priceUnit: 'full_day',
    includes: '["AV Setup","Catering","Breakout Rooms","Branding","Registration Desk","Lunch Buffet"]',
    isActive: false, order: 7, createdAt: '2026-03-06T08:00:00Z',
  },
]

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function formatIncludes(includesStr: string | null | undefined): string {
  if (!includesStr) return ''
  try {
    const arr = JSON.parse(includesStr)
    if (Array.isArray(arr)) return arr.join(', ')
    return includesStr
  } catch {
    return includesStr
  }
}

function formatPrice(price: number, unit: string): string {
  const unitLabel = priceUnits.find((u) => u.value === unit)?.label || unit
  if (unit === 'per_plate') {
    return `Rs. ${price.toLocaleString()}/${unitLabel.replace('Per ', '').toLowerCase()}`
  }
  return `Rs. ${price.toLocaleString()}/${unitLabel.replace('Per ', '').toLowerCase()}`
}

function getCategoryLabel(value: string) {
  return categories.find((c) => c.value === value)?.label || value
}

function getTierLabel(value: string) {
  return tiers.find((t) => t.value === value)?.label || value
}

const emptyForm = {
  name: '',
  slug: '',
  category: 'wedding',
  tier: 'silver',
  description: '',
  price: 0,
  priceUnit: 'per_plate',
  includes: '',
  isActive: true,
  order: 0,
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>([])
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const fetchPackages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/packages?all=true')
      if (res.ok) {
        const json = await res.json()
        const result = json.data
        if (result?.packages) {
          setPackages(result.packages)
        }
      }
    } catch {
      toast.error('Failed to load data from server. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPackages()
  }, [fetchPackages])

  const handleNameChange = (name: string) => {
    setForm((prev) => ({ ...prev, name, slug: generateSlug(name) }))
  }

  const openNewDialog = () => {
    setEditingPackage(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (pkg: PackageItem) => {
    setEditingPackage(pkg)
    setForm({
      name: pkg.name,
      slug: pkg.slug,
      category: pkg.category,
      tier: pkg.tier,
      description: pkg.description || '',
      price: pkg.price,
      priceUnit: pkg.priceUnit,
      includes: formatIncludes(pkg.includes),
      isActive: pkg.isActive,
      order: pkg.order,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.category || !form.tier) return

    const payload = {
      ...form,
      includes: JSON.stringify(
        form.includes
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean)
      ),
    }

    try {
      if (editingPackage) {
        const res = await fetch('/api/packages', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingPackage.id, ...payload }),
        })
        if (res.ok) {
          setPackages((prev) =>
            prev.map((p) =>
              p.id === editingPackage.id
                ? { ...p, ...payload, includes: payload.includes } as PackageItem
                : p
            )
          )
          toast.success('Package updated successfully')
        } else {
          toast.error('Failed to update package. Please try again.')
          return
        }
      } else {
        const res = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const json = await res.json()
          const created = json.data
          if (created) {
            setPackages((prev) => [created, ...prev])
          }
          toast.success('Package created successfully')
        } else {
          toast.error('Failed to create package. Please try again.')
          return
        }
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.')
      return
    }

    setFormDialogOpen(false)
    setEditingPackage(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/packages?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPackages((prev) => prev.filter((p) => p.id !== id))
        toast.success('Package deleted')
      } else {
        toast.error('Failed to delete package. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    }
  }

  const toggleActive = async (pkg: PackageItem) => {
    const newStatus = !pkg.isActive
    const updatedPkg = { ...pkg, isActive: newStatus }

    try {
      const res = await fetch('/api/packages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pkg.id, isActive: newStatus }),
      })
      if (res.ok) {
        setPackages((prev) => prev.map((p) => (p.id === pkg.id ? updatedPkg : p)))
      } else {
        toast.error('Failed to update status. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    }
  }

  const filteredPackages =
    categoryFilter === 'all'
      ? packages
      : packages.filter((p) => p.category === categoryFilter)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Packages</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage event packages and pricing
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchPackages}
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
            Add Package
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{packages.length}</p>
            <p className="text-xs text-muted-foreground">Total Packages</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{packages.filter((p) => p.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{packages.filter((p) => !p.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-marigold-dark">
              {new Set(packages.map((p) => p.category)).size}
            </p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter:</span>
        <div className="flex gap-1">
          <Button
            variant={categoryFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('all')}
            className={categoryFilter === 'all' ? 'bg-burgundy text-white' : 'text-burgundy border-burgundy/20'}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={categoryFilter === cat.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter(cat.value)}
              className={categoryFilter === cat.value ? 'bg-burgundy text-white' : 'text-burgundy border-burgundy/20'}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Packages Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead className="hidden sm:table-cell">Tier</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No packages found. Create your first package!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPackages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-burgundy-dark truncate">{pkg.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{pkg.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className={`text-xs ${categoryColors[pkg.category] || 'bg-ivory border-burgundy/10 text-burgundy'}`}>
                          {getCategoryLabel(pkg.category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className={`text-xs ${tierColors[pkg.tier] || ''}`}>
                          {getTierLabel(pkg.tier)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold text-marigold-dark">
                          {formatPrice(pkg.price, pkg.priceUnit)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {pkg.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 border">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Inactive
                            </Badge>
                          )}
                          <button
                            onClick={() => toggleActive(pkg)}
                            className="text-muted-foreground hover:text-burgundy"
                            title={pkg.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {pkg.isActive ? (
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
                            onClick={() => openEditDialog(pkg)}
                            className="text-burgundy hover:bg-burgundy/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(pkg.id)}
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

      {/* Create/Edit Package Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Package className="w-5 h-5" />
              {editingPackage ? 'Edit Package' : 'New Package'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="pkg-name">Name</Label>
              <Input
                id="pkg-name"
                placeholder="Enter package name..."
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="pkg-slug">Slug</Label>
              <Input
                id="pkg-slug"
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
                    {categories.map((cat) => (
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
                    {tiers.map((t) => (
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
              <Label htmlFor="pkg-description">Description</Label>
              <Textarea
                id="pkg-description"
                placeholder="Describe this package..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Price & Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pkg-price">Price (Rs.)</Label>
                <Input
                  id="pkg-price"
                  type="number"
                  placeholder="0"
                  value={form.price || ''}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Price Unit</Label>
                <Select
                  value={form.priceUnit}
                  onValueChange={(value) => setForm({ ...form, priceUnit: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceUnits.map((u) => (
                      <SelectItem key={u.value} value={u.value}>
                        {u.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Includes */}
            <div className="space-y-2">
              <Label htmlFor="pkg-includes">Includes</Label>
              <Textarea
                id="pkg-includes"
                placeholder="Venue Decoration, Basic Lighting, Buffet Dinner (comma-separated)"
                value={form.includes}
                onChange={(e) => setForm({ ...form, includes: e.target.value })}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Enter included items separated by commas</p>
            </div>

            {/* Order */}
            <div className="space-y-2">
              <Label htmlFor="pkg-order">Display Order</Label>
              <Input
                id="pkg-order"
                type="number"
                placeholder="0"
                value={form.order || ''}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-sm font-medium">Active</Label>
                <p className="text-xs text-muted-foreground">
                  {form.isActive ? 'This package is visible to visitors' : 'This package is hidden from visitors'}
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
                {editingPackage ? 'Update Package' : 'Create Package'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
