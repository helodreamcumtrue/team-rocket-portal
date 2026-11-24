export interface TeamMember {
  id: string;
  index: string;
  name: string;
  rollNo: string;
  role: string;
  discipline: string;
  tagline: string;
  bio: string;
  accentColor: string;
  patternSeed: number;
  photo?: string;
  ownership: string[];
  skills: { name: string; level: number }[];
  ledChapters: string[];
  ledSlides: number[];
  links: {
    github?: string;
    repo: string;
  };
}

export type SlideLayout =
  | 'cover'
  | 'statement'
  | 'split-visual'
  | 'architecture'
  | 'metrics'
  | 'comparison'
  | 'catalogue'
  | 'roadmap'
  | 'qa';

export interface SlideData {
  id: string;
  number: string;
  kicker: string;
  title: string;
  subtitle?: string;
  layout: SlideLayout;
  accent?: 'vermilion' | 'pine' | 'brass';
  bullets?: { label: string; detail: string; tag?: string }[];
  stats?: { value: string; label: string; delta?: string }[];
  chartData?: {
    label: string;
    value: number;
    max: number;
    unit: string;
    note?: string;
  }[];
  architectureNodes?: {
    tier: string;
    title: string;
    spec: string;
    latency: string;
  }[];
  comparisonRows?: {
    dimension: string;
    legacy: string;
    ours: string;
  }[];
  catalogueItems?: {
    repo: string;
    license: string;
    score: number;
    active?: boolean;
  }[];
  roadmapPhases?: {
    phase: string;
    window: string;
    milestone: string;
    status: 'shipped' | 'active' | 'next';
  }[];
  links?: { label: string; url: string }[];
  speakerNotes: string;
  relatedChapterId?: string;
}

export interface ReportSection {
  id: string;
  number: string;
  title: string;
  leadAuthorId: string;
  readingMinutes: number;
  relatedSlideIndex: number;
  summary: string;
  paragraphs: string[];
  callout?: {
    type: 'insight' | 'architecture' | 'warning';
    title: string;
    body: string;
  };
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  codeBlock?: {
    caption: string;
    code: string;
  };
}

export const PROJECT_META = {
  portalName: 'Team Rocket',
  code: 'SWE PROJECT // TEAM ROCKET',
  shortTitle: 'Team Rocket',
  projectTitle: 'Digital Graveyard',
  fullTitle: 'Digital Graveyard: Giving Abandoned Open-Source Projects a Legal, Verified Second Life',
  subtitle:
    'A software engineering platform that discovers legally revivable open-source repositories, generates automated commit-history autopsies, and verifies community revivals through real Git commits.',
  institution: 'Software Engineering Project',
  cohort: 'Team Rocket · 2026',
  version: 'v1.0 · Final Demo',
  liveSiteUrl: 'https://digitalgraveyard.cv',
  repoUrl: 'https://github.com/Harshita445/digital_graveyard_swe',
  pptxDownloadUrl: './Digital_Graveyard_Final_Demo.pptx',
  abstract:
    'Thousands of popular open-source repositories quietly go silent when maintainers burn out or move on—not because the code is broken, but because prospective contributors cannot answer three critical questions: Is forking legally allowed? Why did the project die? And how do I prove my revival is genuine? Digital Graveyard answers all three using verifiable artifacts: open-source license checks via the GitHub API, automated commit-history autopsies with a 0–100 Revival Score, and fork verification backed by GitHub Compare API commits.',
  keywords: [
    'Open-Source Revival',
    'GitHub GraphQL & REST',
    'Next.js 14',
    'PostgreSQL + Prisma',
    'Automated Autopsy',
    '39/39 Checks Passed',
  ],
};

