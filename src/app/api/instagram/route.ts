import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError } from "@/lib/api-utils";

// ── GET /api/instagram ────────────────────────────────────────────────────
// Fetch Instagram photos already imported into the gallery
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "12"), 1), 50);

    // Get Instagram settings
    const settings = await db.siteSetting.findMany({
      where: { key: { in: ["instagramUsername", "instagramAccessToken", "instagramUrl"] } },
    });
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    // Get Instagram-sourced gallery photos
    const photos = await db.galleryPhoto.findMany({
      where: { source: "instagram", isActive: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return apiResponse({
      photos,
      username: settingsMap.instagramUsername || "",
      accessToken: settingsMap.instagramAccessToken ? "***configured***" : "",
      profileUrl: settingsMap.instagramUrl || "",
    });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/instagram ───────────────────────────────────────────────────
// Sync Instagram posts to gallery - supports Graph API and manual URL import
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "sync_graph_api") {
      return await syncFromGraphAPI(body);
    } else if (action === "import_url") {
      return await importFromUrl(body);
    } else if (action === "import_urls_bulk") {
      return await importBulkUrls(body);
    }

    return apiError("Invalid action. Use: sync_graph_api, import_url, or import_urls_bulk", 400);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── Sync from Instagram Graph API ────────────────────────────────────────
// Requires: Instagram Business/Creator account + Facebook Page + Access Token
// The access token should be stored in SiteSetting with key "instagramAccessToken"
async function syncFromGraphAPI(body: {
  accessToken?: string;
  limit?: number;
  category?: string;
}) {
  const limit = Math.min(body.limit || 12, 50);
  const category = body.category || "weddings";

  // Get access token from body or settings
  let accessToken = body.accessToken;
  if (!accessToken) {
    const setting = await db.siteSetting.findUnique({
      where: { key: "instagramAccessToken" },
    });
    accessToken = setting?.value;
  }

  if (!accessToken) {
    return apiError(
      "Instagram Access Token is required. Connect your Instagram Business account in Settings first.",
      400
    );
  }

  try {
    // Step 1: Get the user's Instagram Business Account ID
    const meRes = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`,
      { next: { revalidate: 0 } }
    );

    if (!meRes.ok) {
      const errData = await meRes.json().catch(() => ({}));
      return apiError(
        `Instagram API error: ${errData.error?.message || "Invalid access token"}. Please check your access token in Settings.`,
        400
      );
    }

    const meData = await meRes.json();

    // Step 2: Fetch media from the account
    const mediaRes = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,media_type&limit=${limit}&access_token=${accessToken}`,
      { next: { revalidate: 0 } }
    );

    if (!mediaRes.ok) {
      const errData = await mediaRes.json().catch(() => ({}));
      return apiError(
        `Failed to fetch Instagram media: ${errData.error?.message || "Unknown error"}`,
        400
      );
    }

    const mediaData = await mediaRes.json();
    const mediaItems = mediaData.data || [];

    // Step 3: Import media items to gallery (only IMAGE type, not VIDEO or CAROUSEL_ALBUM)
    const imported: unknown[] = [];
    const skipped: unknown[] = [];

    for (const item of mediaItems) {
      // Skip videos and carousels (only import single images for now)
      if (item.media_type !== "IMAGE") {
        skipped.push({ id: item.id, reason: "Not a single image", type: item.media_type });
        continue;
      }

      // Check for duplicates
      const existing = await db.galleryPhoto.findFirst({
        where: { instagramMediaId: item.id },
      });

      if (existing) {
        skipped.push({ id: item.id, reason: "Already imported" });
        continue;
      }

      // Create gallery photo from Instagram post
      const photo = await db.galleryPhoto.create({
        data: {
          url: item.media_url,
          caption: item.caption?.substring(0, 500) || null,
          category,
          source: "instagram",
          instagramPermalink: item.permalink,
          instagramMediaId: item.id,
          eventDate: item.timestamp ? new Date(item.timestamp).toISOString().split("T")[0] : null,
          isActive: true,
          order: 0,
        },
      });

      imported.push(photo);
    }

    return apiResponse({
      synced: imported.length,
      skipped: skipped.length,
      imported,
      skippedItems: skipped,
      username: meData.username,
    });
  } catch (error) {
    console.error("Instagram Graph API sync error:", error);
    return apiError("Failed to sync from Instagram. Please check your access token.", 500);
  }
}

// ── Import from a single Instagram post URL ──────────────────────────────
async function importFromUrl(body: {
  postUrl: string;
  category?: string;
}) {
  const { postUrl, category = "weddings" } = body;

  if (!postUrl || !postUrl.includes("instagram.com")) {
    return apiError("A valid Instagram post URL is required", 400);
  }

  try {
    // Use Instagram oEmbed API to get post info
    const oembedRes = await fetch(
      `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(postUrl)}&access_token=`,
      { next: { revalidate: 0 } }
    );

    let imageUrl = "";
    let caption = "";
    let authorName = "";

    if (oembedRes.ok) {
      const oembedData = await oembedRes.json();
      imageUrl = oembedData.thumbnail_url || "";
      caption = oembedData.title || "";
      authorName = oembedData.author_name || "";
    }

    // If oEmbed didn't work, try scraping the page for og:image
    if (!imageUrl) {
      const pageRes = await fetch(postUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        },
        next: { revalidate: 0 },
      });

      if (pageRes.ok) {
        const html = await pageRes.text();

        // Extract og:image
        const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
        if (ogImageMatch) {
          imageUrl = ogImageMatch[1].replace(/&amp;/g, "&");
        }

        // Extract og:description for caption
        const ogDescMatch = html.match(
          /<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i
        );
        if (ogDescMatch) {
          caption = ogDescMatch[1].replace(/&amp;/g, "&").substring(0, 500);
        }
      }
    }

    if (!imageUrl) {
      return apiError(
        "Could not extract image from this Instagram post. Try using the Instagram Graph API sync instead.",
        400
      );
    }

    // Extract media ID from URL for duplicate detection
    const mediaIdMatch = postUrl.match(/\/p\/([^/]+)/);
    const mediaId = mediaIdMatch ? `ig_${mediaIdMatch[1]}` : null;

    // Check for duplicates
    if (mediaId) {
      const existing = await db.galleryPhoto.findFirst({
        where: { instagramMediaId: mediaId },
      });
      if (existing) {
        return apiError("This Instagram post has already been imported", 409);
      }
    }

    // Add author prefix to caption
    if (authorName && caption) {
      caption = `@${authorName}: ${caption}`;
    }

    const photo = await db.galleryPhoto.create({
      data: {
        url: imageUrl,
        caption: caption || null,
        category,
        source: "instagram",
        instagramPermalink: postUrl,
        instagramMediaId: mediaId,
        isActive: true,
        order: 0,
      },
    });

    return apiResponse(photo, 201);
  } catch (error) {
    console.error("Instagram URL import error:", error);
    return apiError("Failed to import from Instagram URL", 500);
  }
}

// ── Import from multiple Instagram post URLs ─────────────────────────────
async function importBulkUrls(body: {
  urls: string[];
  category?: string;
}) {
  const { urls, category = "weddings" } = body;

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return apiError("An array of Instagram post URLs is required", 400);
  }

  if (urls.length > 25) {
    return apiError("Maximum 25 URLs per bulk import", 400);
  }

  const imported: unknown[] = [];
  const failed: { url: string; error: string }[] = [];

  for (const url of urls) {
    try {
      // Reuse the single URL import logic
      const result = await importFromUrl({ postUrl: url, category });
      const resultData = await result.json();

      if (resultData.success && resultData.data) {
        imported.push(resultData.data);
      } else {
        failed.push({ url, error: resultData.error || "Unknown error" });
      }
    } catch {
      failed.push({ url, error: "Import failed" });
    }
  }

  return apiResponse({
    imported: imported.length,
    failed: failed.length,
    importedPhotos: imported,
    failedImports: failed,
  });
}
