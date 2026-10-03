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
