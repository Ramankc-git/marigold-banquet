import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="relative bg-burgundy/5 py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-4 bg-marigold/15" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto bg-burgundy/10" />
        </div>
      </div>

      {/* Blog cards grid skeleton */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-border/50 bg-card"
            >
              {/* Image skeleton */}
              <Skeleton className="w-full h-52 bg-marigold/10" />

              {/* Content skeleton */}
              <div className="p-5 space-y-3">
                {/* Category tag */}
                <Skeleton className="h-5 w-20 rounded-full bg-marigold/15" />

                {/* Title */}
                <Skeleton className="h-6 w-full bg-burgundy/10" />
                <Skeleton className="h-6 w-3/4 bg-burgundy/10" />

                {/* Excerpt */}
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-5/6 bg-muted" />

                {/* Date and read more */}
                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-4 w-24 bg-muted" />
                  <Skeleton className="h-4 w-20 bg-marigold/15" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
