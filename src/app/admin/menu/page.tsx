'use client'

import { UtensilsCrossed, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const menuItems = [
  { name: 'Nepali Thali Classic', category: 'Nepali Thali', price: 'Rs. 1,200/plate', veg: true, jain: false },
  { name: 'Nepali Thali Premium', category: 'Nepali Thali', price: 'Rs. 1,800/plate', veg: false, jain: false },
  { name: 'Mughlai Buffet', category: 'Indian', price: 'Rs. 2,000/plate', veg: false, jain: false },
  { name: 'Chinese Dim Sum Spread', category: 'Chinese', price: 'Rs. 1,500/plate', veg: false, jain: false },
  { name: 'Continental Platter', category: 'Continental', price: 'Rs. 1,800/plate', veg: true, jain: false },
  { name: 'Live Chaat Counter', category: 'Live Counters', price: 'Rs. 800/plate', veg: true, jain: true },
  { name: 'Tandoori BBQ Station', category: 'Live Counters', price: 'Rs. 1,200/plate', veg: false, jain: false },
  { name: 'Fusion Delight', category: 'Fusion', price: 'Rs. 2,200/plate', veg: false, jain: false },
]

const catColors: Record<string, string> = {
  'Nepali Thali': 'bg-amber-100 text-amber-700 border-amber-200',
  'Indian': 'bg-orange-100 text-orange-700 border-orange-200',
  'Chinese': 'bg-red-100 text-red-700 border-red-200',
  'Continental': 'bg-blue-100 text-blue-700 border-blue-200',
  'Live Counters': 'bg-green-100 text-green-700 border-green-200',
  'Fusion': 'bg-purple-100 text-purple-700 border-purple-200',
}

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Menu / Food</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage menu items and catering options</p>
        </div>
        <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
          <Plus className="w-4 h-4 mr-2" />Add Menu Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Card key={item.name} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-serif text-burgundy">{item.name}</CardTitle>
                <div className="flex gap-1">
                  {item.veg && <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">Veg</Badge>}
                  {item.jain && <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">Jain</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="outline" className={catColors[item.category] || ''}>{item.category}</Badge>
              <p className="text-lg font-bold text-marigold-dark">{item.price}</p>
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
