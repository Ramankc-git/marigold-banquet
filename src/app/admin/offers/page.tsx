'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Tag,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  CalendarClock,
  CheckCircle,
  XCircle,
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

interface Offer {
  id: string
  title: string
  description?: string | null
  discount: string
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
}

const mockOffers: Offer[] = [
  {
    id: '1', title: 'Wedding Season Special',
    description: 'Book your wedding before June 2026 and get 15% off on decoration package.',
    discount: '15% OFF', startDate: '2026-01-01', endDate: '2026-06-30',
    isActive: true, createdAt: '2026-01-01T08:00:00Z',
  },
  {
    id: '2', title: 'Corporate Bundle Deal',
    description: 'Book 3+ corporate events and get the 4th at 20% off.',
    discount: '20% OFF', startDate: '2026-01-01', endDate: '2026-12-31',
    isActive: true, createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: '3', title: 'Birthday Bash Package',
    description: 'Complete birthday party package starting from Rs. 35,000.',
    discount: 'Rs. 35K+', startDate: '2026-03-01', endDate: '2026-09-30',
    isActive: true, createdAt: '2026-02-20T08:00:00Z',
  },
  {
    id: '4', title: 'Early Bird Wedding',
    description: 'Book 6 months in advance and save 10% on venue rental.',
    discount: '10% OFF', startDate: '2026-01-01', endDate: '2026-03-31',
    isActive: false, createdAt: '2025-12-15T08:00:00Z',
  },
  {
    id: '5', title: 'New Year Gala Discount',
    description: 'Special discount for New Year Eve celebrations. Limited slots available.',
    discount: '25% OFF', startDate: '2026-11-01', endDate: '2026-12-31',
    isActive: true, createdAt: '2026-10-15T08:00:00Z',
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function isExpired(endDate: string) {
  return new Date(endDate) < new Date()
}

const emptyForm = {
  title: '',
  description: '',
  discount: '',
  startDate: '',
  endDate: '',
  isActive: true,
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>(mockOffers)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const fetchOffers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/offers?all=true')
      if (res.ok) {
        const json = await res.json()
        const result = json.data
        if (result?.offers) {
          setOffers(result.offers)
        }
      }
    } catch {
      // Use mock data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOffers()
  }, [fetchOffers])

  const openNewDialog = () => {
    setEditingOffer(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (offer: Offer) => {
    setEditingOffer(offer)
    setForm({
      title: offer.title,
      description: offer.description || '',
      discount: offer.discount,
      startDate: offer.startDate ? offer.startDate.split('T')[0] : '',
      endDate: offer.endDate ? offer.endDate.split('T')[0] : '',
      isActive: offer.isActive,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.discount || !form.startDate || !form.endDate) return

    try {
      if (editingOffer) {
        const res = await fetch('/api/offers', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingOffer.id, ...form }),
        })
        if (res.ok) {
          setOffers((prev) =>
            prev.map((o) =>
              o.id === editingOffer.id
                ? ({ ...o, ...form } as Offer)
                : o
            )
          )
        }
      } else {
        const res = await fetch('/api/offers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const json = await res.json()
          const created = json.data
          if (created) {
            setOffers((prev) => [created, ...prev])
          }
        }
      }
    } catch {
      // Local update fallback
      if (editingOffer) {
        setOffers((prev) =>
          prev.map((o) =>
            o.id === editingOffer.id
              ? ({ ...o, ...form } as Offer)
              : o
          )
        )
      } else {
        const newOffer: Offer = {
          id: `local-${Date.now()}`,
          ...form,
          createdAt: new Date().toISOString(),
        }
        setOffers((prev) => [newOffer, ...prev])
      }
    }

    setFormDialogOpen(false)
    setEditingOffer(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/offers?id=${id}`, { method: 'DELETE' })
    } catch {
      // Continue with local delete
    }
    setOffers((prev) => prev.filter((o) => o.id !== id))
  }

  const toggleActive = async (offer: Offer) => {
    const newStatus = !offer.isActive
    const updated = { ...offer, isActive: newStatus }

    try {
      await fetch('/api/offers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: offer.id, isActive: newStatus }),
      })
    } catch {
      // Continue with local update
    }

    setOffers((prev) =>
      prev.map((o) => (o.id === offer.id ? updated : o))
    )
  }

  const activeCount = offers.filter((o) => o.isActive && !isExpired(o.endDate)).length
  const expiredCount = offers.filter((o) => isExpired(o.endDate)).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Offers Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage promotional offers and discounts
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchOffers}
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
            Add Offer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{offers.length}</p>
            <p className="text-xs text-muted-foreground">Total Offers</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-500">{expiredCount}</p>
            <p className="text-xs text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* Offers Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Title</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead className="hidden md:table-cell">Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No offers yet. Create your first offer!
                    </TableCell>
                  </TableRow>
                ) : (
                  offers.map((offer) => {
                    const expired = isExpired(offer.endDate)
                    return (
                      <TableRow key={offer.id} className={expired ? 'opacity-60' : ''}>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="font-medium text-burgundy-dark truncate">{offer.title}</p>
                            {offer.description && (
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {offer.description}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-marigold/10 text-marigold-dark border border-marigold/30 hover:bg-marigold/10">
                            <Tag className="w-3 h-3 mr-1" />
                            {offer.discount}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <CalendarClock className="w-3.5 h-3.5" />
                            <span>{formatDate(offer.startDate)}</span>
                            <span className="text-gray-400">—</span>
                            <span>{formatDate(offer.endDate)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {expired ? (
                              <Badge className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-50">
                                <XCircle className="w-3 h-3 mr-1" />
                                Expired
                              </Badge>
                            ) : offer.isActive ? (
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
                              onClick={() => toggleActive(offer)}
                              className="text-muted-foreground hover:text-burgundy"
                              title={offer.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {offer.isActive ? (
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
                              onClick={() => openEditDialog(offer)}
                              className="text-burgundy hover:bg-burgundy/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(offer.id)}
                              className="text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
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
              <Tag className="w-5 h-5" />
              {editingOffer ? 'Edit Offer' : 'New Offer'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="offer-title">Title</Label>
              <Input
                id="offer-title"
                placeholder="Enter offer title..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="offer-description">Description</Label>
              <Textarea
                id="offer-description"
                placeholder="Describe the offer details..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Discount */}
            <div className="space-y-2">
              <Label htmlFor="offer-discount">Discount</Label>
              <Input
                id="offer-discount"
                placeholder="e.g. 15% OFF, Rs. 35K+"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
              />
            </div>

            {/* Start & End Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="offer-start">Start Date</Label>
                <Input
                  id="offer-start"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offer-end">End Date</Label>
                <Input
                  id="offer-end"
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-sm font-medium">Active</Label>
                <p className="text-xs text-muted-foreground">
                  {form.isActive
                    ? 'This offer is visible to visitors'
                    : 'This offer is hidden from visitors'}
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
                disabled={!form.title || !form.discount || !form.startDate || !form.endDate}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {editingOffer ? 'Update Offer' : 'Create Offer'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
