import { PaperPlaneTilt, GithubLogo, LinkedinLogo, XLogo } from '@phosphor-icons/react'
import { MagneticButton } from './MagneticButton'
import { Reveal } from './Reveal'
import { SOCIALS } from '../data/projects'

const LINKS = [
  { label: 'GitHub', href: SOCIALS.github, Icon: GithubLogo },
  { label: 'LinkedIn', href: SOCIALS.linkedin, Icon: LinkedinLogo },
  { label: 'X', href: SOCIALS.x, Icon: XLogo },
]

export function Contact() {
  return (
    <section id="contact" className="group/contact relative overflow-hidden pt-36 pb-28 md:pt-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <h2 className="type-display type-outline text-[clamp(3.2rem,12.5vw,11rem)] group-hover/contact:[-webkit-text-stroke-color:var(--color-rose)]">
            Let&apos;s build
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <p className="max-w-[44ch] text-lg leading-relaxed text-muted">
            Have a product to ship or a role to fill? My inbox is open, and I answer fast.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href={`mailto:${SOCIALS.email}`}>
              <PaperPlaneTilt size={17} weight="fill" /> Email me
            </MagneticButton>
            <div className="flex items-center gap-2.5">
              {LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-rose hover:text-ink"
                >
                  <Icon size={19} weight="fill" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
