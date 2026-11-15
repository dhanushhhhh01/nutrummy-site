// Navigation from the final content doc ("lupin website content.docx").
// `to` is a route; `hash` scrolls to a section on the home page.
export const navLinks = [
  { title: "Home", to: "/" },
  { title: "Shop", to: "/", hash: "products", children: "products" },
  { title: "Our Story", to: "/", hash: "story" },
  { title: "Career", to: "/career" },
  { title: "Blog", to: "/blog" },
  { title: "Contact", to: "/", hash: "contact" },
];

export const heroStats = [
  { value: "35g", label: "Lupin protein / 100g" },
  { value: "0g", label: "Refined sugar" },
  { value: "100%", label: "Whole grain, zero maida" },
];

export const claims = [
  "35g Lupin Protein",
  "22g Prebiotic Fibre",
  "Zero Refined Sugar",
  "Zero Maida",
  "No Artificial Preservatives",
  "Clean, Honest Labels",
];

export const story = {
  paragraphs: [
    'Somewhere along the way, healthy food got complicated. Long labels. Long words. Long lists of "why is that in there?"',
    "We wanted something simpler: breakfasts and bakes with proper protein, made from ingredients you can actually name.",
    "No maida. No artificial colours, flavours or preservatives.",
  ],
  pillars: [
    {
      label: "Our Vision",
      title: "Honest food, every day.",
      text: "To make honest, protein-rich food part of everyday life, where every ingredient earns its place and no one has to choose between healthy and delicious.",
      icon: "sunrise",
    },
    {
      label: "Our Mission",
      title: "Make good food simple, honest and yum.",
      text: "We craft wholesome breakfasts and bakes from real ingredients, without maida or artificial additives, so eating well feels effortless.",
      icon: "sprout",
    },
    {
      label: "Our Promise",
      title: "Every ingredient earns its place.",
      text: "If we can't explain why it's in the pouch, it doesn't go in the pouch.",
      icon: "shield",
    },
  ],
  signoff: "Simple. Honest. Yum. Always.",
};

export const benefits = [
  {
    title: "35g Lupin Protein",
    icon: "zap",
    text: "Per 100g, from a whole golden legume. No whey isolates.",
  },
  {
    title: "22g Prebiotic Fibre",
    icon: "sprout",
    text: "Gut-friendly fibre that keeps you full past mid-morning.",
  },
  {
    title: "0g Refined Sugar",
    icon: "leaf",
    text: "Sweetened with monk fruit. No mid-morning sugar crash.",
  },
  {
    title: "Zero Maida",
    icon: "shield",
    text: "Whole grains only. Ingredients you can actually name.",
  },
];

export const moments = [
  {
    time: "7:30 AM",
    tag: "Morning jumpstart",
    title: "Clean Breakfast Ritual",
    icon: "sunrise",
    points: [
      "Swap sugary flakes for 40g of LupiCrunch with cold milk.",
      "14g+ clean plant protein and 8g fibre to carry you to lunch.",
    ],
  },
  {
    time: "11:30 AM",
    tag: "Mid-day focus",
    title: "The Desk-Crunch Snack",
    icon: "laptop",
    points: [
      "Beat the office slump without reaching for junk food.",
      "A handful straight from the pouch: satisfying, guilt-free crunch.",
    ],
  },
  {
    time: "5:30 PM",
    tag: "Workout recovery",
    title: "Pre / Post Gym Fuel",
    icon: "dumbbell",
    points: [
      "Stir High Protein Oats into yogurt with fresh berries.",
      "22g+ bioavailable protein with complete amino acids for repair.",
    ],
  },
  {
    time: "9:30 PM",
    tag: "Evening craving",
    title: "Late Night Cocoa Bowl",
    icon: "moon",
    points: [
      "Rich dark cocoa notes, naturally sweetened with monk fruit.",
      "No added white sugar, so no sleep-disrupting insulin spike.",
    ],
  },
];

