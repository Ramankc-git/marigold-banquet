'use client'

import { HelpCircle, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const faqs = [
  { question: 'How do I book an event at Marigold?', answer: 'You can book an event by filling out our enquiry form, calling us at +977-9851111191, or visiting our venue in person.', category: 'Booking' },
  { question: 'What is the cancellation policy?', answer: 'Cancellations made 30+ days before the event receive a full refund minus processing fee. 15-30 days: 50% refund. Less than 15 days: no refund.', category: 'Booking' },
  { question: 'Do you provide in-house catering?', answer: 'Yes, we have an in-house kitchen with expert chefs specializing in Nepali, Indian, Chinese, and Continental cuisines.', category: 'Catering' },
  { question: 'Can I bring my own decorator?', answer: 'Yes, you can bring your own decorator. However, we also offer in-house decoration packages starting from Rs. 1,00,000.', category: 'Decoration' },
  { question: 'What is the maximum guest capacity?', answer: 'Our Grand Ballroom can accommodate up to 500 guests in banquet style and 700 in theatre style.', category: 'Venue' },
  { question: 'Is parking available?', answer: 'Yes, we have ample parking space for up to 100 vehicles, with valet parking available for premium packages.', category: 'Venue' },
  { question: 'Do you offer wedding packages?', answer: 'Yes, we offer Silver, Gold, and Platinum wedding packages ranging from Rs. 2,500 to Rs. 5,000 per plate.', category: 'Pricing' },
  { question: 'What are the payment options?', answer: 'We accept cash, bank transfer, and major credit/debit cards. A 30% advance is required to confirm the booking.', category: 'Pricing' },
]

const catColors: Record<string, string> = {
  Booking: 'bg-blue-100 text-blue-700 border-blue-200',
  Catering: 'bg-orange-100 text-orange-700 border-orange-200',
  Decoration: 'bg-pink-100 text-pink-700 border-pink-200',
  Venue: 'bg-teal-100 text-teal-700 border-teal-200',
  Pricing: 'bg-marigold/10 text-marigold-dark border-marigold/30',
  Weddings: 'bg-purple-100 text-purple-700 border-purple-200',
  Corporate: 'bg-gray-100 text-gray-700 border-gray-200',
}

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">FAQ</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage frequently asked questions</p>
        </div>
        <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
          <Plus className="w-4 h-4 mr-2" />Add FAQ
        </Button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-marigold shrink-0 mt-0.5" />
                  <CardTitle className="text-base text-burgundy">{faq.question}</CardTitle>
                </div>
                <Badge variant="outline" className={catColors[faq.category] || ''}>{faq.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground ml-8">{faq.answer}</p>
              <div className="flex gap-2 mt-3 ml-8">
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
