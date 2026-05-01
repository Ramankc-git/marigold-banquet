'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Mail,
  Calendar,
  Building,
  Package,
  UtensilsCrossed,
  Palette,
  Image,
  FileText,
  Star,
  Tag,
  Users,
  UserCircle,
  HelpCircle,
  Settings,
  Menu,
  LogOut,
  ChevronLeft,
  Flower2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Mail },
  { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { label: 'Halls/Spaces', href: '/admin/halls', icon: Building },
  { label: 'Packages', href: '/admin/packages', icon: Package },
  { label: 'Menu/Food', href: '/admin/menu', icon: UtensilsCrossed },
  { label: 'Decoration', href: '/admin/decoration', icon: Palette },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Offers', href: '/admin/offers', icon: Tag },
  { label: 'Vendors', href: '/admin/vendors', icon: Users },
  { label: 'Team', href: '/admin/team', icon: UserCircle },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

function SidebarNav({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo / Brand */}
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-marigold flex items-center justify-center">
          <Flower2 className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-white truncate">Marigold</h2>
          <p className="text-xs text-marigold-light truncate">Admin Panel</p>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-marigold/20 text-marigold shadow-sm'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <item.icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-marigold' : '')} />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator className="bg-white/10" />

      {/* User section */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-rose-gold/30 flex items-center justify-center">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-white/50 truncate">Super Admin</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen overflow-hidden bg-ivory">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-burgundy-dark border-r border-white/10">
        <SidebarNav />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-burgundy-dark border-white/10">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SidebarNav onLinkClick={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 lg:px-6 bg-white border-b border-burgundy/10 shadow-sm">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-3 text-burgundy"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Breadcrumb / Page title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-burgundy truncate font-serif">
              {navItems.find(item => pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)))?.label || 'Dashboard'}
            </h1>
          </div>

          {/* Right side - admin info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-burgundy">Admin User</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center">
              <span className="text-sm font-bold text-burgundy">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
