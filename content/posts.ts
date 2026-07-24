// RITS-authored blog posts. These are starter drafts — edit freely.
// Add a new post by appending an object to POSTS (newest first).

export type Section = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO (YYYY-MM-DD)
  author: string;
  readTime: string;
  category: string;
  tags: string[];
  body: Section[];
};

export const POSTS: Post[] = [
  {
    slug: "scope-a-staff-augmentation-engagement",
    title: "Staff Augmentation Done Right",
    excerpt:
      "The engagements that fail rarely fail because of raw talent — they fail because nobody defined what \"done\" looks like. The four pillars, three operating models, and 10-day ramp plan we use to get it right.",
    date: "2026-07-15",
    author: "Resource Innovative Technologies",
    readTime: "6 min read",
    category: "Staff Augmentation",
    tags: ["Staffing", "Engineering Teams", "Hiring"],
    body: [
      {
        paragraphs: [
          "Staff augmentation looks simple on paper: you need engineers, we place engineers. In practice, the engagements that fail rarely fail because of raw talent. They fail because nobody defined what \"done\" looks like, who owns decisions, or how the new people plug into an existing team. Below is the scoping checklist we run before a single resume goes out.",
        ],
      },
      {
        heading: "1. Define the outcome, not just the role",
        paragraphs: [
          "\"We need a senior React developer\" is a job title, not an outcome. \"We need to ship a redesigned checkout flow that cuts drop-off by the end of Q3\" is an outcome. When you scope around outcomes, you can tell within weeks whether the engagement is working, and the engineer has a north star instead of a ticket queue.",
        ],
      },
      {
        heading: "2. Decide the operating model up front",
        paragraphs: [
          "There are really only three models, and mixing them mid-flight is where trust breaks down:",
        ],
        bullets: [
          "Embedded individual — one or two engineers who join your standups, your repo, your rituals. Best when you have strong in-house leadership.",
          "Dedicated pod — a small self-managing team with its own lead. Best when you want to hand off a whole surface area.",
          "Overflow capacity — extra hands for a defined push. Best for time-boxed work with a clear finish line.",
        ],
      },
      {
        heading: "3. Name the decision-makers",
        paragraphs: [
          "For every engagement, write down who approves architecture calls, who reviews PRs, and who the engineer escalates to when they are blocked. Ambiguity here is the single most common reason velocity stalls in week two.",
        ],
      },
      {
        heading: "4. Plan the first 10 days like an onboarding, not a handoff",
        paragraphs: [
          "The fastest engineers still need access, context, and a first win. Have accounts provisioned before day one, pair them with someone for the first few days, and pick a small, shippable task so they can prove the pipeline works end to end. A good first week pays for itself across the whole engagement.",
        ],
      },
      {
        heading: "How we approach it",
        paragraphs: [
          "At Resource IT we place senior-only engineers and treat the ramp-up as part of the deliverable, not an afterthought. We scope around outcomes, agree the operating model in writing, and stay close through the first sprint so the engagement is productive in days, not months.",
        ],
      },
    ],
  },
  {
    slug: "shipping-ai-that-survives-production",
    title: "Shipping AI that survives production: the Forward Deployed Engineer model",
    excerpt:
      "A demo that works in a notebook is not a product. Here is how embedding engineers directly with the customer turns AI prototypes into systems people actually rely on.",
    date: "2026-07-08",
    author: "Resource Innovative Technologies",
    readTime: "7 min read",
    category: "AI & Machine Learning",
    tags: ["AI", "LLMs", "Product Engineering"],
    body: [
      {
        paragraphs: [
          "The gap between an impressive AI demo and a dependable AI product is enormous — and it is almost never about the model. It is about data plumbing, evaluation, guardrails, latency, cost, and the thousand edge cases that only show up once real users arrive. The teams that cross that gap fastest have one thing in common: the people building the AI are embedded with the people who own the problem.",
        ],
      },
      {
        heading: "Why prototypes stall",
        paragraphs: [
          "A prototype optimizes for a happy path in a controlled environment. Production optimizes for the opposite — the messy inputs, the flaky upstream service, the prompt injection, the 3 a.m. spike. Handing a prototype over the wall to a team that was not in the room for the hard decisions loses all of that context, and the rebuild begins.",
        ],
      },
      {
        heading: "The Forward Deployed Engineer (FDE) model",
        paragraphs: [
          "Instead of a hand-off, we embed engineers inside your team who understand the problem firsthand and own the solution end to end. An FDE is close enough to the customer to see what actually matters, and technical enough to build it. The loop looks like this:",
        ],
        bullets: [
          "Partner — sit with the customer's team, understand goals and constraints, define what success means.",
          "Build & integrate — rapid prototyping, real API and data integration, RAG and agent workflows, evaluation.",
          "Deploy, monitor, iterate — ship to production, watch real usage, debug, and keep improving.",
          "Feed back — turn what you learn into product and roadmap decisions.",
        ],
      },
      {
        heading: "What to insist on before you call it done",
        paragraphs: [
          "Before an AI feature ships, we make sure it has: a real evaluation harness (not vibes), guardrails for bad inputs and outputs, observability into cost and latency, and a rollback path. If a feature cannot be measured and monitored, it is not production-ready — it is a very convincing demo.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "AI that survives production is built by people who live with the problem, not people who visit it. Embedding engineers who are equal parts builder and partner is the difference between a proof of concept and a system your customers depend on every day.",
        ],
      },
    ],
  },
  {
    slug: "what-noc-command-watches",
    title: "What NOC Command watches so your team can actually sleep",
    excerpt:
      "Alert fatigue is a people problem before it is a tooling problem. Here is how an AI-driven NOC turns a wall of noisy alerts into a short list of things that actually matter.",
    date: "2026-06-30",
    author: "Resource Innovative Technologies",
    readTime: "5 min read",
    category: "Products",
    tags: ["NOC Command", "Cloud", "Operations"],
    body: [
      {
        paragraphs: [
          "Every operations team eventually drowns in alerts. Dashboards go green-then-red-then-green, pagers fire at 3 a.m. for things that resolve themselves, and the one alert that mattered gets lost in the noise. The problem is rarely a lack of monitoring — it is too much monitoring with too little judgment.",
        ],
      },
      {
        heading: "Noise is the real outage",
        paragraphs: [
          "When everything alerts, nothing does. Teams start ignoring the pager, muting channels, and building tribal knowledge about which alerts are 'real.' That tribal knowledge walks out the door when people do. The goal is not more alerts — it is fewer, better ones.",
        ],
      },
      {
        heading: "What NOC Command actually does",
        paragraphs: [
          "NOC Command sits across your cloud estate and applies AI agents to the firehose of signals, so humans only see what needs a human. In practice that means:",
        ],
        bullets: [
          "Correlation — grouping a cascade of related alerts into a single incident instead of forty pages.",
          "Severity triage — separating a genuine SEV-1 from noise, and routing each to the right person.",
          "Context on arrival — the alert shows up with the likely cause and affected services already attached.",
          "Role-aware views — a CEO sees a business summary; an on-call engineer sees exactly what they need.",
        ],
      },
      {
        heading: "Security and residency by design",
        paragraphs: [
          "It runs on Microsoft Azure with US data residency, SOC 2 audited controls, HIPAA-compliant design, and role-based access from day one — so the visibility you gain does not cost you on compliance.",
        ],
      },
      {
        heading: "The outcome",
        paragraphs: [
          "The point of a good NOC is not to watch more — it is to let your team watch less, and trust that the short list they do see is the one that matters. That is the difference between a monitoring tool and a full night's sleep.",
        ],
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
