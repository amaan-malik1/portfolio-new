import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

type Props = {
  children: ReactNode
  href: string
  variant?: 'solid' | 'ghost'
  external?: boolean
  className?: string
}

/** Pill CTA that leans toward the cursor. Motion values only, no re-renders. */
export function MagneticButton({ children, href, variant = 'solid', external, className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16 })
  const sy = useSpring(y, { stiffness: 180, damping: 16 })

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-colors duration-300 active:scale-[0.98]'
  const look =
    variant === 'solid'
      ? 'bg-rose text-[oklch(0.98_0.005_340)] hover:bg-rose-bright'
      : 'border border-line text-ink hover:border-rose hover:text-rose-bright'

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${base} ${look} ${className}`}
    >
      {children}
    </motion.a>
  )
}
