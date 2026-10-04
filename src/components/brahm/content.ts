/*
 * BRAHM Global Holdings: copy for the redesigned sections, taken verbatim from the current website.
 * The redesign changes how this content is presented, never what it says.
 */

export const EMAIL = "brahmglobalholdings@gmail.com";

export const frameworkIntro = {
  eyebrow: "How We Build",
  title: "The",
  titleAccent: "BRAHM",
  titleEnd: "Framework",
  body: "A repeatable methodology for creating, operating and growing category-defining companies. Every business within BRAHM Global Holdings passes through structured stages — from first insight to long-term ownership.",
};

export const framework = [
  { title: "Identify", description: "We recognise opportunities where innovation, operational excellence and long-term demand intersect." },
  { title: "Validate", description: "Every opportunity is rigorously assessed through research, commercial viability and strategic alignment before resources are committed." },
  { title: "Build", description: "We design, engineer and establish businesses with strong operational foundations, exceptional products and scalable systems." },
  { title: "Operate", description: "Execution defines every successful enterprise. We focus relentlessly on governance, leadership, customer experience and operational excellence." },
  { title: "Grow", description: "Through disciplined investment, innovation and strategic expansion, our companies strengthen their market position while creating sustainable long-term value." },
  { title: "Endure", description: "Our objective is not simply growth, but permanence—building institutions capable of evolving, leading and creating value for generations." },
];

export const differenceIntro = {
  eyebrow: "THE BRAHM DIFFERENCE",
  title: "Built",
  titleAccent: "differently",
};

export const difference = [
  {
    number: "01",
    label: "TRADITIONAL VC",
    title: "Deploy & Pray",
    tone: "contrast" as const,
    points: [
      { text: "Outsources technology & core operations" },
      { text: "Short 3-5 year exit pressure" },
      { text: "Passive board governance" },
      { text: "Fragmented agency relationships" },
    ],
  },
  {
    number: "02",
    label: "PRIVATE EQUITY",
    title: "Financial Engineering",
    tone: "contrast" as const,
    points: [
      { text: "Cost cutting over product innovation" },
      { text: "Financial leverage & debt loading" },
      { text: "Transactional turnarounds" },
      { text: "Generic brand & marketing approach" },
    ],
  },
  {
    number: "03",
    label: "THE BRAHM WAY",
    title: "Direct Enterprise Building",
    tone: "brahm" as const,
    points: [
      { lead: "100% In-House Tech:", text: "Core powered directly by our engineering arm ENIF" },
      { lead: "Generational Horizon:", text: "No fixed exit timeline — we hold for decades, not fund cycles" },
      { lead: "Direct Execution:", text: "Strategic leadership, governance & operational control" },
      { lead: "In-House Brand & Media:", text: "Identities crafted directly by 7AURIGA" },
    ],
  },
];

export const footer = {
  tagline: "Building enduring enterprises across technology, education, sport, and luxury.",
  hq: "Headquartered in London",
  markets: "Built for international markets",
  columns: [
    {
      heading: "PORTFOLIO",
      links: [
        { label: "ENIF", href: "/enif" },
        { label: "7 AURIGA", href: "/7auriga" },
        { label: "Talent Pro League", href: "/#companies" },
        { label: "London School of Academics & Arts", href: "/#companies" },
        { label: "Alayn", href: "/#companies" },
      ],
    },
    {
      heading: "ORGANISATION",
      links: [
        { label: "About BGH", href: "/about" },
        { label: "Vision & Mandate", href: "/#vision" },
        { label: "Industry Sectors", href: "/#sectors" },
        { label: "How We Build", href: "/#how-we-build" },
        { label: "Philosophy & Standard", href: "/#standard" },
      ],
    },
    {
      heading: "INQUIRIES",
      links: [
        { label: "Contact", href: "/contact" },
        { label: EMAIL, href: `mailto:${EMAIL}` },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ],
  copyright: "BRAHM Global Holdings Ltd. All Rights Reserved.",
  location: "London, United Kingdom",
};

export const sectorsIntro = {
  eyebrow: "THE BRAHM GROUP",
  title: "Group",
  titleAccent: "Sectors",
  body: "Our companies operate independently while benefiting from the strategic direction, governance, technology capabilities and operational expertise of the Group.",
};

/* The group sectors, as on the current Group Sectors section. */
export const sectors = [
  {
    index: "01",
    title: "Technology",
    summary: "Intelligent software and digital infrastructure.",
    description: "Developing foundational software systems, cloud architectures, and enterprise technologies designed for long-term scalability and operational reliability.",
    image: "/images/sectors/tech.png",
    focusAreas: ["Enterprise Software", "Cloud Infrastructure", "Digital Security"],
    group: "Core Sectors",
  },
  {
    index: "02",
    title: "Artificial Intelligence",
    summary: "Data architectures and predictive models.",
    description: "Deploying intelligent data systems and machine learning models that optimize operational decision-making and automate complex workflows.",
    image: "/images/sectors/ai.png",
    focusAreas: ["Machine Learning", "Predictive Analytics", "Data Engineering"],
    group: "Core Sectors",
  },
  {
    index: "03",
    title: "Sports & Media",
    summary: "Digital competition, talent, and entertainment.",
    description: "Investing in modern sports platforms, broadcast media rights, digital tournament formats, and talent platforms engaging global audiences.",
    image: "/images/sectors/sports.png",
    focusAreas: ["Digital Broadcasting", "Tournament Platforms", "Media Production"],
    group: "Core Sectors",
  },
  {
    index: "04",
    title: "Education",
    summary: "Global learning platforms.",
    description: "Building accessible learning environments and institutional platforms that provide specialized skills and professional accreditation.",
    image: "/images/sectors/education.png",
    focusAreas: ["EdTech Infrastructure", "Skill Accreditation", "Lifelong Learning"],
    group: "Core Sectors",
  },
  {
    index: "05",
    title: "Hospitality",
    summary: "Concepts combining design, service, and experience.",
    description: "Creating curated hospitality destinations and dining concepts where architectural craft meets exceptional service and digital convenience.",
    image: "/images/sectors/hospitality.png",
    focusAreas: ["Boutique Destinations", "Culinary Concepts", "Guest Experience"],
    group: "Core Sectors",
  },
  {
    index: "06",
    title: "Luxury Brands",
    summary: "Refined fragrance and artisanal craft.",
    description: "Developing luxury houses focused on fine perfumery, bespoke craftsmanship, and lifestyle goods built on timeless aesthetic standards.",
    image: "/images/sectors/luxury.png",
    focusAreas: ["Haute Perfumery", "Artisanal Craft", "Bespoke Design"],
    group: "Core Sectors",
  },
  {
    index: "07",
    title: "Digital Commerce",
    summary: "Commercial infrastructure for global scale.",
    description: "Building transaction systems, merchant networks, and digital marketplace infrastructure that enable brands to expand internationally.",
    image: "/images/sectors/commerce.png",
    focusAreas: ["Global Marketplaces", "Transaction Platforms", "Fulfillment Tech"],
    group: "Emerging Focus",
  },
  {
    index: "08",
    title: "Future Ventures",
    summary: "Incubating ambitious ideas and markets.",
    description: "Allocating capital and strategic resources to high-impact technologies, clean energy solutions, and emerging sectors reshaping the global economy.",
    image: "/images/sectors/future.png",
    focusAreas: ["Frontier Science", "Clean Technologies", "Strategic Capital"],
    group: "Emerging Focus",
  },
];
