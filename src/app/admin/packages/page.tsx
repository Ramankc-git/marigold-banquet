'use client'

import { Package, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const packages = [
  { name: 'Silver Wedding', category: 'Wedding', tier: 'Silver', price: 'Rs. 2,500/plate', status: 'Active' },
  { name: 'Gold Wedding', category: 'Wedding', tier: 'Gold', price: 'Rs. 3,500/plate', status: 'Active' },
  { name: 'Platinum Wedding', category: 'Wedding', tier: 'Platinum', price: 'Rs. 5,000/plate', status: 'Active' },
  { name: 'Basic Party', category: 'Party', tier: 'Basic', price: 'Rs. 50,000/event', status: 'Active' },
  { name: 'Premium Party', category: 'Party', tier: 'Premium', price: 'Rs. 1,00,000/event', status: 'Active' },
  { name: 'Corporate Basic', category: 'Corporate', tier: 'Basic', price: 'Rs. 80,000/half day', status: 'Active' },
  { name: 'Corporate Premium', category: 'Corporate', tier: 'Premium', price: 'Rs. 1,50,000/full day', status: 'Active' },
]

const tierColors: Record<string, string> = {
  Silver: 'bg-gray-100 text-gray-700 border-gray-300',
  Gold: 'bg-marigold/10 text-marigold-dark border-marigold/30',
  Platinum: 'bg-purple-100 text-purple-700 border-purple-300',
  Basic: 'bg-blue-100 text-blue-700 border-blue-300',
  Premium: 'bg-rose-gold/10 text-rose-gold border-rose-gold/30',
}

export default function PackagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Packages</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage event packages and pricing</p>
        </div>
        <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
          <Plus className="w-4 h-4 mr-2" />Add Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.name} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-serif text-burgundy">{pkg.name}</CardTitle>
                <Badge variant="outline" className={tierColors[pkg.tier] || ''}>{pkg.tier}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="w-4 h-4" />
                <span>{pkg.category}</span>
              </div>
              <p className="text-lg font-bold text-marigold-dark">{pkg.price}</p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="text-burgundy border-burgundy/20">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