export const GRAVEYARD_SPECIMENS = [
  {
    repo: 'atom/atom',
    stars: '60,682',
    license: 'MIT',
    score: 84,
    difficulty: 'Easy',
    cause: 'Archived by Owner',
    note: 'Archived editor with high documentation & community base; legally forkable under MIT.',
  },
  {
    repo: 'helm/charts',
    stars: '15,500+',
    license: 'Apache-2.0',
    score: 82,
    difficulty: 'Easy',
    cause: 'Gradual Fade-out',
    note: 'Mature Kubernetes chart archive; clear structure and permissive Apache-2.0 license.',
  },
  {
    repo: 'request/request',
    stars: '25,600+',
    license: 'Apache-2.0',
    score: 75,
    difficulty: 'Easy',
    cause: 'Gradual Fade-out',
    note: 'Iconic Node.js HTTP client deprecated cleanly with well-documented API surface.',
  },
  {
    repo: 'adobe/brackets',
    stars: '33,000+',
    license: 'MIT',
    score: 74,
    difficulty: 'Medium',
    cause: 'Maintainer Departure',
    note: 'Peaked in 2012 (>6,000 commits); 2,600 open issues serve as a ready-made roadmap.',
  },
  {
    repo: 'OpenDiablo2',
    stars: '3,100+',
    license: 'GPL-3.0',
    score: 71,
    difficulty: 'Medium',
    cause: 'Solo Maintainer Burnout',
    note: 'Open-source game engine rewrite with active community interest under GPL-3.0.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'harshita',
    index: '01',
    name: 'Harshita',
    rollNo: '1024030126',
    role: 'Full-Stack & Repository Owner',
    discipline: 'Legal Discovery, GitHub API & CI/CD',
    tagline: 'Enforcing open-license rules and shipping main safely to production.',
    bio: 'Maintained the Digital Graveyard repository, implemented the legal listing verification pipeline (lib/listing.js) against GitHub REST & GraphQL APIs, and oversaw continuous deployment with Vercel and Neon PostgreSQL.',
    accentColor: '#0F6E6E',
    patternSeed: 26,
    photo: './team/harshita.jpg',
    ownership: ['Legal Listing Check', 'GitHub REST/GraphQL', 'Repo & Deployment'],
    skills: [
      { name: 'Next.js 14 / TypeScript', level: 94 },
      { name: 'GitHub API & OAuth', level: 92 },
      { name: 'CI/CD & Vercel Ops', level: 90 },
    ],
    ledChapters: ['ch-1', 'ch-4'],
    ledSlides: [0, 1, 9, 13],
    links: {
      github: 'https://github.com/Harshita445',
      repo: 'https://github.com/Harshita445/digital_graveyard_swe',
    },
  },
  {
    id: 'parth',
    index: '02',
    name: 'Parth Garg',
    rollNo: '1024030136',
    role: 'Backend, Database & Security Lead',
    discipline: 'Prisma Schema, Auth & Automated Testing',
    tagline: 'Keeping business rules on the server and 39/39 checks green.',
    bio: 'Designed the relational PostgreSQL schema via Prisma ORM for graves, claims, and community commitments, built bcrypt + signed-cookie authentication, and authored the isolated test suite (scripts/test-all.js).',
    accentColor: '#D46A3C',
    patternSeed: 36,
    photo: './team/parth.png',
    ownership: ['Prisma + Neon Postgres', 'bcrypt & Signed Sessions', '39-Check Test Suite'],
    skills: [
      { name: 'PostgreSQL / Prisma', level: 93 },
      { name: 'API Security & Auth', level: 91 },
      { name: 'Automated API Testing', level: 94 },
    ],
    ledChapters: ['ch-4', 'ch-5'],
    ledSlides: [8, 10, 11, 12],
    links: {
      repo: 'https://github.com/Harshita445/digital_graveyard_swe',
    },
  },
  {
    id: 'lakshay',
    index: '03',
    name: 'Lakshay Jain',
    rollNo: '1024030143',
    role: 'Algorithms & Autopsy Engine Lead',
    discipline: 'Revival Score Model & Decline Diagnostics',
    tagline: 'Turning lifetime commit histories into readable engineering autopsies.',
    bio: 'Developed the 5-factor Revival Score model (Freshness, Documentation, Maintenance, Community, Adoption with log scaling) and the rule-based diagnoseDecline() autopsy engine across 22 archived repositories.',
    accentColor: '#2B7A78',
    patternSeed: 43,
    photo: './team/lakshay.jpg',
    ownership: ['Revival Score (0–100)', 'diagnoseDecline() Autopsy', 'GraphQL Yoga API'],
    skills: [
      { name: 'Scoring & Heuristics', level: 92 },
      { name: 'GraphQL Yoga', level: 89 },
      { name: 'Git History Analysis', level: 93 },
    ],
    ledChapters: ['ch-3', 'ch-6'],
    ledSlides: [5, 6, 7],
    links: {
      github: 'https://github.com/helodreamcumtrue',
      repo: 'https://github.com/Harshita445/digital_graveyard_swe',
    },
  },
  {
    id: 'arshdeep',
    index: '04',
    name: 'Arshdeep Kaur',
    rollNo: '1024030149',
    role: 'Frontend, UX & Community Revivals',
    discipline: 'React UI, User Stories & Fork Verification',
    tagline: 'Designing clear revival workflows from user stories to verified forks.',
    bio: 'Led user-story requirements engineering, built reusable React 18 interface views and the suggest-a-repo flow (/api/projects/suggest), and integrated GitHub Compare API fork commit verification.',
    accentColor: '#3A5F7D',
    patternSeed: 49,
    photo: './team/arshdeep.jpeg',
    ownership: ['React UI & User Stories', 'Suggest Repo Flow', 'Fork Verification UI'],
    skills: [
      { name: 'React 18 / CSS Systems', level: 93 },
      { name: 'Product & User Stories', level: 91 },
      { name: 'GitHub Compare API', level: 89 },
    ],
    ledChapters: ['ch-2', 'ch-5'],
    ledSlides: [2, 3, 4],
    links: {
      github: 'https://github.com/ArshdeepKaur2407',
      repo: 'https://github.com/Harshita445/digital_graveyard_swe',
    },
  },
];

