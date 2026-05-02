'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Store,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Phone,
  Mail,
  Globe,
  ToggleLeft,
  ToggleRight,
  Filter,
} from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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

interface Vendor {
  id: string
  name: string
  category: string
  description?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
  logo?: string | null
  isActive: boolean
  order: number
  createdAt: string
}

const vendorCategories = [
  { value: 'photographer', label: 'Photographer' },
  { value: 'caterer', label: 'Caterer' },
  { value: 'decorator', label: 'Decorator' },
  { value: 'band', label: 'Band' },
  { value: 'mehendi', label: 'Mehendi' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'transport', label: 'Transport' },
]

const mockVendors: Vendor[] = [
  {
    id: '1', name: 'Shutter Stories Photography', category: 'photographer',
    description: 'Award-winning wedding photography and cinematography studio in Kathmandu.',
    phone: '+977-9801234567', email: 'info@shutterstories.com', website: 'https://shutterstories.com',
    logo: '', isActive: true, order: 1, createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: '2', name: 'Himalayan Flavors Catering', category: 'caterer',
    description: 'Premium catering service specializing in traditional Nepali and international cuisines.',
    phone: '+977-9802345678', email: 'book@himalayanflavors.com', website: 'https://himalayanflavors.com',
    logo: '', isActive: true, order: 2, createdAt: '2026-01-20T08:00:00Z',
  },
  {
    id: '3', name: 'Marigold Dreams Decor', category: 'decorator',
    description: 'Transforming venues with marigold-inspired floral and stage decorations.',
    phone: '+977-9803456789', email: 'hello@marigolddreams.com', website: '',
    logo: '', isActive: true, order: 3, createdAt: '2026-02-01T08:00:00Z',
  },
  {
    id: '4', name: 'Kathmandu Beats', category: 'band',
    description: 'Live band and DJ services for weddings, parties, and corporate events.',
    phone: '+977-9804567890', email: 'contact@ktmbeats.com', website: 'https://ktmbeats.com',
    logo: '', isActive: false, order: 4, createdAt: '2026-02-10T08:00:00Z',
  },
  {
    id: '5', name: 'Mehendi Magic by Priya', category: 'mehendi',
    description: 'Intricate bridal mehendi designs with traditional and contemporary patterns.',
    phone: '+977-9805678901', email: 'priya@mehendimagic.com', website: '',
    logo: '', isActive: true, order: 5, createdAt: '2026-02-15T08:00:00Z',
  },
  {
    id: '6', name: 'Glamour Touch Makeup Studio', category: 'makeup',
    description: 'Professional bridal makeup and styling services for all occasions.',
    phone: '+977-9806789012', email: 'book@glamourtouch.com', website: '',
    logo: '', isActive: true, order: 6, createdAt: '2026-03-01T08:00:00Z',
  },
]

function getCategoryLabel(value: string) {
  return vendorCategories.find((c) => c.value === value)?.label || value
}

function getCategoryColor(value: string) {
  const colors: Record<string, string> = {
    photographer: 'bg-purple-100 text-purple-800 border-purple-200',
    caterer: 'bg-orange-100 text-orange-800 border-orange-200',
    decorator: 'bg-pink-100 text-pink-800 border-pink-200',
    band: 'bg-blue-100 text-blue-800 border-blue-200',
    mehendi: 'bg-amber-100 text-amber-800 border-amber-200',
    makeup: 'bg-rose-100 text-rose-800 border-rose-200',
    transport: 'bg-teal-100 text-teal-800 border-teal-200',
  }
  return colors[value] || 'bg-gray-100 text-gray-800 border-gray-200'
}