// Ingredient explorer. The Lupin copy is from the live NUTRUMMY site; the others are
// short descriptions written for this build, so please review them.
export const ingredients = [
  {
    name: "Lupin Super Legume",
    symbol: "Lu",
    stat: "35% protein",
    color: "#F5B82E",
    badge: "35% natural protein",
    kicker: "The protein titan",
    headline: "3× more protein than quinoa, 100% plant-based",
    text: "Lupin is an ancient golden legume celebrated for having one of the highest natural protein densities on Earth, accompanied by gut-loving prebiotic fibre. Unlike whey isolates, it digests effortlessly without bloating or heavy chemical processing.",
    points: ["Complete amino acid balance", "Ultra-low glycemic index (GI)", "High natural prebiotic fibre"],
  },
  {
    name: "30% Ancient Multigrains",
    symbol: "Mg",
    stat: "30% blend",
    color: "#E8C98F",
    badge: "Whole grain",
    kicker: "The steady energy",
    headline: "Whole grains for slow, sustained energy",
    text: "A blend of whole multigrains gives every bowl its hearty crunch and complex carbohydrates, so energy releases slowly through the morning instead of spiking and crashing.",
    points: ["Complex carbohydrates", "Natural fibre", "Zero maida"],
  },
  {
    name: "California Almonds & Seeds",
    symbol: "Al",
    stat: "Roasted",
    color: "#C98B55",
    badge: "Good fats",
    kicker: "The crunch",
    headline: "Roasted almonds and seeds in every spoonful",
    text: "Roasted almonds and chia seeds add satisfying crunch along with naturally occurring healthy fats, extra protein and minerals.",
    points: ["Healthy fats", "Extra plant protein", "Satisfying crunch"],
  },
  {
    name: "Rich Cocoa Solids",
    symbol: "Co",
    stat: "Real cocoa",
    color: "#8A5530",
    badge: "Real cocoa",
    kicker: "The indulgence",
    headline: "Deep chocolate flavour, no artificial flavours",
    text: "Real cocoa solids give our chocolate muesli and cookie premix their rich, dark flavour, without any artificial flavouring.",
    points: ["Real cocoa", "No artificial flavours", "Naturally rich taste"],
  },
  {
    name: "Monk Fruit Extract",
    symbol: "Mf",
    stat: "0 sugar",
    color: "#B9CF7A",
    badge: "0g added sugar",
    kicker: "The sweetness",
    headline: "Natural sweetness without refined sugar",
    text: "Monk fruit is a naturally sweet fruit. Its extract lets us sweeten our recipes without refined white sugar, so there is no sugar spike.",
    points: ["No refined sugar", "Naturally derived", "No sugar crash"],
  },
];

