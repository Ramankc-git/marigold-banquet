export default function RootLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      {/* Marigold gold spinner */}
      <div className="relative">
        <div
          className="w-14 h-14 rounded-full border-4 border-marigold/30 border-t-marigold animate-spin"
        />
        <div
          className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-b-marigold-light/50 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
      </div>

      {/* Pulsing loading text */}
      <div className="text-center">
        <p
          className="text-lg font-serif text-burgundy animate-pulse tracking-wide"
        >
          Loading...
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Preparing something special for you
        </p>
      </div>
    </div>
  )
}
