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
  href: 'https://solstore.pro',
  cover: ['oklch(0.55 0.20 342)', 'oklch(0.35 0.14 300)'],
}

export const FEATURED: Project[] = [
  {
    id: 'noori',
    name: 'NoorI',
    mark: '◈',
    tagline: 'Parental controls that work even when they delete the app.',
    description:
      'Network-level protection powered by Cloudflare Zero Trust. Rules enforce at the DNS layer — no on-device agent, no bypass, no spyware. One dashboard, every child, separate policies.',
    features: [
      'Block categories, apps, and domains via Cloudflare Gateway DNS rules',
      'Per-child isolation — each account gets its own identity-scoped policy',
      'Activity logs with app detection, blocked-site alerts, and 90-day history',
    ],
    stack: ['React', 'Express', 'PostgreSQL', 'Cloudflare Zero Trust', 'Prisma', 'Razorpay'],
    href: 'https://noori.fun',
    cover: ['oklch(0.72 0.18 65)', 'oklch(0.38 0.14 30)'],
  },
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
    href: 'https://adora-ai.vercel.app',
    cover: ['oklch(0.60 0.16 260)', 'oklch(0.40 0.18 340)'],
  },
  {
    id: 'learnify',
    name: 'Learnify',
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
    href: 'https://learnify-hd52.onrender.com/',
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
    href: 'https://hype-chain-gamma.vercel.app',
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
  linkedin: 'https://linkedin.com/in/amaan-malik1/',
  x: 'https://x.com/amaaan_ahmad',
  email: 'amikm1077@gmail.com',
}
