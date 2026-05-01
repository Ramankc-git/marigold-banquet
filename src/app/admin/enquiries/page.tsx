'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Mail,
  Phone,
  Calendar,
  Users,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  PhoneCall,
  RefreshCw,
  Search,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Separator } from '@/components/ui/separator'

interface Enquiry {
  id: string
  fullName: string
  phone: string
  email?: string | null
  eventType: string
  hallPreference?: string | null
  expectedGuests?: number | null
  preferredDate?: string | null
  budgetRange?: string | null
  specialReqs?: string | null
  status: string
  referenceNumber: string
  notes?: string | null
  createdAt: string
}

const mockEnquiries: Enquiry[] = [
  {
    id: '1', fullName: 'Rajesh Sharma', phone: '+977-9851234567', email: 'rajesh@email.com',
    eventType: 'Wedding Reception', hallPreference: 'Grand Ballroom', expectedGuests: 350,
    preferredDate: '2026-05-15', budgetRange: '5-10 Lakh', specialReqs: 'Need flower decoration and DJ',
    status: 'new', referenceNumber: 'MG-A1B2C3', createdAt: '2026-04-28T10:30:00Z',
  },
  {
    id: '2', fullName: 'Priya Maharjan', phone: '+977-9807654321', email: 'priya@email.com',
    eventType: 'Birthday Party', hallPreference: 'Garden Terrace', expectedGuests: 80,
    preferredDate: '2026-05-20', budgetRange: '1-3 Lakh', specialReqs: 'Theme: Tropical Paradise',
    status: 'contacted', referenceNumber: 'MG-D4E5F6', createdAt: '2026-04-27T14:20:00Z',
  },
  {
    id: '3', fullName: 'Suman Adhikari', phone: '+977-9841111222', email: 'suman@company.com',
    eventType: 'Corporate Event', hallPreference: 'Conference Hall', expectedGuests: 150,
    preferredDate: '2026-06-01', budgetRange: '3-5 Lakh', specialReqs: 'Need projector and sound system',
    status: 'confirmed', referenceNumber: 'MG-G7H8I9', createdAt: '2026-04-26T09:15:00Z',
  },
  {
    id: '4', fullName: 'Anita Tamang', phone: '+977-9865432100', email: 'anita@email.com',
    eventType: 'Engagement Ceremony', hallPreference: 'Grand Ballroom', expectedGuests: 200,
    preferredDate: '2026-05-25', budgetRange: '3-5 Lakh',
    status: 'new', referenceNumber: 'MG-J1K2L3', createdAt: '2026-04-29T08:45:00Z',
  },
  {
    id: '5', fullName: 'Bikash Gurung', phone: '+977-9876543210', email: 'bikash@email.com',
    eventType: 'Wedding Reception', hallPreference: 'Grand Ballroom', expectedGuests: 500,
    preferredDate: '2026-06-10', budgetRange: '10+ Lakh',
    status: 'cancelled', referenceNumber: 'MG-M4N5O6', createdAt: '2026-04-25T16:00:00Z',
  },
  {
    id: '6', fullName: 'Maya Rai', phone: '+977-9856789012', email: 'maya@email.com',
    eventType: 'Anniversary Party', hallPreference: 'Garden Terrace', expectedGuests: 60,
    preferredDate: '2026-06-15', budgetRange: '1-2 Lakh',
    status: 'new', referenceNumber: 'MG-P7Q8R9', createdAt: '2026-04-30T07:30:00Z',
  },
  {
    id: '7', fullName: 'Deepak KC', phone: '+977-9801234567',
    eventType: 'Birthday Party', hallPreference: 'Rooftop Hall', expectedGuests: 40,
    preferredDate: '2026-05-30', budgetRange: '50K-1 Lakh',
    status: 'contacted', referenceNumber: 'MG-S1T2U3', createdAt: '2026-04-24T11:00:00Z',
  },
]

