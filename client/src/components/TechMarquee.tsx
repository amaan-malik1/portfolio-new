import {
  siReact,
  siTypescript,
  siNodedotjs,
  siSolana,
  siEthereum,
  siPostgresql,
  siMongodb,
  siPrisma,
  siRedis,
  siExpress,
  siTailwindcss,
  siGreensock,
  siThreedotjs,
  siDocker,
  siSolidity,
  type SimpleIcon,
} from 'simple-icons'

const STACK: SimpleIcon[] = [
  siTypescript,
  siReact,
  siNodedotjs,
  siSolana,
  siPostgresql,
  siPrisma,
  siRedis,
  siEthereum,
  siSolidity,
  siMongodb,
  siExpress,
  siTailwindcss,
  siGreensock,
  siThreedotjs,
  siDocker,
]

function LogoRow() {
  return (
    <div className="flex shrink-0 items-center">
      {STACK.map((icon) => (
        <span key={icon.slug} className="mx-7 flex items-center gap-3 text-muted md:mx-10">
          <svg viewBox="0 0 24 24" className="size-6 fill-current opacity-80" aria-hidden>
            <path d={icon.path} />
          </svg>
          <span className="whitespace-nowrap font-mono text-sm">{icon.title}</span>
        </span>
      ))}
    </div>
  )
}

/** The daily toolkit, straight from the repos. */
export function TechMarquee() {
  return (
    <section
      aria-label="Technologies I work with"
      className="overflow-hidden border-y border-line/70 bg-surface/40 py-6"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
    >
      <div className="marquee-track flex w-max">
        <LogoRow />
        <LogoRow />
      </div>
    </section>
  )
}
