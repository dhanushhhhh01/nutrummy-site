// Blog articles and FAQ from the final content doc ("lupin website content.docx").
// Body blocks: { h: "Heading" } | { p: "Paragraph" } | { list: [[title, text], …] } | { callout: "…" }

export const blogPosts = [
  {
    slug: "discover-lupin",
    tag: "Superfood spotlight",
    title: "Discover Lupin",
    subtitle: "A little seed with big nutritional potential",
    excerpt:
      "You may have heard of almonds, chickpeas, peas and soy (edamame), but have you heard of lupin? Meet the seed that's changing the way we think about everyday nutrition.",
    readTime: "4 min read",
    published: "October 2026",
    body: [
      { p: "You may have heard of almonds, chickpeas, peas and soy (edamame), but have you heard of LUPIN?" },
      {
        p: "Meet the seed that's changing the way we think about everyday nutrition. A little seed with big nutritional potential, lupin is gaining attention as a plant that combines around 40 g of plant protein and 36–39 g of dietary fibre per 100 g. It is finding its way into modern foods in exciting new ways, and is surprisingly versatile.",
      },
      { h: "From a humble seed to a modern food ingredient" },
      { p: "Sweet Lupin is the Lupinus angustifolius species: a truly naturally sweet lupin, without the sugar." },
      {
        p: "For generations, lupin has been eaten in different parts of the world. Today, food innovation is giving this versatile seed new possibilities, from flour and bakery products to breakfast foods and snacks.",
      },
      { callout: "It's an old ingredient with a new story to tell." },
      { p: "At LUPI FOODS, we are bringing the potential of this versatile seed into foods made for everyday living." },
      { h: "What's inside this little seed?" },
      {
        list: [
          ["Plant protein", "Lupin seeds are naturally rich in plant-based protein (40 g / 100 g), making them an interesting ingredient for protein-focused foods."],
          ["Dietary fibre", "Lupin naturally contains dietary fibre (36–39 g / 100 g), which can contribute to your overall daily fibre intake."],
          ["Plant-based nutrition", "As a legume, lupin provides a plant-based source of nutrients that can be incorporated into a variety of foods."],
          ["Versatility", "Lupin can be processed into ingredients such as flour and incorporated into cereals, bakery products, snacks and other food applications."],
        ],
      },
      { h: "Our approach: rethinking everyday foods" },
      { p: "At LUPI FOODS, we believe nutrition doesn't have to mean compromising on the foods you love." },
      { p: "We explore ingredients such as lupin to create innovative food products with a great eating experience, bringing together:" },
      { callout: "Good ingredients + smart food science + great taste" },
      { p: "That's our kind of food innovation. Discover. Develop. Nourish." },
    ],
    showFaq: true,
  },
  {
    slug: "protein-every-day",
    tag: "Nutrition science",
    title: "Protein, Every Day",
    subtitle: "Why protein isn't just for gym-goers",
    excerpt:
      "Protein is having a moment. But it isn't just for athletes or bodybuilders. It's an essential nutrient your body needs every day, and India's protein conversation is growing.",
    readTime: "5 min read",
    published: "October 2026",
    body: [
      { p: "Protein is having a moment." },
      {
        p: "From protein-rich breakfasts and snacks to protein powders and high-protein foods, the word “protein” is everywhere. But protein isn't just for gym-goers, athletes or bodybuilders. It is an essential nutrient that your body needs every day for maintaining muscle, repairing tissues and supporting several important functions in the body.",
      },
      { p: "And in India, the conversation around protein is becoming increasingly important." },
      { h: "India's protein conversation is growing" },
      {
        p: "A 2026 nationwide survey commissioned by Country Delight and conducted with LocalCircles collected more than 2,07,000 responses from consumers across 25 metro and urban districts. The survey found that 6 in 10 urban respondents were not consuming protein-rich foods daily, while 85% said they did not track or estimate their daily protein intake. The survey also highlighted affordability, taste preferences and dietary restrictions as some of the barriers influencing protein consumption.",
      },
      {
        p: "The importance of adequate protein has also featured in India's national nutrition conversation. In September 2026, the Ministry of Ayush, under the aegis of the Ministry of Women and Child Development, organised an expert session on “Dietary Diversity and Adequate Protein” as part of Rashtriya Poshan Maah 2026.",
      },
      { h: "Protein is for everyone, not just fitness enthusiasts" },
      { p: "One of the biggest misconceptions about protein is that it is only important if you exercise." },
      { p: "In reality, your body needs protein whether you go to the gym or spend most of your day at a desk." },
      {
        list: [
          ["Children", "need protein as part of a diet that supports growth and development."],
          ["Adults", "need it for tissue maintenance and repair."],
          ["Active individuals", "need adequate protein as part of their overall diet to support muscle maintenance and recovery."],
          ["Older adults", "need adequate protein as part of maintaining muscle and overall nutritional health."],
        ],
      },
      { callout: "Protein is not simply a fitness trend. It is a fundamental nutrient." },
      { h: "So, how can you add more protein to your day?" },
      { p: "Adding protein to your diet doesn't have to mean changing everything you eat. Small, practical choices throughout the day can make a difference." },
      { h: "Start your morning with a protein-focused breakfast" },
      {
        p: "Make your breakfast work harder for you with protein-rich choices. Our 35 g Protein Muesli offers a convenient way to include protein in your morning routine, while our 17 g Protein Pancake & Waffle Mix lets you turn a familiar breakfast favourite into a protein-focused option.",
      },
      { h: "Make your snack count" },
      {
        p: "Snacking doesn't have to mean choosing between taste and nutrition. Our 21 g Protein Cookie Premix lets you prepare fresh cookies at home, bringing together the pleasure of freshly made treats with a protein-conscious choice.",
      },
    ],
    related: ["lupicrunch", "pancake", "cookie"],
  },
];

export const faqs = [
  { q: "Is lupin a legume?", a: "Yes. Lupin is a legume, like chickpeas, peas, beans and soy." },
  {
    q: "Is lupin a source of protein?",
    a: "Yes. Lupin naturally contains plant-based protein. The exact amount depends on the lupin variety and processing.",
  },
  {
    q: "Does lupin contain dietary fibre?",
    a: "Yes. Lupin naturally contains dietary fibre, although the final amount in a food product depends on the formulation and processing.",
  },
  {
    q: "Is lupin gluten-free?",
    a: "Lupin itself is naturally gluten-free. However, whether a finished product can make a gluten-free claim depends on the complete formulation, ingredients, processing environment and applicable regulatory requirements.",
  },
  {
    q: "Why is lupin being used in modern foods?",
    a: "Lupin offers an interesting combination of plant-based protein, dietary fibre and versatility, making it useful for developing a range of modern food products.",
  },
];
