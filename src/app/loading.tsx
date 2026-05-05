import { Skeleton } from '@/components/ui/skeleton'

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full bg-marigold/15" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-36 bg-burgundy/10" />
              <Skeleton className="h-3 w-24 bg-muted" />
            </div>
          </div>
          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16 bg-burgundy/10" />
            ))}
            <Skeleton className="h-10 w-28 rounded-full bg-marigold/20" />
          </nav>
          {/* Mobile menu button */}
          <Skeleton className="h-10 w-10 rounded-lg bg-muted lg:hidden" />
        </div>
      </header>

      {/* Hero section skeleton */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <Skeleton className="absolute inset-0 bg-burgundy/5" />
        <div className="relative z-10 container mx-auto px-4 text-center space-y-6">
          <Skeleton className="h-14 w-80 max-w-full mx-auto bg-burgundy/10" />
          <Skeleton className="h-6 w-[28rem] max-w-full mx-auto bg-burgundy/8" />
          <Skeleton className="h-6 w-96 max-w-full mx-auto bg-burgundy/8" />
          <div className="flex items-center justify-center gap-4 pt-4">
            <Skeleton className="h-12 w-44 rounded-full bg-marigold/20" />
            <Skeleton className="h-12 w-44 rounded-full bg-burgundy/10" />
          </div>
        </div>
      </section>

      {/* Content cards skeleton */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="text-center space-y-3 mb-12">
          <Skeleton className="h-8 w-64 mx-auto bg-burgundy/10" />
          <Skeleton className="h-1 w-20 mx-auto bg-marigold/30" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto bg-muted" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-border/50 bg-card"
            >
              <Skeleton className="w-full h-52 bg-marigold/10" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-3/4 bg-burgundy/10" />
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-5/6 bg-muted" />
                <Skeleton className="h-10 w-32 rounded-full bg-marigold/15 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials skeleton */}
      <section className="bg-burgundy/5 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <Skeleton className="h-8 w-72 mx-auto bg-burgundy/10" />
            <Skeleton className="h-1 w-20 mx-auto bg-marigold/30" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-card border border-border/30 p-6 space-y-3"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-4 rounded-sm bg-marigold/20" />
                  ))}
                </div>
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-4/5 bg-muted" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="w-10 h-10 rounded-full bg-marigold/10" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24 bg-burgundy/10" />
                    <Skeleton className="h-3 w-32 bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA skeleton */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="rounded-2xl bg-burgundy/5 border border-marigold/10 p-8 sm:p-12 text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto bg-burgundy/10" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto bg-muted" />
          <Skeleton className="h-12 w-48 rounded-full bg-marigold/20 mx-auto mt-4" />
        </div>
      </section>
    </div>
  )
}
