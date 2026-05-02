'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Mail,
  Calendar,
  DollarSign,
  ImageIcon,
  Plus,
  Eye,
  ArrowRight,
  TrendingUp,
  Clock,
  Phone,
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

// Mock data for initial display
const mockEnquiries = [
  {
    id: '1',
    fullName: 'Rajesh Sharma',
    phone: '+977-9851234567',
    eventType: 'Wedding Reception',
    preferredDate: '2026-05-15',
    status: 'new',
    createdAt: '2026-04-28T10:30:00Z',
    expectedGuests: 350,
    referenceNumber: 'MG-A1B2C3',
  },
  {
    id: '2',
    fullName: 'Priya Maharjan',
    phone: '+977-9807654321',
    eventType: 'Birthday Party',
    preferredDate: '2026-05-20',
    status: 'contacted',
    createdAt: '2026-04-27T14:20:00Z',
    expectedGuests: 80,
    referenceNumber: 'MG-D4E5F6',
  },
  {
    id: '3',
    fullName: 'Suman Adhikari',
    phone: '+977-9841111222',
    eventType: 'Corporate Event',
    preferredDate: '2026-06-01',
    status: 'confirmed',
    createdAt: '2026-04-26T09:15:00Z',
    expectedGuests: 150,
    referenceNumber: 'MG-G7H8I9',
  },
  {
    id: '4',
    fullName: 'Anita Tamang',
    phone: '+977-9865432100',
    eventType: 'Engagement Ceremony',
    preferredDate: '2026-05-25',
    status: 'new',
    createdAt: '2026-04-29T08:45:00Z',
    expectedGuests: 200,
    referenceNumber: 'MG-J1K2L3',
  },
  {
    id: '5',
    fullName: 'Bikash Gurung',
    phone: '+977-9876543210',
    eventType: 'Wedding Reception',
    preferredDate: '2026-06-10',
    status: 'cancelled',
    createdAt: '2026-04-25T16:00:00Z',
    expectedGuests: 500,
    referenceNumber: 'MG-M4N5O6',
  },
]

const mockBookings = [
  {
    id: '1',
    fullName: 'Suman Adhikari',
    eventType: 'Corporate Event',
    eventDate: '2026-06-01',
    startTime: '09:00',
    endTime: '17:00',
    expectedGuests: 150,
    status: 'confirmed',
    totalAmount: 150000,
  },
  {
    id: '2',
    fullName: 'Neha Shrestha',
    eventType: 'Wedding Reception',
    eventDate: '2026-05-18',
    startTime: '16:00',
    endTime: '23:00',
    expectedGuests: 400,
    status: 'confirmed',
    totalAmount: 450000,
  },
  {
    id: '3',
    fullName: 'Deepak KC',
    eventType: 'Birthday Party',
    eventDate: '2026-05-22',
    startTime: '18:00',
    endTime: '22:00',
    expectedGuests: 60,
    status: 'pending',
    totalAmount: 50000,
  },
  {
    id: '4',
    fullName: 'Rita Basnet',
    eventType: 'Engagement Ceremony',
    eventDate: '2026-05-28',
    startTime: '10:00',
    endTime: '15:00',
    expectedGuests: 200,
    status: 'confirmed',
    totalAmount: 200000,
  },
  {
    id: '5',
    fullName: 'Kumar Rai',
    eventType: 'Anniversary Party',
    eventDate: '2026-06-05',
    startTime: '17:00',
    endTime: '22:00',
    expectedGuests: 100,
    status: 'pending',
    totalAmount: 80000,
  },
]

interface Enquiry {
  id: string
  fullName: string
  phone: string
  eventType: string
  preferredDate?: string | null
  status: string
  createdAt: string
  expectedGuests?: number | null
  referenceNumber: string
}

interface Booking {
  id: string
  fullName: string
  eventType: string
  eventDate: string
  startTime?: string | null
  endTime?: string | null
  expectedGuests?: number | null
  status: string
  totalAmount?: number | null
}

