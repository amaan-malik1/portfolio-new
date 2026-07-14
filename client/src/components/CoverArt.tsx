import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import type { Project } from '../data/projects'

/**
 * Generated cover art for a project: layered oklch gradients, a fine grid,
 * and the project's typographic mark. Tilts toward the pointer.
 */
export function CoverArt({ project, className = '' }: { project: Project; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 140, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 140, damping: 18 })

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  const [hueA, hueB] = project.cover

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`[perspective:1200px] ${className}`}>
      <motion.div
        style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry }}
        className="relative size-full overflow-hidden rounded-[20px] border border-line/80 bg-[oklch(0.11_0.004_340)]"
      >
        {/* color field */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 85% 10%, ${hueA} 0%, transparent 58%), radial-gradient(110% 90% at 12% 92%, ${hueB} 0%, transparent 62%)`,
            opacity: 0.62,
          }}
        />
        {/* fine engineering grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, oklch(0.9 0 0 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.5) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        {/* typographic mark */}
        <span className="type-display absolute bottom-4 left-6 select-none text-[clamp(5rem,14vw,11rem)] leading-none text-ink/90 [transform:translateZ(40px)]">
          {project.mark}
        </span>
        {/* top sheen */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,oklch(1_0_0/0.09)_0%,transparent_30%)]" />
      </motion.div>
    </div>
  )
}
