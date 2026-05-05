"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <main id="main-content" className="min-h-screen">{children}</main>
        <Toaster />
        <SonnerToaster />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <Toaster />
      <SonnerToaster />
    </>
  );
}