export const SLIDES: SlideData[] = [
  {
    id: 'slide-01',
    number: '01',
    kicker: 'SOFTWARE ENGINEERING PROJECT · TEAM ROCKET',
    title: 'Digital Graveyard',
    subtitle: 'Giving abandoned open-source projects a legal, verified second life.',
    layout: 'cover',
    accent: 'vermilion',
    stats: [
      { value: '22', label: 'Abandoned Open-Source Graves' },
      { value: '39 / 39', label: 'Automated Checks Passed' },
      { value: '100%', label: 'Git-Commit Verified Credit' },
    ],
    speakerNotes:
      'Hi everyone. We are Harshita, Parth, Lakshay and Arshdeep, and our project is Digital Graveyard. The short version: there are thousands of good open-source projects that just stop one day. We built a website that finds the ones you are legally allowed to continue, explains why each one died, and lets people revive them, with git commits as proof of the work.',
    relatedChapterId: 'ch-1',
  },
  {
    id: 'slide-02',
    number: '02',
    kicker: '01 // PROBLEM STATEMENT',
    title: 'Good projects die quietly',
    subtitle:
      'Maintainers get jobs, burn out or move on, and the code freezes. Nobody picks them up because nobody can answer three questions:',
    layout: 'statement',
    accent: 'vermilion',
    bullets: [
      {
        label: '01 · Am I allowed to continue it?',
        detail: "It is someone else's code. Is forking it even legal?",
      },
      {
        label: '02 · Why did it die?',
        detail: 'If I start, will I hit the same wall the last person did?',
      },
      {
        label: '03 · Will anyone know it was me?',
        detail: 'How do I prove the revival is my work and not just a copy?',
      },
    ],
    stats: [
      {
        value: '60,682 ★',
        label: 'atom/atom (Real Example)',
        delta: 'Archived · MIT Licensed',
      },
    ],
    speakerNotes:
      'This is the problem we started from. Good projects die quietly. When we asked ourselves why nobody revives them, it always came back to these three questions: am I allowed to, why did it die, and will anyone know it was me. Atom is a real example from our site: sixty thousand stars, archived, and MIT licensed.',
    relatedChapterId: 'ch-1',
  },
  {
    id: 'slide-03',
    number: '03',
    kicker: '02 // SYSTEM OVERVIEW',
    title: 'What Digital Graveyard does',
    subtitle:
      "We don't ask anyone for permission, because the license already gave it. We don't moderate, because git already records who did the work.",
    layout: 'architecture',
    accent: 'pine',
    architectureNodes: [
      {
        tier: 'STEP 01 // FIND',
        title: 'Legal Discovery',
        spec: 'Only repos that are abandoned and whose open-source license already allows forking.',
        latency: 'The License',
      },
      {
        tier: 'STEP 02 // UNDERSTAND',
        title: 'Autopsy & Score',
        spec: 'Commits, contributors and issues across its whole life become an automatic autopsy and 0–100 score.',
        latency: 'GitHub History',
      },
      {
        tier: 'STEP 03 // REVIVE',
        title: 'Solo or Crew Claim',
        spec: 'Claim a grave alone, or join other revivers sharing one community fork.',
        latency: 'Commitments',
      },
      {
        tier: 'STEP 04 // VERIFY',
        title: 'Proof of Work',
        spec: 'A revival only counts if your fork has new commits made after you claimed it.',
        latency: 'Git Commits',
      },
    ],
    speakerNotes:
      'So this is what we built. Four steps: find, understand, revive, verify. And each of the three questions is answered by something nobody can fake: the license, the GitHub history, and the git commits themselves.',
    relatedChapterId: 'ch-2',
  },
  {
    id: 'slide-04',
    number: '04',
    kicker: '03 // REQUIREMENTS',
    title: 'User stories',
    subtitle: 'Every story uses the "As a / I want / So that" format with a strict Done-When criterion.',
    layout: 'split-visual',
    accent: 'vermilion',
    bullets: [
      {
        label: 'The Student Reviver',
        detail:
          'Find an abandoned project legally allowed to continue to build real portfolio work. Done when: only abandoned, open-licensed repos are listed with difficulty.',
      },
      {
        label: 'The Team Reviver',
        detail:
          'Join other people reviving the same project instead of splitting across ten forks. Done when: many people can claim one grave and see the whole crew.',
      },
      {
        label: 'The Discoverer',
        detail:
          'Add a dead repo with one link so the catalogue grows without an admin. Done when: the suggest box runs the legal check and lists it in seconds.',
      },
      {
        label: 'The Original Owner',
        detail:
          'Hand a project over with a note so it does not rot. Done when: ownership is proven through GitHub and the builder stakes credits.',
      },
    ],
    speakerNotes:
      'These are the four people we designed for. Each card is a user story in the "as a, I want, so that" format, and the bottom line is the acceptance criterion we used to decide the feature was done. Every one of these is implemented on the live site.',
    relatedChapterId: 'ch-2',
  },
  {
    id: 'slide-05',
    number: '05',
    kicker: '04 // CORE CAPABILITIES',
    title: 'Features, and how we built them',
    subtitle: 'Six end-to-end features mapped directly to their underlying implementation.',
    layout: 'comparison',
    accent: 'pine',
    comparisonRows: [
      {
        dimension: 'Legal listing check',
        legacy: 'Only abandoned + open-licensed repos get in.',
        ours: 'lib/listing.js · GitHub REST API',
      },
      {
        dimension: 'Suggest a dead repo',
        legacy: "Paste one GitHub link; checked and listed in ~10 s.",
        ours: '/api/projects/suggest · 10/day per user',
      },
      {
        dimension: 'Autopsy report',
        legacy: 'Why it died, read from its whole commit history.',
        ours: 'GitHub contributor stats · diagnoseDecline()',
      },
      {
        dimension: 'Revival score',
        legacy: '0–100 score for how easy it is to bring back.',
        ours: '5 weighted factors · log scales',
      },
      {
        dimension: 'Community revivals',
        legacy: 'Many people on one grave sharing one community fork.',
        ours: 'One Commitment row per person',
      },
      {
        dimension: 'Fork verification',
        legacy: 'Credit awarded only for real, new commits.',
        ours: 'GitHub Compare API · commits after claim',
      },
    ],
    speakerNotes:
      "Here are the six main features, and under each one, the part of the code that actually does it. For example, fork verification uses GitHub's compare API and only counts commits made after you claimed the project.",
    relatedChapterId: 'ch-2',
  },
  {
    id: 'slide-06',
    number: '06',
    kicker: '05 // REVIVAL SCORING',
    title: 'How the revival score is calculated',
    subtitle:
      'Weighted highest on freshness because recent code still builds with modern tools. Stars count least—popular does not mean easy.',
    layout: 'metrics',
    accent: 'vermilion',
    chartData: [
      {
        label: 'Freshness (0 after 8 yrs)',
        value: 25,
        max: 25,
        unit: '%',
        note: 'Builds with today’s tools',
      },
      {
        label: 'Documentation (README ≤ 4k chars)',
        value: 20,
        max: 25,
        unit: '%',
        note: 'Onboarding clarity',
      },
      {
        label: 'Maintenance (Closed issue ratio)',
        value: 20,
        max: 25,
        unit: '%',
        note: 'Past triage health',
      },
      {
        label: 'Community (Log contributors & PRs)',
        value: 20,
        max: 25,
        unit: '%',
        note: 'Log scale',
      },
      {
        label: 'Adoption (Log stars & forks)',
        value: 15,
        max: 25,
        unit: '%',
        note: 'Log scale',
      },
    ],
    stats: [
      { value: '75+', label: 'Easy Difficulty', delta: 'atom: 84 · charts: 82' },
      { value: '50–74', label: 'Medium Difficulty', delta: 'brackets: 74 · OpenDiablo2: 71' },
      { value: '< 50', label: 'Hard Difficulty', delta: 'Deep legacy rebuilds' },
    ],
    speakerNotes:
      'The score is a weighted sum. Each factor is scored between zero and one, multiplied by its weight, and added up to a number out of 100. We use log scales for stars and contributors so that a project with fifty thousand stars does not drown everything else out.',
    relatedChapterId: 'ch-3',
  },
  {
    id: 'slide-07',
    number: '07',
    kicker: '06 // AUTOMATED AUTOPSY',
    title: 'The autopsy report',
    subtitle:
      'Built from the repo’s whole life on GitHub: Peak → Decline → Last active → Abandoned.',
    layout: 'metrics',
    accent: 'pine',
    chartData: [
      { label: 'Gradual Fade-out', value: 10, max: 10, unit: ' repos' },
      { label: 'Maintainer Departure', value: 6, max: 10, unit: ' repos' },
      { label: 'Overwhelmed by Issues', value: 3, max: 10, unit: ' repos' },
      { label: 'Solo Maintainer Burnout', value: 2, max: 10, unit: ' repos' },
      { label: 'Abrupt Stop', value: 1, max: 10, unit: ' repo' },
    ],
    stats: [
      {
        value: 'Brackets',
        label: '33k Stars · Peaked 2012 (>6,000 commits)',
        delta: 'Maintainer Departure · 2,600 open issues',
      },
      {
        value: '7',
        label: 'Diagnostic Categories Tracked',
        delta: 'Live counts across 22 graves',
      },
    ],
    speakerNotes:
      'The autopsy reads the whole history of the repo, not just the last few commits. A set of rules checks, in order: did the lead maintainer leave early, was it one person, did issues pile up, did it stop suddenly or fade out. The numbers on the right are the real counts across the 22 graves on the site today.',
    relatedChapterId: 'ch-3',
  },
  {
    id: 'slide-08',
    number: '08',
    kicker: '07 // LIVE CATALOGUE',
    title: "What's in the graveyard right now",
    subtitle: '22 real abandoned open-licensed repos (16 MIT · 3 Apache-2.0 · 3 GPL-3.0) across 9 categories.',
    layout: 'catalogue',
    accent: 'vermilion',
    stats: [
      { value: '22', label: 'Real Abandoned Repos' },
      { value: '21', label: 'Archived by Owners' },
      { value: '16 · 3 · 3', label: 'MIT · Apache · GPL' },
      { value: '2', label: 'Active Revivals (8/9)' },
    ],
    catalogueItems: [
      { repo: 'atom', license: 'MIT', score: 84, active: true },
      { repo: 'charts', license: 'Apache-2.0', score: 82 },
      { repo: 'request', license: 'Apache-2.0', score: 75 },
      { repo: '30-seconds-of-interviews', license: 'MIT', score: 75 },
      { repo: 'website-archive', license: 'MIT', score: 74 },
      { repo: 'brackets', license: 'MIT', score: 74 },
      { repo: 'OpenDiablo2', license: 'GPL-3.0', score: 71 },
      { repo: 'kotlin-koans', license: 'MIT', score: 62 },
      { repo: 'HomePWN', license: 'GPL-3.0', score: 60 },
      { repo: 'PermissionScope', license: 'MIT', score: 60 },
      { repo: 'normalizr', license: 'MIT', score: 59 },
      { repo: 'grumpy', license: 'Apache-2.0', score: 58 },
      { repo: 'SerpentAI', license: 'MIT', score: 58 },
      { repo: 'chromeless', license: 'MIT', score: 57 },
      { repo: 'upterm', license: 'MIT', score: 57 },
      { repo: 'aquatone', license: 'MIT', score: 55 },
      { repo: 'panelkit', license: 'MIT', score: 50 },
      { repo: 'kitsunebi-android', license: 'MIT', score: 45 },
      { repo: 'clumsy-bird', license: 'GPL-3.0', score: 43 },
      { repo: 'gitrob', license: 'MIT', score: 42 },
      { repo: 'wrmhl', license: 'MIT', score: 39 },
      { repo: 'stanford-tensorflow-tutorials', license: 'MIT', score: 31, active: true },
    ],
    speakerNotes:
      'These are all 22 graves on the live site right now, sorted by revival score. They came from GitHub searches for archived, popular, open-licensed repos, plus whatever people add through the suggest box. The highlighted ones are being revived right now.',
    relatedChapterId: 'ch-6',
  },
  {
    id: 'slide-09',
    number: '09',
    kicker: '08 // TECH STACK',
    title: 'What we built it with',
    subtitle:
      'One language—JavaScript—across frontend, REST/GraphQL APIs, and database schema.',
    layout: 'architecture',
    accent: 'brass',
    architectureNodes: [
      {
        tier: 'FRONTEND',
        title: 'Next.js 14 + React 18',
        spec: 'Pages, routing, reusable components & hand-drawn CSS theme (paper colours, ink borders, Patrick Hand).',
        latency: 'UI Layer',
      },
      {
        tier: 'BACKEND',
        title: 'Next.js API + GraphQL Yoga',
        spec: 'Server-side business rules via Next.js API routes plus a second GraphQL API at /api/graphql.',
        latency: 'Server Rules',
      },
      {
        tier: 'DATABASE',
        title: 'PostgreSQL on Neon + Prisma',
        spec: 'Relational data and safe credit transactions managed through one Prisma schema with zero raw SQL.',
        latency: 'Persistence',
      },
      {
        tier: 'GITHUB + AUTH',
        title: 'GitHub API, OAuth & bcrypt',
        spec: 'GraphQL + REST for repo history & forks, GitHub OAuth for repo ownership, bcrypt + signed cookies.',
        latency: 'Trust Layer',
      },
    ],
    speakerNotes:
      'Our stack is Next.js and React for the frontend and the API, PostgreSQL on Neon as the database through Prisma, and GitHub for both data and login. GitHub OAuth is how users sign in with GitHub and prove they own a repo; passwords are hashed with bcrypt and sessions are signed cookies.',
    relatedChapterId: 'ch-4',
  },
  {
    id: 'slide-10',
    number: '10',
    kicker: '09 // PRODUCTION DEPLOYMENT',
    title: 'How it runs in production',
    subtitle:
      'Every push to main triggers a ~45 s Vercel build and safe schema push—broken builds never replace the live site.',
    layout: 'split-visual',
    accent: 'vermilion',
    bullets: [
      {
        label: 'Browser → Vercel (Next.js Serverless)',
        detail: 'Serves React pages and serverless API routes at digitalgraveyard.cv with HTTPS by default.',
      },
      {
        label: 'Vercel → Neon PostgreSQL',
        detail: 'Built-in connection pooling with safe migrations that refuse destructive schema changes.',
      },
      {
        label: 'Vercel → GitHub API & OAuth',
        detail: 'Fetches live repository metadata, contributor histories, license identifiers, and fork commits.',
      },
      {
        label: 'Daily Midnight Cron Job',
        detail: 'Automated scheduled task expires stale revival claims older than 14 days.',
      },
    ],
    stats: [
      { value: '~45 s', label: 'Push-to-Live Deploy', delta: 'git push → Vercel → Neon' },
      { value: '14 days', label: 'Claim Expiry Window', delta: 'Automated midnight cron' },
    ],
    speakerNotes:
      'In production the browser talks to Vercel, which runs our pages and API routes as serverless functions. Vercel talks to Neon for the database and to GitHub for repo data and login. Every push to main rebuilds the site in about 45 seconds, and the database schema is applied in a way that refuses to delete data.',
    relatedChapterId: 'ch-4',
  },
  {
    id: 'slide-11',
    number: '11',
    kicker: '10 // ENGINEERING DISCIPLINE',
    title: 'Software engineering practices we followed',
    subtitle: 'Eight concrete practices applied from the Gravefin prototype pivot through final delivery.',
    layout: 'roadmap',
    accent: 'pine',
    roadmapPhases: [
      {
        phase: '01 · ITERATIVE & STORIES',
        window: 'Gravefin Pivot → Live',
        milestone:
          'Pivoted from sample-data escrow (Gravefin) to real GitHub data; wrote "Done When" user stories first.',
        status: 'shipped',
      },
      {
        phase: '02 · GIT & CD PIPELINE',
        window: 'Main Always Deployable',
        milestone:
          'Small descriptive commits on GitHub; Vercel deploys every push and keeps last good build if one fails.',
        status: 'shipped',
      },
      {
        phase: '03 · ENV & SAFE SCHEMA',
        window: 'Local Postgres ↔ Neon',
        milestone:
          'Embedded Postgres locally, Neon in prod, secrets in env vars; Prisma refuses data-losing migrations.',
        status: 'shipped',
      },
      {
        phase: '04 · SECURITY & TESTING',
        window: 'Zero-Warning ESLint',
        milestone:
          'Server-enforced rules, bcrypt + signed sessions, aliases only, and 39 automated API checks.',
        status: 'shipped',
      },
    ],
    speakerNotes:
      'We followed an iterative process. The first increment was Gravefin, an escrow marketplace with sample data. When we realised the data was not real and owners of dead projects cannot give permission, we went back to the requirements and pivoted. Every increment after that was deployed and tested before the next one.',
    relatedChapterId: 'ch-5',
  },
  {
    id: 'slide-12',
    number: '12',
    kicker: '11 // VERIFICATION STRATEGY',
    title: 'How we tested it',
    subtitle: 'Three layers of validation—lint/build gates, an isolated local API test runner, and manual dual-account checks.',
    layout: 'statement',
    accent: 'brass',
    bullets: [
      {
        label: '1 · Lint and build',
        detail: 'ESLint (next lint) with zero warnings and full Vercel production build before every deploy.',
      },
      {
        label: '2 · Automated API script (scripts/test-all.js)',
        detail:
          'Runs against an isolated local Postgres instance—creates test data, tests happy & error paths (e.g. double claims), and cleans up.',
      },
      {
        label: '3 · Manual dual-account testing',
        detail:
          'Clicked through every page and tested concurrent multi-user flows side-by-side in normal + incognito windows.',
      },
    ],
    speakerNotes:
      'Our testing was fairly simple. ESLint and the Vercel build catch basic mistakes. We wrote one test script that calls our API on a local copy of the app, with its own local database, so it never touches live data. And we tested by hand, including two accounts in two browser windows.',
    relatedChapterId: 'ch-5',
  },
  {
    id: 'slide-13',
    number: '13',
    kicker: '12 // TEST RESULTS & BUGS CAUGHT',
    title: 'Testing results: 39 / 39 automated checks passed',
    subtitle:
      'Caught and fixed real bugs before demo: vague fork-checker errors, lister treated as owner, and a prod test-login shortcut.',
    layout: 'metrics',
    accent: 'vermilion',
    chartData: [
      { label: 'Core protocol', value: 10, max: 10, unit: ' passed' },
      { label: 'Community revival', value: 7, max: 10, unit: ' passed' },
      { label: 'Login + API', value: 6, max: 10, unit: ' passed' },
      { label: 'Legal check', value: 6, max: 10, unit: ' passed' },
      { label: 'Penalties', value: 5, max: 10, unit: ' passed' },
      { label: 'GitHub OAuth', value: 5, max: 10, unit: ' passed' },
    ],
    stats: [
      { value: '401 / 403', label: 'Wrong Password, Live Repo, Unauthed Cron', delta: 'Properly refused' },
      { value: '400 / 409', label: 'Non-Fork Repo & Double Claim', delta: 'Clear validation errors' },
      { value: 'ACTIVE', label: '2 People Join 1 Grave · Leave = Dead', delta: 'Zero penalty on leave' },
    ],
    speakerNotes:
      'All 39 automated checks pass, plus the GraphQL test and lint with zero warnings. Testing also found real bugs—a vague error from the fork checker, the lister being treated as owner, and a test login shortcut that worked in production—and we fixed every one before this demo.',
    relatedChapterId: 'ch-5',
  },
  {
    id: 'slide-14',
    number: '14',
    kicker: '13 // LIVE DEMO & SOURCE',
    title: 'Try it yourself!!',
    subtitle: 'Explore the live Digital Graveyard platform, inspect the source code, or open Q&A.',
    layout: 'qa',
    accent: 'vermilion',
    stats: [
      { value: '22', label: 'Live Graves' },
      { value: '39 / 39', label: 'Checks Passing' },
      { value: '4', label: 'Team Rocket Engineers' },
    ],
    links: [
      { label: 'digitalgraveyard.cv', url: 'https://digitalgraveyard.cv' },
      {
        label: 'github.com/Harshita445/digital_graveyard_swe',
        url: 'https://github.com/Harshita445/digital_graveyard_swe',
      },
    ],
    speakerNotes:
      'That is Digital Graveyard. The website is digitalgraveyard.cv and the code is on GitHub. Thank you, and we are happy to take questions.',
    relatedChapterId: 'ch-6',
  },
];

