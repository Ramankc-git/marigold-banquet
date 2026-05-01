'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Building,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Users,
  Maximize,
} from 'lucide-react'
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

interface Hall {
  id: string
  name: string
  slug: string
  description?: string | null
  capacityBanquet: number
  capacityTheatre: number
  capacityCocktail: number
  dimensionsSqft: number
  features?: string | null
  isActive: boolean
  order: number
  createdAt: string
}

const mockHalls: Hall[] = [
  {
    id: '1', name: 'Grand Ballroom', slug: 'grand-ballroom',
    description: 'Our flagship hall for grand celebrations and royal weddings.',
    capacityBanquet: 500, capacityTheatre: 700, capacityCocktail: 800,
    dimensionsSqft: 5000, features: '["Stage","LED Screens","Bridal Room","Valet Parking"]',
    isActive: true, order: 1, createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: '2', name: 'Garden Terrace', slug: 'garden-terrace',
    description: 'Open-air elegance with lush gardens and fairy lights.',
    capacityBanquet: 200, capacityTheatre: 300, capacityCocktail: 350,
    dimensionsSqft: 3000, features: '["Open Air","Fountain","Fairy Lights","Gazebo"]',
    isActive: true, order: 2, createdAt: '2026-01-12T08:00:00Z',
  },
  {
    id: '3', name: 'Conference Hall', slug: 'conference-hall',
    description: 'Professional setting for corporate meetings and seminars.',
    capacityBanquet: 100, capacityTheatre: 150, capacityCocktail: 120,
    dimensionsSqft: 1800, features: '["Projector","Sound System","Whiteboard","Podium"]',
    isActive: true, order: 3, createdAt: '2026-02-05T08:00:00Z',
  },
  {
    id: '4', name: 'Rooftop Hall', slug: 'rooftop-hall',
    description: 'Stunning rooftop venue with panoramic city views.',
    capacityBanquet: 100, capacityTheatre: 150, capacityCocktail: 180,
    dimensionsSqft: 2000, features: '["Panoramic View","Bar Counter","DJ Setup"]',
    isActive: false, order: 4, createdAt: '2026-03-01T08:00:00Z',
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

function formatFeatures(featuresStr: string | null | undefined): string {
  if (!featuresStr) return ''
  try {
    const arr = JSON.parse(featuresStr)
    if (Array.isArray(arr)) return arr.join(', ')
    return featuresStr
  } catch {
    return featuresStr
  }
}

const emptyForm = {
  name: '',
  slug: '',
  description: '',
  capacityBanquet: 0,
  capacityTheatre: 0,
  capacityCocktail: 0,
  dimensionsSqft: 0,
  features: '',
  isActive: true,
  order: 0,
}

export default function HallsPage() {
  const [halls, setHalls] = useState<Hall[]>(mockHalls)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingHall, setEditingHall] = useState<Hall | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const fetchHalls = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/halls?all=true')
      if (res.ok) {
        const json = await res.json()
        const halls = json.data
        if (Array.isArray(halls)) {
          setHalls(halls)
        }
      }
    } catch {
      // Use mock data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHalls()
  }, [fetchHalls])

  const handleNameChange = (name: string) => {
    setForm((prev) => ({ ...prev, name, slug: generateSlug(name) }))
  }

  const openNewDialog = () => {
    setEditingHall(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (hall: Hall) => {
    setEditingHall(hall)
    setForm({
      name: hall.name,
      slug: hall.slug,
      description: hall.description || '',
      capacityBanquet: hall.capacityBanquet,
      capacityTheatre: hall.capacityTheatre,
      capacityCocktail: hall.capacityCocktail,
      dimensionsSqft: hall.dimensionsSqft,
      features: formatFeatures(hall.features),
      isActive: hall.isActive,
      order: hall.order,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name) return

    const payload = {
      ...form,
      features: JSON.stringify(
        form.features
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean)
      ),
    }

    try {
      if (editingHall) {
        const res = await fetch('/api/halls', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingHall.id, ...payload }),
        })
        if (res.ok) {
          setHalls((prev) =>
            prev.map((h) =>
              h.id === editingHall.id
                ? { ...h, ...payload, features: payload.features } as Hall
                : h
            )
          )
        }
      } else {
        const res = await fetch('/api/halls', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const json = await res.json()
          const created = json.data
          if (created) {
            setHalls((prev) => [created, ...prev])
          }
        }
      }
    } catch {
      // Local update
      if (editingHall) {
        setHalls((prev) =>
          prev.map((h) =>
            h.id === editingHall.id
              ? { ...h, ...payload, features: payload.features } as Hall
              : h
          )
        )
      } else {
        const newHall: Hall = {
          id: `local-${Date.now()}`,
          ...payload,
          createdAt: new Date().toISOString(),
        }
        setHalls((prev) => [newHall, ...prev])
      }
    }

    setFormDialogOpen(false)
    setEditingHall(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/halls?id=${id}`, { method: 'DELETE' })
    } catch {
      // Continue with local delete
    }
    setHalls((prev) => prev.filter((h) => h.id !== id))
  }

  const toggleActive = async (hall: Hall) => {
    const newStatus = !hall.isActive
    const updatedHall = { ...hall, isActive: newStatus }

    try {
      await fetch('/api/halls', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: hall.id, isActive: newStatus }),
      })
    } catch {
      // Continue with local update
    }

    setHalls((prev) => prev.map((h) => (h.id === hall.id ? updatedHall : h)))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Halls / Spaces</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your venue halls and event spaces
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchHalls}
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
            Add Hall
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{halls.length}</p>
            <p className="text-xs text-muted-foreground">Total Halls</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{halls.filter((h) => h.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{halls.filter((h) => !h.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
      </div>

      {/* Halls Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Banquet</TableHead>
                  <TableHead className="hidden sm:table-cell">Theatre</TableHead>
                  <TableHead className="hidden md:table-cell">Cocktail</TableHead>
                  <TableHead className="hidden md:table-cell">Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {halls.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No halls yet. Add your first hall!
                    </TableCell>
                  </TableRow>
                ) : (
                  halls.map((hall) => (
                    <TableRow key={hall.id}>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-burgundy-dark truncate">{hall.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{hall.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          {hall.capacityBanquet}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          {hall.capacityTheatre}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          {hall.capacityCocktail}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          <Maximize className="w-3 h-3 text-muted-foreground" />
                          {hall.dimensionsSqft.toLocaleString()} sq ft
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {hall.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 border">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Inactive
                            </Badge>
                          )}
                          <button
                            onClick={() => toggleActive(hall)}
                            className="text-muted-foreground hover:text-burgundy"
                            title={hall.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {hall.isActive ? (
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
                            onClick={() => openEditDialog(hall)}
                            className="text-burgundy hover:bg-burgundy/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(hall.id)}
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

      {/* Create/Edit Hall Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Building className="w-5 h-5" />
              {editingHall ? 'Edit Hall' : 'New Hall'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="hall-name">Name</Label>
              <Input
                id="hall-name"
                placeholder="Enter hall name..."
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="hall-slug">Slug</Label>
              <Input
                id="hall-slug"
                placeholder="auto-generated-from-name"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">Auto-generated from name. You can customize it.</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="hall-description">Description</Label>
              <Textarea
                id="hall-description"
                placeholder="Describe this hall..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Capacities */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hall-banquet">Banquet Capacity</Label>
                <Input
                  id="hall-banquet"
                  type="number"
                  placeholder="0"
                  value={form.capacityBanquet || ''}
                  onChange={(e) => setForm({ ...form, capacityBanquet: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hall-theatre">Theatre Capacity</Label>
                <Input
                  id="hall-theatre"
                  type="number"
                  placeholder="0"
                  value={form.capacityTheatre || ''}
                  onChange={(e) => setForm({ ...form, capacityTheatre: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hall-cocktail">Cocktail Capacity</Label>
                <Input
                  id="hall-cocktail"
                  type="number"
                  placeholder="0"
                  value={form.capacityCocktail || ''}
                  onChange={(e) => setForm({ ...form, capacityCocktail: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Dimensions & Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hall-dimensions">Dimensions (sq ft)</Label>
                <Input
                  id="hall-dimensions"
                  type="number"
                  placeholder="0"
                  value={form.dimensionsSqft || ''}
                  onChange={(e) => setForm({ ...form, dimensionsSqft: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hall-order">Display Order</Label>
                <Input
                  id="hall-order"
                  type="number"
                  placeholder="0"
                  value={form.order || ''}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label htmlFor="hall-features">Features</Label>
              <Textarea
                id="hall-features"
                placeholder="Stage, LED Screens, Bridal Room, Valet Parking (comma-separated)"
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                rows={2}
              />
              <p className="text-xs text-muted-foreground">Enter features separated by commas</p>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-sm font-medium">Active</Label>
                <p className="text-xs text-muted-foreground">
                  {form.isActive ? 'This hall is visible to visitors' : 'This hall is hidden from visitors'}
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
                disabled={!form.name}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {editingHall ? 'Update Hall' : 'Create Hall'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
