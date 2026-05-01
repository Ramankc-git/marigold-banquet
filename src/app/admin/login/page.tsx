"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-burgundy-dark via-burgundy to-burgundy-dark px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-marigold to-marigold-dark flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-white font-serif text-3xl font-bold">M</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">
            Marigold Admin
          </h1>
          <p className="text-ivory/60 text-sm mt-1">
            Banquet Hall & Party Palace
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="font-serif text-xl font-bold text-burgundy mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@marigold.com.np"
                className="mt-1.5"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="mt-1.5"
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy hover:bg-burgundy-dark text-white py-3"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded">
                Dev mode — configure admin credentials in .env
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-ivory/40 text-xs mt-6">
          &copy; {new Date().getFullYear()} Marigold Banquet Hall & Party Palace
        </p>
      </motion.div>
    </div>
  );
}
