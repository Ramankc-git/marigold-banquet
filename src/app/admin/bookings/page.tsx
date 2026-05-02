'use client'

import { useEffect, useState } from 'react'
import {
  Calendar,
  Plus,
  RefreshCw,
  Phone,
  Clock,
  Users,
  DollarSign,
} from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Booking {
  id: string
  fullName: string
  phone: string
  eventType: string
  eventDate: string
  startTime?: string | null
  endTime?: string | null
  expectedGuests?: number | null
  status: string
  totalAmount?: number | null
  hallName?: string | null
}

const mockBookings: Booking[] = [
  {
    id: '1', fullName: 'Suman Adhikari', phone: '+977-9841111222',
    eventType: 'Corporate Event', eventDate: '2026-06-01',
    startTime: '09:00', endTime: '17:00', expectedGuests: 150,
    status: 'confirmed', totalAmount: 150000, hallName: 'Grand Ballroom',
  },
  {
    id: '2', fullName: 'Neha Shrestha', phone: '+977-9807654321',
    eventType: 'Wedding Reception', eventDate: '2026-05-18',
    startTime: '16:00', endTime: '23:00', expectedGuests: 400,
    status: 'confirmed', totalAmount: 450000, hallName: 'Grand Ballroom',
  },
  {
    id: '3', fullName: 'Deepak KC', phone: '+977-9801234567',
    eventType: 'Birthday Party', eventDate: '2026-05-22',
    startTime: '18:00', endTime: '22:00', expectedGuests: 60,
    status: 'pending', totalAmount: 50000, hallName: 'Garden Terrace',
  },
  {
    id: '4', fullName: 'Rita Basnet', phone: '+977-9865432100',
    eventType: 'Engagement Ceremony', eventDate: '2026-05-28',
    startTime: '10:00', endTime: '15:00', expectedGuests: 200,
    status: 'confirmed', totalAmount: 200000, hallName: 'Grand Ballroom',
  },
  {
    id: '5', fullName: 'Kumar Rai', phone: '+977-9876543210',
    eventType: 'Anniversary Party', eventDate: '2026-06-05',
    startTime: '17:00', endTime: '22:00', expectedGuests: 100,
    status: 'pending', totalAmount: 80000, hallName: 'Rooftop Hall',
  },
  {
    id: '6', fullName: 'Sita Poudel', phone: '+977-9856781234',
    eventType: 'Wedding Reception', eventDate: '2026-06-12',
    startTime: '14:00', endTime: '22:00', expectedGuests: 350,
    status: 'pending', totalAmount: 380000, hallName: 'Grand Ballroom',
  },
]

function getStatusBadge(status: string) {
  const map: Record<string, { label: string; className: string }> = {
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200' },
    confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200' },
    cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200' },
    completed: { label: 'Completed', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200' },
  }
  const s = map[status] || { label: status, className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' }
  return <Badge variant="outline" className={s.className}>{s.label}</Badge>
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatCurrency(amount: number) {
  return `Rs. ${amount.toLocaleString('en-NP')}`
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/bookings')
        if (res.ok) {
          const json = await res.json()
          const result = json.data
          if (result?.bookings) {
            setBookings(result.bookings)
          }
        }
      } catch {
        toast.error('Failed to load bookings. Please try again.')
      }
    }
    load()
  }, [])

  const confirmedRevenue = bookings
    .filter((b) => b.status === 'confirmed')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Bookings</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage event bookings and schedules</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.location.reload()} variant="outline" size="sm" className="text-burgundy border-burgundy/20 hover:bg-burgundy/5">
            <RefreshCw className="w-4 h-4 mr-2" />Refresh
          </Button>
          <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
            <Plus className="w-4 h-4 mr-2" />New Booking
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{bookings.length}</p>
            <p className="text-xs text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{bookings.filter((b) => b.status === 'pending').length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{bookings.filter((b) => b.status === 'confirmed').length}</p>
            <p className="text-xs text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-marigold-dark">{formatCurrency(confirmedRevenue)}</p>
            <p className="text-xs text-muted-foreground">Confirmed Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden sm:table-cell">Event</TableHead>
                  <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                  <TableHead className="hidden lg:table-cell">Guests</TableHead>
                  <TableHead className="hidden lg:table-cell">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-burgundy-dark">{booking.fullName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{booking.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{booking.eventType}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm">
                        <p className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(booking.eventDate)}</p>
                        {booking.startTime && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{booking.startTime} - {booking.endTime}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{booking.expectedGuests ? `${booking.expectedGuests} guests` : '—'}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{booking.totalAmount ? formatCurrency(booking.totalAmount) : '—'}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
