export type Project = {
  id: string
  name: string
  mark: string // short typographic mark used on the cover art
  tagline: string
  description: string
  features: string[]
  stack: string[]
  href: string
  /* cover art recipe: two oklch hues layered over the near-black stage */
  cover: [string, string]
}

export const FLAGSHIP: Project = {
  id: 'solstore',
  name: 'SolStore',
  mark: 'S/',
  tagline: 'Cloud storage, paid in SOL.',
  description:
    'A permissionless storage platform. Connect a Phantom wallet, pay in SOL, and get a provisioned Cloudflare R2 bucket with scoped credentials in seconds. No card, no sales call.',
  features: [
    'Solana indexer confirms payment and provisions the bucket automatically',
    'Credential vault encrypted with AES-256-GCM',
    'BullMQ job queue with exponential-backoff retries',
    'Usage-metered billing with a grace window and auto-reactivation',
  ],
  stack: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'Solana web3.js', 'Cloudflare R2', 'React'],
  href: 'https://github.com/amaan-malik1/SolCloud',
  cover: ['oklch(0.55 0.20 342)', 'oklch(0.35 0.14 300)'],
}

export const FEATURED: Project[] = [
  {
    id: 'adora',
    name: 'Adora AI',
    mark: 'A*',
    tagline: 'Generative studio for images and ad videos.',
    description:
      'A full-stack AI content platform. Generate images and short ad videos with Gemini, organize them into projects, and publish to a community gallery.',
    features: [
      'Gemini-powered image and short-video generation',
      'Project workspaces with a public explore feed',
      'Clerk auth in front of a controller-service REST API',
    ],
    stack: ['React 19', 'Express', 'Prisma', 'PostgreSQL', 'Gemini', 'Cloudinary'],
    href: 'https://github.com/amaan-malik1',
    cover: ['oklch(0.60 0.16 260)', 'oklch(0.40 0.18 340)'],
  },
  {
    id: 'algosteer',
    name: 'AlgoSteer',
    mark: '>>',
    tagline: 'Point your YouTube algorithm somewhere useful.',
    description:
      'Pick a topic and a number of days. A background pulse engine finds high-engagement videos and feeds the recommendation algorithm real signals until your feed follows.',
    features: [
      'Pulse engine schedules likes, views, and subscriptions via the YouTube Data API',
      'Google OAuth with per-topic steering dashboards',
      'Validation layer that skips restricted or low-signal videos',
    ],
    stack: ['React 19', 'Express', 'MongoDB', 'YouTube API', 'Google OAuth'],
    href: 'https://github.com/amaan-malik1',
    cover: ['oklch(0.62 0.19 25)', 'oklch(0.38 0.15 342)'],
  },
  {
    id: 'streamify',
    name: 'Streamify',
    mark: '~)',
    tagline: 'Realtime chat and video for language exchange.',
    description:
      'Messaging with typing indicators and reactions, one-to-one and group video calls with screen share and recording, wrapped in a language-exchange social layer.',
    features: [
      'Stream-powered chat and video with call recording',
      'JWT auth, protected routes, Zustand state',
      'Thirty-two switchable UI themes',
    ],
    stack: ['React 19', 'Stream', 'Express', 'MongoDB', 'TanStack Query'],
    href: 'https://github.com/amaan-malik1',
    cover: ['oklch(0.60 0.14 200)', 'oklch(0.35 0.12 250)'],
  },
  {
    id: 'hypechain',
    name: 'HypeChain',
    mark: 'H^',
    tagline: 'Launch an ERC-20 in one click.',
    description:
      'A meme-coin launchpad in the pump.fun mold. A factory contract deploys your token with custom name, symbol, and supply, lists it live, and takes trades on-chain.',
    features: [
      'Factory contract handles deployment and platform fees',
      'Live wallet balances for ETH and every launched token',
      'Trade page with real-time token listings',
    ],
    stack: ['Solidity', 'Hardhat', 'Ethers', 'React', 'thirdweb'],
    href: 'https://github.com/amaan-malik1',
    cover: ['oklch(0.65 0.15 90)', 'oklch(0.40 0.16 342)'],
  },
]

export type ArchiveItem = {
  name: string
  line: string
  stack: string
  building?: boolean
}

export const ARCHIVE: ArchiveItem[] = [
  { name: 'ThinkRift', line: 'MERN learning platform with roles and cloud media', stack: 'React / Express / MongoDB' },
  { name: 'Second Brain', line: 'Bookmark manager with a shareable brain link', stack: 'React / Express / MongoDB' },
  { name: 'Support Chatbot', line: 'Rule-based e-commerce bot with rich card replies', stack: 'React 19 / Express / Zustand' },
  { name: 'CrowdFunding', line: 'On-chain campaign funding with thirdweb contracts', stack: 'Solidity / Ethers / React' },
  { name: 'Lottery dApp', line: 'Solana lottery with wallet-adapter flows', stack: 'Solana / SPL / React 19' },
  { name: 'Draw App', line: 'Collaborative whiteboard over a dedicated ws service', stack: 'Next.js / ws / Prisma', building: true },
  { name: 'Metaverse', line: '2D virtual-space API in a Turborepo monorepo', stack: 'Express / Prisma / Zod', building: true },
]

export const SOCIALS = {
  github: 'https://github.com/amaan-malik1',
  linkedin: 'https://linkedin.com/in/amaan-malik1',
  x: 'https://x.com/amaaan_ahmad',
  email: 'amikm1077@gmail.com',
}
