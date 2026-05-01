'use client'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      {/* Error icon */}
      <div className="w-20 h-20 rounded-full bg-burgundy/10 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-burgundy"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      {/* Error message */}
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-serif text-burgundy mb-2">
          Something Went Wrong
        </h1>
        <p className="text-muted-foreground text-sm mb-2">
          We encountered an unexpected error. Please try again.
        </p>
        {error?.message && (
          <p className="text-xs text-burgundy/60 bg-burgundy/5 rounded-md px-3 py-2 font-mono">
            {error.message}
          </p>
        )}
      </div>

      {/* Try Again button */}
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white rounded-lg font-medium text-sm hover:bg-burgundy-dark transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
          />
        </svg>
        Try Again
      </button>
    </div>
  )
}
