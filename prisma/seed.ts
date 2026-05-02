import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  // Create halls
  const hall1 = await db.hall.create({
    data: {
      name: "Grand Marigold Hall",
      slug: "grand-marigold-hall",
      description:
        "Our flagship hall featuring grand chandeliers, spacious dance floor, and state-of-the-art AV system. Perfect for large weddings and corporate galas.",
      capacityBanquet: 500,
      capacityTheatre: 700,
      capacityCocktail: 350,
      dimensionsSqft: 5000,
      features: JSON.stringify([
        "Grand Stage",
        "LED Screen",
        "Professional Sound System",
        "Air Conditioning",
        "Natural Light",
        "Bridal Room",
      ]),
      isActive: true,
      order: 1,
    },
  });

  const hall2 = await db.hall.create({
    data: {
      name: "Rose Garden Hall",
      slug: "rose-garden-hall",
      description:
        "An elegant hall with garden views, perfect for medium-sized weddings, engagements, and cultural ceremonies. Features beautiful garden access for outdoor photography.",
      capacityBanquet: 300,
      capacityTheatre: 400,
      capacityCocktail: 200,
      dimensionsSqft: 3000,
      features: JSON.stringify([
        "Stage",
        "AV System",
        "Air Conditioning",
        "Garden Access",
        "Outdoor Photography Area",
      ]),
      isActive: true,
      order: 2,
    },
  });

  const hall3 = await db.hall.create({
    data: {
      name: "Golden Terrace",
      slug: "golden-terrace",
      description:
        "An intimate and sophisticated space ideal for smaller celebrations, corporate meetings, and private dining. Features modern amenities with a warm ambiance.",
      capacityBanquet: 150,
      capacityTheatre: 200,
      capacityCocktail: 120,
      dimensionsSqft: 1500,
      features: JSON.stringify([
        "AV System",
        "Air Conditioning",
        "Outdoor Terrace",
        "Intimate Setting",
        "Natural Light",
      ]),
      isActive: true,
      order: 3,
    },
  });

  console.log("Created 3 halls");

  // Create packages
  const packages = [
    {
      name: "Silver Wedding Package",
      slug: "silver-wedding",
      category: "wedding",
      tier: "silver",
      description:
        "Essential package for a beautiful wedding celebration with standard amenities and services.",
      price: 150000,
      priceUnit: "per_event",
      includes: JSON.stringify([
        "Hall Rental (8 hours)",
        "Standard Decoration",
        "Veg/Non-Veg Buffet (up to 200 guests)",
        "Basic Lighting",
        "Parking",
      ]),
      isActive: true,
      order: 1,
    },
    {
      name: "Gold Wedding Package",
      slug: "gold-wedding",
      category: "wedding",
      tier: "gold",
      description:
        "Premium package with themed decoration, multi-cuisine buffet, and DJ setup for an unforgettable celebration.",
      price: 300000,
      priceUnit: "per_event",
      includes: JSON.stringify([
        "Hall Rental (12 hours)",
        "Theme Decoration",
        "Multi-Cuisine Buffet (up to 400 guests)",
        "DJ Setup",
        "Premium Lighting",
        "Bridal Room",
        "Parking",
      ]),
      isActive: true,
      order: 2,
    },
    {
      name: "Platinum Wedding Package",
      slug: "platinum-wedding",
      category: "wedding",
      tier: "platinum",
      description:
        "Luxury package with everything you need for a grand celebration, including live music and full event coordination.",
      price: 500000,
      priceUnit: "per_event",
      includes: JSON.stringify([
        "Hall Rental (Full Day)",
        "Luxury Decoration",
        "Premium Catering (up to 500 guests)",
        "Live Music Band",
        "Full Event Coordination",
        "Premium Lighting & AV",
        "Bridal Suite",
        "Valet Parking",
      ]),
      isActive: true,
      order: 3,
    },
    {
      name: "Basic Party Package",
      slug: "basic-party",
      category: "party",
      tier: "basic",
      description: "Simple and affordable package for intimate gatherings.",
      price: 50000,
      priceUnit: "per_event",
      includes: JSON.stringify([
        "Hall Rental (4 hours)",
        "Basic Setup",
        "Snacks & Beverages",
      ]),
      isActive: true,
      order: 1,
    },
    {
      name: "Premium Party Package",
      slug: "premium-party",
      category: "party",
      tier: "premium",
      description: "Enhanced package with decoration and full catering.",
      price: 120000,
      priceUnit: "per_event",
      includes: JSON.stringify([
        "Hall Rental (6 hours)",
        "Themed Decoration",
        "Full Buffet (up to 150 guests)",
        "DJ Setup",
      ]),
      isActive: true,
      order: 2,
    },
    {
      name: "Luxury Party Package",
      slug: "luxury-party",
      category: "party",
      tier: "luxury",
      description: "All-inclusive luxury experience for milestone celebrations.",
      price: 250000,
      priceUnit: "per_event",
      includes: JSON.stringify([
        "Hall Rental (8 hours)",
        "Luxury Decoration",
        "Premium Catering (up to 250 guests)",
        "Live Entertainment",
        "Photography Coordination",
      ]),
      isActive: true,
      order: 3,
    },
    {
      name: "Half-Day Corporate",
      slug: "half-day-corporate",
      category: "corporate",
      tier: "silver",
      description: "Half-day package for seminars and meetings.",
      price: 75000,
      priceUnit: "half_day",
      includes: JSON.stringify([
        "Hall Rental (4 hours)",
        "AV Equipment",
        "Tea/Coffee & Snacks",
        "Stationery Kit",
      ]),
      isActive: true,
      order: 1,
    },
    {
      name: "Full-Day Corporate",
      slug: "full-day-corporate",
      category: "corporate",
      tier: "gold",
      description: "Full-day package with meals and AV support.",
      price: 125000,
      priceUnit: "full_day",
      includes: JSON.stringify([
        "Hall Rental (8 hours)",
        "Full AV Equipment",
        "Breakfast, Lunch & Tea",
        "Stationery Kit",
        "Technical Support",
      ]),
      isActive: true,
      order: 2,
    },
    {
      name: "Evening Corporate",
      slug: "evening-corporate",
      category: "corporate",
      tier: "platinum",
      description: "Evening package for award nights and team dinners.",
      price: 100000,
      priceUnit: "per_event",
      includes: JSON.stringify([
        "Hall Rental (5 hours, evening)",
        "AV & Stage Setup",
        "Cocktail Dinner",
        "DJ Setup",
        "Decorative Lighting",
      ]),
      isActive: true,
      order: 3,
    },
  ];

  for (const pkg of packages) {
    await db.package.create({ data: pkg });
  }
  console.log(`Created ${packages.length} packages`);

  // Create testimonials
  const testimonials = [
    {
      clientName: "Suman & Priya Shrestha",
      eventType: "Wedding",
      rating: 5,
      review:
        "Our wedding at Marigold was absolutely magical. The decoration, food, and service exceeded all our expectations. The team went above and beyond to make our special day perfect.",
      isActive: true,
      order: 1,
    },
    {
      clientName: "Rajesh Sharma",
      eventType: "Corporate Dinner",
      rating: 5,
      review:
        "We hosted our company's annual dinner here. The AV setup and catering were impeccable. Our team had a wonderful experience and we will definitely be back.",
      isActive: true,
      order: 2,
    },
    {
      clientName: "Anita Gurung",
      eventType: "Pasni Ceremony",
      rating: 5,
      review:
        "My daughter's pasni ceremony was beautifully organized. The team took care of everything from decoration to catering. We could just enjoy the celebration without any stress.",
      isActive: true,
      order: 3,
    },
    {
      clientName: "Bikash & Sita Tamang",
      eventType: "Wedding Reception",
      rating: 5,
      review:
        "From the initial viewing to the final event, the Marigold team was professional and attentive. The food was outstanding and our guests are still talking about it!",
      isActive: true,
      order: 4,
    },
    {
      clientName: "Nepal Tech Solutions",
      eventType: "Corporate Seminar",
      rating: 4,
      review:
        "Excellent venue for corporate events. The AV equipment worked flawlessly and the team was very accommodating with our last-minute changes. Highly recommended.",
      isActive: true,
      order: 5,
    },
  ];

  for (const t of testimonials) {
    await db.testimonial.create({ data: t });
  }
  console.log(`Created ${testimonials.length} testimonials`);

  // Create blog posts
  const blogPosts = [
    {
      title: "How to Plan the Perfect Wedding in Kathmandu",
      slug: "how-to-plan-the-perfect-wedding-in-kathmandu",
      excerpt:
        "Planning a wedding in Kathmandu? Here is your complete guide to venues, vendors, and traditions.",
      content: `Planning a wedding in Kathmandu is an exciting journey that blends rich cultural traditions with modern celebrations. The capital city of Nepal offers a unique setting for weddings, with its stunning mountain backdrops, vibrant culture, and world-class venues.\n\n## Choosing the Right Venue\n\nThe first and most important decision is selecting the perfect venue. Consider the number of guests, ceremony type, parking availability, and whether the venue offers in-house catering and decoration.\n\n## Understanding Nepali Wedding Traditions\n\nNepali weddings are multi-day celebrations filled with meaningful rituals. From the Mehendi ceremony to the main wedding day and reception, each event has its own significance.\n\n## Budget Planning\n\nOn average, a mid-range wedding in Kathmandu can cost between NPR 5-15 lakhs, while luxury weddings can exceed NPR 30 lakhs. Plan your budget carefully across venue, catering, decoration, and vendor categories.\n\n## Vendor Selection\n\nBook vendors 3-6 months in advance, especially during wedding season (November-February and April-May). Key vendors include photographers, caterers, decorators, and musicians.\n\n## Timeline and Checklist\n\nStart planning 6-12 months ahead. Create a detailed timeline for venue booking, vendor selection, invitation sending, and outfit shopping.`,
      category: "wedding_tips",
      author: "Marigold Team",
      readTime: 5,
      seoTitle: "How to Plan the Perfect Wedding in Kathmandu | Marigold Blog",
      featuredImage: "/images/blog/01-wedding-kathmandu.jpg",
      seoDesc:
        "Complete guide to planning your wedding in Kathmandu, Nepal. Tips on venues, vendors, traditions, and budget.",
      isPublished: true,
      publishedAt: new Date("2025-01-15"),
    },
    {
      title: "Top Wedding Decoration Trends in Nepal 2025",
      slug: "top-wedding-decoration-trends-nepal-2025",
      excerpt:
        "Discover the latest decoration trends transforming Nepali weddings in 2025.",
      content: `Wedding decoration in Nepal has evolved significantly, blending traditional aesthetics with contemporary design sensibilities. As we enter 2025, several exciting trends are reshaping how couples envision their dream wedding setup.\n\n## Sustainable and Eco-Friendly Decor\n\nMore couples are choosing sustainable decoration options including locally sourced flowers, reusable props, and biodegradable materials. This trend not only reduces environmental impact but also supports local artisans and farmers.\n\n## Fusion of Traditional and Modern\n\nThe most popular trend in 2025 is the fusion of traditional Nepali elements with modern design. Think mandaps with contemporary geometric patterns, traditional dhaka fabric used in modern draping styles, and marigold garlands reimagined as architectural elements.\n\n## Grand Floral Installations\n\nLarge-scale floral installations are making a statement at Nepali weddings. Ceiling installations, flower walls, and suspended floral chandeliers create immersive environments that transform the entire venue.\n\n## LED and Projection Mapping\n\nTechnology is playing a bigger role in wedding decoration. LED panels, projection mapping on walls and floors, and programmable lighting create dynamic, changeable atmospheres throughout the event.\n\n## Color Trends\n\nWhile marigold and red remain traditional favorites, 2025 sees a rise in blush pink, sage green, and champagne gold palettes. Couples are experimenting with muted, sophisticated color schemes that photograph beautifully.`,
      category: "decoration_trends",
      author: "Marigold Team",
      readTime: 6,
      seoTitle:
        "Top Wedding Decoration Trends in Nepal 2025 | Marigold Blog",
      featuredImage: "/images/blog/02-decoration-trends.jpg",
      seoDesc:
        "Discover the latest wedding decoration trends in Nepal for 2025 including sustainable decor, fusion styles, and more.",
      isPublished: true,
      publishedAt: new Date("2025-01-20"),
    },
    {
      title: "Complete Bratabandha Planning Guide for Modern Families",
      slug: "complete-bratabandha-planning-guide",
      excerpt:
        "Everything you need to know about organizing a memorable bratabandha ceremony.",
      content: `The Bratabandha ceremony is one of the most important Sanskaras in Hindu tradition, marking a boy's symbolic transition into formal religious education and spiritual awareness.\n\n## Understanding the Significance\n\nBratabandha literally means taking the vow of celibacy and traditionally marks the beginning of formal education. Today, it has evolved into a grand celebration where families come together to honor this milestone.\n\n## Key Rituals and Timeline\n\nThe ceremony begins with Ganesh Puja, followed by the main rituals including wearing the Janai (sacred thread), Havan (sacred fire ceremony), and blessings from elders. The entire ceremony can take 3-5 hours.\n\n## Venue Selection\n\nChoose a venue that can accommodate the ritual area, guests, and dining space. Flexible hall configurations with traditional mandap setup work best.\n\n## Modern vs Traditional Setup\n\nModern families blend traditional elements with contemporary celebrations. The core rituals remain unchanged, while decoration, catering, and entertainment have evolved.\n\n## Catering Considerations\n\nA traditional Nepali feast is customary. Offer a mix of traditional items like dal-bhat, achar, and sel-roti alongside modern dishes. Ensure pure vegetarian options are available.`,
      category: "nepal_event_culture",
      author: "Marigold Team",
      readTime: 7,
      seoTitle:
        "Complete Bratabandha Planning Guide | Marigold Blog",
      featuredImage: "/images/blog/03-bratabandha.jpg",
      seoDesc:
        "Complete guide to planning a Bratabandha ceremony in Kathmandu. Rituals, venue, catering, and modern tips.",
      isPublished: true,
      publishedAt: new Date("2025-02-01"),
    },
    {
      title: "How to Choose the Right Banquet Hall in Kathmandu",
      slug: "how-to-choose-right-banquet-hall-kathmandu",
      excerpt:
        "Key factors to consider when selecting the perfect banquet hall for your event.",
      content: `Choosing the right banquet hall is perhaps the most critical decision in event planning. With numerous options available in Kathmandu, here are the key factors to consider.\n\n## Capacity and Space\n\nThe first consideration is whether the venue can comfortably accommodate your expected guest count. Always choose a hall that can seat 10-15% more guests than expected to account for last-minute additions.\n\n## Location and Accessibility\n\nChoose a venue that is easily accessible for most of your guests. Consider proximity to main roads, parking availability, and public transport access. Marigold Banquet in Tokha-07 offers excellent accessibility from all parts of Kathmandu.\n\n## In-House Services\n\nVenues that offer in-house catering, decoration, and AV equipment save significant time and coordination effort. In-house services also ensure better quality control and seamless execution.\n\n## Ambiance and Aesthetics\n\nThe venue's existing ambiance should align with your event vision. A versatile space that can be transformed to suit different themes gives you more creative freedom.\n\n## Budget Considerations\n\nCompare not just the rental price but the total cost including catering, decoration, and additional services. Package deals often provide better value than booking services separately.`,
      category: "venue_guide",
      author: "Marigold Team",
      readTime: 5,
      seoTitle:
        "How to Choose the Right Banquet Hall in Kathmandu | Marigold Blog",
      featuredImage: "/images/blog/04-banquet-hall.jpg",
      seoDesc:
        "Key factors to consider when selecting a banquet hall in Kathmandu. Capacity, location, services, and budget tips.",
      isPublished: true,
      publishedAt: new Date("2025-02-10"),
    },
    {
      title: "Best Catering Menu Ideas for Nepali Wedding Receptions",
      slug: "best-catering-menu-ideas-nepali-wedding",
      excerpt:
        "From traditional to fusion, explore menu options that delight every guest.",
      content: `Food is the heart of any Nepali celebration, and wedding receptions are no exception. Here are menu ideas that will make your wedding feast memorable.\n\n## Traditional Nepali Thali\n\nA classic Nepali thali with dal, bhat, tarkari, achar, and masu remains the most popular choice. Include regional specialties like chhoila, aloo tama, and sel roti for authenticity.\n\n## Multi-Cuisine Buffet\n\nModern weddings often feature multi-cuisine buffets offering Nepali, Indian, Chinese, and Continental options. This ensures every guest finds something they enjoy.\n\n## Live Counters\n\nLive cooking stations add entertainment and freshness to the dining experience. Popular options include live chaat counters, momo stations, and tandoor setups.\n\n## Dessert Spread\n\nA mix of traditional and modern desserts creates a sweet ending. Include rasbari, gulab jamun, ice cream, and a custom wedding cake.\n\n## Dietary Accommodations\n\nAlways include pure vegetarian options, Jain-friendly dishes, and halal meat preparations. Clearly label all dishes with dietary indicators for guest convenience.`,
      category: "food_catering",
      author: "Marigold Team",
      readTime: 6,
      seoTitle:
        "Best Catering Menu Ideas for Nepali Wedding Receptions | Marigold Blog",
      featuredImage: "/images/blog/05-catering-menu.jpg",
      seoDesc:
        "Explore the best catering menu ideas for Nepali wedding receptions. Traditional, fusion, and dietary options.",
      isPublished: true,
      publishedAt: new Date("2025-02-15"),
    },
    {
      title: "Pasni Ceremony: Modern vs Traditional Setup Ideas",
      slug: "pasni-ceremony-modern-vs-traditional",
      excerpt:
        "Balancing tradition with modern touches for your child's pasni ceremony.",
      content: `The Pasni ceremony, or rice feeding ceremony, is a cherished Nepali tradition celebrating a baby's first solid food at around six months of age. Here is how to balance tradition with modern celebrations.\n\n## Traditional Pasni Setup\n\nA traditional pasni features a mandap, sacred fire, and rituals guided by a priest. The baby is dressed in traditional attire and fed kheer (rice pudding) by the grandfather or elder family member.\n\n## Modern Additions\n\nModern pasni celebrations often include themed decoration, professional photography, custom cakes, and entertainment for younger guests. The focus remains on the ceremony while adding celebratory elements.\n\n## Venue Considerations\n\nChoose a venue that can accommodate both the ritual area and dining space. Indoor venues with AC are preferred for the baby's comfort. Ensure the venue has a quiet space for the baby to rest.\n\n## Catering for Pasni\n\nTraditional kheer is essential. Complement it with a mix of vegetarian dishes suitable for the religious nature of the event. Include items that elderly guests particularly enjoy.`,
      category: "nepal_event_culture",
      author: "Marigold Team",
      readTime: 5,
      seoTitle:
        "Pasni Ceremony: Modern vs Traditional Setup Ideas | Marigold Blog",
      featuredImage: "/images/blog/06-pasni-ceremony.jpg",
      seoDesc:
        "Ideas for planning a Pasni ceremony in Kathmandu. Balance traditional rituals with modern celebration elements.",
      isPublished: true,
      publishedAt: new Date("2025-02-20"),
    },
    {
      title: "Corporate Event Planning Checklist for Kathmandu Businesses",
      slug: "corporate-event-planning-checklist",
      excerpt:
        "A comprehensive checklist to ensure your corporate event runs smoothly.",
      content: `Planning a corporate event in Kathmandu requires careful coordination and attention to detail. Use this comprehensive checklist to ensure nothing is missed.\n\n## 8-12 Weeks Before\n\n- Define event objectives and format\n- Set budget and get approvals\n- Shortlist and book venue\n- Identify and book key vendors\n\n## 4-8 Weeks Before\n\n- Finalize guest list and send save-the-dates\n- Plan menu and catering details\n- Arrange AV equipment and technical requirements\n- Design invitations and communications\n\n## 2-4 Weeks Before\n\n- Send formal invitations\n- Confirm all vendor bookings\n- Create detailed event timeline\n- Arrange transportation if needed\n\n## 1 Week Before\n\n- Final venue walkthrough\n- Confirm headcount with caterer\n- Prepare all materials and handouts\n- Brief team members on responsibilities\n\n## Day of Event\n\n- Arrive early for setup verification\n- Test all AV equipment\n- Welcome guests and manage registration\n- Follow timeline with flexibility`,
      category: "corporate_events",
      author: "Marigold Team",
      readTime: 4,
      seoTitle:
        "Corporate Event Planning Checklist | Marigold Blog",
      featuredImage: "/images/blog/07-corporate-events.jpg",
      seoDesc:
        "Complete checklist for planning corporate events in Kathmandu. Timeline, vendors, catering, and day-of tips.",
      isPublished: true,
      publishedAt: new Date("2025-03-01"),
    },
    {
      title: "Budget Wedding Planning Tips in Nepal",
      slug: "budget-wedding-planning-tips-nepal",
      excerpt:
        "Smart strategies for a beautiful wedding without breaking the bank.",
      content: `A beautiful wedding does not have to mean an empty bank account. Here are practical tips for planning a memorable wedding in Nepal on a budget.\n\n## Prioritize Your Spending\n\nIdentify the three most important elements for you and your partner. Allocate more budget to these areas and save on others. For most couples, food, venue, and photography are top priorities.\n\n## Choose Off-Peak Dates\n\nWedding venues and vendors charge premium rates during peak season. Consider dates in the off-season for significantly lower prices. Weekday weddings can also save 20-30% on venue costs.\n\n## Opt for Package Deals\n\nVenues offering all-inclusive packages (hall, catering, decoration) often provide better value than booking each service separately. Negotiate package inclusions to match your needs.\n\n## Smart Decoration Choices\n\nFocus decoration budget on key areas like the stage and entrance. Use candles, fabric draping, and strategic lighting for maximum impact at minimum cost. Marigold flowers are affordable and create stunning traditional decor.\n\n## Guest List Management\n\nEvery guest adds to catering and arrangement costs. Be strategic about your guest list and consider separate smaller events for different social circles.`,
      category: "wedding_tips",
      author: "Marigold Team",
      readTime: 6,
      seoTitle:
        "Budget Wedding Planning Tips in Nepal | Marigold Blog",
      featuredImage: "/images/blog/08-budget-wedding.jpg",
      seoDesc:
        "Smart tips for planning a wedding in Nepal on a budget. Save on venue, catering, decoration, and more.",
      isPublished: true,
      publishedAt: new Date("2025-03-10"),
    },
  ];

  // ── Additional Blog Posts (Batch 2) ────────────────────────────────
  const blogPostsBatch2 = [
    {
      title: "Engagement Ceremony Ideas That Will Wow Your Guests",
      slug: "engagement-ceremony-ideas-wow-guests",
      excerpt:
        "Creative and memorable engagement ceremony ideas to make your special day truly unforgettable.",
      content: `The engagement ceremony, or Mangni, is the beautiful beginning of your wedding journey. It sets the tone for the celebrations to come and deserves just as much planning and attention as the main wedding day. Here are some creative ideas to make your engagement truly memorable.\n\n## Unique Venue Themes\n\nGone are the days of simple ring exchanges in a living room. Modern engagement ceremonies deserve stunning backdrops. Consider a rooftop sunset ceremony with the Kathmandu Valley as your backdrop, a garden party with fairy lights and floral arches, or an intimate indoor setup with candlelit ambiance and live acoustic music.\n\n## Creative Ring Exchange Rituals\n\nWhile the traditional ring exchange remains central, couples are adding personal touches. Some popular ideas include placing the ring inside a flower arrangement for a scavenger hunt, having a family member deliver the ring on a decorated cushion, or incorporating the exchange into a short choreographed dance performance.\n\n## Food and Beverage Ideas\n\nElevate your engagement menu with interactive food stations. A live chaat counter adds a fun Nepali touch, while a chocolate fountain or custom cocktail bar brings contemporary flair. Keep the menu lighter than a full wedding feast since the engagement is typically a shorter event.\n\n## Photography and Memories\n\nHire a professional photographer who specializes in candid moments. Create a dedicated photo booth with fun props related to your love story. Set up a "memory wall" where guests can pin handwritten notes and wishes for the couple.\n\n## Entertainment Ideas\n\nBeyond the traditional music and dance, consider hiring a live band for acoustic sets, arranging a surprise flash mob by friends and family, or screening a short video montage of your journey as a couple. These elements create lasting memories for everyone present.`,
      category: "wedding_tips",
      author: "Marigold Team",
      readTime: 6,
      featuredImage: "/images/blog/09-engagement-ceremony.jpg",
      seoTitle: "Engagement Ceremony Ideas That Will Wow Your Guests | Marigold Blog",
      seoDesc: "Creative engagement ceremony ideas for Nepali couples. Themes, ring exchange, catering, photography, and entertainment tips.",
      isPublished: true,
      publishedAt: new Date("2025-03-15"),
    },
    {
      title: "Wedding Photography Tips: Capturing Your Perfect Day",
      slug: "wedding-photography-tips-perfect-day",
      excerpt:
        "Expert tips for choosing the right photographer and ensuring every moment is beautifully captured.",
      content: `Your wedding photographs are the lasting keepsakes of your special day. Long after the flowers wilt and the food is eaten, your photos will bring back every emotion, every smile, and every tear of joy. Here is how to ensure your wedding photography is everything you envision.\n\n## Choosing the Right Photographer\n\nLook for a photographer whose style matches your vision. Review complete wedding albums, not just highlights on Instagram. Schedule an in-person meeting to discuss your expectations, shot list, and cultural requirements specific to Nepali weddings.\n\n## Creating a Shot List\n\nWork with your photographer to create a comprehensive shot list that includes key Nepali wedding rituals like the Swayamvar, Janti procession, Kanyadaan, and Pida Dani. Share the list with family members so they know when to be present for group photographs.\n\n## Golden Hour Magic\n\nThe best natural light for outdoor portraits occurs during golden hour, typically one hour before sunset. Schedule a couple portrait session during this time for stunning, warm-toned photographs. If your venue has beautiful outdoor spaces, golden hour shots against the backdrop of Kathmandu's skyline can be breathtaking.\n\n## Pre-Wedding Shoots\n\nConsider scheduling a pre-wedding or engagement photoshoot. This helps you get comfortable in front of the camera and gives you test shots to review before the main event. Popular locations in Kathmandu include temples, gardens, and heritage sites.\n\n## Candid vs Traditional Balance\n\nThe best wedding albums blend candid moments with traditional posed shots. Ensure your photographer dedicates time to both. Some of the most precious photographs come from unscripted moments like a father's emotional reaction, laughter between the bridal party, or children playing during the reception.`,
      category: "wedding_tips",
      author: "Marigold Team",
      readTime: 7,
      featuredImage: "/images/blog/10-wedding-photography.jpg",
      seoTitle: "Wedding Photography Tips for Nepali Weddings | Marigold Blog",
      seoDesc: "Expert wedding photography tips. Choosing a photographer, shot lists, golden hour, pre-wedding shoots, and candid photography.",
      isPublished: true,
      publishedAt: new Date("2025-03-20"),
    },
    {
      title: "Mehendi Ceremony: History, Rituals, and Celebration Ideas",
      slug: "mehendi-ceremony-history-rituals-ideas",
      excerpt:
        "Explore the rich tradition of the Mehendi ceremony and modern celebration ideas for your wedding.",
      content: `The Mehendi ceremony is one of the most joyful pre-wedding celebrations in South Asian culture. This vibrant event brings together family and friends for an evening of music, dance, and intricate henna artistry.\n\n## History and Significance\n\nMehendi has been a part of wedding traditions for over 5,000 years. In Hindu tradition, the darkness of the mehendi stain is believed to symbolize the depth of love between the couple. The intricate designs are said to represent the bond of matrimony and the couple's future prosperity.\n\n## Modern Mehendi Design Trends\n\nWhile traditional designs featuring paisleys, mandalas, and bridal figures remain popular, modern brides are opting for minimalist patterns, geometric designs, and even portraits of the couple. Some brides hide the groom's name within the design as a playful tradition where he must find it on the wedding night.\n\n## Planning the Ceremony\n\nBook your mehendi artist 2-3 months in advance. Schedule the ceremony 1-2 days before the wedding. Create a playlist of Bollywood and Nepali songs to keep the energy festive. Prepare a comfortable seating arrangement where the bride can relax during the application process.\n\n## Decoration and Setup\n\nTransform your mehendi venue with colorful draping, marigold flowers, and floor cushions for a bohemian feel. Set up a dedicated station with refreshments, photo booth props, and a Mehendi design catalog for guests who want simple designs applied.\n\n## Food for the Occasion\n\nServe light, snackable items that guests can enjoy throughout the evening. Popular choices include chaat, samosas, pakoras, and sweets like gulab jamun. Set up a dedicated mocktail or juice bar with colorful drinks served in vintage glasses.`,
      category: "nepal_event_culture",
      author: "Marigold Team",
      readTime: 6,
      featuredImage: "/images/blog/11-mehendi-ceremony.jpg",
      seoTitle: "Mehendi Ceremony: History, Rituals, and Ideas | Marigold Blog",
      seoDesc: "Complete guide to the Mehendi ceremony. History, modern design trends, planning tips, decoration, and food ideas.",
      isPublished: true,
      publishedAt: new Date("2025-03-25"),
    },
    {
      title: "How to Plan a Memorable Birthday Party in Kathmandu",
      slug: "how-to-plan-memorable-birthday-party-kathmandu",
      excerpt:
        "From kids to adults, a complete guide to throwing unforgettable birthday parties in Kathmandu.",
      content: `Birthday parties in Kathmandu have evolved from simple home gatherings to elaborate celebrations at premium venues. Whether you are planning a first birthday, a sweet sixteen, or a milestone adult birthday, here is your comprehensive planning guide.\n\n## Choosing the Right Venue\n\nThe venue sets the tone for your entire celebration. For kids' parties, look for venues with outdoor spaces and activity rooms. For adult celebrations, consider banquet halls with AV capabilities, dance floors, and customizable catering options. Marigold Banquet offers flexible spaces that adapt to any birthday theme.\n\n## Theme Ideas by Age Group\n\n**Ages 1-5:** Soft play areas, cartoon characters, balloon decorations, and simple cake-cutting ceremonies. Focus on comfort and photo opportunities.\n\n**Ages 6-12:** Adventure themes, superhero parties, science experiments, or art parties. Include interactive activities and party favors.\n\n**Ages 13-19:** Movie nights, gaming tournaments, pool parties, or themed costume parties. Teenagers prefer more independence in the celebration style.\n\n**Adults:** Rooftop dinners, retro themes, decade parties, wine tasting, or elegant sit-down dinners. Keep it sophisticated with quality food, drinks, and music.\n\n## Catering That Impresses\n\nMove beyond standard cake and snacks. Offer a themed menu that matches your party concept. Live food stations, a dessert bar, or a custom cake designed by a professional baker can elevate the entire experience.\n\n## Entertainment and Activities\n\nHire a DJ or live band for music. Set up a photo booth with themed props. For kids, arrange a magic show, face painting, or balloon art. Consider hiring a professional photographer to capture candid moments throughout the celebration.`,
      category: "nepal_event_culture",
      author: "Marigold Team",
      readTime: 7,
      featuredImage: "/images/blog/12-birthday-party.jpg",
      seoTitle: "How to Plan a Birthday Party in Kathmandu | Marigold Blog",
      seoDesc: "Complete guide to planning birthday parties in Kathmandu. Venue, themes by age, catering, entertainment, and activity ideas.",
      isPublished: true,
      publishedAt: new Date("2025-04-01"),
    },
    {
      title: "AV and Technology Setup for Modern Corporate Events",
      slug: "av-technology-setup-corporate-events",
      excerpt:
        "Everything you need to know about AV equipment and technology for successful corporate events.",
      content: `In today's corporate landscape, the quality of your event's audiovisual setup can make or break its success. Whether you are hosting a seminar, product launch, award ceremony, or team-building event, modern AV technology is essential.\n\n## Essential AV Equipment\n\nEvery corporate event needs a reliable setup including a high-lumen projector or LED screen (minimum 5000 lumens for well-lit rooms), wireless lapel and handheld microphones, a mixing console with multiple input channels, and dedicated speakers positioned for even sound coverage. Always have backup equipment on standby.\n\n## LED Walls vs Projectors\n\nLED walls offer superior brightness and visibility in all lighting conditions, making them ideal for large conferences and product launches. Projectors are more cost-effective for smaller meetings and presentations where ambient light can be controlled. For events with 200+ attendees, LED walls provide a more impactful visual experience.\n\n## Live Streaming and Hybrid Events\n\nHybrid events that combine in-person and virtual attendance are increasingly popular. Invest in a reliable internet connection (minimum 50 Mbps upload speed), multi-camera setup, professional streaming software, and a dedicated technical operator to manage the virtual experience.\n\n## Interactive Technology\n\nEngage your audience with interactive polling tools, live Q&A platforms, and real-time feedback systems. Tools like Slido, Mentimeter, and Kahoot add an interactive layer that keeps attendees engaged and provides valuable data for organizers.\n\n## Technical Rehearsals\n\nAlways schedule a full technical rehearsal at least 24 hours before your event. Test all equipment run-throughs, check microphone levels, verify screen resolution, and ensure all presenters are comfortable with the setup. This rehearsal is the single most important step in preventing technical failures.`,
      category: "corporate_events",
      author: "Marigold Team",
      readTime: 8,
      featuredImage: "/images/blog/13-av-corporate.jpg",
      seoTitle: "AV and Technology Guide for Corporate Events | Marigold Blog",
      seoDesc: "Complete guide to AV equipment for corporate events. LED walls, live streaming, interactive tech, and technical rehearsals.",
      isPublished: true,
      publishedAt: new Date("2025-04-05"),
    },
    {
      title: "Sustainable Event Planning: Eco-Friendly Practices for Nepali Celebrations",
      slug: "sustainable-event-planning-eco-friendly-nepal",
      excerpt:
        "How to reduce the environmental impact of your events without compromising on celebration quality.",
      content: `As awareness about environmental issues grows in Nepal, more couples and event planners are seeking sustainable alternatives to traditional celebration practices. Here is how you can plan a beautiful event while minimizing its environmental footprint.\n\n## Reducing Single-Use Plastics\n\nThe biggest source of waste at Nepali events is single-use plastic. Replace plastic plates and cups with biodegradable alternatives made from areca palm leaves, bamboo, or sugarcane bagasse. These options are now widely available in Kathmandu and cost only marginally more than plastic.\n\n## Sustainable Decoration\n\nChoose locally sourced seasonal flowers over imported varieties. Use fabric banners and draping instead of plastic flex prints. Repurpose decoration elements like lanterns, vases, and fabric from other events. Incorporate potted plants that can be gifted to guests or planted after the event.\n\n## Food Waste Management\n\nWork with your caterer to accurately estimate food quantities based on confirmed RSVPs. Partner with local organizations like Food for Life Nepal to distribute surplus food to those in need. Compost food waste using local composting services.\n\n## Digital Invitations\n\nReplace printed invitation cards with beautifully designed digital invitations. Use platforms like Canva or Paperless Post to create elegant e-invitations that are not only eco-friendly but also easier to track and manage. For traditional families who prefer physical cards, choose recycled paper options.\n\n## Eco-Friendly Favors\n\nInstead of plastic-wrapped sweets or imported gifts, consider seed packets, small potted plants, beeswax candles, locally made soaps, or handcrafted items from Nepali artisans. These thoughtful favors are memorable, useful, and environmentally responsible.`,
      category: "venue_guide",
      author: "Marigold Team",
      readTime: 7,
      featuredImage: "/images/blog/14-sustainable-event.jpg",
      seoTitle: "Sustainable Event Planning in Nepal | Marigold Blog",
      seoDesc: "Eco-friendly event planning tips for Nepal. Reduce plastics, sustainable decoration, food waste management, and green practices.",
      isPublished: true,
      publishedAt: new Date("2025-04-10"),
    },
    {
      title: "Live Music vs DJ: Choosing the Right Entertainment for Your Wedding",
      slug: "live-music-vs-dj-wedding-entertainment",
      excerpt:
        "A detailed comparison to help you decide between live music and DJ entertainment for your celebration.",
      content: `Entertainment is the heartbeat of any celebration. The right music can transform your event from good to unforgettable. But should you hire a live band or a DJ? Here is a detailed comparison to help you make the best choice for your wedding.\n\n## Live Band: Pros and Cons\n\nLive bands bring an unmatched energy and sophistication to events. The visual spectacle of musicians performing, the warmth of acoustic instruments, and the ability to personalize songs create a premium experience. However, live bands typically cost 2-3 times more than DJs, need breaks between sets, and have a limited repertoire compared to a DJ's library.\n\n**Best for:** Luxury weddings, cocktail hours, cultural ceremonies with traditional instruments, and events where a sophisticated ambiance is paramount.\n\n## DJ: Pros and Cons\n\nDJs offer unmatched versatility with access to virtually any song ever recorded. They can read the crowd and adjust the playlist in real-time, keep the energy high with seamless transitions, and cost significantly less than a full band. Modern DJs also offer lighting packages and MC services. The downside is that some guests may miss the visual appeal of live performers.\n\n**Best for:** Reception dance parties, large guest lists, multi-genre music preferences, and budget-conscious celebrations.\n\n## The Hybrid Approach\n\nMany successful weddings use a combination: a live band or acoustic musician for the ceremony and cocktail hour, transitioning to a DJ for the high-energy reception. This gives you the best of both worlds and keeps the evening dynamic and engaging.\n\n## Booking Tips\n\nBook your entertainment 3-6 months in advance. Attend a live performance or listen to demo tracks before hiring. Provide a "must-play" and "do-not-play" list. Discuss volume levels, dress code, and setup requirements with your venue in advance.`,
      category: "wedding_tips",
      author: "Marigold Team",
      readTime: 6,
      featuredImage: "/images/blog/15-live-music-dj.jpg",
      seoTitle: "Live Music vs DJ for Your Wedding | Marigold Blog",
      seoDesc: "Detailed comparison of live music vs DJ for weddings. Pros, cons, costs, hybrid approach, and booking tips.",
      isPublished: true,
      publishedAt: new Date("2025-04-15"),
    },
    {
      title: "Nepali Wedding Food Guide: Traditional Dishes for Every Ceremony",
      slug: "nepali-wedding-food-guide-traditional-dishes",
      excerpt:
        "A comprehensive guide to traditional Nepali wedding foods and their cultural significance.",
      content: `Food is the centerpiece of every Nepali celebration, and weddings are no exception. From the morning puja to the evening reception, each ceremony has its own traditional food items that carry deep cultural significance. Here is your complete guide to Nepali wedding cuisine.\n\n## The Morning Puja Feast\n\nThe wedding day begins with offerings to the gods. Traditional items include panchamrita (a mixture of milk, yogurt, honey, sugar, and ghee), fruits, nuts, and sweets. The family shares prasad (blessed food) after the puja, symbolizing divine blessings for the couple.\n\n## The Main Wedding Feast\n\nThe wedding feast, or Bhoj, is a grand affair. A traditional Newari wedding feast includes items like chhoila (spiced grilled meat), bara (lentil patties), chatamari (Newari pizza), kachila (marinated raw meat), and a variety of achars. For other communities, a classic dal-bhat-tarkari with multiple meat and vegetable curries forms the main course.\n\n## Sweets and Desserts\n\nNo Nepali celebration is complete without mithai. Traditional wedding sweets include rasbari, gulab jamun, laddu, kheer, and sel roti. Each community has its own specialty sweets. The groom's family traditionally sends sweets as part of the wedding gifts.\n\n## Modern Additions to Traditional Menus\n\nContemporary Nepali weddings often feature a multi-cuisine spread alongside traditional items. Live counters for momos, chaat, tandoori items, and even international cuisines like Italian or Chinese are now common additions. Custom wedding cakes have also become popular.\n\n## Dietary Considerations\n\nNepali weddings must accommodate diverse dietary needs. Always include pure vegetarian options for religious rituals, Jain-friendly dishes for Jain guests, and clearly label halal and non-vegetarian items. A well-organized buffet with clear labeling ensures every guest feels welcome.`,
      category: "food_catering",
      author: "Marigold Team",
      readTime: 7,
      featuredImage: "/images/blog/16-nepali-wedding-food.jpg",
      seoTitle: "Nepali Wedding Food Guide: Traditional Dishes | Marigold Blog",
      seoDesc: "Complete guide to traditional Nepali wedding food. Ceremony dishes, main feast, sweets, modern additions, and dietary tips.",
      isPublished: true,
      publishedAt: new Date("2025-04-20"),
    },
    {
      title: "Anniversary Celebration Ideas: Making Every Milestone Special",
      slug: "anniversary-celebration-ideas-milestone",
      excerpt:
        "Creative ideas for celebrating wedding anniversaries from the first to the golden jubilee and beyond.",
      content: `Anniversaries are a time to celebrate love, reflect on shared memories, and create new ones. Whether you are celebrating your first year together or your fiftieth, each milestone deserves a thoughtful and memorable celebration.\n\n## First Anniversary: Paper Theme\n\nThe traditional first anniversary gift is paper. Host an intimate dinner at a beautiful restaurant, exchange handwritten love letters, or create a memory scrapbook of your first year together. A quiet, romantic evening at a venue like Marigold's Golden Terrace sets the perfect tone.\n\n## Fifth Anniversary: Wood Theme\n\nWood symbolizes strength and longevity. Celebrate with a nature-inspired event, plant a tree together, or host a rustic-themed dinner party with close family and friends. Incorporate wooden elements in your decoration and table settings.\n\n## Tenth Anniversary: Tin and Aluminum\n\nTin represents durability. Celebrate a decade of partnership with a grand party. Renew your vows in a ceremony surrounded by family and friends. This is a wonderful time to recreate your wedding day with modern touches.\n\n## Silver Jubilee: 25 Years\n\nTwenty-five years of marriage is a remarkable milestone deserving a grand celebration. Host a large reception, display a timeline of your journey together, and include a slideshow of photographs from each year of your marriage. Consider a theme of silver and white for an elegant aesthetic.\n\n## Golden Jubilee: 50 Years\n\nFifty years is an extraordinary achievement. Many families host multi-generational celebrations where children, grandchildren, and great-grandchildren come together. A venue with flexible space that accommodates both intimate family moments and large gatherings is ideal.\n\n## Planning Tips\nRegardless of the milestone, focus on what makes your relationship unique. Incorporate shared hobbies, favorite travel destinations, or meaningful songs into the celebration. The most memorable anniversary celebrations are those that reflect your personal love story.`,
      category: "nepal_event_culture",
      author: "Marigold Team",
      readTime: 7,
      featuredImage: "/images/blog/17-anniversary-celebration.jpg",
      seoTitle: "Anniversary Celebration Ideas for Every Milestone | Marigold Blog",
      seoDesc: "Creative anniversary celebration ideas from 1st to 50th. Theme ideas, venue tips, and planning advice for milestone celebrations.",
      isPublished: true,
      publishedAt: new Date("2025-04-25"),
    },
    {
      title: "Team Building Events That Actually Work: A Corporate Guide",
      slug: "team-building-events-corporate-guide",
      excerpt:
        "Proven team building event formats that strengthen bonds and boost workplace productivity.",
      content: `Team building events are investments in your organization's most valuable asset: its people. When done right, they improve communication, build trust, and boost morale. When done poorly, they become forced activities that employees dread. Here is how to get it right.\n\n## Why Team Building Matters\n\nResearch consistently shows that strong team dynamics lead to higher productivity, lower turnover, and better innovation. A well-designed team building event breaks down departmental silos, helps new employees integrate faster, and gives managers insights into team dynamics that are invisible in the office environment.\n\n## Proven Event Formats\n\n**Escape Room Challenge:** Teams solve puzzles together under time pressure, testing communication and problem-solving skills in a fun, low-stakes environment. Kathmandu now has several professional escape room venues.\n\n**Cooking Challenge:** Teams prepare a multi-course meal under professional guidance. This activity requires coordination, delegation, and creativity, and ends with a shared meal that everyone contributed to.\n\n**Outdoor Adventure Day:** Activities like hiking, rope courses, or sports tournaments at venues with outdoor spaces build camaraderie through shared physical challenges and friendly competition.\n\n**Innovation Hackathon:** Teams compete to solve a real business challenge in a timed format. This combines team building with actual business value and often generates ideas that can be implemented.\n\n**Cultural Experience:** For international or diverse teams, organizing a cultural exchange day where team members share food, traditions, and stories from their backgrounds builds empathy and understanding.\n\n## Planning Considerations\n\nChoose activities that accommodate all fitness levels and personalities. Avoid forced physical activities or humiliating games. Schedule events during work hours, not on weekends. Follow up the event with a debrief session to capture insights and action items.`,
      category: "corporate_events",
      author: "Marigold Team",
      readTime: 6,
      featuredImage: "/images/blog/18-team-building.jpg",
      seoTitle: "Team Building Events That Actually Work | Marigold Blog",
      seoDesc: "Proven team building event ideas for corporations. Escape rooms, cooking challenges, hackathons, and outdoor adventures.",
      isPublished: true,
      publishedAt: new Date("2025-04-28"),
    },
  ];

  // ── Additional Blog Posts (Batch 3) ────────────────────────────────
  const blogPostsBatch3 = [
    {
      title: "Wedding Makeup Tips: Achieving the Perfect Bridal Look in Nepal",
      slug: "wedding-makeup-tips-perfect-bridal-look-nepal",
      excerpt:
        "Essential makeup tips for Nepali brides, from traditional looks to contemporary glam, and how to choose the right artist.",
      content: `Your bridal makeup is the finishing touch that brings your entire wedding look together. With the right preparation, products, and artist, you can achieve a flawless look that photographs beautifully and lasts through every ceremony and celebration.\n\n## Finding the Right Makeup Artist\n\nStart your search at least 4-6 months before the wedding. Look for artists who have experience with bridal makeup specifically, not just party or editorial work. Schedule a trial session where you discuss your outfit, jewelry, venue lighting, and cultural requirements. The trial is your opportunity to test the look under different lighting conditions.\n\n## Traditional Nepali Bridal Makeup\n\nTraditional Nepali bridal makeup emphasizes a glowing complexion with defined eyes and bold lips. Key elements include a flawless base with high-coverage foundation, kohled eyes with winged liner, bold red or maroon lips, and subtle contouring that photographs well. The traditional look often incorporates sindoor and bindi as integral elements.\n\n## Contemporary Bridal Trends\n\nModern Nepali brides are increasingly opting for softer, more natural looks. Dewy skin, nude or pink-toned lips, and smoky eyes in neutral shades create an elegant appearance that works beautifully with both traditional and fusion outfits. Airbrush makeup has become increasingly popular for its flawless, long-lasting finish.\n\n## Skin Preparation Timeline\n\nGreat makeup starts with great skin. Begin a dedicated skincare routine 3-6 months before the wedding. Monthly facials, daily cleansing and moisturizing, and weekly exfoliation create the perfect canvas. In the week before, increase hydration and avoid trying any new products. The night before, apply a hydrating mask and get plenty of sleep.\n\n## Waterproof and Long-Lasting Tips\n\nNepali weddings involve tears, dancing, and hours of celebration. Use waterproof mascara and eyeliner, long-wear foundation, and setting spray to keep your makeup intact. Carry a touch-up kit with lipstick, blotting papers, and powder for quick refreshes between ceremonies.`,
      category: "wedding_tips",
      author: "Marigold Team",
      readTime: 6,
      featuredImage: "/images/blog/19-bridal-makeup.jpg",
      seoTitle: "Wedding Makeup Tips for Nepali Brides | Marigold Blog",
      seoDesc: "Essential bridal makeup tips for Nepali weddings. Finding an artist, traditional vs modern looks, skin prep, and long-lasting tips.",
      isPublished: true,
      publishedAt: new Date("2025-05-01"),
    },
    {
      title: "Indoor vs Outdoor Wedding Venues in Kathmandu: Pros and Cons",
      slug: "indoor-vs-outdoor-wedding-venues-kathmandu",
      excerpt:
        "A detailed comparison of indoor and outdoor wedding venues in Kathmandu to help you choose the perfect setting.",
      content: `One of the earliest and most impactful decisions in wedding planning is choosing between an indoor and outdoor venue. Each option offers distinct advantages and challenges that can significantly influence your celebration. Kathmandu's unique climate and geography add extra considerations to this decision.\n\n## Indoor Venues: Advantages\n\nIndoor venues like banquet halls provide complete climate control, protecting your celebration from Kathmandu's unpredictable weather. They offer superior acoustics, professional lighting systems, and built-in amenities like kitchens, bridal rooms, and parking. Indoor spaces are not affected by dust, insects, or noise pollution from nearby roads. They also allow for more precise decoration control.\n\n## Indoor Venues: Considerations\n\nThe main limitations of indoor venues are space constraints and lack of natural scenery. Ceiling heights may restrict decoration options, and natural light is limited to windows. Some halls may have pillars that obstruct views. However, premium venues like Marigold Banquet Hall offer spacious layouts with high ceilings that mitigate these concerns.\n\n## Outdoor Venues: Advantages\n\nOutdoor venues provide stunning natural backdrops, open skies, and a sense of freedom that indoor spaces cannot replicate. Gardens, terraces, and open-air venues in Kathmandu can offer views of the valley or surrounding hills. Natural lighting is ideal for photography, and the open space accommodates larger guest counts more easily.\n\n## Outdoor Venues: Considerations\n\nWeather is the biggest risk factor. Kathmandu's monsoon season (June-September) makes outdoor events risky. Even in dry months, sudden rain or extreme heat can disrupt plans. You will need to arrange for a backup indoor space, additional lighting, generator power, and pest control measures. Outdoor venues also require more extensive decoration to create defined spaces.\n\n## The Best of Both Worlds\n\nMany couples choose a hybrid approach, holding the ceremony outdoors and moving indoors for the reception. Venues like Marigold Banquet Hall that offer both indoor halls and outdoor garden spaces provide this flexibility, allowing you to enjoy the beauty of nature without risking your celebration.`,
      category: "venue_guide",
      author: "Marigold Team",
      readTime: 6,
      featuredImage: "/images/blog/20-indoor-outdoor-venue.jpg",
      seoTitle: "Indoor vs Outdoor Wedding Venues in Kathmandu | Marigold Blog",
      seoDesc: "Pros and cons of indoor and outdoor wedding venues in Kathmandu. Weather, lighting, decoration, and hybrid approach tips.",
      isPublished: true,
      publishedAt: new Date("2025-05-05"),
    },
    {
      title: "Wedding Invitation Etiquette: A Modern Guide for Nepali Couples",
      slug: "wedding-invitation-etiquette-modern-guide-nepali",
      excerpt:
        "Everything you need to know about creating and sending wedding invitations that balance tradition with modern expectations.",
      content: `Wedding invitations set the tone for your entire celebration. They are the first glimpse your guests get into your wedding style and provide essential information. Navigating the balance between Nepali traditions and modern expectations can be challenging, but this guide will help you get it right.\n\n## When to Send Invitations\n\nTraditional Nepali weddings follow a structured invitation timeline. The formal invitation from the groom's family is delivered first, often accompanied by sweets and supari. Digital save-the-dates should be sent 3-4 months before the wedding, followed by formal invitations 6-8 weeks before the event. For destination weddings or guests traveling from abroad, send invitations 3 months in advance.\n\n## Essential Information to Include\n\nEvery wedding invitation must include the couple's names, parents' names, date, time, and venue with full address. Additional helpful details include dress code, ceremony type, RSVP deadline, and contact information. For Nepali weddings, include the specific ceremony names and timings, as guests may attend only certain events.\n\n## Digital vs Physical Invitations\n\nThe trend toward digital invitations has accelerated significantly. Digital invites through WhatsApp, email, or dedicated wedding websites are cost-effective, easily trackable, and environmentally friendly. However, for close family and VIP guests, physical invitations on premium cardstock remain an important cultural expectation in Nepal.\n\n## Design Tips\n\nYour invitation design should reflect your wedding theme. Traditional motifs like paisleys, marigolds, and mandalas work beautifully for classic Nepali weddings. Modern minimalist designs with clean typography suit contemporary celebrations. Use a maximum of two fonts and a color palette that matches your wedding colors.\n\n## RSVP Management\n\nTrack RSVPs diligently using a spreadsheet or wedding planning app. Follow up with non-responders one week after the deadline. For Nepali weddings, account for the cultural practice where some guests may attend without RSVPing, and plan your catering accordingly with a 10-15% buffer.`,
      category: "wedding_tips",
      author: "Marigold Team",
      readTime: 7,
      featuredImage: "/images/blog/21-wedding-invitations.jpg",
      seoTitle: "Wedding Invitation Etiquette for Nepali Couples | Marigold Blog",
      seoDesc: "Complete guide to wedding invitations for Nepali couples. Timing, design, digital vs physical, and RSVP management tips.",
      isPublished: true,
      publishedAt: new Date("2025-05-10"),
    },
    {
      title: "Momo Party Ideas: How to Throw the Ultimate Nepali Momo Night",
      slug: "momo-party-ideas-ultimate-nepali-momo-night",
      excerpt:
        "Creative ideas for hosting a memorable momo party, from fillings to dipping sauces and decoration tips.",
      content: `Momos are more than just food in Nepal; they are a cultural phenomenon that brings people together. Hosting a momo-themed party is a fun and unique way to celebrate with friends and family. Whether it is a birthday, casual get-together, or corporate team event, a momo party is guaranteed to be a hit.\n\n## Momo Varieties to Serve\n\nNo momo party is complete without variety. Prepare at least three types of momos: classic buff (water buffalo) momos, chicken momos, and vegetarian momos with mixed vegetable filling. For adventurous eaters, add paneer momos, cheese momos, or even dessert momos with chocolate or nutella filling. Offer both steamed and fried (kothey) options to cater to different preferences.\n\n## The Essential Dipping Sauces\n\nThe sauce is what elevates momos from good to extraordinary. A classic Nepali momo chutney made with tomatoes, dried red chilies, sesame, and garlic is non-negotiable. Also prepare a mayonnaise-based white sauce, a spicy Schezwan sauce, and a soy-ginger dipping sauce. Let guests mix and match for their perfect combination.\n\n## Setting Up a Momo Station\n\nSet up a live momo-making station where guests can watch (or participate in) the process. A skilled momo maker can demonstrate the art of folding and provide mini cooking lessons. This interactive element adds entertainment and gives your party a unique character that guests will remember and talk about.\n\n## Side Dishes and Accompaniments\n\nWhile momos are the star, side dishes complete the experience. Serve thukpa (Nepali noodle soup), achar (pickle), and sel roti as accompaniments. Fresh salad, pickled radish, and cucumber sticks provide refreshing contrast. For drinks, offer chilled Tongba, local beers, or homemade lemon soda.\n\n## Decoration and Atmosphere\n\nCreate a warm, casual atmosphere reminiscent of Kathmandu's momo joints. String lights, checked tablecloths, and Nepali music in the background set the mood. Use traditional dhaka fabric as table runners and serve food on brass or stainless steel plates for authenticity.`,
      category: "food_catering",
      author: "Marigold Team",
      readTime: 5,
      featuredImage: "/images/blog/22-momo-party.jpg",
      seoTitle: "How to Throw the Ultimate Nepali Momo Party | Marigold Blog",
      seoDesc: "Creative momo party ideas. Varieties, dipping sauces, live stations, side dishes, and decoration tips for the perfect momo night.",
      isPublished: true,
      publishedAt: new Date("2025-05-15"),
    },
    {
      title: "Monsoon Wedding Planning: Challenges and Solutions in Nepal",
      slug: "monsoon-wedding-planning-challenges-solutions-nepal",
      excerpt:
        "How to plan a beautiful monsoon wedding in Nepal, from rain-proof decoration to weather contingency plans.",
      content: `Monsoon weddings in Nepal have a unique, romantic charm that no other season can replicate. The lush green landscape, dramatic clouds, and the sound of rain create an incredibly atmospheric setting. However, planning a wedding during the monsoon season (June to September) requires extra preparation and smart contingency planning.\n\n## The Romance of Monsoon Weddings\n\nThere is something undeniably magical about saying your vows while rain gently falls outside. The monsoon transforms Kathmandu's landscape into a vibrant green paradise. Photographers love the dramatic cloud formations and moody lighting that monsoon skies provide. Many of the most striking wedding photographs are captured during this season.\n\n## Choosing an Indoor Venue\n\nAn indoor venue is non-negotiable for a monsoon wedding. Select a venue with high-quality air conditioning, as monsoon days can be humid. Ensure the venue has covered parking or valet service to protect guests from rain. Marigold Banquet Hall offers fully enclosed, climate-controlled spaces with covered parking that are ideal for monsoon celebrations.\n\n## Rain-Proof Decoration\n\nChoose decoration materials that are unaffected by humidity. Avoid fresh flower arrangements that may wilt quickly in damp conditions. Instead, opt for high-quality artificial flowers, fabric draping, crystal installations, and LED lighting that create stunning effects regardless of weather. If using fresh flowers, choose hardy varieties like orchids and anthuriums.\n\n## Weather Contingency Plans\n\nEven with an indoor venue, have contingency plans for outdoor ceremonies. Set up a backup mandap indoors. Arrange for extra umbrellas at the entrance. Create a covered walkway from the parking area to the venue. Brief your photographer about indoor alternatives for portrait sessions.\n\n## Guest Communication\n\nKeep your guests informed about the monsoon conditions. Include weather-appropriate dress code suggestions in your invitations. Arrange for coat check services and provide towels at the entrance. These small considerations show thoughtfulness and ensure your guests remain comfortable throughout the celebration.`,
      category: "wedding_tips",
      author: "Marigold Team",
      readTime: 6,
      featuredImage: "/images/blog/23-monsoon-wedding.jpg",
      seoTitle: "Monsoon Wedding Planning in Nepal | Marigold Blog",
      seoDesc: "Complete guide to planning a monsoon wedding in Nepal. Indoor venues, rain-proof decoration, contingency plans, and guest tips.",
      isPublished: true,
      publishedAt: new Date("2025-05-20"),
    },
    {
      title: "Corporate Seminar Planning: From Concept to Execution in Kathmandu",
      slug: "corporate-seminar-planning-kathmandu-guide",
      excerpt:
        "A step-by-step guide to planning successful corporate seminars, workshops, and conferences in Kathmandu.",
      content: `Corporate seminars are powerful tools for knowledge sharing, networking, and brand building. Whether you are organizing an industry conference, an internal training workshop, or a product launch seminar, meticulous planning is the key to a successful event. Here is your comprehensive guide from concept to execution.\n\n## Defining Objectives and Audience\n\nBefore booking anything, clearly define your seminar objectives. Are you educating industry professionals, training employees, launching a product, or building brand awareness? Your objectives determine everything from the venue choice to the content format. Identify your target audience and their expectations to design an event that delivers real value.\n\n## Venue Selection Criteria\n\nFor seminars in Kathmandu, prioritize venues with reliable power backup, high-speed internet, professional AV systems, and comfortable seating for extended periods. The venue should be centrally located with ample parking. Consider whether you need breakout rooms for workshops, a dedicated registration area, and catering facilities. Marigold Banquet offers configurable spaces suitable for seminars of 50 to 500 attendees.\n\n## Speaker and Content Management\n\nInvite speakers who are recognized authorities in their fields. Provide clear guidelines on presentation format, time limits, and technical requirements. Collect all presentations in advance and pre-load them onto the venue's system. Schedule buffer time between sessions for Q&A and transitions. Create a detailed run-of-show document that every team member can reference.\n\n## Registration and Marketing\n\nSet up an online registration platform that captures attendee details and preferences. Create a dedicated event website or landing page with agenda, speaker profiles, and venue information. Use email marketing, social media, and industry partnerships to promote the event. Early-bird pricing incentivizes prompt registrations.\n\n## Post-Event Follow-Up\n\nThe seminar's impact extends beyond the event itself. Send thank-you emails within 24 hours with presentation materials and feedback surveys. Share highlights on social media and publish a post-event report. Follow up on leads and connections made during networking sessions to maximize ROI.`,
      category: "corporate_events",
      author: "Marigold Team",
      readTime: 8,
      featuredImage: "/images/blog/24-corporate-seminar.jpg",
      seoTitle: "Corporate Seminar Planning Guide Kathmandu | Marigold Blog",
      seoDesc: "Step-by-step guide to planning corporate seminars in Kathmandu. Objectives, venue, speakers, marketing, and post-event follow-up.",
      isPublished: true,
      publishedAt: new Date("2025-05-25"),
    },
    {
      title: "Flower Decoration Guide: Choosing the Right Blooms for Every Nepali Ceremony",
      slug: "flower-decoration-guide-nepali-ceremony-blooms",
      excerpt:
        "A comprehensive guide to choosing flowers for Nepali wedding and cultural ceremony decoration.",
      content: `Flowers are an integral part of every Nepali celebration, carrying deep cultural and spiritual significance. From the marigold garlands exchanged during wedding ceremonies to the floral mandaps that frame sacred rituals, the right flower selection can elevate your event from beautiful to breathtaking.\n\n## Marigold: The King of Nepali Event Flowers\n\nNo Nepali celebration is complete without marigolds. These vibrant orange and yellow flowers are considered auspicious in Hindu tradition and are used extensively in wedding garlands, mandap decoration, and venue adornment. Marigolds are affordable, long-lasting, and available year-round in Nepal. String garlands, create hanging installations, or use them as table centerpieces for traditional events.\n\n## Roses for Elegance\n\nRoses add sophistication and romance to any event setting. Red and white roses are most popular for weddings, while pastel shades like pink and peach work beautifully for engagement ceremonies and receptions. Use roses in bridal bouquets, stage decoration, and table arrangements. Nepali-grown roses are increasingly available in premium quality.\n\n## Orchids for Luxury\n\nOrchids represent luxury and refinement, making them perfect for upscale events. Phalaenopsis and dendrobium orchids in white, purple, or pink create stunning focal points in centerpieces and stage decoration. While more expensive than traditional flowers, a few strategically placed orchid arrangements can transform the entire aesthetic of your event.\n\n## Local Seasonal Flowers\n\nIncorporating seasonal local flowers like rhododendrons (spring), jasmine (summer), and chrysanthemums (winter) adds authenticity and supports local growers. These flowers are cost-effective and create arrangements that feel connected to the Nepali landscape and cultural context.\n\n## Flower Care and Timing\n\nOrder flowers 1-2 days before the event for peak freshness. Store delicate flowers in cool, shaded areas. Ask your florist about flower food and hydration techniques. For outdoor events during warmer months, choose hardy varieties that can withstand heat. Coordinate with your decorator on flower placement to ensure every arrangement is positioned for maximum visual impact.`,
      category: "decoration_trends",
      author: "Marigold Team",
      readTime: 6,
      featuredImage: "/images/blog/25-flower-decoration.jpg",
      seoTitle: "Flower Decoration Guide for Nepali Ceremonies | Marigold Blog",
      seoDesc: "Complete guide to choosing flowers for Nepali events. Marigolds, roses, orchids, seasonal blooms, and flower care tips.",
      isPublished: true,
      publishedAt: new Date("2025-05-30"),
    },
    {
      title: "Groom's Guide: What Every Nepali Groom Needs to Know Before the Wedding",
      slug: "grooms-guide-nepali-wedding-preparation",
      excerpt:
        "A comprehensive preparation guide for Nepali grooms covering outfits, traditions, responsibilities, and self-care.",
      content: `While much of the wedding planning spotlight falls on the bride, grooms play an equally important role in Nepali wedding traditions. From choosing the perfect outfit to understanding ritual responsibilities, here is everything a Nepali groom needs to know to prepare for his big day.\n\n## Traditional Groom's Attire\n\nThe traditional Nepali groom wears a daura suruwal (the national dress of Nepal) for the wedding ceremony, paired with a topi (cap) and traditional footwear. The daura suruwal is typically in cream, white, or light gold. For the reception, many grooms opt for a sherwani, suit, or tuxedo. Ensure your outfit is tailored at least 3 weeks before the wedding and schedule a final fitting one week prior.\n\n## Groom's Pre-Wedding Skincare\n\nGreat grooming starts months before the wedding. Establish a daily skincare routine with cleansing, moisturizing, and sun protection. Visit a dermatologist 2-3 months before for any skin concerns. Start a fitness routine to look and feel your best. In the final week, get a professional haircut, facial, and beard trimming if applicable.\n\n## Understanding Groom's Ritual Responsibilities\n\nIn traditional Nepali weddings, the groom has specific responsibilities during each ceremony. During the Janti (procession), the groom leads the baraat to the bride's venue. During the ceremony, the groom performs rituals guided by the priest including the sacred fire ceremony, sindoor application, and seven pheras. Familiarize yourself with each ritual beforehand so you can participate confidently.\n\n## The Baraat and Procession\n\nThe groom's procession, or Janti, is one of the most vibrant and joyous parts of a Nepali wedding. The groom typically rides a horse or sits in a decorated vehicle, accompanied by a brass band, dancing family members, and decorated vehicles. Plan the Janti route, arrange for the band, and coordinate with the bride's family on timing and arrival procedures.\n\n## Groom's Essential Checklist\n\nFinalize outfit and accessories two weeks before. Prepare wedding shoes and ensure they are comfortable. Arrange for groomsmen gifts and responsibilities. Coordinate the baraat details including vehicle decoration and music. Pack a survival kit with mints, handkerchief, phone charger, and touch-up grooming essentials. Most importantly, take time to rest and enjoy the days leading up to your wedding.`,
      category: "wedding_tips",
      author: "Marigold Team",
      readTime: 7,
      featuredImage: "/images/blog/26-grooms-guide.jpg",
      seoTitle: "Groom's Guide for Nepali Weddings | Marigold Blog",
      seoDesc: "Complete guide for Nepali grooms. Attire, skincare, ritual responsibilities, baraat procession, and wedding day checklist.",
      isPublished: true,
      publishedAt: new Date("2025-06-05"),
    },
  ];

  // Insert batch 3 posts
  for (const post of blogPostsBatch3) {
    await db.blogPost.create({ data: post });
  }
  console.log(`Created ${blogPostsBatch3.length} additional blog posts (batch 3)`);

  // Insert batch 2 posts
  for (const post of blogPostsBatch2) {
    await db.blogPost.create({ data: post });
  }
  console.log(`Created ${blogPostsBatch2.length} additional blog posts (batch 2)`);

  for (const post of blogPosts) {
    await db.blogPost.create({ data: post });
  }
  console.log(`Created ${blogPosts.length} blog posts (batch 1)`);

  // Create FAQs
  const faqs = [
    {
      question: "How do I book Marigold Banquet Hall?",
      answer:
        "You can book by calling us at +977-9851111191, filling out our online enquiry form, or visiting us in person. We recommend booking at least 2-3 months in advance for weddings and large events.",
      category: "booking",
      isActive: true,
      order: 1,
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "Cancellations made 30+ days before the event receive a full refund minus processing fees. Cancellations within 30 days are subject to our cancellation policy. Please refer to our Refund & Cancellation Policy page for complete details.",
      category: "booking",
      isActive: true,
      order: 2,
    },
    {
      question: "Can I schedule a venue viewing?",
      answer:
        "Absolutely! We encourage venue viewings before booking. You can schedule a viewing through our website or by calling us directly. Our team will be happy to show you around and discuss your requirements.",
      category: "booking",
      isActive: true,
      order: 3,
    },
    {
      question: "Do you provide in-house catering?",
      answer:
        "Yes, we offer comprehensive in-house catering with a wide range of menu options including Nepali, Indian, Chinese, Continental, and Fusion cuisine. All food is freshly prepared in our kitchen by experienced chefs.",
      category: "catering",
      isActive: true,
      order: 1,
    },
    {
      question: "Can I bring my own caterer?",
      answer:
        "While we recommend our in-house catering for the best experience, external caterers may be permitted with prior approval and applicable charges. Please discuss this with our team during booking.",
      category: "catering",
      isActive: true,
      order: 2,
    },
    {
      question: "Is decoration included in the package?",
      answer:
        "Basic decoration is included in our Silver package. Premium and luxury decoration options are available with our Gold and Platinum packages. Custom decoration can also be arranged based on your specific requirements and theme preferences.",
      category: "decoration",
      isActive: true,
      order: 1,
    },
    {
      question: "What types of wedding ceremonies do you host?",
      answer:
        "We host all types of wedding ceremonies including Hindu, Buddhist, Christian, Civil, and destination-style weddings. Our team is experienced in accommodating diverse cultural traditions and rituals.",
      category: "weddings",
      isActive: true,
      order: 1,
    },
    {
      question: "Do you provide AV equipment for corporate events?",
      answer:
        "Yes, we provide comprehensive AV equipment including LED screens, projectors, microphone systems, DJ consoles, and stage lighting. All equipment is included in our corporate packages.",
      category: "corporate",
      isActive: true,
      order: 1,
    },
    {
      question: "What are your payment methods?",
      answer:
        "We accept payments via eSewa, Khalti, bank transfer, and cash. A 50% advance is required to confirm your booking, with the balance due 7 days before the event.",
      category: "pricing",
      isActive: true,
      order: 1,
    },
    {
      question: "What is the capacity of your halls?",
      answer:
        "Our Grand Marigold Hall accommodates up to 500 guests in banquet style, Rose Garden Hall up to 300 guests, and Golden Terrace up to 150 guests. Theatre-style capacities are higher for each hall.",
      category: "pricing",
      isActive: true,
      order: 2,
    },
  ];

  for (const faq of faqs) {
    await db.fAQ.create({ data: faq });
  }
  console.log(`Created ${faqs.length} FAQs`);

  // Create team members
  const team = [
    {
      name: "Ramesh Shrestha",
      role: "Manager",
      bio: "With 15+ years in hospitality, Ramesh ensures every event at Marigold runs flawlessly from start to finish.",
      order: 1,
      isActive: true,
    },
    {
      name: "Sita Maharjan",
      role: "Event Coordinator",
      bio: "Sita's attention to detail and organizational skills transform every celebration into a seamless, stress-free experience.",
      order: 2,
      isActive: true,
    },
    {
      name: "Bikash Tamang",
      role: "Head Chef",
      bio: "Chef Bikash brings authentic flavors and innovative cuisine to every menu, blending traditional recipes with modern presentation.",
      order: 3,
      isActive: true,
    },
    {
      name: "Anita Rai",
      role: "Decoration Head",
      bio: "Anita's creative vision brings each theme to life with stunning precision, from traditional mandaps to contemporary installations.",
      order: 4,
      isActive: true,
    },
  ];

  for (const member of team) {
    await db.teamMember.create({ data: member });
  }
  console.log(`Created ${team.length} team members`);

  // Create vendors
  const vendors = [
    { name: "Kathmandu Photo Studio", category: "photographer", description: "Professional wedding photography", phone: "+977-9801234567", order: 1 },
    { name: "Light & Lens Photography", category: "photographer", description: "Cinematic event coverage", phone: "+977-9812345678", order: 2 },
    { name: "Smile Capture", category: "photographer", description: "Candid and traditional photography", phone: "+977-9823456789", order: 3 },
    { name: "Himalayan Flavors", category: "caterer", description: "Premium Nepali and Indian cuisine", phone: "+977-9834567890", order: 1 },
    { name: "Valley Catering", category: "caterer", description: "Multi-cuisine specialist", phone: "+977-9845678901", order: 2 },
    { name: "Dream Decor Nepal", category: "decorator", description: "Theme decoration experts", phone: "+977-9856789012", order: 1 },
    { name: "Floral Fantasy", category: "decorator", description: "Fresh flower arrangements", phone: "+977-9867890123", order: 2 },
    { name: "Mehendi Magic", category: "mehendi", description: "Bridal and party mehendi", phone: "+977-9878901234", order: 1 },
    { name: "Henna Art Nepal", category: "mehendi", description: "Traditional and contemporary designs", phone: "+977-9889012345", order: 2 },
    { name: "Glamour Studio", category: "makeup", description: "Bridal and event makeup", phone: "+977-9890123456", order: 1 },
    { name: "Beauty by Priya", category: "makeup", description: "Professional makeup services", phone: "+977-9801234568", order: 2 },
    { name: "Nepal Beats Band", category: "band", description: "Live music for all occasions", phone: "+977-9812345679", order: 1 },
    { name: "DJ Rhythm", category: "band", description: "Professional DJ services", phone: "+977-9823456780", order: 2 },
  ];

  for (const vendor of vendors) {
    await db.vendor.create({ data: vendor });
  }
  console.log(`Created ${vendors.length} vendors`);

  // Create offers
  const offers = [
    {
      title: "Early Bird Wedding Discount",
      description: "Book your 2025 wedding before March 31 and save 15% on all packages. Don't miss this limited-time offer!",
      discount: "15% OFF",
      startDate: "2025-01-01",
      endDate: "2025-03-31",
      isActive: true,
    },
    {
      title: "Corporate Combo Deal",
      description: "Book 3+ corporate events and get the 4th at 50% off. Perfect for businesses with regular event needs.",
      discount: "50% OFF 4th Event",
      isActive: true,
    },
    {
      title: "Weekday Special",
      description: "20% off on all events booked for Monday through Thursday. Great savings for flexible date planners!",
      discount: "20% OFF",
      isActive: true,
    },
  ];

  for (const offer of offers) {
    await db.offer.create({ data: offer });
  }
  console.log(`Created ${offers.length} offers`);

  // Create gallery photos
  const galleryPhotos = [
    { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", caption: "Grand Wedding Setup", category: "weddings", eventDate: "2025-03-15", isActive: true, order: 1, source: "manual" },
    { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800", caption: "Floral Mandap Decoration", category: "weddings", eventDate: "2025-03-15", isActive: true, order: 2, source: "manual" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800", caption: "Wedding Reception Dance Floor", category: "weddings", eventDate: "2025-02-28", isActive: true, order: 3, source: "manual" },
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", caption: "Corporate Conference Setup", category: "corporate", eventDate: "2025-02-20", isActive: true, order: 4, source: "manual" },
    { url: "https://images.unsplash.com/photo-1505236858219-8359d29d0357?w=800", caption: "Corporate Seminar Stage", category: "corporate", eventDate: "2025-01-18", isActive: true, order: 5, source: "manual" },
    { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800", caption: "Birthday Party - Tropical Theme", category: "parties", eventDate: "2025-03-01", isActive: true, order: 6, source: "manual" },
    { url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800", caption: "Kids Birthday Celebration", category: "parties", eventDate: "2025-01-15", isActive: true, order: 7, source: "manual" },
    { url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800", caption: "Nepali Thali Spread", category: "food", isActive: true, order: 8, source: "manual" },
    { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800", caption: "Buffet Counter Setup", category: "food", isActive: true, order: 9, source: "manual" },
    { url: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800", caption: "Rose Gold Centerpiece", category: "decoration", isActive: true, order: 10, source: "manual" },
    { url: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800", caption: "Marigold Flower Arch", category: "decoration", isActive: true, order: 11, source: "manual" },
    { url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800", caption: "Main Banquet Hall View", category: "venue_spaces", isActive: true, order: 12, source: "manual" },
    { url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800", caption: "Garden Terrace View", category: "venue_spaces", isActive: true, order: 13, source: "manual" },
  ];

  for (const photo of galleryPhotos) {
    await db.galleryPhoto.create({ data: photo });
  }
  console.log(`Created ${galleryPhotos.length} gallery photos`);

  // Create decoration themes
  const decorationThemes = [
    {
      name: "Royal Mughal",
      slug: "royal-mughal",
      category: "royal",
      tier: "luxury",
      description: "Opulent Mughal-inspired decoration with rich fabrics, gold accents, and grand floral arrangements. Perfect for lavish wedding celebrations.",
      includes: JSON.stringify(["Grand Mandap", "Gold Fabric Draping", "Crystal Chandeliers", "Rose Petal Aisle", "Marigold Garlands", "Candle Arrangements"]),
      price: 150000,
      isActive: true,
      order: 1,
    },
    {
      name: "Enchanted Garden",
      slug: "enchanted-garden",
      category: "garden",
      tier: "premium",
      description: "A whimsical garden-themed setup with lush greenery, fairy lights, and fresh floral installations that bring the outdoors inside.",
      includes: JSON.stringify(["Floral Arch", "Hanging Greenery", "Fairy Light Canopy", "Wildflower Centerpieces", "Moss Runner", "Wooden Accents"]),
      price: 100000,
      isActive: true,
      order: 2,
    },
    {
      name: "Traditional Nepali",
      slug: "traditional-nepali",
      category: "traditional_nepali",
      tier: "basic",
      description: "Authentic Nepali decoration with marigold garlands, dhaka fabric, brass utensils, and traditional mandap setup for cultural ceremonies.",
      includes: JSON.stringify(["Traditional Mandap", "Marigold Garlands", "Dhaka Fabric Draping", "Brass Diyas", "Rangoli", "Toran"]),
      price: 50000,
      isActive: true,
      order: 3,
    },
    {
      name: "Modern Glamour",
      slug: "modern-glamour",
      category: "modern_glam",
      tier: "luxury",
      description: "Sleek and sophisticated modern decoration with metallic accents, geometric patterns, and dramatic lighting for a contemporary celebration.",
      includes: JSON.stringify(["Geometric Backdrop", "Metallic Accents", "LED Wall", "Crystal Centerpieces", "Dramatic Uplighting", "Champagne Tower Setup"]),
      price: 180000,
      isActive: true,
      order: 4,
    },
    {
      name: "Rustic Charm",
      slug: "rustic-charm",
      category: "rustic",
      tier: "premium",
      description: "Warm and inviting rustic theme with natural wood, burlap, mason jars, and wildflowers for a cozy countryside feel.",
      includes: JSON.stringify(["Wooden Arch", "Burlap Runners", "Mason Jar Centerpieces", "Lantern Aisle", "Twinkle Lights", "Hessian Draping"]),
      price: 80000,
      isActive: true,
      order: 5,
    },
    {
      name: "Floral Paradise",
      slug: "floral-paradise",
      category: "floral",
      tier: "luxury",
      description: "An abundance of fresh flowers creating a paradise of color and fragrance. Features ceiling installations, flower walls, and suspended arrangements.",
      includes: JSON.stringify(["Flower Ceiling Installation", "Flower Wall Backdrop", "Suspended Floral Chandeliers", "Rose Petal Path", "Orchid Arrangements", "Fresh Table Runners"]),
      price: 200000,
      isActive: true,
      order: 6,
    },
  ];

  for (const theme of decorationThemes) {
    await db.decorationTheme.create({ data: theme });
  }
  console.log(`Created ${decorationThemes.length} decoration themes`);

  // Create menu items
  const menuItems = [
    { name: "Classic Nepali Thali", category: "nepali_thali", description: "Traditional dal, bhat, tarkari, achar, and masu served on a brass plate", pricePerPlate: 800, isVegetarian: false, isActive: true, order: 1 },
    { name: "Veg Nepali Thali", category: "nepali_thali", description: "Pure vegetarian dal, bhat, tarkari, achar, and salad", pricePerPlate: 600, isVegetarian: true, isActive: true, order: 2 },
    { name: "Butter Chicken", category: "indian", description: "Creamy tomato-based chicken curry with aromatic spices", pricePerPlate: 700, isVegetarian: false, isActive: true, order: 3 },
    { name: "Paneer Tikka Masala", category: "indian", description: "Grilled cottage cheese in rich masala gravy", pricePerPlate: 650, isVegetarian: true, isActive: true, order: 4 },
    { name: "Kung Pao Chicken", category: "chinese", description: "Spicy stir-fried chicken with peanuts and vegetables", pricePerPlate: 750, isVegetarian: false, isActive: true, order: 5 },
    { name: "Veg Manchurian", category: "chinese", description: "Crispy vegetable balls in tangy Manchurian sauce", pricePerPlate: 500, isVegetarian: true, isActive: true, order: 6 },
    { name: "Grilled Salmon", category: "continental", description: "Herb-crusted Atlantic salmon with lemon butter sauce", pricePerPlate: 1200, isVegetarian: false, isActive: true, order: 7 },
    { name: "Pasta Primavera", category: "continental", description: "Fresh vegetables tossed in penne with olive oil and herbs", pricePerPlate: 550, isVegetarian: true, isActive: true, order: 8 },
    { name: "Fusion Momos", category: "fusion", description: "Innovative momo varieties - cheese, chocolate, and paneer", pricePerPlate: 400, isVegetarian: true, isActive: true, order: 9 },
    { name: "Live Chaat Counter", category: "live_counters", description: "Interactive chaat station with pani puri, aloo tikki, and more", pricePerPlate: 350, isVegetarian: true, isActive: true, order: 10 },
    { name: "Live Momo Station", category: "live_counters", description: "Fresh steamed and fried momos made to order", pricePerPlate: 450, isVegetarian: false, isActive: true, order: 11 },
    { name: "Premium Buffet Spread", category: "buffet", description: "Complete multi-cuisine buffet with 20+ dishes", pricePerPlate: 1500, isVegetarian: false, isHalal: true, isActive: true, order: 12 },
  ];

  for (const item of menuItems) {
    await db.menuItem.create({ data: item });
  }
  console.log(`Created ${menuItems.length} menu items`);

  // Create admin users
  await db.adminUser.create({
    data: {
      email: "admin@marigoldbanquet.com.np",
      name: "Super Admin",
      password: "admin123", // TODO: Hash with bcrypt in production
      role: "super_admin",
    },
  });
  await db.adminUser.create({
    data: {
      email: "manager@marigoldbanquet.com.np",
      name: "Event Manager",
      password: "manager123",
      role: "event_manager",
    },
  });
  await db.adminUser.create({
    data: {
      email: "editor@marigoldbanquet.com.np",
      name: "Content Editor",
      password: "editor123",
      role: "content_editor",
    },
  });
  console.log("Created 3 admin users");

  // Create page settings
  const pages = [
    "home", "weddings", "parties", "corporate", "spaces",
    "food", "decoration", "booking", "gallery", "blog",
    "about", "contact", "faq", "offers", "vendors",
    "terms", "privacy", "refund",
  ];

  for (const page of pages) {
    await db.pageSetting.create({
      data: { pageKey: page, isActive: true, sections: "{}" },
    });
  }
  console.log(`Created ${pages.length} page settings`);

  // Create site settings including Instagram configuration
  const siteSettings = [
    { key: "businessName", value: "Marigold Banquet Hall & Party Palace" },
    { key: "businessPhone", value: "+977-9851111191" },
    { key: "businessEmail", value: "info@marigoldbanquet.com.np" },
    { key: "businessAddress", value: "Tokha-07, Gairigaun, Kathmandu, Nepal" },
    { key: "workingHours", value: "Sun-Sat: 6:00 AM - 11:00 PM" },
    { key: "facebookUrl", value: "https://facebook.com/marigoldbanquet" },
    { key: "instagramUrl", value: "https://instagram.com/marigoldbanquet" },
    { key: "whatsappNumber", value: "+977-9851111191" },
    { key: "instagramUsername", value: "marigoldbanquet" },
    { key: "instagramAccessToken", value: "" },
    { key: "seoDefaultTitle", value: "Marigold Banquet Hall & Party Palace | Premium Venue in Kathmandu" },
    { key: "seoDefaultDescription", value: "Marigold Banquet Hall and Party Palace in Tokha-07, Kathmandu. Premium venue for weddings, parties & corporate events. In-house catering & decoration." },
    { key: "seoDefaultKeywords", value: "banquet hall Kathmandu, wedding venue Nepal, party palace Tokha, event hall Gairigaun, corporate event venue" },
  ];

  for (const setting of siteSettings) {
    await db.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
  }
  console.log(`Created ${siteSettings.length} site settings`);

  console.log("\n✅ Seeding complete!");
}

seed()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
