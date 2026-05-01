'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Globe,
  Eye,
  ToggleLeft,
  ToggleRight,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  featuredImage?: string | null
  category: string
  author?: string | null
  readTime?: number | null
  seoTitle?: string | null
  seoDesc?: string | null
  isPublished: boolean
  publishedAt?: string | null
  createdAt: string
}

const blogCategories = [
  { value: 'wedding_tips', label: 'Wedding Tips' },
  { value: 'party_ideas', label: 'Party Ideas' },
  { value: 'corporate_events', label: 'Corporate Events' },
  { value: 'decoration_trends', label: 'Decoration Trends' },
  { value: 'food_catering', label: 'Food & Catering' },
  { value: 'venue_guide', label: 'Venue Guide' },
  { value: 'nepal_event_culture', label: 'Nepal Event Culture' },
]

const mockPosts: BlogPost[] = [
  {
    id: '1', title: 'Top 10 Wedding Decoration Trends in Nepal for 2026', slug: 'top-10-wedding-decoration-trends-nepal-2026',
    excerpt: 'Discover the latest wedding decoration trends that are taking Nepal by storm this year.',
    content: 'Full article content here...', featuredImage: '', category: 'wedding_tips',
    author: 'Marigold Team', readTime: 8, seoTitle: 'Wedding Decoration Trends Nepal 2026',
    seoDesc: 'Discover the latest wedding decoration trends in Nepal for 2026.', isPublished: true,
    publishedAt: '2026-04-15T10:00:00Z', createdAt: '2026-04-14T08:00:00Z',
  },
  {
    id: '2', title: 'How to Plan the Perfect Birthday Party in Kathmandu', slug: 'plan-perfect-birthday-party-kathmandu',
    excerpt: 'A complete guide to organizing unforgettable birthday celebrations in Kathmandu.',
    content: 'Full article content here...', featuredImage: '', category: 'party_ideas',
    author: 'Marigold Team', readTime: 6, isPublished: true,
    publishedAt: '2026-04-10T10:00:00Z', createdAt: '2026-04-09T08:00:00Z',
  },
  {
    id: '3', title: 'Corporate Event Planning: A Comprehensive Guide', slug: 'corporate-event-planning-guide',
    excerpt: 'Everything you need to know about planning successful corporate events.',
    content: 'Full article content here...', featuredImage: '', category: 'corporate_events',
    author: 'Marigold Team', readTime: 10, isPublished: false,
    createdAt: '2026-04-20T08:00:00Z',
  },
  {
    id: '4', title: 'Traditional Nepali Wedding Customs and Modern Twists', slug: 'traditional-nepali-wedding-customs-modern',
    excerpt: 'How couples are blending traditional Nepali wedding customs with modern celebrations.',
    content: 'Full article content here...', featuredImage: '', category: 'nepal_event_culture',
    author: 'Marigold Team', readTime: 7, isPublished: true,
    publishedAt: '2026-03-25T10:00:00Z', createdAt: '2026-03-24T08:00:00Z',
  },
  {
    id: '5', title: 'Choosing the Right Banquet Hall: What to Look For', slug: 'choosing-right-banquet-hall',
    excerpt: 'Key factors to consider when selecting a banquet hall for your event.',
    content: 'Draft content...', featuredImage: '', category: 'venue_guide',
    author: 'Marigold Team', readTime: 5, isPublished: false,
    createdAt: '2026-04-25T08:00:00Z',
  },
  {
    id: '6', title: 'Marigold Flower Decorations: Our Signature Style', slug: 'marigold-flower-decorations-signature-style',
    excerpt: 'Why marigold flowers are at the heart of our decoration philosophy.',
    content: 'Full article content here...', featuredImage: '', category: 'decoration_trends',
    author: 'Marigold Team', readTime: 4, isPublished: true,
    publishedAt: '2026-04-05T10:00:00Z', createdAt: '2026-04-04T08:00:00Z',
  },
]

