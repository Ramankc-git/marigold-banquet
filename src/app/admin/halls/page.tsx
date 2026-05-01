'use client'

import { Building, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const halls = [
  { name: 'Grand Ballroom', capacity: '500 (Banquet) / 700 (Theatre)', status: 'Active', area: '5,000 sq ft' },
  { name: 'Garden Terrace', capacity: '200 (Banquet) / 300 (Cocktail)', status: 'Active', area: '3,000 sq ft' },
  { name: 'Conference Hall', capacity: '150 (Theatre) / 100 (Banquet)', status: 'Active', area: '1,800 sq ft' },
  { name: 'Rooftop Hall', capacity: '100 (Banquet) / 150 (Cocktail)', status: 'Active', area: '2,000 sq ft' },
]

export default function HallsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Halls / Spaces</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage your venue halls and event spaces</p>
        </div>
        <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
          <Plus className="w-4 h-4 mr-2" />Add Hall
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {halls.map((hall) => (
          <Card key={hall.name} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-serif text-burgundy">{hall.name}</CardTitle>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Active</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="w-4 h-4" />
                <span>{hall.area}</span>
              </div>
              <p className="text-sm text-muted-foreground">Capacity: {hall.capacity}</p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="text-burgundy border-burgundy/20">Edit</Button>
                <Button variant="outline" size="sm" className="text-rose-gold border-rose-gold/20">View Photos</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
