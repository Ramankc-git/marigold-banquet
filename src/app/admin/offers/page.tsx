'use client'

import { Tag, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const offers = [
  { title: 'Wedding Season Special', description: 'Book your wedding before June 2026 and get 15% off on decoration package', discount: '15% OFF', validTill: '2026-06-30', status: 'Active' },
  { title: 'Corporate Bundle Deal', description: 'Book 3+ corporate events and get the 4th at 20% off', discount: '20% OFF', validTill: '2026-12-31', status: 'Active' },
  { title: 'Birthday Bash Package', description: 'Complete birthday party package starting from Rs. 35,000', discount: 'Rs. 35K+', validTill: '2026-09-30', status: 'Active' },
  { title: 'Early Bird Wedding', description: 'Book 6 months in advance and save 10% on venue rental', discount: '10% OFF', validTill: '2026-03-31', status: 'Expired' },
]

export default function OffersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Offers</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage promotional offers and discounts</p>
        </div>
        <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
          <Plus className="w-4 h-4 mr-2" />Add Offer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <Card key={offer.title} className={`border-0 shadow-md hover:shadow-lg transition-shadow ${offer.status === 'Expired' ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-serif text-burgundy">{offer.title}</CardTitle>
                <Badge variant="outline" className={offer.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}>{offer.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-marigold-dark bg-marigold/10 px-3 py-1 rounded-full">{offer.discount}</span>
              </div>
              <p className="text-sm text-muted-foreground">{offer.description}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Valid till: {new Date(offer.validTill).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="text-burgundy border-burgundy/20">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-500 border-red-200">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
