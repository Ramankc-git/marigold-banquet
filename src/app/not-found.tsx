import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 text-center">
      {/* Decorative 404 */}
      <div className="relative">
        <span className="text-8xl sm:text-9xl font-serif font-bold text-marigold/20 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-burgundy/10 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-burgundy"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Heading in Playfair Display */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif text-burgundy mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto text-sm sm:text-base leading-relaxed">
          The page you are looking for seems to have wandered off. 
          Perhaps you&apos;d like to visit our homepage and explore what Marigold Banquet has to offer?
        </p>
      </div>

      {/* Decorative divider */}
      <div className="section-divider" />

      {/* Go Home button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-burgundy text-white rounded-lg font-medium text-sm hover:bg-burgundy-dark transition-colors duration-200 shadow-md hover:shadow-lg"
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
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        Go Home
      </Link>
    </div>
  )
}