function getStatusBadge(status: string) {
  const map: Record<string, { label: string; className: string }> = {
    new: { label: 'New', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200' },
    contacted: { label: 'Contacted', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200' },
    confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200' },
    cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200' },
  }
  const s = map[status] || { label: status, className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' }
  return <Badge variant="outline" className={s.className}>{s.label}</Badge>
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchEnquiries = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/enquiries?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        if (data.enquiries && data.enquiries.length > 0) {
          setEnquiries(data.enquiries)
        }
      }
    } catch {
      // Use mock data
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchEnquiries()
  }, [fetchEnquiries])

  const filteredEnquiries = enquiries.filter((e) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        e.fullName.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.referenceNumber.toLowerCase().includes(q) ||
        e.eventType.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        )
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus })
        }
      }
    } catch {
      // Handle error silently
    }
  }

  const openDetail = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Enquiries</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage all customer enquiries and their status
          </p>
        </div>
        <Button
          onClick={fetchEnquiries}
          variant="outline"
          size="sm"
          className="text-burgundy border-burgundy/20 hover:bg-burgundy/5"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">Event Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Preferred Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No enquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id} className="cursor-pointer hover:bg-ivory/50" onClick={() => openDetail(enquiry)}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-burgundy-dark">{enquiry.fullName}</p>
                          <p className="text-xs text-muted-foreground">{enquiry.referenceNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{enquiry.phone}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{enquiry.eventType}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {enquiry.preferredDate ? formatDate(enquiry.preferredDate) : '—'}
                      </TableCell>
                      <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            openDetail(enquiry)
                          }}
                          className="text-burgundy hover:bg-burgundy/10"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Enquiry Details
            </DialogTitle>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              {/* Status & Reference */}
              <div className="flex items-center justify-between">
                {getStatusBadge(selectedEnquiry.status)}
                <span className="text-xs text-muted-foreground font-mono">
                  {selectedEnquiry.referenceNumber}
                </span>
              </div>

              <Separator />

              {/* Contact Info */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-burgundy">Contact Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedEnquiry.fullName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {selectedEnquiry.phone}
                    </p>
                  </div>
                  {selectedEnquiry.email && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedEnquiry.email}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Event Details */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-burgundy">Event Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Event Type</p>
                    <p className="font-medium">{selectedEnquiry.eventType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Preferred Date</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {selectedEnquiry.preferredDate ? formatDate(selectedEnquiry.preferredDate) : 'Not specified'}
                    </p>
                  </div>
                  {selectedEnquiry.hallPreference && (
                    <div>
                      <p className="text-muted-foreground">Hall Preference</p>
                      <p className="font-medium">{selectedEnquiry.hallPreference}</p>
                    </div>
                  )}
                  {selectedEnquiry.expectedGuests && (
                    <div>
                      <p className="text-muted-foreground">Expected Guests</p>
                      <p className="font-medium flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {selectedEnquiry.expectedGuests}
                      </p>
                    </div>
                  )}
                  {selectedEnquiry.budgetRange && (
                    <div>
                      <p className="text-muted-foreground">Budget Range</p>
                      <p className="font-medium">{selectedEnquiry.budgetRange}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedEnquiry.specialReqs && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-sm text-burgundy">Special Requirements</h4>
                    <p className="text-sm mt-1 text-muted-foreground">{selectedEnquiry.specialReqs}</p>
                  </div>
                </>
              )}

              <Separator />

              {/* Created date */}
              <p className="text-xs text-muted-foreground">
                Received on {formatDate(selectedEnquiry.createdAt)}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedEnquiry.status === 'new' && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusUpdate(selectedEnquiry.id, 'contacted')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <PhoneCall className="w-4 h-4 mr-1" />
                    Mark Contacted
                  </Button>
                )}
                {(selectedEnquiry.status === 'new' || selectedEnquiry.status === 'contacted') && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusUpdate(selectedEnquiry.id, 'confirmed')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Mark Confirmed
                  </Button>
                )}
                {selectedEnquiry.status !== 'cancelled' && selectedEnquiry.status !== 'confirmed' && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleStatusUpdate(selectedEnquiry.id, 'cancelled')}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
