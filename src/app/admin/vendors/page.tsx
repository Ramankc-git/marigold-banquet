'use client'

import { Users, Plus, Phone, Mail, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const vendors = [
  { name: 'PixelPerfect Photography', category: 'Photographer', phone: '+977-9851234567', email: 'info@pixelperfect.com.np', status: 'Active' },
  { name: 'Floral Dreams', category: 'Decorator', phone: '+977-9807654321', email: 'hello@floraldreams.com.np', status: 'Active' },
  { name: 'Rhythmic Beats Band', category: 'Band', phone: '+977-9841111222', email: '', status: 'Active' },
  { name: 'Mehendi Art Studio', category: 'Mehendi', phone: '+977-9865432100', email: 'mehendiart@gmail.com', status: 'Active' },
  { name: 'Glamour Makeup Studio', category: 'Makeup', phone: '+977-9876543210', email: 'glamourmakeup@gmail.com', status: 'Active' },
  { name: 'Comfort Transport', category: 'Transport', phone: '+977-9856781234', email: '', status: 'Inactive' },
]

const catColors: Record<string, string> = {
  Photographer: 'bg-blue-100 text-blue-700 border-blue-200',
  Decorator: 'bg-pink-100 text-pink-700 border-pink-200',
  Band: 'bg-purple-100 text-purple-700 border-purple-200',
  Mehendi: 'bg-amber-100 text-amber-700 border-amber-200',
  Makeup: 'bg-rose-100 text-rose-700 border-rose-200',
  Transport: 'bg-teal-100 text-teal-700 border-teal-200',
}

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Vendors</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage partnered vendors and service providers</p>
        </div>
        <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
          <Plus className="w-4 h-4 mr-2" />Add Vendor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map((vendor) => (
          <Card key={vendor.name} className={`border-0 shadow-md hover:shadow-lg transition-shadow ${vendor.status === 'Inactive' ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-serif text-burgundy">{vendor.name}</CardTitle>
                <Badge variant="outline" className={catColors[vendor.category] || ''}>{vendor.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {vendor.phone && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />{vendor.phone}
                </p>
              )}
              {vendor.email && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />{vendor.email}
                </p>
              )}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="text-burgundy border-burgundy/20">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-500 border-red-200">Remove</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