function getStatusBadge(status: string) {
  const map: Record<string, { label: string; className: string }> = {
    new: { label: 'New', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
    contacted: { label: 'Contacted', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
    confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
    cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
    completed: { label: 'Completed', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
  }
  const s = map[status] || { label: status, className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' }
  return <Badge className={s.className}>{s.label}</Badge>
}

function formatCurrency(amount: number) {
  return `Rs. ${amount.toLocaleString('en-NP')}`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [galleryCount, setGalleryCount] = useState(24)

  useEffect(() => {
    async function fetchData() {
      try {
        const [enqRes, bookRes, galRes] = await Promise.all([
          fetch('/api/enquiries?limit=5'),
          fetch('/api/bookings?limit=5'),
          fetch('/api/gallery?all=true'),
        ])

        if (enqRes.ok) {
          const enqJson = await enqRes.json()
          const enqResult = enqJson.data
          if (enqResult?.enquiries) {
            setEnquiries(enqResult.enquiries.slice(0, 5))
          }
        }
        if (bookRes.ok) {
          const bookJson = await bookRes.json()
          const bookResult = bookJson.data
          if (bookResult?.bookings) {
            setBookings(bookResult.bookings.slice(0, 5))
          }
        }
        if (galRes.ok) {
          const galJson = await galRes.json()
          const galResult = galJson.data
          if (galResult?.photos) {
            setGalleryCount(galResult.photos.length)
          }
        }
      } catch {
        toast.error('Failed to load dashboard data. Please refresh the page.')
      }
    }
    fetchData()
  }, [])

  const todayEnquiries = enquiries.filter(
    (e) => new Date(e.createdAt).toDateString() === new Date().toDateString()
  ).length

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.eventDate) >= new Date()
  ).length

  const monthlyRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)

  const stats = [
    {
      title: "Today's Enquiries",
      value: todayEnquiries || enquiries.filter((e) => e.status === 'new').length,
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      accent: 'bg-blue-50 text-blue-600',
      trend: '+12%',
    },
    {
      title: 'Upcoming Bookings',
      value: upcomingBookings,
      icon: Calendar,
      color: 'from-burgundy to-burgundy-dark',
      accent: 'bg-burgundy/10 text-burgundy',
      trend: '+8%',
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(monthlyRevenue),
      icon: DollarSign,
      color: 'from-marigold to-marigold-dark',
      accent: 'bg-marigold/10 text-marigold-dark',
      trend: '+23%',
    },
    {
      title: 'Gallery Photos',
      value: galleryCount,
      icon: ImageIcon,
      color: 'from-rose-gold to-rose-gold-light',
      accent: 'bg-rose-gold/10 text-rose-gold',
      trend: '+5%',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-bold text-burgundy font-serif">
          Welcome back, Admin
        </h2>
        <p className="text-muted-foreground mt-1">
          Here&apos;s an overview of your banquet hall activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-burgundy-dark">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.accent}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{stat.trend} from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries Table */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-serif text-burgundy">Recent Enquiries</CardTitle>
                <CardDescription>Latest 5 enquiries received</CardDescription>
              </div>
              <Link href="/admin/enquiries">
                <Button variant="outline" size="sm" className="text-burgundy border-burgundy/20 hover:bg-burgundy/5">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Event</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-burgundy-dark">{enquiry.fullName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {enquiry.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{enquiry.eventType}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">
                      {enquiry.preferredDate ? formatDate(enquiry.preferredDate) : '—'}
                    </TableCell>
                    <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-serif text-burgundy">Upcoming Bookings</CardTitle>
                <CardDescription>Next 5 scheduled events</CardDescription>
              </div>
              <Link href="/admin/bookings">
                <Button variant="outline" size="sm" className="text-burgundy border-burgundy/20 hover:bg-burgundy/5">
                  View
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-3 rounded-lg bg-ivory hover:bg-ivory-dark transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-burgundy-dark truncate">
                      {booking.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground">{booking.eventType}</p>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(booking.eventDate)}
                  </span>
                  {booking.startTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {booking.startTime}
                    </span>
                  )}
                </div>
                {booking.expectedGuests && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {booking.expectedGuests} guests
                    {booking.totalAmount ? ` · ${formatCurrency(booking.totalAmount)}` : ''}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-serif text-burgundy">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/enquiries">
              <Button className="bg-burgundy hover:bg-burgundy-dark text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Enquiry
              </Button>
            </Link>
            <Link href="/admin/bookings">
              <Button variant="outline" className="text-burgundy border-burgundy/20 hover:bg-burgundy/5">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </Link>
            <Link href="/admin/gallery">
              <Button variant="outline" className="text-marigold-dark border-marigold/30 hover:bg-marigold/5">
                <ImageIcon className="w-4 h-4 mr-2" />
                Manage Gallery
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button variant="outline" className="text-rose-gold border-rose-gold/30 hover:bg-rose-gold/5">
                <Eye className="w-4 h-4 mr-2" />
                Blog Manager
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
