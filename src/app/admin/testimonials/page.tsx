'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  MessageSquareQuote,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Star,
  ToggleLeft,
  ToggleRight,
  User,
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

interface Testimonial {
  id: string
  clientName: string
  eventType: string
  rating: number
  review: string
  photo?: string | null
  isActive: boolean
  order: number
  createdAt: string
}

const eventTypes = [
  { value: 'Wedding', label: 'Wedding' },
  { value: 'Corporate Dinner', label: 'Corporate Dinner' },
  { value: 'Pasni Ceremony', label: 'Pasni Ceremony' },
  { value: 'Birthday', label: 'Birthday' },
  { value: 'Reception', label: 'Reception' },
  { value: 'Seminar', label: 'Seminar' },
  { value: 'Engagement', label: 'Engagement' },
  { value: 'Anniversary', label: 'Anniversary' },
  { value: 'Bratabandha', label: 'Bratabandha' },
  { value: 'Other', label: 'Other' },
]

const mockTestimonials: Testimonial[] = [
  {
    id: '1', clientName: 'Anita & Rajesh', eventType: 'Wedding', rating: 5,
    review: 'Our dream wedding came true at Marigold. The decoration was breathtaking and the food was exceptional!',
    photo: '', isActive: true, order: 1, createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: '2', clientName: 'Suman Adhikari', eventType: 'Corporate Dinner', rating: 5,
    review: 'Perfect venue for our annual conference. Professional staff and excellent facilities.',
    photo: '', isActive: true, order: 2, createdAt: '2026-01-20T08:00:00Z',
  },
  {
    id: '3', clientName: 'Priya Maharjan', eventType: 'Birthday', rating: 4,
    review: 'Had an amazing birthday celebration. The garden terrace is beautiful!',
    photo: '', isActive: true, order: 3, createdAt: '2026-02-05T08:00:00Z',
  },
  {
    id: '4', clientName: 'Deepak & Sita', eventType: 'Engagement', rating: 5,
    review: 'The engagement was magical. The team went above and beyond our expectations.',
    photo: '', isActive: true, order: 4, createdAt: '2026-02-15T08:00:00Z',
  },
  {
    id: '5', clientName: 'Kumar Rai', eventType: 'Anniversary', rating: 4,
    review: 'Wonderful evening! The decoration and food were top notch.',
    photo: '', isActive: false, order: 5, createdAt: '2026-03-01T08:00:00Z',
  },
  {
    id: '6', clientName: 'Srijana Shrestha', eventType: 'Pasni Ceremony', rating: 5,
    review: 'Beautiful arrangement for our baby\'s Pasni. Every detail was thoughtfully handled.',
    photo: '', isActive: true, order: 6, createdAt: '2026-03-10T08:00:00Z',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? 'fill-marigold text-marigold' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}.0</span>
    </div>
  )
}

