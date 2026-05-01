'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Filter,
  MessageCircleQuestion,
} from 'lucide-react'
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

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  isActive: boolean
  order: number
  createdAt: string
}

const faqCategories = [
  { value: 'booking', label: 'Booking' },
  { value: 'catering', label: 'Catering' },
  { value: 'decoration', label: 'Decoration' },
  { value: 'weddings', label: 'Weddings' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'pricing', label: 'Pricing' },
]

const mockFAQs: FAQ[] = [
  {
    id: '1', question: 'How far in advance should I book my event?',
    answer: 'We recommend booking at least 4-6 weeks in advance for standard events and 3-6 months for weddings and large corporate events. This ensures availability of your preferred venue, vendors, and our planning team.',
    category: 'booking', isActive: true, order: 1, createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: '2', question: 'What is included in your standard catering package?',
    answer: 'Our standard catering package includes a curated menu of appetizers, main courses, desserts, and beverages. We offer both Nepali traditional cuisine and international options. Custom menu planning is available for all packages.',
    category: 'catering', isActive: true, order: 2, createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: '3', question: 'Can I customize the decoration theme for my wedding?',
    answer: 'Absolutely! We specialize in custom decoration themes. Our design team will work closely with you to create a personalized look that reflects your style, from marigold-themed traditional setups to modern minimalist designs.',
    category: 'decoration', isActive: true, order: 3, createdAt: '2026-01-20T08:00:00Z',
  },
  {
    id: '4', question: 'Do you offer complete wedding planning services?',
    answer: 'Yes, we offer end-to-end wedding planning services including venue selection, decoration, catering, photography, entertainment, mehendi, and makeup. We handle everything so you can enjoy your special day stress-free.',
    category: 'weddings', isActive: true, order: 4, createdAt: '2026-02-01T08:00:00Z',
  },
  {
    id: '5', question: 'What types of corporate events do you organize?',
    answer: 'We organize a wide range of corporate events including annual meetings, product launches, team building events, conferences, award ceremonies, and holiday parties. Our team ensures professional execution with attention to brand identity.',
    category: 'corporate', isActive: true, order: 5, createdAt: '2026-02-10T08:00:00Z',
  },
  {
    id: '6', question: 'What is the minimum budget required to work with Marigold?',
    answer: 'Our packages start from NPR 50,000 for basic event setups. Wedding packages typically range from NPR 200,000 to NPR 2,000,000+ depending on the scale and customization. We offer flexible payment plans and work within your budget.',
    category: 'pricing', isActive: true, order: 6, createdAt: '2026-02-15T08:00:00Z',
  },
  {
    id: '7', question: 'Is there a cancellation policy?',
    answer: 'Yes, cancellations made 30+ days before the event receive a full refund minus the booking deposit. Cancellations within 15-30 days receive a 50% refund. Within 15 days, the full amount is non-refundable.',
    category: 'booking', isActive: false, order: 7, createdAt: '2026-03-01T08:00:00Z',
  },
]

function getCategoryLabel(value: string) {
  return faqCategories.find((c) => c.value === value)?.label || value
}

function getCategoryColor(value: string) {
  const colors: Record<string, string> = {
    booking: 'bg-blue-100 text-blue-800 border-blue-200',
    catering: 'bg-orange-100 text-orange-800 border-orange-200',
    decoration: 'bg-pink-100 text-pink-800 border-pink-200',
    weddings: 'bg-purple-100 text-purple-800 border-purple-200',
    corporate: 'bg-teal-100 text-teal-800 border-teal-200',
    pricing: 'bg-amber-100 text-amber-800 border-amber-200',
  }
  return colors[value] || 'bg-gray-100 text-gray-800 border-gray-200'
}

