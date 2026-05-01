"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GalleryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Gallery error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="font-serif text-3xl text-burgundy mb-4">Gallery Unavailable</h2>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t load the gallery right now. Please try again later.
        </p>
        <Button onClick={reset} className="bg-burgundy hover:bg-burgundy-dark text-white">
          Try Again
        </Button>
      </div>
    </div>
  );
}
