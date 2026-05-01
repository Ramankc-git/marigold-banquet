import { Skeleton } from '@/components/ui/skeleton'

export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="relative bg-burgundy/5 py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-72 mx-auto mb-4 bg-marigold/15" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto bg-burgundy/10" />
        </div>
      </div>

      {/* Booking form skeleton */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl border border-border/50 bg-card p-6 sm:p-8 space-y-6">
            {/* Form heading */}
            <Skeleton className="h-7 w-48 bg-burgundy/10" />
            <Skeleton className="h-4 w-80 bg-muted" />

            {/* Form fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-burgundy/10" />
                  <Skeleton className="h-11 w-full rounded-md bg-muted" />
                </div>
              ))}
            </div>

            {/* Date fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-burgundy/10" />
                <Skeleton className="h-11 w-full rounded-md bg-muted" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 bg-burgundy/10" />
                <Skeleton className="h-11 w-full rounded-md bg-muted" />
              </div>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-burgundy/10" />
              <Skeleton className="h-28 w-full rounded-md bg-muted" />
            </div>

            {/* Submit button */}
            <Skeleton className="h-12 w-full rounded-lg bg-burgundy/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
