export function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-5 py-8 text-sm text-muted md:flex-row md:items-center md:px-10">
        <p>
          © 2026 Amaan Malik<span className="text-rose">.</span>
        </p>
        <p className="font-mono text-xs">Designed and built from scratch. React, Three.js, GSAP, Motion.</p>
      </div>
    </footer>
  )
}
