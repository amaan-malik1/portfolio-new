import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useReducedMotion } from 'motion/react'
import { GithubLogo, List, X } from '@phosphor-icons/react'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  return (
    <motion.header
      initial={reduce ? false : { y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? 'bg-bg/70 backdrop-blur-xl border-b border-line/60' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="type-display text-lg tracking-tight text-ink">
          AM<span className="text-rose">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-muted transition-colors duration-300 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/amaan-malik1"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-rose hover:text-ink"
          >
            <GithubLogo size={18} weight="fill" />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex size-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-b border-line/60 bg-bg/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg font-semibold text-ink active:bg-surface"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/amaan-malik1"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-lg font-semibold text-muted"
            >
              <GithubLogo size={20} weight="fill" /> GitHub
            </a>
          </div>
        </div>
      )}
    </motion.header>
  )
}
