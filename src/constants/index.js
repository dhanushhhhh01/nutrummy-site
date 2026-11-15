export const navLinks = [
  { id: "story", title: "Our Story" },
  { id: "products", title: "Products" },
  { id: "compare", title: "Nutrition" },
  { id: "partners", title: "Partners" },
  { id: "contact", title: "Contact" },
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

// Rendered as "periodic table" tiles on the 3D spheres.
export const ingredients = [
  { name: "Sweet Lupin", symbol: "Lu", stat: "35% protein", color: "#F5B82E" },
  { name: "Ancient Multigrains", symbol: "Mg", stat: "30% blend", color: "#E8C98F" },
  { name: "California Almonds", symbol: "Al", stat: "Roasted", color: "#C98B55" },
  { name: "Rich Cocoa", symbol: "Co", stat: "Solids", color: "#8A5530" },
  { name: "Monk Fruit", symbol: "Mf", stat: "0 sugar", color: "#B9CF7A" },
  { name: "Chia & Seeds", symbol: "Cs", stat: "Omega-3", color: "#DCCFBE" },
];

// Prices and pack sizes mirror the live NUTRUMMY site.
// NOTE: the live site lists Cookie Premix 500g at ₹279, the same as 250g. Copied as-is; please confirm.
export const products = [
  {
    id: "lupicrunch",
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
    time: "3 mins",
    protein: "24g",
    text: "Chilled greek yogurt or acai topped with LupiCrunch, strawberries, blueberries and hemp seeds.",
    highlights: ["High protein", "Gut friendly"],
  },
  {
    title: "Overnight Raspberry Oats Jar",
    time: "2 mins + overnight",
    protein: "28g",
    text: "Layer High Protein Oats with almond milk, chia and raspberries. Wake up to breakfast, done.",
    highlights: ["Grab & go", "Prebiotic fibre"],
  },
  {
    title: "Crispy Belgian Protein Waffles",
    time: "5 mins",
    protein: "22g",
    text: "Whisk the mix with milk, pour into a hot iron until golden. Finish with blueberries and raw honey.",
    highlights: ["Weekend brunch", "Kid approved"],
  },
  {
    title: "Soft-Baked Double Choco Cookies",
    time: "10 mins bake",
    protein: "21g",
    text: "Stir the premix with butter or coconut oil, scoop and bake. Crisp rim, gooey fudge centre.",
    highlights: ["Snack pack", "Sweet-tooth fix"],
  },
];

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