const emptyForm = {
  question: '',
  answer: '',
  category: 'booking',
  isActive: true,
  order: 0,
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const fetchFAQs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/faq?all=true')
      if (res.ok) {
        const data = await res.json()
        if (data.faqs && data.faqs.length > 0) {
          setFaqs(data.faqs)
        }
      }
    } catch {
      // Use mock data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFAQs()
  }, [fetchFAQs])

  const openNewFAQDialog = () => {
    setEditingFAQ(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (faq: FAQ) => {
    setEditingFAQ(faq)
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      isActive: faq.isActive,
      order: faq.order,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.question || !form.answer || !form.category) return

    try {
      if (editingFAQ) {
        const res = await fetch('/api/faq', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingFAQ.id, ...form }),
        })
        if (res.ok) {
          setFaqs((prev) =>
            prev.map((f) => (f.id === editingFAQ.id ? { ...f, ...form } as FAQ : f))
          )
        }
      } else {
        const res = await fetch('/api/faq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const data = await res.json()
          if (data.faq) {
            setFaqs((prev) => [data.faq, ...prev])
          }
        }
      }
    } catch {
      // Local update
      if (editingFAQ) {
        setFaqs((prev) =>
          prev.map((f) => (f.id === editingFAQ.id ? { ...f, ...form } as FAQ : f))
        )
      } else {
        const newFAQ: FAQ = {
          id: `local-${Date.now()}`,
          ...form,
          createdAt: new Date().toISOString(),
        }
        setFaqs((prev) => [newFAQ, ...prev])
      }
    }

    setFormDialogOpen(false)
    setEditingFAQ(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/faq?id=${id}`, { method: 'DELETE' })
    } catch {
      // Continue with local delete
    }
    setFaqs((prev) => prev.filter((f) => f.id !== id))
  }

  const toggleActive = async (faq: FAQ) => {
    const newStatus = !faq.isActive
    const updatedFAQ = { ...faq, isActive: newStatus }

    try {
      await fetch('/api/faq', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: faq.id, isActive: newStatus }),
      })
    } catch {
      // Continue with local update
    }

    setFaqs((prev) => prev.map((f) => (f.id === faq.id ? updatedFAQ : f)))
  }

  const filteredFAQs = categoryFilter === 'all'
    ? faqs
    : faqs.filter((f) => f.category === categoryFilter)

  const categoryCounts = faqCategories.reduce((acc, cat) => {
    acc[cat.value] = faqs.filter((f) => f.category === cat.value).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">FAQ Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage frequently asked questions for your website
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchFAQs}
            variant="outline"
            size="sm"
            className="text-burgundy border-burgundy/20 hover:bg-burgundy/5"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={openNewFAQDialog}
            size="sm"
            className="bg-burgundy hover:bg-burgundy-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </div>
      </div>

      {/* FAQ Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{faqs.length}</p>
            <p className="text-xs text-muted-foreground">Total FAQs</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{faqs.filter((f) => f.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{faqs.filter((f) => !f.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-marigold-dark">
              {new Set(faqs.map((f) => f.category)).size}
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
              All ({faqs.length})
            </Button>
            {faqCategories.map((cat) => {
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

      {/* FAQs Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Question</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFAQs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      {faqs.length === 0
                        ? 'No FAQs yet. Add your first question!'
                        : 'No FAQs found for this category.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFAQs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="font-medium text-burgundy-dark line-clamp-1">{faq.question}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{faq.answer}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(faq.category)}`}>
                          {getCategoryLabel(faq.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {faq.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 border">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Inactive
                            </Badge>
                          )}
                          <button
                            onClick={() => toggleActive(faq)}
                            className="text-muted-foreground hover:text-burgundy"
                            title={faq.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {faq.isActive ? (
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
                            onClick={() => openEditDialog(faq)}
                            className="text-burgundy hover:bg-burgundy/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(faq.id)}
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

      {/* New/Edit FAQ Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Question */}
            <div className="space-y-2">
              <Label htmlFor="faq-question">Question</Label>
              <Textarea
                id="faq-question"
                placeholder="Enter the frequently asked question..."
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                rows={2}
              />
            </div>

            {/* Answer */}
            <div className="space-y-2">
              <Label htmlFor="faq-answer">Answer</Label>
              <Textarea
                id="faq-answer"
                placeholder="Provide the answer to this question..."
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                rows={5}
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
                    {faqCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq-order">Display Order</Label>
                <Input
                  id="faq-order"
                  type="number"
                  placeholder="0"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            {/* Preview */}
            {(form.question || form.answer) && (
              <div className="border rounded-lg p-4 space-y-3 bg-ivory/50">
                <h4 className="font-semibold text-sm text-burgundy flex items-center gap-2">
                  <MessageCircleQuestion className="w-4 h-4" />
                  Preview
                </h4>
                <div className="space-y-2">
                  <p className="font-medium text-sm text-burgundy-dark">
                    Q: {form.question || 'Your question will appear here...'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    A: {form.answer || 'Your answer will appear here...'}
                  </p>
                </div>
              </div>
            )}

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-sm font-medium">Active Status</Label>
                <p className="text-xs text-muted-foreground">
                  {form.isActive ? 'This FAQ is visible on the website' : 'This FAQ is hidden from the website'}
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
                disabled={!form.question || !form.answer || !form.category}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {editingFAQ ? 'Update FAQ' : 'Add FAQ'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
