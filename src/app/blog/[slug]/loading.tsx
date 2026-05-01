import { Skeleton } from '@/components/ui/skeleton'

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Cover image skeleton */}
      <div className="relative">
        <Skeleton className="w-full h-64 sm:h-80 lg:h-96 bg-marigold/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <Skeleton className="h-5 w-24 rounded-full bg-marigold/20 mb-4" />
            <Skeleton className="h-10 w-3/4 max-w-2xl bg-white/30 mb-3" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32 bg-white/20" />
              <Skeleton className="h-4 w-20 bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Article content skeleton */}
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Paragraphs */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full bg-burgundy/8" />
              <Skeleton className="h-4 w-full bg-burgundy/8" />
              <Skeleton className="h-4 w-4/5 bg-burgundy/8" />
            </div>
          ))}

          {/* Quote block */}
          <div className="border-l-4 border-marigold/30 pl-6 py-2">
            <Skeleton className="h-5 w-full bg-marigold/10 italic" />
            <Skeleton className="h-5 w-2/3 bg-marigold/10 italic" />
          </div>

          {/* More paragraphs */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-burgundy/8" />
            <Skeleton className="h-4 w-full bg-burgundy/8" />
            <Skeleton className="h-4 w-3/4 bg-burgundy/8" />
          </div>
        </div>
      </div>
    </div>
  )
}
