'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  UtensilsCrossed,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Filter,
  Leaf,
  Star,
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

interface MenuItem {
  id: string
  name: string
  category: string
  description?: string | null
  pricePerPlate: number
  isVegetarian: boolean
  isJain: boolean
  isHalal: boolean
  isActive: boolean
  order: number
  createdAt: string
}

const menuCategories = [
  { value: 'nepali_thali', label: 'Nepali Thali' },
  { value: 'indian', label: 'Indian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'continental', label: 'Continental' },
  { value: 'fusion', label: 'Fusion' },
  { value: 'buffet', label: 'Buffet' },
  { value: 'live_counters', label: 'Live Counters' },
]

const categoryColors: Record<string, string> = {
  nepali_thali: 'bg-amber-100 text-amber-700 border-amber-200',
  indian: 'bg-orange-100 text-orange-700 border-orange-200',
  chinese: 'bg-red-100 text-red-700 border-red-200',
  continental: 'bg-blue-100 text-blue-700 border-blue-200',
  fusion: 'bg-purple-100 text-purple-700 border-purple-200',
  buffet: 'bg-teal-100 text-teal-700 border-teal-200',
  live_counters: 'bg-green-100 text-green-700 border-green-200',
}

const mockMenuItems: MenuItem[] = [
  {
    id: '1', name: 'Nepali Thali Classic', category: 'nepali_thali',
    description: 'Traditional Nepali thali with dal, bhat, tarkari, achar, and more.',
    pricePerPlate: 1200, isVegetarian: true, isJain: false, isHalal: false,
    isActive: true, order: 1, createdAt: '2026-01-20T08:00:00Z',
  },
  {
    id: '2', name: 'Nepali Thali Premium', category: 'nepali_thali',
    description: 'Premium Nepali thali with additional meat items and dessert.',
    pricePerPlate: 1800, isVegetarian: false, isJain: false, isHalal: false,
    isActive: true, order: 2, createdAt: '2026-01-21T08:00:00Z',
  },
  {
    id: '3', name: 'Mughlai Buffet', category: 'indian',
    description: 'Rich Mughlai spread with biryani, kebabs, and curries.',
    pricePerPlate: 2000, isVegetarian: false, isJain: false, isHalal: true,
    isActive: true, order: 3, createdAt: '2026-02-05T08:00:00Z',
  },
  {
    id: '4', name: 'Chinese Dim Sum Spread', category: 'chinese',
    description: 'Assorted dim sum, stir-fries, and noodle dishes.',
    pricePerPlate: 1500, isVegetarian: false, isJain: false, isHalal: false,
    isActive: true, order: 4, createdAt: '2026-02-10T08:00:00Z',
  },
  {
    id: '5', name: 'Continental Platter', category: 'continental',
    description: 'European-style platter with salads, mains, and desserts.',
    pricePerPlate: 1800, isVegetarian: true, isJain: false, isHalal: false,
    isActive: true, order: 5, createdAt: '2026-02-15T08:00:00Z',
  },
  {
    id: '6', name: 'Live Chaat Counter', category: 'live_counters',
    description: 'Live chaat station with pani puri, bhel puri, and more.',
    pricePerPlate: 800, isVegetarian: true, isJain: true, isHalal: false,
    isActive: true, order: 6, createdAt: '2026-03-01T08:00:00Z',
  },
  {
    id: '7', name: 'Tandoori BBQ Station', category: 'live_counters',
    description: 'Live tandoor with kebabs, naan, and tikkas.',
    pricePerPlate: 1200, isVegetarian: false, isJain: false, isHalal: true,
    isActive: true, order: 7, createdAt: '2026-03-02T08:00:00Z',
  },
  {
    id: '8', name: 'Fusion Delight', category: 'fusion',
    description: 'Creative fusion combining Nepali, Indian, and Continental flavors.',
    pricePerPlate: 2200, isVegetarian: false, isJain: false, isHalal: false,
    isActive: false, order: 8, createdAt: '2026-03-10T08:00:00Z',
  },
]

function getCategoryLabel(value: string) {
  return menuCategories.find((c) => c.value === value)?.label || value
}

const emptyForm = {
  name: '',
  category: 'nepali_thali',
  description: '',
  pricePerPlate: 0,
  isVegetarian: false,
  isJain: false,
  isHalal: false,
  isActive: true,
  order: 0,
}

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/menu?all=true')
      if (res.ok) {
        const json = await res.json()
        const result = json.data
        if (result?.items) {
          setItems(result.items)
        }
      }
    } catch {
      toast.error('Failed to load data from server. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const openNewDialog = () => {
    setEditingItem(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item)
    setForm({
      name: item.name,
      category: item.category,
      description: item.description || '',
      pricePerPlate: item.pricePerPlate,
      isVegetarian: item.isVegetarian,
      isJain: item.isJain,
      isHalal: item.isHalal,
      isActive: item.isActive,
      order: item.order,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.category) return

    try {
      if (editingItem) {
        const res = await fetch('/api/menu', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem.id, ...form }),
        })
        if (res.ok) {
          setItems((prev) =>
            prev.map((i) =>
              i.id === editingItem.id
                ? { ...i, ...form } as MenuItem
                : i
            )
          )
          toast.success('Menu item updated successfully')
        } else {
          toast.error('Failed to update menu item. Please try again.')
          return
        }
      } else {
        const res = await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const json = await res.json()
          const created = json.data
          if (created) {
            setItems((prev) => [created, ...prev])
          }
          toast.success('Menu item created successfully')
        } else {
          toast.error('Failed to create menu item. Please try again.')
          return
        }
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.')
      return
    }

    setFormDialogOpen(false)
    setEditingItem(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/menu?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id))
        toast.success('Menu item deleted')
      } else {
        toast.error('Failed to delete menu item. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    }
  }

  const toggleActive = async (item: MenuItem) => {
    const newStatus = !item.isActive
    const updatedItem = { ...item, isActive: newStatus }

    try {
      const res = await fetch('/api/menu', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, isActive: newStatus }),
      })
      if (res.ok) {
        setItems((prev) => prev.map((i) => (i.id === item.id ? updatedItem : i)))
      } else {
        toast.error('Failed to update status. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    }
  }

  const filteredItems =
    categoryFilter === 'all'
      ? items
      : items.filter((i) => i.category === categoryFilter)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Menu / Food</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage menu items and catering options
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchItems}
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
            Add Menu Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{items.length}</p>
            <p className="text-xs text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{items.filter((i) => i.isVegetarian).length}</p>
            <p className="text-xs text-muted-foreground">Vegetarian</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-marigold-dark">{items.filter((i) => i.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter:</span>
        <div className="flex gap-1 flex-wrap">
          <Button
            variant={categoryFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('all')}
            className={categoryFilter === 'all' ? 'bg-burgundy text-white' : 'text-burgundy border-burgundy/20'}
          >
            All
          </Button>
          {menuCategories.map((cat) => (
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

      {/* Menu Items Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Dietary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No menu items found. Create your first item!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-burgundy-dark truncate">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className={`text-xs ${categoryColors[item.category] || 'bg-ivory border-burgundy/10 text-burgundy'}`}>
                          {getCategoryLabel(item.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold text-marigold-dark">
                          Rs. {item.pricePerPlate.toLocaleString()}/plate
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex gap-1">
                          {item.isVegetarian && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              <Leaf className="w-3 h-3 mr-1" />
                              Veg
                            </Badge>
                          )}
                          {item.isJain && (
                            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                              Jain
                            </Badge>
                          )}
                          {item.isHalal && (
                            <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                              Halal
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 border">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Inactive
                            </Badge>
                          )}
                          <button
                            onClick={() => toggleActive(item)}
                            className="text-muted-foreground hover:text-burgundy"
                            title={item.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {item.isActive ? (
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
                            onClick={() => openEditDialog(item)}
                            className="text-burgundy hover:bg-burgundy/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
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

      {/* Create/Edit Menu Item Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" />
              {editingItem ? 'Edit Menu Item' : 'New Menu Item'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="menu-name">Name</Label>
              <Input
                id="menu-name"
                placeholder="Enter menu item name..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Category */}
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
                  {menuCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="menu-description">Description</Label>
              <Textarea
                id="menu-description"
                placeholder="Describe this menu item..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Price & Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="menu-price">Price Per Plate (Rs.)</Label>
                <Input
                  id="menu-price"
                  type="number"
                  placeholder="0"
                  value={form.pricePerPlate || ''}
                  onChange={(e) => setForm({ ...form, pricePerPlate: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-order">Display Order</Label>
                <Input
                  id="menu-order"
                  type="number"
                  placeholder="0"
                  value={form.order || ''}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Dietary Toggles */}
            <div className="border rounded-lg p-4 space-y-4 bg-ivory/50">
              <h4 className="font-semibold text-sm text-burgundy flex items-center gap-2">
                <Star className="w-4 h-4" />
                Dietary Information
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Vegetarian</Label>
                  <p className="text-xs text-muted-foreground">Suitable for vegetarian diet</p>
                </div>
                <Switch
                  checked={form.isVegetarian}
                  onCheckedChange={(checked) => setForm({ ...form, isVegetarian: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Jain</Label>
                  <p className="text-xs text-muted-foreground">Suitable for Jain diet (no root vegetables)</p>
                </div>
                <Switch
                  checked={form.isJain}
                  onCheckedChange={(checked) => setForm({ ...form, isJain: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Halal</Label>
                  <p className="text-xs text-muted-foreground">Prepared following Halal guidelines</p>
                </div>
                <Switch
                  checked={form.isHalal}
                  onCheckedChange={(checked) => setForm({ ...form, isHalal: checked })}
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-sm font-medium">Active</Label>
                <p className="text-xs text-muted-foreground">
                  {form.isActive ? 'This item is visible to visitors' : 'This item is hidden from visitors'}
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
                {editingItem ? 'Update Item' : 'Create Item'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
