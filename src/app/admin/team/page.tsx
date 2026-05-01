'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Users,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  LayoutGrid,
  List,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string | null
  photo?: string | null
  isActive: boolean
  order: number
  createdAt: string
}

const mockMembers: TeamMember[] = [
  {
    id: '1', name: 'Aarav Sharma', role: 'Founder & CEO',
    bio: 'Visionary leader with 15+ years of experience in event planning and management across Nepal.',
    photo: '', isActive: true, order: 1, createdAt: '2025-06-01T08:00:00Z',
  },
  {
    id: '2', name: 'Priya Maharjan', role: 'Creative Director',
    bio: 'Award-winning decorator specializing in marigold-themed wedding designs and cultural celebrations.',
    photo: '', isActive: true, order: 2, createdAt: '2025-06-15T08:00:00Z',
  },
  {
    id: '3', name: 'Bikash Tamang', role: 'Event Coordinator',
    bio: 'Detail-oriented coordinator who ensures every event runs seamlessly from start to finish.',
    photo: '', isActive: true, order: 3, createdAt: '2025-07-01T08:00:00Z',
  },
  {
    id: '4', name: 'Sita Rai', role: 'Catering Manager',
    bio: 'Culinary expert managing our catering partnerships with top chefs and restaurants.',
    photo: '', isActive: true, order: 4, createdAt: '2025-07-15T08:00:00Z',
  },
  {
    id: '5', name: 'Raj Thapa', role: 'Photography Lead',
    bio: 'Professional photographer overseeing our vendor photography partnerships and in-house shoots.',
    photo: '', isActive: false, order: 5, createdAt: '2025-08-01T08:00:00Z',
  },
]

const emptyForm = {
  name: '',
  role: '',
  bio: '',
  photo: '',
  isActive: true,
  order: 0,
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(mockMembers)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid')

  const fetchMembers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/team?all=true')
      if (res.ok) {
        const data = await res.json()
        if (data.members && data.members.length > 0) {
          setMembers(data.members)
        }
      }
    } catch {
      // Use mock data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const openNewMemberDialog = () => {
    setEditingMember(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member)
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      photo: member.photo || '',
      isActive: member.isActive,
      order: member.order,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.role) return

    try {
      if (editingMember) {
        const res = await fetch('/api/team', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingMember.id, ...form }),
        })
        if (res.ok) {
          setMembers((prev) =>
            prev.map((m) => (m.id === editingMember.id ? { ...m, ...form } as TeamMember : m))
          )
        }
      } else {
        const res = await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const data = await res.json()
          if (data.member) {
            setMembers((prev) => [data.member, ...prev])
          }
        }
      }
    } catch {
      // Local update
      if (editingMember) {
        setMembers((prev) =>
          prev.map((m) => (m.id === editingMember.id ? { ...m, ...form } as TeamMember : m))
        )
      } else {
        const newMember: TeamMember = {
          id: `local-${Date.now()}`,
          ...form,
          createdAt: new Date().toISOString(),
        }
        setMembers((prev) => [newMember, ...prev])
      }
    }

    setFormDialogOpen(false)
    setEditingMember(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/team?id=${id}`, { method: 'DELETE' })
    } catch {
      // Continue with local delete
    }
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const toggleActive = async (member: TeamMember) => {
    const newStatus = !member.isActive
    const updatedMember = { ...member, isActive: newStatus }

    try {
      await fetch('/api/team', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: member.id, isActive: newStatus }),
      })
    } catch {
      // Continue with local update
    }

    setMembers((prev) => prev.map((m) => (m.id === member.id ? updatedMember : m)))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Team Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your team members and their profiles
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchMembers}
            variant="outline"
            size="sm"
            className="text-burgundy border-burgundy/20 hover:bg-burgundy/5"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-burgundy hover:bg-burgundy-dark text-white rounded-none' : 'rounded-none'}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-burgundy hover:bg-burgundy-dark text-white rounded-none' : 'rounded-none'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={openNewMemberDialog}
            size="sm"
            className="bg-burgundy hover:bg-burgundy-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{members.length}</p>
            <p className="text-xs text-muted-foreground">Total Members</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{members.filter((m) => m.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{members.filter((m) => !m.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-marigold-dark">
              {new Set(members.map((m) => m.role)).size}
            </p>
            <p className="text-xs text-muted-foreground">Unique Roles</p>
          </CardContent>
        </Card>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div>
          {members.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="py-12 text-center text-muted-foreground">
                No team members yet. Add your first team member!
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => (
                <Card key={member.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-burgundy/10 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-ivory border-2 border-burgundy/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-burgundy">
                            {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-burgundy-dark truncate">{member.name}</h3>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => toggleActive(member)}
                              className="text-muted-foreground hover:text-burgundy"
                              title={member.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {member.isActive ? (
                                <ToggleRight className="w-5 h-5 text-green-600" />
                              ) : (
                                <ToggleLeft className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-marigold-dark font-medium">{member.role}</p>
                        {member.bio && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{member.bio}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <div>
                        {member.isActive ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 border text-xs">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(member)}
                          className="text-burgundy hover:bg-burgundy/10 h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                          className="text-red-500 hover:bg-red-50 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Table View */
        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-ivory hover:bg-ivory">
                    <TableHead>Member</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No team members yet. Add your first team member!
                      </TableCell>
                    </TableRow>
                  ) : (
                    members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {member.photo ? (
                              <img
                                src={member.photo}
                                alt={member.name}
                                className="w-8 h-8 rounded-full object-cover border border-burgundy/10"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-ivory border border-burgundy/10 flex items-center justify-center">
                                <span className="text-xs font-bold text-burgundy">
                                  {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-burgundy-dark">{member.name}</p>
                              <p className="text-xs text-muted-foreground sm:hidden">{member.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline" className="text-xs bg-ivory border-burgundy/10 text-marigold-dark">
                            {member.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {member.isActive ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 border">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                Inactive
                              </Badge>
                            )}
                            <button
                              onClick={() => toggleActive(member)}
                              className="text-muted-foreground hover:text-burgundy"
                              title={member.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {member.isActive ? (
                                <ToggleRight className="w-5 h-5 text-green-600" />
                              ) : (
                                <ToggleLeft className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(member)}
                              className="text-burgundy hover:bg-burgundy/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(member.id)}
                              className="text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* New/Edit Team Member Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <Users className="w-5 h-5" />
              {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="member-name">Name</Label>
              <Input
                id="member-name"
                placeholder="Enter team member name..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Role & Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="member-role">Role</Label>
                <Input
                  id="member-role"
                  placeholder="e.g. Event Coordinator"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-order">Display Order</Label>
                <Input
                  id="member-order"
                  type="number"
                  placeholder="0"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="member-bio">Bio</Label>
              <Textarea
                id="member-bio"
                placeholder="Brief bio of the team member..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <Label htmlFor="member-photo">Photo URL</Label>
              <Input
                id="member-photo"
                placeholder="https://example.com/photo.jpg"
                value={form.photo}
                onChange={(e) => setForm({ ...form, photo: e.target.value })}
              />
              {form.photo && (
                <div className="mt-2">
                  <img
                    src={form.photo}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-burgundy/10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-sm font-medium">Active Status</Label>
                <p className="text-xs text-muted-foreground">
                  {form.isActive ? 'This member is visible on the website' : 'This member is hidden from the website'}
                </p>
              </div>
              <Switch
                checked={form.isActive}
                onCheckedChange={(checked) => setForm({ ...form, isActive: checked })}
              />
            </div>

            {/* Save/Cancel */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setFormDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!form.name || !form.role}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {editingMember ? 'Update Member' : 'Add Member'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