const emptyForm = {
  clientName: '',
  eventType: 'Wedding',
  rating: 5,
  review: '',
  photo: '',
  isActive: true,
  order: 0,
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const fetchTestimonials = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/testimonials?all=true')
      if (res.ok) {
        const json = await res.json()
        const testimonials = json.data
        if (Array.isArray(testimonials)) {
          setTestimonials(testimonials)
        }
      }
    } catch {
      // Use mock data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const openNewDialog = () => {
    setEditingTestimonial(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setForm({
      clientName: testimonial.clientName,
      eventType: testimonial.eventType,
      rating: testimonial.rating,
      review: testimonial.review,
      photo: testimonial.photo || '',
      isActive: testimonial.isActive,
      order: testimonial.order,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.clientName || !form.eventType || !form.review) return

    try {
      if (editingTestimonial) {
        const res = await fetch('/api/testimonials', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingTestimonial.id, ...form }),
        })
        if (res.ok) {
          setTestimonials((prev) =>
            prev.map((t) =>
              t.id === editingTestimonial.id
                ? ({ ...t, ...form } as Testimonial)
                : t
            )
          )
        }
      } else {
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const json = await res.json()
          const created = json.data
          if (created) {
            setTestimonials((prev) => [created, ...prev])
          }
        }
      }
    } catch {
      // Local update fallback
      if (editingTestimonial) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === editingTestimonial.id
              ? ({ ...t, ...form } as Testimonial)
              : t
          )
        )
      } else {
        const newTestimonial: Testimonial = {
          id: `local-${Date.now()}`,
          ...form,
          createdAt: new Date().toISOString(),
        }
        setTestimonials((prev) => [newTestimonial, ...prev])
      }
    }

    setFormDialogOpen(false)
    setEditingTestimonial(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' })
    } catch {
      // Continue with local delete
    }
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleActive = async (testimonial: Testimonial) => {
    const newStatus = !testimonial.isActive
    const updated = { ...testimonial, isActive: newStatus }

    try {
      await fetch('/api/testimonials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: testimonial.id, isActive: newStatus }),
      })
    } catch {
      // Continue with local update
    }

    setTestimonials((prev) =>
      prev.map((t) => (t.id === testimonial.id ? updated : t))
    )
  }

  const averageRating =
    testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : '0.0'

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Testimonials Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage client reviews and testimonials
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchTestimonials}
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
            Add Testimonial
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{testimonials.length}</p>
            <p className="text-xs text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {testimonials.filter((t) => t.isActive).length}
            </p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <p className="text-2xl font-bold text-marigold-dark">{averageRating}</p>
              <Star className="w-4 h-4 fill-marigold text-marigold" />
            </div>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden sm:table-cell">Event</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No testimonials yet. Add your first review!
                    </TableCell>
                  </TableRow>
                ) : (
                  testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-burgundy-dark truncate">{testimonial.clientName}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            &ldquo;{testimonial.review}&rdquo;
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs bg-ivory border-burgundy/10 text-burgundy">
                          {testimonial.eventType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StarRating rating={testimonial.rating} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {testimonial.isActive ? (
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
                            onClick={() => toggleActive(testimonial)}
                            className="text-muted-foreground hover:text-burgundy"
                            title={testimonial.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {testimonial.isActive ? (
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
                            onClick={() => openEditDialog(testimonial)}
                            className="text-burgundy hover:bg-burgundy/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(testimonial.id)}
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
              <MessageSquareQuote className="w-5 h-5" />
              {editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Client Name & Event Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="test-client">Client Name</Label>
                <Input
                  id="test-client"
                  placeholder="e.g. Anita & Rajesh"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select
                  value={form.eventType}
                  onValueChange={(value) => setForm({ ...form, eventType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((et) => (
                      <SelectItem key={et.value} value={et.value}>
                        {et.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label htmlFor="test-rating">Rating (1-5)</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="test-rating"
                  type="number"
                  min={1}
                  max={5}
                  value={form.rating}
                  onChange={(e) => {
                    const val = Math.min(5, Math.max(1, Number(e.target.value) || 1))
                    setForm({ ...form, rating: val })
                  }}
                  className="w-20"
                />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 cursor-pointer ${
                        i < form.rating ? 'fill-marigold text-marigold' : 'text-gray-300'
                      }`}
                      onClick={() => setForm({ ...form, rating: i + 1 })}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="space-y-2">
              <Label htmlFor="test-review">Review</Label>
              <Textarea
                id="test-review"
                placeholder="Write the client testimonial here..."
                value={form.review}
                onChange={(e) => setForm({ ...form, review: e.target.value })}
                rows={4}
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <Label htmlFor="test-photo">Client Photo URL</Label>
              <Input
                id="test-photo"
                placeholder="https://example.com/photo.jpg"
                value={form.photo}
                onChange={(e) => setForm({ ...form, photo: e.target.value })}
              />
            </div>

            {/* Order */}
            <div className="space-y-2">
              <Label htmlFor="test-order">Display Order</Label>
              <Input
                id="test-order"
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
                  {form.isActive
                    ? 'This testimonial is visible to visitors'
                    : 'This testimonial is hidden from visitors'}
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
                disabled={!form.clientName || !form.eventType || !form.review}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
