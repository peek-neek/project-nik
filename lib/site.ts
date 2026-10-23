// All copy for the portfolio lives here. Replace the placeholders with your own.
// `icon` fields name an icon from lib/icons.ts.

import type { IconName } from "@/lib/icons"

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
  /** Tool names from `site.stack` this product is built with. */
  stack: string[]
  /** "saas" for my own products, "client" for work built for someone else. */
  kind: ProjectKind
}

export type ProjectKind = "saas" | "client"

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
  // Shown with icons at the top of the hero.
  roles: [
    { label: "Design", icon: "design" },
    { label: "Develop", icon: "develop" },
    { label: "Deploy", icon: "deploy" },
  ] satisfies { label: string; icon: IconName }[],
  intro: "I build apps & websites, based in",
  location: {
    city: "Toronto",
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
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/neerajneerajweb/",
      icon: "linkedin",
    },
    { label: "GitHub", href: "https://github.com/peek-neek", icon: "github" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/neerajbharrdwaj/",
      icon: "instagram",
    },
    { label: "Dribbble", href: "https://dribbble.com/", icon: "dribbble" },
  ] satisfies { label: string; href: string; icon: IconName }[],
  nav: [
    { label: "Projects", href: "/projects", icon: "projects" },
    { label: "About", href: "/about", icon: "about" },
    { label: "Contact", href: "#contact", icon: "mail" },
  ] satisfies { label: string; href: string; icon: IconName }[],
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
    "I build *apps and websites* from start to finish. Design, development and deployment, *all in one place.*",
  bio: [
    "Bring me an idea and I'll turn it into a real product. I plan it, design it, build it, put it online and keep it running.",
    "I've built and launched my own products, CarrelAI and Kardably, so I know what it takes to ship.",
  ],
  stats: [
    { value: 2, suffix: "", label: "SaaS products launched", icon: "deploy" },
    { value: 1, suffix: "", label: "Person, idea to launch", icon: "user" },
    {
      value: 100,
      suffix: "%",
      label: "Designed, built & deployed by me",
      icon: "check",
    },
  ] satisfies {
    value: number
    suffix: string
    label: string
    icon: IconName
  }[],
  // The /about page.
  about: {
    headline: "I build apps & websites, *from idea to launch.*",
    disciplines: "Design · Development · Deployment",
    intro:
      "I'm Neeraj. I build apps and websites, and *everything that comes with them:* design, development and deployment.",
    // Drop a photo in /public and point to it, e.g. "/portrait.jpg".
    portrait: undefined as string | undefined,
    bioHeading: "One person, *start to finish.*",
    bio: [
      "You work with one person for the whole thing. I plan it, design it, build it and put it online. No hand-offs, *nothing lost along the way.*",
      "I've launched my own products, CarrelAI and Kardably, so I know what it takes to ship something real and keep it running.",
    ],
    servicesHeading: "Everything your product needs, *in one place.*",
    builtWithHeading: "The tools behind *everything I ship.*",
    faqHeading: "Questions, *answered.*",
    // Each row: `topic` is the big name, then the question and answer, and `short` sits on the right.
    faqs: [
      {
        topic: "Timeline",
        short: "2–12 weeks",
        question: "How long does a project take?",
        answer:
          "A simple website usually takes 2 to 4 weeks. A full app usually takes 2 to 3 months. You'll get a clear timeline before we start.",
      },
      {
        topic: "Pricing",
        short: "Fixed quote",
        question: "How much does it cost?",
        answer:
          "It depends on what you need. Tell me about your project and I'll send you a simple, fixed quote. No surprises later.",
      },
      {
        topic: "Kickoff",
        short: "Just an idea",
        question: "What do you need from me to start?",
        answer:
          "Just your idea and some time for feedback. If you already have a brand, content or designs, great. If not, I can help with those too.",
      },
      {
        topic: "Scope",
        short: "Your call",
        question: "Can you just design, or just build?",
        answer:
          "Yes. I can take on one part, like the design or the development, or do the whole thing from idea to launch.",
      },
      {
        topic: "Existing work",
        short: "Yes",
        question: "Can you work on an app or website I already have?",
        answer:
          "Yes. I can fix bugs, add new features, speed it up or redesign parts of it.",
      },
      {
        topic: "Tech",
        short: "Next.js & co.",
        question: "What tech do you use?",
        answer:
          "Next.js, Prisma, tRPC, Zustand and shadcn/ui, hosted on Vercel, with Clerk for logins and Trigger.dev for background jobs. If your project needs something else, I'll use what fits.",
      },
      {
        topic: "Support",
        short: "Ongoing",
        question: "What happens after launch?",
        answer:
          "I don't disappear. I can keep your product running with fixes, updates, new features and monitoring.",
      },
      {
        topic: "Location",
        short: "Toronto, remote",
        question: "Where are you based?",
        answer: "Toronto, Canada. I work with clients anywhere, remotely.",
      },
    ],
  },
  // Everything I build with. `role` shows on hover in the "Built with" grid; which products
  // use each tool comes from each project's `stack` below.
  stack: [
    { name: "Next.js", role: "Framework", icon: "framework" },
    { name: "Prisma", role: "Database", icon: "database" },
    { name: "tRPC", role: "API", icon: "api" },
    { name: "Zustand", role: "State", icon: "state" },
    { name: "shadcn/ui", role: "Components", icon: "components" },
    { name: "Trigger.dev", role: "Background jobs", icon: "jobs" },
    { name: "Inngest", role: "Background jobs", icon: "jobs" },
    { name: "Vercel", role: "Hosting", icon: "hosting" },
    { name: "Clerk", role: "Auth", icon: "auth" },
  ] satisfies { name: string; role: string; icon: IconName }[],
  // Ordered the way a product actually happens, from first idea to years of upkeep.
  services: [
    {
      title: "Idea & strategy",
      icon: "idea",
      description: "Figure out the problem and plan what to build.",
    },
    {
      title: "Brand identity",
      icon: "brand",
      description: "Name, logo, colours and fonts.",
    },
    {
      title: "Product design",
      icon: "design",
      description: "Screens and flows that are easy to use.",
    },
    {
      title: "Development",
      icon: "develop",
      description:
        "Building the app with Next.js, Prisma, tRPC, Zustand and shadcn/ui.",
    },
    {
      title: "AI integration",
      icon: "ai",
      description: "AI features that work with your own data.",
    },
    {
      title: "Motion",
      icon: "motion",
      description: "Small animations that make it feel alive.",
    },
    {
      title: "Deployment",
      icon: "deploy",
      description:
        "Putting it online: hosting, domains, logins, payments and background jobs with Trigger.dev or Inngest.",
    },
    {
      title: "Maintenance & growth",
      icon: "maintain",
      description: "Fixing bugs, adding features and keeping it running.",
    },
  ] satisfies { title: string; icon: IconName; description: string }[],
  // How projects are grouped on the home and Projects pages, in this order.
  projectGroups: [
    {
      kind: "saas",
      title: "My products",
      description: "SaaS I've designed, built and run myself.",
      icon: "deploy",
    },
    {
      kind: "client",
      title: "Client work",
      description: "Websites and apps I've built for clients.",
      icon: "projects",
    },
  ] satisfies {
    kind: ProjectKind
    title: string
    description: string
    icon: IconName
  }[],
  projects: [
    {
      slug: "carrelai",
      kind: "saas",
      title: "CarrelAI",
      category: "AI SaaS",
      year: "2026",
      metric: "3",
      metricLabel: "AI models behind every answer",
      summary:
        "A desk for your documents, not a chat window. PDFs, Word files and lecture decks open beside a canvas, notes and a planner, and every AI answer is read out of your own pages, with citations back to the exact one.",
      href: "https://carrelai.com",
      stack: [
        "Next.js",
        "Prisma",
        "tRPC",
        "Zustand",
        "shadcn/ui",
        "Trigger.dev",
        "Vercel",
        "Clerk",
      ],
      motif: "grid",
    },
    {
      slug: "kardably",
      kind: "saas",
      title: "Kardably",
      category: "AI SaaS",
      year: "2026",
      metric: "45+",
      metricLabel: "Card themes",
      summary:
        "Turns a resume into a shareable business card. AI pulls out what matters, you pick a theme and polish the details, then share it by link or QR, with analytics on who viewed it.",
      href: "https://kardably.com",
      stack: [
        "Next.js",
        "Prisma",
        "tRPC",
        "Zustand",
        "shadcn/ui",
        "Trigger.dev",
        "Vercel",
        "Clerk",
      ],
      motif: "orb",
    },
    {
      slug: "saramoz-homes",
      kind: "client",
      title: "Saramoz Homes",
      category: "Website",
      year: "2026",
      metric: "25+",
      metricLabel: "GTA neighbourhoods featured",
      summary:
        "A personal real estate site for Sara Mozafari, a GTA agent. Featured listings, a simple five-step buying process, services, client stories and a market journal, all built to turn visitors into calls.",
      href: "https://saramozafari.vercel.app",
      motif: "arch",
      stack: ["Next.js", "shadcn/ui", "Vercel"],
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
