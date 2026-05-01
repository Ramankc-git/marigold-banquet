import { Skeleton } from '@/components/ui/skeleton'

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="relative bg-burgundy/5 py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-56 mx-auto mb-4 bg-marigold/15" />
          <Skeleton className="h-5 w-80 max-w-full mx-auto bg-burgundy/10" />
        </div>
      </div>

      {/* Category filter skeleton */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-9 w-24 rounded-full bg-burgundy/10"
            />
          ))}
        </div>
      </div>

      {/* Gallery grid skeleton - masonry-like layout */}
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {Array.from({ length: 12 }).map((_, i) => {
            // Varying heights for masonry effect
            const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60']
            const height = heights[i % heights.length]

            return (
              <div
                key={i}
                className="break-inside-avoid rounded-xl overflow-hidden border border-border/50"
              >
                <Skeleton
                  className={`w-full ${height} bg-marigold/10`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
