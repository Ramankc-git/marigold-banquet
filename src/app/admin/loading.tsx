export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      {/* Dark-themed spinner */}
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full border-4 border-burgundy-dark/20 border-t-marigold animate-spin"
        />
        <div
          className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-b-marigold-light/40 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
      </div>

      {/* Loading text */}
      <p className="text-sm font-medium text-burgundy/60 animate-pulse tracking-wide">
        Loading dashboard...
      </p>
    </div>
  )
}