// Prices and pack sizes mirror the live NUTRUMMY site.
// NOTE: the live site lists Cookie Premix 500g at ₹279, the same as 250g. Copied as-is; please confirm.
export const products = [
  {
    id: "lupicrunch",
    theme: { soft: "#FFF1C2", solid: "#FFC93C" },
    chip: "High Protein Muesli",
    rating: 4.9,
    reviewCount: "180+",
    nutrition: {
      protein: "35g / 100g",
      addedSugar: "0g",
      maida: "0%",
      plantPowered: "100%",
      flavour: "Chocolate",
      keyIngredients: "Multigrains, Sweet Lupin, roasted almonds, chia seeds, cocoa, monk fruit",
      howToServe: "40g with chilled milk",
    },
    name: "LupiCrunch High Protein Muesli",
    short: ["Lupi", "CRUNCH"],
    category: "Muesli",
    badge: "Bestseller",
    flavour: "Chocolate",
    tagline: "Crunchy nutrition in every bowl",
    description:
      "Chocolate muesli with Lupin super legume, 30% multigrains, roasted almonds and monk fruit sweetness.",
    protein: "35g",
    packs: [
      { id: "200g", label: "200g pouch", price: 349 },
      { id: "500g", label: "500g family pack", price: 749 },
    ],
    body: "#3d2210",
    accent: "#F5B82E",
    tags: ["35g protein", "0g added sugar", "Chocolate"],
    goals: ["muscle", "breakfast", "snack"],
  },
  {
    id: "oats",
    theme: { soft: "#ECE5FF", solid: "#B9A3FF" },
    chip: "High Protein Oats",
    rating: 4.9,
    reviewCount: "180+",
    nutrition: {
      protein: "35g / 100g",
      addedSugar: "0g",
      maida: "0%",
      plantPowered: "100%",
      flavour: "Chocolate",
      keyIngredients: "Whole rolled oats, Sweet Lupin, cocoa, berries, seeds",
      howToServe: "40g, warm or overnight",
    },
    name: "High Protein Oats",
    short: ["Protein", "OATS"],
    category: "Oats",
    badge: "Popular",
    flavour: "Chocolate",
    tagline: "Clean, sustained energy",
    description:
      "Whole rolled oats with Lupin protein, cocoa, berries and seeds for warm bowls and overnight jars.",
    protein: "35g",
    packs: [
      { id: "100g", label: "100g pouch", price: 199 },
      { id: "400g", label: "400g pouch", price: 499 },
    ],
    body: "#4a1a24",
    accent: "#F2C6CF",
    tags: ["35g protein", "No preservatives", "Whole grain"],
    goals: ["muscle", "weight", "breakfast"],
  },
  {
    id: "pancake",
    theme: { soft: "#D9F2D6", solid: "#5CC46A" },
    chip: "Waffle & Pancake Mixes",
    rating: 4.9,
    reviewCount: "180+",
    nutrition: {
      protein: "17g / 100g",
      addedSugar: "0g",
      maida: "0%",
      plantPowered: "100%",
      flavour: "Vanilla & golden grains",
      keyIngredients: "Whole grains, Sweet Lupin, vanilla",
      howToServe: "Whisk with milk or water, ready in 3 minutes",
    },
    name: "Pancake & Waffle Mix",
    short: ["Pancake", "& WAFFLE"],
    category: "Bake mixes",
    badge: "Trending",
    flavour: "Vanilla & golden grains",
    tagline: "Weekend café, weekday effort",
    description:
      "Fluffy golden pancake stacks and crisp Belgian waffles in 3 minutes. No artificial colours.",
    protein: "17g",
    packs: [
      { id: "250g", label: "250g pouch", price: 299 },
      { id: "500g", label: "500g family pack", price: 549 },
    ],
    body: "#5a3b0c",
    accent: "#FFE3A3",
    tags: ["17g protein", "No added sugar", "Vanilla"],
    goals: ["kids", "breakfast"],
  },
  {
    id: "cookie",
    theme: { soft: "#FFE0CC", solid: "#FF8A3D" },
    chip: "Cookie Mix",
    rating: 4.9,
    reviewCount: "180+",
    nutrition: {
      protein: "21g / 100g",
      addedSugar: "0g",
      maida: "0%",
      plantPowered: "100%",
      flavour: "Double dark chocolate",
      keyIngredients: "Whole grains, Sweet Lupin, cocoa",
      howToServe: "Mix with butter or coconut oil, bake 10 minutes",
    },
    name: "Protein Cookie Premix",
    short: ["Cookie", "PREMIX"],
    category: "Bake mixes",
    badge: "New launch",
    flavour: "Double dark chocolate",
    tagline: "Secretly protein packed",
    description:
      "Bake chewy double-dark chocolate cookies at home in 10 minutes. No maida, no refined white sugar.",
    protein: "21g",
    packs: [
      { id: "250g", label: "250g pouch", price: 279 },
      { id: "500g", label: "500g pouch", price: 279 },
    ],
    body: "#2b1a12",
    accent: "#E3B98A",
    tags: ["21g protein", "Zero maida", "Double dark"],
    goals: ["kids", "snack"],
  },
];

export const productCategories = ["All", "Muesli", "Oats", "Bake mixes"];

export const comparison = [
  { factor: "Protein per 100g", us: 35, them: 7, max: 40, usLabel: "35g", themLabel: "6–8g", callout: "5.8× more protein" },
  { factor: "Prebiotic fibre per 100g", us: 22, them: 3, max: 25, usLabel: "22g", themLabel: "2.5–4g", callout: "8.8× more fibre" },
  { factor: "Added table sugar per 100g", us: 0, them: 25, max: 30, usLabel: "0g", themLabel: "22–28g", callout: "Zero sugar spike" },
  { factor: "Refined maida", us: 0, them: 50, max: 60, usLabel: "0%", themLabel: "Up to 50%", callout: "100% real food" },
];

