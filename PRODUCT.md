# PRODUCT.md

## What this is

Personal portfolio site for **Aman Malik**, a full-stack and web3 engineer. Single landing page (for now) that presents his flagship product (SolStore / SolCloud), selected projects, capabilities, and contact. The design itself is the proof of skill: the page must demonstrate motion, 3D, and frontend craft, not just describe it.

## Audience

Recruiters, founders, and collaborators scanning quickly. They should leave with: this person ships real products (Solana storage platform, realtime apps, dapps) and has rare frontend taste.

## Register

brand

## Platform

web

## Voice

Engineered, kinetic, deliberate. Short declarative copy. Technical without costume. No filler verbs ("elevate", "unleash"), no em-dashes, no fake metrics.

## Design system

- **Theme:** dark, locked. Near-black stage `oklch(0.09 0 0)`, no section theme flips.
- **Color strategy:** Committed. Signal rose `oklch(0.64 0.21 342)` carries identity (hero light, CTAs, highlights). Ice cyan `oklch(0.87 0.06 200)` is the second role (badges, secondary marks). Neutrals are pure (chroma ~0).
- **Type:** Archivo Variable. Display = expanded width (wdth 110-125), heavy weights, tight tracking. Body = normal width. JetBrains Mono for small technical labels only.
- **Shape:** cards 20px radius, buttons pill, chips pill. One system.
- **Motion:** Lenis smooth scroll, GSAP ScrollTrigger for pinned/scrubbed sections, Motion (`motion/react`) for micro-physics and reveals, R3F for the hero scene. All gated behind `prefers-reduced-motion`.

## Stack

Vite + React 19 + TypeScript. Tailwind v4 (`@tailwindcss/vite`). motion, gsap, lenis, three + @react-three/fiber + @react-three/drei. Icons: @phosphor-icons/react only. Fonts self-hosted via @fontsource.

## Content source

Project data lives in `client/src/data/projects.ts`, extracted from the real repos in `D:/Cohort 3.0/Projects Full Stack/` and `D:/SolCloud/SolCloudCode`. Flagship: SolStore. Keep descriptions factual to what the code actually does.
