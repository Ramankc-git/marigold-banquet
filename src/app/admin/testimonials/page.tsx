'use client'

import { Star, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const testimonials = [
  { name: 'Anita & Rajesh', event: 'Wedding Reception', rating: 5, review: 'Our dream wedding came true at Marigold. The decoration was breathtaking and the food was exceptional!', status: 'Active' },
  { name: 'Suman Adhikari', event: 'Corporate Event', rating: 5, review: 'Perfect venue for our annual conference. Professional staff and excellent facilities.', status: 'Active' },
  { name: 'Priya Maharjan', event: 'Birthday Party', rating: 4, review: 'Had an amazing birthday celebration. The garden terrace is beautiful!', status: 'Active' },
  { name: 'Deepak & Sita', event: 'Engagement Ceremony', rating: 5, review: 'The engagement was magical. The team went above and beyond our expectations.', status: 'Active' },
  { name: 'Kumar Rai', event: 'Anniversary Party', rating: 4, review: 'Wonderful evening! The decoration and food were top notch.', status: 'Pending' },
]

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Testimonials</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage client reviews and testimonials</p>
        </div>
        <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
          <Plus className="w-4 h-4 mr-2" />Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <Card key={t.name} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-serif text-burgundy">{t.name}</CardTitle>
                <Badge variant="outline" className={t.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}>{t.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-marigold text-marigold' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-muted-foreground ml-2">{t.event}</span>
              </div>
              <p className="text-sm text-muted-foreground italic">&ldquo;{t.review}&rdquo;</p>
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