function getCategoryLabel(value: string) {
  return blogCategories.find((c) => c.value === value)?.label || value
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  category: 'wedding_tips',
  author: 'Marigold Team',
  seoTitle: '',
  seoDesc: '',
  isPublished: false,
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/blogs?all=true')
      if (res.ok) {
        const json = await res.json()
        const result = json.data
        if (result?.posts) {
          setPosts(result.posts)
        }
      }
    } catch {
      // Use mock data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({ ...prev, title, slug: generateSlug(title) }))
  }

  const openNewPostDialog = () => {
    setEditingPost(null)
    setForm(emptyForm)
    setFormDialogOpen(true)
  }

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post)
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featuredImage: post.featuredImage || '',
      category: post.category,
      author: post.author || 'Marigold Team',
      seoTitle: post.seoTitle || '',
      seoDesc: post.seoDesc || '',
      isPublished: post.isPublished,
    })
    setFormDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.content || !form.category) return

    try {
      if (editingPost) {
        const res = await fetch('/api/blogs', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingPost.id, ...form }),
        })
        if (res.ok) {
          setPosts((prev) =>
            prev.map((p) => (p.id === editingPost.id ? { ...p, ...form } as BlogPost : p))
          )
        }
      } else {
        const res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const json = await res.json()
          const created = json.data
          if (created) {
            setPosts((prev) => [created, ...prev])
          }
        }
      }
    } catch {
      // Local update
      if (editingPost) {
        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? { ...p, ...form } as BlogPost : p))
        )
      } else {
        const newPost: BlogPost = {
          id: `local-${Date.now()}`,
          ...form,
          readTime: Math.ceil(form.content.split(' ').length / 200),
          createdAt: new Date().toISOString(),
          publishedAt: form.isPublished ? new Date().toISOString() : undefined,
        }
        setPosts((prev) => [newPost, ...prev])
      }
    }

    setFormDialogOpen(false)
    setEditingPost(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' })
    } catch {
      // Continue with local delete
    }
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  const togglePublish = async (post: BlogPost) => {
    const newStatus = !post.isPublished
    const updatedPost = {
      ...post,
      isPublished: newStatus,
      publishedAt: newStatus ? new Date().toISOString() : null,
    }

    try {
      await fetch('/api/blogs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, isPublished: newStatus }),
      })
    } catch {
      // Continue with local update
    }

    setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-burgundy font-serif">Blog Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Create and manage blog posts for your website
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchPosts}
            variant="outline"
            size="sm"
            className="text-burgundy border-burgundy/20 hover:bg-burgundy/5"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={openNewPostDialog}
            size="sm"
            className="bg-burgundy hover:bg-burgundy-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Blog Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-burgundy">{posts.length}</p>
            <p className="text-xs text-muted-foreground">Total Posts</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{posts.filter((p) => p.isPublished).length}</p>
            <p className="text-xs text-muted-foreground">Published</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{posts.filter((p) => !p.isPublished).length}</p>
            <p className="text-xs text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-marigold-dark">
              {new Set(posts.map((p) => p.category)).size}
            </p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Posts Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ivory hover:bg-ivory">
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No blog posts yet. Create your first post!
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-burgundy-dark truncate">{post.title}</p>
                          <p className="text-xs text-muted-foreground font-mono">{post.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs bg-ivory border-burgundy/10 text-burgundy">
                          {getCategoryLabel(post.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {post.isPublished ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 border">
                              <Globe className="w-3 h-3 mr-1" />
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              <FileText className="w-3 h-3 mr-1" />
                              Draft
                            </Badge>
                          )}
                          <button
                            onClick={() => togglePublish(post)}
                            className="text-muted-foreground hover:text-burgundy"
                            title={post.isPublished ? 'Unpublish' : 'Publish'}
                          >
                            {post.isPublished ? (
                              <ToggleRight className="w-5 h-5 text-green-600" />
                            ) : (
                              <ToggleLeft className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {post.isPublished && post.publishedAt
                          ? formatDate(post.publishedAt)
                          : formatDate(post.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(post)}
                            className="text-burgundy hover:bg-burgundy/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
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

      {/* New/Edit Post Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-burgundy font-serif flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {editingPost ? 'Edit Post' : 'New Blog Post'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="post-title">Title</Label>
              <Input
                id="post-title"
                placeholder="Enter blog post title..."
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="post-slug">Slug</Label>
              <Input
                id="post-slug"
                placeholder="auto-generated-from-title"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">Auto-generated from title. You can customize it.</p>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="post-excerpt">Excerpt</Label>
              <Textarea
                id="post-excerpt"
                placeholder="Brief summary of the post..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                placeholder="Write your blog post content here..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={8}
              />
            </div>

            {/* Category & Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-author">Author</Label>
                <Input
                  id="post-author"
                  placeholder="Author name"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label htmlFor="post-image">Featured Image URL</Label>
              <Input
                id="post-image"
                placeholder="https://example.com/image.jpg"
                value={form.featuredImage}
                onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
              />
            </div>

            {/* SEO Section */}
            <div className="border rounded-lg p-4 space-y-4 bg-ivory/50">
              <h4 className="font-semibold text-sm text-burgundy flex items-center gap-2">
                <Eye className="w-4 h-4" />
                SEO Settings
              </h4>
              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input
                  id="seo-title"
                  placeholder="SEO title (50-60 characters recommended)"
                  value={form.seoTitle}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-desc">SEO Description</Label>
                <Textarea
                  id="seo-desc"
                  placeholder="SEO description (150-160 characters recommended)"
                  value={form.seoDesc}
                  onChange={(e) => setForm({ ...form, seoDesc: e.target.value })}
                  rows={2}
                />
              </div>
            </div>

            {/* Published Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-sm font-medium">Publish Post</Label>
                <p className="text-xs text-muted-foreground">
                  {form.isPublished ? 'This post will be visible to visitors' : 'This post will be saved as a draft'}
                </p>
              </div>
              <Switch
                checked={form.isPublished}
                onCheckedChange={(checked) => setForm({ ...form, isPublished: checked })}
              />
            </div>

            {/* Save/Cancel */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setFormDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!form.title || !form.content || !form.category}
                className="bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
