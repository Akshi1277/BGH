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

/* The group sectors, as on the current Group Sectors section. Photos: Unsplash, free under the Unsplash License. */
export const sectors = [
  {
    index: "01",
    title: "Technology",
    summary: "Intelligent software and digital infrastructure.",
    description: "Developing foundational software systems, cloud architectures, and enterprise technologies designed for long-term scalability and operational reliability.",
    image: "/images/sectors/technology-photo.jpg",
    focusAreas: ["Enterprise Software", "Cloud Infrastructure", "Digital Security"],
    group: "Core Sectors",
  },
  {
    index: "02",
    title: "Artificial Intelligence",
    summary: "Data architectures and predictive models.",
    description: "Deploying intelligent data systems and machine learning models that optimize operational decision-making and automate complex workflows.",
    image: "/images/sectors/ai-photo.jpg",
    focusAreas: ["Machine Learning", "Predictive Analytics", "Data Engineering"],
    group: "Core Sectors",
  },
  {
    index: "03",
    title: "Sports & Media",
    summary: "Digital competition, talent, and entertainment.",
    description: "Investing in modern sports platforms, broadcast media rights, digital tournament formats, and talent platforms engaging global audiences.",
    image: "/images/sectors/sports-photo.jpg",
    focusAreas: ["Digital Broadcasting", "Tournament Platforms", "Media Production"],
    group: "Core Sectors",
  },
  {
    index: "04",
    title: "Education",
    summary: "Global learning platforms.",
    description: "Building accessible learning environments and institutional platforms that provide specialized skills and professional accreditation.",
    image: "/images/sectors/education-photo.jpg",
    focusAreas: ["EdTech Infrastructure", "Skill Accreditation", "Lifelong Learning"],
    group: "Core Sectors",
  },
  {
    index: "05",
    title: "Hospitality",
    summary: "Concepts combining design, service, and experience.",
    description: "Creating curated hospitality destinations and dining concepts where architectural craft meets exceptional service and digital convenience.",
    image: "/images/sectors/hospitality-photo.jpg",
    focusAreas: ["Boutique Destinations", "Culinary Concepts", "Guest Experience"],
    group: "Core Sectors",
  },
  {
    index: "06",
    title: "Luxury Brands",
    summary: "Refined fragrance and artisanal craft.",
    description: "Developing luxury houses focused on fine perfumery, bespoke craftsmanship, and lifestyle goods built on timeless aesthetic standards.",
    image: "/images/sectors/luxury-photo.jpg",
    focusAreas: ["Haute Perfumery", "Artisanal Craft", "Bespoke Design"],
    group: "Core Sectors",
  },
  {
    index: "07",
    title: "Digital Commerce",
    summary: "Commercial infrastructure for global scale.",
    description: "Building transaction systems, merchant networks, and digital marketplace infrastructure that enable brands to expand internationally.",
    image: "/images/sectors/commerce-photo.jpg",
    focusAreas: ["Global Marketplaces", "Transaction Platforms", "Fulfillment Tech"],
    group: "Emerging Focus",
  },
  {
    index: "08",
    title: "Future Ventures",
    summary: "Incubating ambitious ideas and markets.",
    description: "Allocating capital and strategic resources to high-impact technologies, clean energy solutions, and emerging sectors reshaping the global economy.",
    image: "/images/sectors/future-photo.jpg",
    focusAreas: ["Frontier Science", "Clean Technologies", "Strategic Capital"],
    group: "Emerging Focus",
  },
];

/* Our Philosophy, as on the current Philosophy & Standard section. */
export const philosophy = {
  eyebrow: "OUR PHILOSOPHY",
  title: "One Group.",
  titleAccent: "One Discipline, Applied Everywhere.",
  body: [
    "We believe exceptional businesses are created through vision, disciplined execution and the courage to think beyond the next quarter.",
    "Our responsibility is not simply to build companies. It is to create enterprises capable of remaining relevant for generations.",
  ],
  principles: [
    { title: "Vision", description: "Seeing opportunities others overlook and designing ventures with generational scale in mind." },
    { title: "Discipline", description: "Executing with consistency, precision, accountability, and commercial rigour." },
    { title: "Excellence", description: "Uncompromising standards across leadership, engineering, operations, and customer experience." },
    { title: "Long-term Thinking", description: "Decisions made for the next century, weighed against decades rather than the next quarter's market cycle." },
  ],
  quoteLabel: "THE INSTITUTIONAL STANDARD",
  quote: "The strongest businesses are built on patience most competitors don't have, and ambition most competitors won't risk.",
  attribution: "BRAHM Global Holdings",
};

/* Let's Build, as on the current contact section. */
export const contact = {
  eyebrow: "LET'S BUILD",
  title: "Let's Talk About What You're Building.",
  body: "Whether you are establishing a new venture, seeking a strategic technology partner, exploring investment opportunities or considering a long-term partnership, we welcome conversations with ambitious organisations and exceptional people who share our commitment to building lasting value.",
  coda: "If you're building something meant to matter beyond the next funding round, we'd be glad to talk.",
  cta: "START A CONVERSATION",
  pathways: [
    {
      title: "Build with BRAHM",
      description: "From new ventures to established enterprises, we partner with organisations to create businesses, products and platforms built for long-term success.",
      href: `mailto:${EMAIL}?subject=Build With BRAHM`,
    },
    {
      title: "Work with ENIF",
      description: "Partner with our engineering division to design, build and scale intelligent software, AI-powered platforms and enterprise technology tailored to your organisation.",
      href: `mailto:${EMAIL}?subject=Work With ENIF`,
    },
    {
      title: "Partner with us",
      description: "We welcome strategic partnerships, joint ventures and commercial collaborations that create sustainable value for all parties.",
      href: `mailto:${EMAIL}?subject=Partnership Inquiry`,
    },
  ],
};
