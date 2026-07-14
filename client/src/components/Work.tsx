import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Plus } from '@phosphor-icons/react'
import { FLAGSHIP, FEATURED, ARCHIVE, type Project } from '../data/projects'
import { CoverArt } from './CoverArt'
import { Reveal } from './Reveal'

gsap.registerPlugin(ScrollTrigger)

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
          {s}
        </li>
      ))}
    </ul>
  )
}

function SourceLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink transition-colors hover:text-rose-bright"
    >
      Source
      <ArrowUpRight size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  )
}

/* ---------------- flagship: split feature panel ---------------- */

function Flagship() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-rose-bright">Flagship</p>
        <h2 className="type-display mt-4 max-w-3xl text-[clamp(2.6rem,6vw,5.2rem)] text-ink">
          Work that ships<span className="text-rose">.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal className="min-h-[320px] lg:min-h-[560px]">
          <CoverArt project={FLAGSHIP} className="size-full min-h-[320px] lg:min-h-[560px]" />
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col justify-center">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="type-display-soft text-4xl text-ink md:text-5xl">{FLAGSHIP.name}</h3>
            <SourceLink href={FLAGSHIP.href} />
          </div>
          <p className="mt-3 text-xl font-semibold text-rose-bright">{FLAGSHIP.tagline}</p>
          <p className="mt-5 max-w-[58ch] leading-relaxed text-muted">{FLAGSHIP.description}</p>

          <ul className="mt-8 space-y-3.5">
            {FLAGSHIP.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px] leading-snug text-ink/85">
                <Plus size={14} weight="bold" className="mt-1 shrink-0 text-rose" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Chips items={FLAGSHIP.stack} />
          </div>
        </Reveal>
      </div>
    </div>
  )
}

/* ---------------- featured: sticky poster stack ---------------- */

function PosterCard({ project }: { project: Project }) {
  return (
    <article className="poster-card sticky top-0 flex min-h-[100dvh] items-center justify-center px-5 py-20 md:px-10">
      <div className="poster-inner relative w-full max-w-[1240px] overflow-hidden rounded-[20px] border border-line/80 bg-surface">
        <div className="relative grid md:grid-cols-[1fr_0.9fr]">
          <CoverArt project={project} className="min-h-[260px] md:min-h-[540px] [&>div]:rounded-none [&>div]:border-0" />
          <div className="flex flex-col justify-center gap-5 p-7 md:p-12">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="type-display-soft text-3xl text-ink md:text-4xl">{project.name}</h3>
              <SourceLink href={project.href} />
            </div>
            <p className="text-lg font-semibold text-rose-bright">{project.tagline}</p>
            <p className="max-w-[52ch] text-[15px] leading-relaxed text-muted">{project.description}</p>
            <ul className="space-y-3">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm leading-snug text-ink/85">
                  <Plus size={13} weight="bold" className="mt-0.5 shrink-0 text-rose" />
                  {f}
                </li>
              ))}
            </ul>
            <Chips items={project.stack} />
          </div>
        </div>
      </div>
    </article>
  )
}

function PosterStack() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!ref.current) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.poster-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        const inner = card.querySelector<HTMLElement>('.poster-inner')
        if (!inner) return
        // as the next card arrives, the covered poster recedes
        gsap.to(inner, {
          scale: 0.92,
          opacity: 0.45,
          filter: 'blur(6px)',
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="relative mt-24">
      {FEATURED.map((p) => (
        <PosterCard key={p.id} project={p} />
      ))}
    </div>
  )
}

/* ---------------- archive: the rest of the bench ---------------- */

function Archive() {
  return (
    <div id="archive" className="mx-auto max-w-[1400px] px-5 pt-28 md:px-10">
      <Reveal>
        <h2 className="type-display-soft text-3xl text-ink md:text-4xl">More builds</h2>
      </Reveal>
      <div className="mt-10 grid gap-x-14 gap-y-9 sm:grid-cols-2">
        {ARCHIVE.map((item, i) => (
          <Reveal key={item.name} delay={(i % 2) * 0.08}>
            <a
              href="https://github.com/amaan-malik1?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-ink transition-colors duration-300 group-hover:text-rose-bright">
                  {item.name}
                </h3>
                {item.building && (
                  <span className="rounded-full bg-ice/15 px-2.5 py-0.5 font-mono text-[11px] text-ice">building</span>
                )}
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{item.line}</p>
              <p className="mt-1.5 font-mono text-xs text-muted/70">{item.stack}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function Work() {
  return (
    <section id="work" className="pt-28 md:pt-40">
      <Flagship />
      <PosterStack />
      <Archive />
    </section>
  )
}
