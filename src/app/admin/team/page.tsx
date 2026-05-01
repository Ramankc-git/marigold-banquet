'use client'

import { UserCircle, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const teamMembers = [
  { name: 'Dipak Maharjan', role: 'Founder & Managing Director', bio: '20+ years in hospitality industry', status: 'Active' },
  { name: 'Srijana Shrestha', role: 'Event Manager', bio: 'Specializes in wedding planning and coordination', status: 'Active' },
  { name: 'Ramesh Karki', role: 'Head Chef', bio: 'Expert in Nepali, Indian, and Continental cuisines', status: 'Active' },
  { name: 'Priya Tamang', role: 'Decoration Lead', bio: 'Award-winning floral and event designer', status: 'Active' },
  { name: 'Anil Basnet', role: 'Operations Manager', bio: 'Handles logistics and vendor coordination', status: 'Active' },
  { name: 'Sita Gurung', role: 'Guest Relations', bio: 'Ensures every event runs smoothly', status: 'Active' },
]

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Team</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage team members and their profiles</p>
        </div>
        <Button size="sm" className="bg-burgundy hover:bg-burgundy-dark text-white">
          <Plus className="w-4 h-4 mr-2" />Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.name} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-burgundy/10 mx-auto flex items-center justify-center">
                <UserCircle className="w-10 h-10 text-burgundy" />
              </div>
              <div>
                <h3 className="font-semibold text-burgundy font-serif">{member.name}</h3>
                <p className="text-sm text-marigold-dark font-medium">{member.role}</p>
              </div>
              <p className="text-xs text-muted-foreground">{member.bio}</p>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">{member.status}</Badge>
              <div className="flex gap-2 pt-2 justify-center">
                <Button variant="outline" size="sm" className="text-burgundy border-burgundy/20">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
