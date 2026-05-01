'use client'

import { Palette, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const themes = [
  { name: 'Royal Mughal', category: 'Royal', tier: 'Luxury', price: 'Rs. 3,50,000', status: 'Active' },
  { name: 'Enchanted Garden', category: 'Floral', tier: 'Premium', price: 'Rs. 2,50,000', status: 'Active' },
  { name: 'Minimal Elegance', category: 'Minimalist', tier: 'Basic', price: 'Rs. 1,00,000', status: 'Active' },
  { name: 'Traditional Newari', category: 'Traditional Nepali', tier: 'Premium', price: 'Rs. 2,00,000', status: 'Active' },
  { name: 'Modern Glamour', category: 'Modern Glam', tier: 'Luxury', price: 'Rs. 4,00,000', status: 'Active' },
  { name: 'Rustic Charm', category: 'Rustic', tier: 'Basic', price: 'Rs. 1,20,000', status: 'Active' },
]

const tierColors: Record<string, string> = {
  Basic: 'bg-blue-100 text-blue-700 border-blue-200',
  Premium: 'bg-marigold/10 text-marigold-dark border-marigold/30',
  Luxury: 'bg-purple-100 text-purple-700 border-purple-200',
}

export default function DecorationPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Decoration</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage decoration themes and packages</p>
        </div>
        <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
          <Plus className="w-4 h-4 mr-2" />Add Theme
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Card key={theme.name} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-serif text-burgundy">{theme.name}</CardTitle>
                <Badge variant="outline" className={tierColors[theme.tier] || ''}>{theme.tier}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Palette className="w-4 h-4" />
                <span>{theme.category}</span>
              </div>
              <p className="text-lg font-bold text-marigold-dark">{theme.price}</p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="text-burgundy border-burgundy/20">Edit</Button>
                <Button variant="outline" size="sm" className="text-rose-gold border-rose-gold/20">Photos</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
