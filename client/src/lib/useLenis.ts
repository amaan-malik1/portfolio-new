import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Smooth scroll wired into GSAP's ticker so ScrollTrigger stays in sync. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(2, -10 * t),
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Lenis owns the scroll position, so native anchor jumps get pulled
    // back to its internal target. Route hash links through Lenis instead.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a || a.getAttribute('href')!.length < 2) return
      const el = document.querySelector(a.getAttribute('href')!)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement)
      history.pushState(null, '', a.getAttribute('href')!)
    }
    document.addEventListener('click', onClick)
    // handy for debugging and scripted verification
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) lenis.scrollTo(el as HTMLElement, { immediate: true })
    }

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
