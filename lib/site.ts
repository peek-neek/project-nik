// All copy for the portfolio lives here. Replace the placeholders with your own.

export type Motif = "orb" | "grid" | "arch" | "rings" | "stripes" | "bars"

export type Project = {
  slug: string
  title: string
  category: string
  year: string
  metric: string
  metricLabel: string
  summary: string
  href?: string
  image?: string
  motif: Motif
}

export type ShapeType =
  "flower" | "blossom" | "burst" | "star" | "smiley" | "sparkle"

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export const site = {
  name: "NEERAJ",
  wordmark: "NEERAJ",
  role: "I Design, Develop & Deploy",
  intro: "Independent designer & developer based in",
  location: {
    city: "Your City",
    code: "Toronto",
    timeZone: "America/Toronto",
    // Used for the live weather on the loading screen.
    latitude: 43.6532,
    longitude: -79.3832,
    temperatureUnit: "celsius" as "celsius" | "fahrenheit",
  },
  availability: {
    label: "Now booking",
    period: "Q1 2027",
  },
  email: "NIKATWORK365@GMAIL.COM",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/neerajneerajweb/" },
    { label: "GitHub", href: "https://github.com/peek-neek" },
    { label: "Instagram", href: "https://www.instagram.com/neerajbharrdwaj/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
  ],
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "#contact" },
  ],
  // Little flowers and stars scattered across the page. Change `seed` to reshuffle them.
  decorations: {
    seed: 7,
    count: 16,
    size: { min: 28, max: 72 },
    // 0–1: how often a shape hugs the left/right edges instead of landing over the text.
    edgeBias: 0.7,
    shapes: [
      "flower",
      "blossom",
      "burst",
      "star",
      "smiley",
      "sparkle",
    ] as ShapeType[],
    colors: ["#e8792f", "#8b9cf7", "#8a2f4f", "#e8a3a8", "#3f7a63"],
  },
  // Wrap words in *asterisks* to set them in the italic serif.
  statement:
    "I design and build *digital products* and brand systems that feel calm, considered and quietly bold — from the first sketch to the *last line of code.*",
  bio: [
    "I work with founders, studios and in-house teams who care about the details. My work sits where brand meets product: identities that hold up on screen, and interfaces with enough personality to be remembered.",
    "I like small teams, honest feedback and shipping things that last. When I'm not pushing pixels I'm usually writing code, reading about type, or out with a camera.",
  ],
  stats: [
    { value: 8, suffix: "+", label: "Years of practice" },
    { value: 50, suffix: "+", label: "Projects shipped" },
    { value: 14, suffix: "", label: "Countries worked with" },
  ],
  // The /about page. Clients and awards below are placeholders — swap in your own.
  about: {
    headline: "Independent designer & developer, *Your City.*",
    disciplines: "Brand · Product · Code · Since 2018",
    intro:
      "I'm Neeraj, an independent designer and developer working between brand, product and code. For eight years I've helped founders and studios *find their voice* and turn it into work people *remember.*",
    // Drop a photo in /public and point to it, e.g. "/portrait.jpg".
    portrait: undefined as string | undefined,
    bioHeading: "One person, *start to finish.*",
    bio: [
      "Before going independent I designed and built products for teams across agencies and start-ups. Today I take on a handful of projects a year, so each one gets my full attention.",
      "You work with me directly, from the first sketch to the last line of code. No hand-offs, no account managers, *no lost details.*",
    ],
    servicesHeading: "Idea to launch and beyond, *one point of view.*",
    clientsHeading: "Eight brands, *one standard.*",
    clients: [
      { name: "Halden", work: "Identity", year: "2026" },
      { name: "Fieldnote", work: "Product", year: "2026" },
      { name: "Kiln & Co", work: "Website", year: "2025" },
      { name: "Orbit Pay", work: "Design system", year: "2025" },
      { name: "Mono Radio", work: "Motion", year: "2024" },
      { name: "Verde", work: "Identity", year: "2024" },
      { name: "Atlas Studio", work: "Website", year: "2023" },
      { name: "Northwind", work: "Product", year: "2022" },
    ],
    awardsHeading: "A few awards, *one obsession.*",
    awards: [
      {
        name: "Awwwards",
        title: "Site of the Day, *twice*",
        year: "2025 — 2026",
      },
      { name: "CSS Design Awards", title: "Website of the Day", year: "2025" },
      { name: "FWA", title: "FWA of the Day", year: "2024" },
      { name: "Webby Awards", title: "Honoree, *web design*", year: "2023" },
    ],
  },
  // Ordered the way a product actually happens, from first idea to years of upkeep.
  services: [
    {
      title: "Idea & strategy",
      description:
        "Spotting a real problem, sizing it up and shaping a product people will actually pay for.",
    },
    {
      title: "Brand identity",
      description:
        "Naming, logos, type and the systems that hold them together.",
    },
    {
      title: "Product design",
      description:
        "Research, flows and interfaces for web and mobile products.",
    },
    {
      title: "Development",
      description:
        "Full-stack builds, from database to interface: fast, accessible front-ends with React and Next.js.",
    },
    {
      title: "AI integration",
      description:
        "AI features that answer from real data, not memory: document parsing, retrieval, citations and multi-model fallbacks.",
    },
    {
      title: "Motion",
      description: "Interaction and motion design that gives products a pulse.",
    },
    {
      title: "Deployment",
      description:
        "Hosting, domains, auth, payments and analytics wired up, so launch day is a non-event.",
    },
    {
      title: "Maintenance & growth",
      description:
        "Monitoring, fixes and steady iteration long after launch, guided by how people really use it.",
    },
  ],
  projects: [
    {
      slug: "carrelai",
      title: "CarrelAI",
      category: "AI SaaS",
      year: "2026",
      metric: "3",
      metricLabel: "AI models behind every answer",
      summary:
        "A desk for your documents, not a chat window. PDFs, Word files and lecture decks open beside a canvas, notes and a planner, and every AI answer is read out of your own pages, with citations back to the exact one.",
      href: "https://carrelai.com",
      motif: "grid",
    },
    {
      slug: "kardably",
      title: "Kardably",
      category: "AI SaaS",
      year: "2026",
      metric: "45+",
      metricLabel: "Card themes",
      summary:
        "Turns a resume into a shareable business card. AI pulls out what matters, you pick a theme and polish the details, then share it by link or QR, with analytics on who viewed it.",
      href: "https://kardably.com",
      motif: "orb",
    },
  ] satisfies Project[] as Project[],
  testimonials: [
    {
      quote:
        "Nik turned a messy brief into an identity our whole team rallied behind. Six months later it still feels new.",
      name: "Roxanne",
      role: "Founder, Studio",
    },
    {
      quote:
        "The rare designer who thinks like a strategist and builds like an engineer. Every detail was considered.",
      name: "Christian",
      role: "CMO, Company",
    },
    {
      quote:
        "Our new site shipped on time, scored perfectly on performance and doubled sign-ups in the first week.",
      name: "Paul",
      role: "Head of Product, Company",
    },
    {
      quote:
        "Fast, honest and a joy to work with. We came for a logo and left with a brand we are proud of.",
      name: "Kirti",
      role: "Co-founder, Start-up",
    },
  ] satisfies Testimonial[] as Testimonial[],
}