export const recipes = [
  {
    title: "Choco-Lupin Acai Superbowl",
    category: "Muesli bowls",
    productId: "lupicrunch",
    time: "3 mins",
    protein: "24g",
    text: "Chilled greek yogurt or acai topped with LupiCrunch, strawberries, blueberries and hemp seeds.",
    highlights: ["High protein", "Gut friendly"],
  },
  {
    title: "Overnight Raspberry Oats Jar",
    category: "Porridge & jars",
    productId: "oats",
    time: "2 mins + overnight",
    protein: "28g",
    text: "Layer High Protein Oats with almond milk, chia and raspberries. Wake up to breakfast, done.",
    highlights: ["Grab & go", "Prebiotic fibre"],
  },
  {
    title: "Crispy Belgian Protein Waffles",
    category: "Weekend stacks",
    productId: "pancake",
    time: "5 mins",
    protein: "22g",
    text: "Whisk the mix with milk, pour into a hot iron until golden. Finish with blueberries and raw honey.",
    highlights: ["Weekend brunch", "Kid approved"],
  },
  {
    title: "Soft-Baked Double Choco Cookies",
    category: "Warm bakes",
    productId: "cookie",
    time: "10 mins bake",
    protein: "21g",
    text: "Stir the premix with butter or coconut oil, scoop and bake. Crisp rim, gooey fudge centre.",
    highlights: ["Snack pack", "Sweet-tooth fix"],
  },
];

export const recipeCategories = ["All", "Muesli bowls", "Porridge & jars", "Warm bakes", "Weekend stacks"];

export const partners = [
  {
    icon: "store",
    title: "Retail & Distribution",
    text: "Stock NUTRUMMY in your store, café or gym. Trade pricing, POS material and reliable replenishment.",
    cta: "Become a stockist",
    topic: "Retail & distribution",
  },
  {
    icon: "gift",
    title: "Corporate Gifting",
    text: "Curated breakfast hampers for teams, clients and events, with custom branding on request.",
    cta: "Plan a gifting order",
    topic: "Bulk & corporate gifting",
  },
  {
    icon: "truck",
    title: "Bulk & Institutional",
    text: "Pantry supply for offices, hostels and wellness programmes, delivered on a schedule that suits you.",
    cta: "Request a bulk quote",
    topic: "Bulk & corporate gifting",
  },
];

// Free shipping threshold shown on the current NUTRUMMY site.
export const FREE_SHIPPING_AT = 499;

// Promo codes accepted in the cart (SEVEN15 matches the live site).
export const COUPONS = { SEVEN15: 0.15 };

export const contactInfo = {
  company: "Lupi Foods Pvt Ltd",
  brand: "LUPI FOODS",
  address: "Bengaluru, Karnataka, India",
  email: "contact@nutrummy.com",
  phone: "+91 98765 43210",
  hours: "Mon – Sat · 9:00 AM – 6:00 PM IST",
};

export const enquiryTypes = [
  "Retail & distribution",
  "Bulk & corporate gifting",
  "Ingredients & nutrition question",
  "Product enquiry",
  "Feedback or just saying hi",
];

// Customer reviews ("Straight from Happy Tummies"). Add real reviews here exactly as written;
// the section shows a "share your review" prompt until this list has entries.
// Shape: { name: "Asha R.", city: "Bengaluru", product: "LupiCrunch", text: "…" }
export const reviews = [];

export const careers = {
  title: "Come build honest food with us.",
  intro:
    "We're a small, growing team making protein-rich breakfasts and bakes that don't cut corners. If that sounds like your kind of work, we'd love to meet you.",
  reasons: [
    {
      title: "No compromise on quality",
      text: "Every recipe is tested until it meets our standard: clean ingredients, zero maida, exceptional taste.",
      icon: "shield",
    },
    {
      title: "Smart food science",
      text: "We innovate with ancient legumes like Sweet Lupin to create functional, everyday breakfast and baking staples.",
      icon: "sprout",
    },
    {
      title: "People-first team",
      text: "Autonomy, curiosity and a shared obsession with delicious, real nutrition.",
      icon: "sunrise",
    },
  ],
  closing: "Think you would fit in? We are always happy to hear from people who care about honest food as much as we do.",
  roles: [
    "Food Technologist & NPD Specialist",
    "D2C Brand & Digital Marketing Lead",
    "Institutional & Bulk Gifting Manager",
    "General application",
  ],
};
