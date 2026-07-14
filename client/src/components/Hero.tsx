import { Suspense, lazy } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, GithubLogo } from '@phosphor-icons/react'
import { MagneticButton } from './MagneticButton'
import { SOCIALS } from '../data/projects'

const HeroScene = lazy(() => import('./three/HeroScene'))

const EASE = [0.16, 1, 0.3, 1] as const

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col justify-end overflow-clip">
      {/* interactive particle field */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene reduce={!!reduce} />
        </Suspense>
        {/* keep the left column readable over the field */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,oklch(0.09_0_0/0.92)_0%,oklch(0.09_0_0/0.55)_38%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-bg),transparent)]" />
      </div>

      <div className="pointer-events-none relative mx-auto w-full max-w-[1400px] px-5 pb-16 pt-24 md:px-10 md:pb-20">
        <div className="max-w-4xl">
          <h1 className="type-display text-[clamp(3.4rem,11vw,9.5rem)] text-ink">
            <Line delay={0.15}>Amaan</Line>
            <Line delay={0.28}>
              <span className="pl-[0.6em]">
                Malik<span className="text-rose">.</span>
              </span>
            </Line>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl"
          >
            Full-stack engineer building web3 products, realtime apps, and interfaces with unusual care.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#work">
              View work <ArrowDown size={17} weight="bold" />
            </MagneticButton>
            <MagneticButton href={SOCIALS.github} variant="ghost" external>
              <GithubLogo size={17} weight="fill" /> GitHub
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