const emptyForm = {
  name: '',
  category: 'photographer',
  description: '',
  phone: '',
  email: '',
  website: '',
  logo: '',
  isActive: true,
  order: 0,
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const fetchVendors = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/vendors?all=true')
      if (res.ok) {
        const json = await res.json()
        const result = json.data
        if (result?.vendors) {
          setVendors(result.vendors)
        }
      }
    } catch {
      toast.error('Failed to load data from server. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVendors()
  }, [fetchVendors])

  const openNewVendorDialog = () => {
    setEditingVendor(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (vendor: Vendor) => {
    setEditingVendor(vendor)
    setForm({
      name: vendor.name,
      category: vendor.category,
      description: vendor.description || '',
      phone: vendor.phone || '',
      email: vendor.email || '',
      website: vendor.website || '',
      logo: vendor.logo || '',
      isActive: vendor.isActive,
      order: vendor.order,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.category) return

    try {
      if (editingVendor) {
        const res = await fetch('/api/vendors', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingVendor.id, ...form }),
        })
        if (res.ok) {
          setVendors((prev) =>
            prev.map((v) => (v.id === editingVendor.id ? { ...v, ...form } as Vendor : v))
          )
          toast.success('Vendor updated successfully')
        } else {
          toast.error('Failed to update vendor. Please try again.')
          return
        }
      } else {
        const res = await fetch('/api/vendors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const json = await res.json()
          const created = json.data
          if (created) {
            setVendors((prev) => [created, ...prev])
          }
          toast.success('Vendor added successfully')
        } else {
          toast.error('Failed to add vendor. Please try again.')
          return
        }
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.')
      return
    }

    setFormDialogOpen(false)
    setEditingVendor(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/vendors?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setVendors((prev) => prev.filter((v) => v.id !== id))
        toast.success('Vendor deleted')
      } else {
        toast.error('Failed to delete vendor. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    }
  }

  const toggleActive = async (vendor: Vendor) => {
    const newStatus = !vendor.isActive
    const updatedVendor = { ...vendor, isActive: newStatus }

    try {
      const res = await fetch('/api/vendors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: vendor.id, isActive: newStatus }),
      })
      if (res.ok) {
        setVendors((prev) => prev.map((v) => (v.id === vendor.id ? updatedVendor : v)))
      } else {
        toast.error('Failed to update status. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    }
  }

  const filteredVendors = categoryFilter === 'all'
    ? vendors
    : vendors.filter((v) => v.category === categoryFilter)

  const categoryCounts = vendorCategories.reduce((acc, cat) => {
    acc[cat.value] = vendors.filter((v) => v.category === cat.value).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Vendor Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your event vendors and service providers
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchVendors}
            variant="outline"
            size="sm"
            className="text-burgundy border-burgundy/20 hover:bg-burgundy/5"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={openNewVendorDialog}
            size="sm"
            className="bg-burgundy hover:bg-burgundy-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Vendor Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{vendors.length}</p>
            <p className="text-xs text-muted-foreground">Total Vendors</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{vendors.filter((v) => v.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{vendors.filter((v) => !v.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-marigold-dark">
              {new Set(vendors.map((v) => v.category)).size}
            </p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter:</span>
            <Button
              variant={categoryFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter('all')}
              className={categoryFilter === 'all' ? 'bg-burgundy hover:bg-burgundy-dark text-white' : 'text-burgundy border-burgundy/20'}
            >
              All ({vendors.length})
            </Button>
            {vendorCategories.map((cat) => {
              const count = categoryCounts[cat.value] || 0
              if (count === 0) return null
              return (
                <Button
                  key={cat.value}
                  variant={categoryFilter === cat.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter(cat.value)}
                  className={categoryFilter === cat.value ? 'bg-burgundy hover:bg-burgundy-dark text-white' : 'text-burgundy border-burgundy/20'}
                >
                  {cat.label} ({count})
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Vendor</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      {vendors.length === 0
                        ? 'No vendors yet. Add your first vendor!'
                        : 'No vendors found for this category.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {vendor.logo ? (
                            <img
                              src={vendor.logo}
                              alt={vendor.name}
                              className="w-8 h-8 rounded-full object-cover border border-burgundy/10"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-ivory border border-burgundy/10 flex items-center justify-center">
                              <Store className="w-4 h-4 text-burgundy" />
                            </div>
                          )}
                          <div className="max-w-xs">
                            <p className="font-medium text-burgundy-dark truncate">{vendor.name}</p>
                            {vendor.email && (
                              <p className="text-xs text-muted-foreground truncate">{vendor.email}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(vendor.category)}`}>
                          {getCategoryLabel(vendor.category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {vendor.phone || '—'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {vendor.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 border">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Inactive
                            </Badge>
                          )}
                          <button
                            onClick={() => toggleActive(vendor)}
                            className="text-muted-foreground hover:text-burgundy"
                            title={vendor.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {vendor.isActive ? (
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
                            onClick={() => openEditDialog(vendor)}
                            className="text-burgundy hover:bg-burgundy/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(vendor.id)}
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

      {/* New/Edit Vendor Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Store className="w-5 h-5" />
              {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="vendor-name">Name</Label>
              <Input
                id="vendor-name"
                placeholder="Enter vendor name..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Category & Order */}
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
                    {vendorCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-order">Display Order</Label>
                <Input
                  id="vendor-order"
                  type="number"
                  placeholder="0"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="vendor-description">Description</Label>
              <Textarea
                id="vendor-description"
                placeholder="Brief description of the vendor services..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Contact Info */}
            <div className="border rounded-lg p-4 space-y-4 bg-ivory/50">
              <h4 className="font-semibold text-sm text-burgundy flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor-phone">Phone</Label>
                  <Input
                    id="vendor-phone"
                    placeholder="+977-9801234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor-email">Email</Label>
                  <Input
                    id="vendor-email"
                    type="email"
                    placeholder="vendor@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-website">Website</Label>
                <Input
                  id="vendor-website"
                  placeholder="https://example.com"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>
            </div>

            {/* Logo */}
            <div className="space-y-2">
              <Label htmlFor="vendor-logo">Logo URL</Label>
              <Input
                id="vendor-logo"
                placeholder="https://example.com/logo.png"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-sm font-medium">Active Status</Label>
                <p className="text-xs text-muted-foreground">
                  {form.isActive ? 'This vendor is visible on the website' : 'This vendor is hidden from the website'}
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
                disabled={!form.name || !form.category}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {editingVendor ? 'Update Vendor' : 'Add Vendor'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
