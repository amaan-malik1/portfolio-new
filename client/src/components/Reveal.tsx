import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'

/**
 * Scroll reveal that is visible by default. The hidden state is armed
 * pre-paint only when JS is live, IntersectionObserver exists, and the
 * user allows motion; intersection releases it back to the CSS default.
 */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    el.classList.add('is-armed')
    let sawCallback = false
    const io = new IntersectionObserver(
      ([entry]) => {
        sawCallback = true
        if (entry.isIntersecting) {
          el.classList.remove('is-armed')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    // healthy browsers deliver an initial callback immediately; if none
    // arrives the environment is frame-starved, so never hold content hostage
    const safety = window.setTimeout(() => {
      if (!sawCallback) {
        el.classList.remove('is-armed')
        io.disconnect()
      }
    }, 2000)
    return () => {
      window.clearTimeout(safety)
      io.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}s` } as CSSProperties}>
      {children}
    </div>
  )
}
