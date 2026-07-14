import { motion, useReducedMotion } from 'motion/react'
import { siSolana, siEthereum, siSolidity, siGreensock, siThreedotjs, type SimpleIcon } from 'simple-icons'

const EASE = [0.16, 1, 0.3, 1] as const

function Cell({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={`relative overflow-hidden rounded-[20px] border border-line/80 bg-surface p-7 md:p-9 ${className}`}
    >
      {children}
    </motion.div>
  )
}

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label={icon.title}>
      <path d={icon.path} />
    </svg>
  )
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-5 pt-32 md:px-10 md:pt-44">
      <div className="max-w-3xl">
        <h2 className="type-display text-[clamp(2.4rem,5.5vw,4.6rem)] text-ink">
          Engineer first, designer close second<span className="text-rose">.</span>
        </h2>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
          I work across the whole surface: smart contracts and job queues on one end, shaders and scroll choreography on
          the other. Most of my time lives in the JavaScript, TypeScript, and Solana ecosystems.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12">
        <Cell className="md:col-span-7">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, oklch(0.2 0.01 340 / 0.55) 0 1px, transparent 1px 26px)',
            }}
          />
          <div className="relative">
            <h3 className="text-2xl font-bold text-ink">Full-stack product engineering</h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted">
              Express and Prisma APIs over Postgres or Mongo, Redis-backed queues, auth, payments, and billing logic.
              Built to survive retries, race conditions, and real users.
            </p>
            <p className="mt-5 font-mono text-xs text-muted/80">
              Node / Express / Prisma / PostgreSQL / MongoDB / Redis / BullMQ / Zod
            </p>
          </div>
        </Cell>

        <Cell className="md:col-span-5" delay={0.08}>
          <div className="flex items-center gap-4 text-muted">
            <BrandIcon icon={siSolana} />
            <BrandIcon icon={siEthereum} />
            <BrandIcon icon={siSolidity} />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-ink">Web3 native</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Solana indexers and wallet flows, EVM factory contracts, launchpads, and dApps. Payments without a payment
            processor.
          </p>
        </Cell>

        <Cell className="md:col-span-5" delay={0.05}>
          <div className="flex h-8 items-end gap-1.5" aria-hidden>
            {[0.5, 0.9, 0.35, 0.7, 1, 0.45, 0.8, 0.6, 0.95, 0.4].map((h, i) => (
              <span
                key={i}
                className="pulse-bar w-1.5 rounded-full bg-rose/70"
                style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
          <h3 className="mt-6 text-2xl font-bold text-ink">Realtime systems</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Live chat, video calls, typing indicators, and collaborative rooms over WebSockets and Stream.
          </p>
        </Cell>

        <Cell className="md:col-span-7" delay={0.12}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 120% at 88% 0%, oklch(0.5 0.19 342 / 0.35) 0%, transparent 55%), radial-gradient(70% 100% at 10% 100%, oklch(0.6 0.1 200 / 0.18) 0%, transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-4 text-muted">
              <BrandIcon icon={siThreedotjs} />
              <BrandIcon icon={siGreensock} />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-ink">Motion and 3D interfaces</h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted">
              GSAP scroll choreography, spring physics, and WebGL shaders. This page is the demo: the hero field, the
              poster stack, and every magnetic button on it.
            </p>
          </div>
        </Cell>
      </div>
    </section>
  )
}
