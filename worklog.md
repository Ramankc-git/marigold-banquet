---
Task ID: 1
Agent: Main Agent
Task: Implement Instagram integration for Marigold Banquet Hall gallery

Work Log:
- Explored project structure and read all key files (Prisma schema, gallery page, admin gallery, API routes, settings, validations)
- Updated Prisma schema: added `source`, `instagramPermalink`, `instagramMediaId` fields to GalleryPhoto model
- Created `/api/instagram` API route with 3 import methods: Graph API sync, single URL import, bulk URL import
- Updated gallery API route to support new Instagram fields and duplicate detection
- Updated validations to include new Instagram fields
- Completely rewrote public gallery page: now fetches from API, shows real images, Instagram feed section, YouTube video player
- Completely rewrote admin gallery page: added Instagram sync dialog with 3 methods, Instagram settings dialog
- Updated admin settings page: added Instagram integration section (username, access token, setup guide)
- Updated next.config.ts: added Instagram CDN hostname patterns for images
- Updated .env: added INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USERNAME variables
- Updated seed data: added `source: "manual"` to gallery photos, added site settings including Instagram config
- Ran Prisma db push to update database schema
- Generated Prisma client
- Committed and pushed to GitHub
- Verified live deployment on marigold-banquet.vercel.app - gallery API returns photos with new fields, Instagram API is functional

Stage Summary:
- Instagram integration fully implemented with 3 import methods
- Public gallery now fetches from database API instead of hardcoded data
- Admin panel has Instagram sync and settings
- Live site verified working: https://marigold-banquet.vercel.app
