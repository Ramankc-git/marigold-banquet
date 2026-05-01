---
Task ID: 1
Agent: Main Agent
Task: Fix admin login failure on Vercel by migrating from SQLite to PostgreSQL

Work Log:
- Diagnosed root cause: SQLite doesn't work on Vercel's serverless environment (ephemeral filesystem, no persistence)
- Changed Prisma schema provider from "sqlite" to "postgresql"
- Created initial PostgreSQL migration file
- Fixed admin login route: changed from manual Set-Cookie header to Next.js cookies API
- Changed SameSite from "Strict" to "Lax" for better browser compatibility
- Fixed login page hint: corrected email from admin@marigold.com.np to admin@marigoldbanquet.com.np
- Made db import dynamic in login route (try/catch fallback to env credentials)
- Updated logout route to use Next.js cookies API
- Cleaned up auth.ts (removed manual cookie string functions)
- Updated .env and .env.example for PostgreSQL
- Updated package.json build script
- Removed serverExternalPackages: ['bcrypt'] from next.config.ts
- Build verified passing
- Pushed to GitHub (commit 1bb7e9b)

Stage Summary:
- Database migrated from SQLite to PostgreSQL
- Admin login should now work on Vercel with proper PostgreSQL database
- User needs to set up Vercel Postgres and configure environment variables
- Key env vars needed: DATABASE_URL, JWT_SECRET
