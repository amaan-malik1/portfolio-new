import { Component, Suspense, lazy, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import { ArrowDown, GithubLogo } from '@phosphor-icons/react'
import { MagneticButton } from './MagneticButton'
import { SOCIALS } from '../data/projects'

const HeroScene = lazy(() => import('./three/HeroScene'))

/* the page must survive WebGL being absent; the CSS atmosphere is the fallback */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function useWebGL() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      setOk(!!(c.getContext('webgl2') || c.getContext('webgl')))
    } catch {
      setOk(false)
    }
  }, [])
  return ok
}

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span className="anim-rise block" style={d(delay)}>
        {children}
      </span>
    </span>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const webgl = useWebGL()

  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col justify-end overflow-clip">
      {/* atmosphere base, then the interactive particle field above it */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 55% at 78% 30%, oklch(0.45 0.17 342 / 0.20) 0%, transparent 60%), radial-gradient(50% 40% at 30% 85%, oklch(0.4 0.1 300 / 0.14) 0%, transparent 65%)',
          }}
        />
        {webgl && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene reduce={!!reduce} />
            </Suspense>
          </SceneBoundary>
        )}
        {/* keep the left column readable over the field */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,oklch(0.09_0_0/0.9)_0%,oklch(0.09_0_0/0.45)_38%,transparent_68%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.09_0_0/0.85)_0%,oklch(0.09_0_0/0.4)_38%,transparent_65%)] md:hidden" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-bg),transparent)]" />
      </div>

      <div className="pointer-events-none relative mx-auto w-full max-w-[1400px] px-5 pb-16 pt-24 md:px-10 md:pb-20">
        <div className="max-w-4xl">
          <h1 className="type-display text-[clamp(3.4rem,11vw,9.5rem)] text-ink">
            <Line delay={0.15}>Aman</Line>
            <Line delay={0.28}>
              <span className="pl-[0.6em]">
                Malik<span className="text-rose">.</span>
              </span>
            </Line>
          </h1>

          <p className="anim-fade-up mt-7 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl" style={d(0.55)}>
            Full-stack engineer building web3 products, realtime apps, and interfaces with unusual care.
          </p>

          <div className="anim-fade-up pointer-events-auto mt-10 flex flex-wrap items-center gap-4" style={d(0.7)}>
            <MagneticButton href="#work">
              View work <ArrowDown size={17} weight="bold" />
            </MagneticButton>
            <MagneticButton href={SOCIALS.github} variant="ghost" external>
              <GithubLogo size={17} weight="fill" /> GitHub
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
