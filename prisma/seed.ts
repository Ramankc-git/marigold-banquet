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
      seoDesc:
        "Smart tips for planning a wedding in Nepal on a budget. Save on venue, catering, decoration, and more.",
      isPublished: true,
      publishedAt: new Date("2025-03-10"),
    },
  ];

  for (const post of blogPosts) {
    await db.blogPost.create({ data: post });
  }
  console.log(`Created ${blogPosts.length} blog posts`);

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