export const REPORT_CHAPTERS: ReportSection[] = [
  {
    id: 'ch-1',
    number: '01',
    title: 'Problem Statement & Legal Discovery',
    leadAuthorId: 'harshita',
    readingMinutes: 4,
    relatedSlideIndex: 1,
    summary:
      'Why abandoned open-source software stalls silently and how license verification eliminates legal ambiguity without requiring permission from vanished maintainers.',
    paragraphs: [
      'Across GitHub, thousands of once-vital repositories accumulate tens of thousands of stars before going quiet as maintainers change jobs, burn out, or move on. Although the underlying source code remains valuable to downstream users, potential contributors hesitate because three core questions go unanswered: whether forking is legally permitted, why the project originally stalled, and how revival work can be credibly attributed.',
      'Consider atom/atom—archived by its owner with 60,682 stars and an MIT license. Its permissive license already grants legal permission to fork and continue development, yet discoverability and coordinated revival remain fragmented.',
      'Digital Graveyard resolves the legal gate automatically inside lib/listing.js using the GitHub REST API: only repositories confirmed as abandoned (archived or inactive beyond the threshold) and governed by an approved open-source license (MIT, Apache-2.0, GPL-3.0) are permitted into the catalogue. Live repositories such as express are automatically rejected with HTTP 403.',
    ],
    callout: {
      type: 'insight',
      title: 'Zero-Permission Model',
      body: 'We do not ask original maintainers for permission because the open-source license already grants it, and we do not manually moderate claims because Git commit history objectively records authorship.',
    },
  },
  {
    id: 'ch-2',
    number: '02',
    title: 'User Stories, Workflows & Core Features',
    leadAuthorId: 'arshdeep',
    readingMinutes: 5,
    relatedSlideIndex: 3,
    summary:
      'Requirements engineering across four distinct personas—Student Reviver, Team Reviver, Discoverer, and Original Owner—mapped to six implemented features.',
    paragraphs: [
      'Every capability in Digital Graveyard was specified as an explicit user story with a testable "Done When" criterion before implementation. The Student Reviver needs legal, difficulty-rated projects for meaningful portfolio work; the Team Reviver needs shared community forks so effort is not fractured across isolated copies; the Discoverer needs one-link submission (/api/projects/suggest, rate-limited to 10/day per user and completing in ~10 seconds); and the Original Owner can hand off a project cleanly via GitHub OAuth ownership proof.',
      'When multiple developers claim the same grave, Prisma tracks one Commitment row per person linked to a shared community fork, keeping the grave status ACTIVE until contributors finish or step back without penalty.',
      'Critically, fork verification relies on the GitHub Compare API: credit is awarded strictly for authentic, new commits authored after the claim timestamp—preventing empty fork farming or copy-paste clones.',
    ],
    table: {
      caption: 'Table 2.1 — Core Platform Features & Implementation Modules',
      headers: ['Feature', 'User Need Solved', 'Implementation Module'],
      rows: [
        ['Legal listing check', 'Abandoned + open-license gate', 'lib/listing.js · GitHub REST API'],
        ['Suggest a dead repo', 'Self-service catalogue growth (~10 s)', '/api/projects/suggest (10/day limit)'],
        ['Autopsy report', 'Root cause of repository decline', 'GitHub contributor stats · diagnoseDecline()'],
        ['Revival score', '0–100 feasibility & difficulty tier', '5 weighted factors · log scaling'],
        ['Community revivals', 'Coordinated multi-developer crews', 'Prisma Commitment rows + shared fork'],
        ['Fork verification', 'Tamper-proof contribution proof', 'GitHub Compare API (post-claim commits)'],
      ],
    },
  },
  {
    id: 'ch-3',
    number: '03',
    title: 'Revival Score & Automated Autopsy Engine',
    leadAuthorId: 'lakshay',
    readingMinutes: 5,
    relatedSlideIndex: 5,
    summary:
      'Mathematical formulation of the 5-factor 0–100 Revival Score and the deterministic rule chain behind diagnoseDecline().',
    paragraphs: [
      'To help contributors gauge revival feasibility at a glance, Digital Graveyard computes a 0–100 Revival Score across five weighted dimensions: Freshness (25%), Documentation (20%), Maintenance (20%), Community (20%), and Adoption (15%). Freshness carries the highest weight because repositories abandoned recently (within 8 years) are far more likely to build cleanly with modern toolchains, whereas stars count least because popularity does not guarantee maintainability.',
      'Both Community (contributors and pull requests) and Adoption (stars and forks) apply logarithmic scaling so mega-repositories like Atom (60k+ stars) do not skew the scale. Repositories scoring 75+ are classified Easy (e.g., atom: 84, helm/charts: 82), 50–74 Medium (e.g., brackets: 74, OpenDiablo2: 71), and below 50 Hard.',
      'Complementing the numeric score, diagnoseDecline() evaluates full repository lifetimes—Peak, Decline, Last Active, and Abandoned—checking sequentially for early lead-maintainer departure, solo-maintainer burnout, issue pile-ups, abrupt stops, or gradual fade-out. On Adobe Brackets (33k stars, >6,000 commits peaking in 2012), the engine flags Maintainer Departure and surfaces its 2,600 open issues as a ready-made backlog.',
    ],
    table: {
      caption: 'Table 3.1 — Revival Score Weights & Live Autopsy Distribution (22 Graves)',
      headers: ['Score Factor', 'Weight', 'Cause of Death (Live Count)', 'Observed Repos'],
      rows: [
        ['Freshness (0 after 8 yrs)', '25%', 'Gradual Fade-out', '10'],
        ['Documentation (README ≤ 4,000 chars)', '20%', 'Maintainer Departure', '6'],
        ['Maintenance (Closed issue share)', '20%', 'Overwhelmed by Issues', '3'],
        ['Community (Log contributors + PRs)', '20%', 'Solo Maintainer Burnout', '2'],
        ['Adoption (Log stars + forks)', '15%', 'Abrupt Stop', '1'],
      ],
    },
  },
  {
    id: 'ch-4',
    number: '04',
    title: 'Full-Stack Architecture & Production Pipeline',
    leadAuthorId: 'harshita',
    readingMinutes: 5,
    relatedSlideIndex: 8,
    summary:
      'Unified JavaScript stack built on Next.js 14, React 18, GraphQL Yoga, Prisma ORM, Neon PostgreSQL, GitHub OAuth, and Vercel CI/CD.',
    paragraphs: [
      'Team Rocket standardized on JavaScript across the entire stack so every engineer could move seamlessly between UI views and backend handlers inside a single Next.js 14 + React 18 codebase. Beyond standard Next.js REST API routes—where all validation and credit rules execute strictly on the server—the platform exposes a secondary GraphQL Yoga endpoint at /api/graphql.',
      'Persistent state lives in PostgreSQL hosted on Neon with connection pooling, accessed exclusively through Prisma ORM. Authentication supports both GitHub OAuth (essential for verifying repository ownership and fork authorship) and email/password login backed by bcrypt hashing and tamper-proof signed session cookies.',
      'Production runs at digitalgraveyard.cv on Vercel serverless infrastructure. Every push to main triggers an automated build and safe Prisma schema push in roughly 45 seconds; if any lint or build gate fails, Vercel retains the previous healthy deployment. A daily midnight cron job automatically expires unprogressed claims older than 14 days.',
    ],
    callout: {
      type: 'architecture',
      title: 'Safe Schema & Deployment Guarantee',
      body: 'Prisma migrations refuse destructive data-loss changes, seed scripts are strictly additive, and broken builds never overwrite the live production site.',
    },
  },
  {
    id: 'ch-5',
    number: '05',
    title: 'Software Engineering Practices & Test Verification',
    leadAuthorId: 'parth',
    readingMinutes: 5,
    relatedSlideIndex: 11,
    summary:
      'Iterative pivot from the Gravefin prototype, server-enforced security, and 39/39 passing automated API verification checks.',
    paragraphs: [
      'The project evolved iteratively: our initial prototype ("Gravefin") modeled an escrow marketplace over sample data. Recognizing that synthetic data lacked realism and owners of dead projects cannot grant permission, we revisited requirements and pivoted to Digital Graveyard—driven exclusively by live GitHub data and open licenses.',
      'Verification combines three layers: static checks (next lint with zero ESLint warnings and full Vercel production builds), an isolated automated API test runner (scripts/test-all.js) operating against a dedicated local Postgres database that creates and cleans up its own fixtures, and manual dual-account browser testing across normal and incognito sessions.',
      'All 39 automated checks pass across six subsystems: Core Protocol (10), Community Revival (7), Login + API (6), Legal Check (6), Penalties (5), and GitHub OAuth (5). Negative path testing caught and resolved three real defects prior to demo: vague non-fork rejection messages (now explicit HTTP 400 "not a fork"), misattributing the lister as owner, and a test login shortcut that needed disabling in production.',
    ],
    table: {
      caption: 'Table 5.1 — Automated Verification Matrix (39 / 39 Checks Passed)',
      headers: ['Test Scenario', 'Expected / Observed Behavior', 'Subsystem'],
      rows: [
        ['Wrong password login', 'HTTP 401 refused', 'Login + API (6/6)'],
        ['Submit non-fork URL', 'HTTP 400 "not a fork"', 'Core Protocol (10/10)'],
        ['Claim same grave twice', 'HTTP 409 conflict refused', 'Penalties (5/5)'],
        ['Suggest live repo (express)', 'HTTP 403 fails legal check', 'Legal Check (6/6)'],
        ['Two users join one grave', 'Crew of 2 · status ACTIVE', 'Community Revival (7/7)'],
        ['Cron without secret (prod)', 'HTTP 401 unauthorized', 'Security & Auth (5/5)'],
      ],
    },
  },
  {
    id: 'ch-6',
    number: '06',
    title: 'Live Catalogue Summary & Conclusion',
    leadAuthorId: 'lakshay',
    readingMinutes: 3,
    relatedSlideIndex: 7,
    summary:
      'Overview of the 22 indexed open-licensed graves and concluding remarks from Team Rocket.',
    paragraphs: [
      'At demo launch, Digital Graveyard indexes 22 real abandoned open-source repositories across 9 categories ranging from DevTools to Games—21 explicitly archived by their owners, spanning 16 MIT, 3 Apache-2.0, and 3 GPL-3.0 licenses—with active community revivals already underway on atom and stanford-tensorflow-tutorials.',
      'By pairing deterministic legal screening, lifetime commit-history autopsies, and Git-verified revival claims, Digital Graveyard turns abandoned repositories into transparent, collaborative opportunities for students and open-source builders.',
    ],
  },
];

export const REFERENCES = [
  {
    id: 'ref-1',
    citation:
      'Team Rocket — Harshita, Parth Garg, Lakshay Jain, & Arshdeep Kaur (2026). Digital Graveyard: Software Engineering Final Demo & Repository. https://github.com/Harshita445/digital_graveyard_swe',
  },
  {
    id: 'ref-2',
    citation:
      'Live Production Platform: Digital Graveyard. https://digitalgraveyard.cv',
  },
  {
    id: 'ref-3',
    citation:
      'GitHub REST & GraphQL APIs — Repository Licensing, Contributor Statistics & Fork Comparison Endpoints.',
  },
];
