"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Sparkles, Clock, Check } from "lucide-react"

const STAT_ROW = [
  { k: "15 min", v: "Leveranstid" },
  { k: "32", v: "AI-genererade vyer" },
  { k: "4K", v: "Print- och webbredo" },
]

const RESULTS = [
  { src: "/results/cupra-formentor.png", alt: "Cupra Formentor processed by autofox for BM Cartrade", label: "Cupra Formentor · BM Cartrade" },
  { src: "/results/bmw-x3-wegert.png", alt: "BMW X3 M Sport processed by autofox for Wegert", label: "BMW X3 · Wegert" },
  { src: "/results/audi-a3-tiemeyer.png", alt: "Audi A3 Sportback processed by autofox for Tiemeyer", label: "Audi A3 · Tiemeyer :plus" },
  { src: "/results/bmw-m4-exclusiv.png", alt: "BMW M4 Competition processed by autofox for Exclusiv Cars", label: "BMW M4 · Exclusiv Cars" },
  { src: "/results/renault-clio-citygarage.png", alt: "Renault Clio processed by autofox for City-Garage AG", label: "Renault Clio · City-Garage AG" },
  { src: "/results/audi-s8-gelder.png", alt: "Audi S8 processed by autofox for Gelder & Sorg", label: "Audi S8 · Gelder & Sorg" },
  { src: "/results/bmw-x5.png", alt: "BMW X5 M Sport processed by autofox in a modern showroom", label: "BMW X5 M Sport" },
  { src: "/results/volvo-xc60-hammer.png", alt: "Volvo XC60 processed by autofox for Hammer Auto Center", label: "Volvo XC60 · Hammer Auto" },
  { src: "/results/mercedes-amg-glc.png", alt: "Mercedes-AMG GLC processed by autofox on branded backdrop", label: "Mercedes-AMG GLC" },
  { src: "/results/audi-q2-amag.png", alt: "Audi Q2 S line processed by autofox for AMAG Occasions", label: "Audi Q2 · AMAG Occasions" },
]

export function BeforeAfterSection() {
  const [pos, setPos] = useState(50)
  const wrapRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [userInteracted, setUserInteracted] = useState(false)

  const onMove = useCallback((clientX: number) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clientX - rect.left
    const p = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPos(p)
  }, [])

  useEffect(() => {
    const up = () => (draggingRef.current = false)
    const move = (e: MouseEvent) => {
      if (draggingRef.current) onMove(e.clientX)
    }
    const tmove = (e: TouchEvent) => {
      if (draggingRef.current && e.touches[0]) onMove(e.touches[0].clientX)
    }
    window.addEventListener("mouseup", up)
    window.addEventListener("touchend", up)
    window.addEventListener("mousemove", move)
    window.addEventListener("touchmove", tmove)
    return () => {
      window.removeEventListener("mouseup", up)
      window.removeEventListener("touchend", up)
      window.removeEventListener("mousemove", move)
      window.removeEventListener("touchmove", tmove)
    }
  }, [onMove])

  // Auto ping-pong the comparator between 8% and 92% until the user interacts.
  useEffect(() => {
    if (userInteracted) return
    // Respect users who prefer reduced motion.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let rafId = 0
    let start: number | null = null
    const periodMs = 7000 // one full back-and-forth cycle
    const min = 8
    const max = 92

    const tick = (t: number) => {
      if (start === null) start = t
      // Sine wave eases naturally at the ends → looks like a hand pulling the handle.
      const phase = ((t - start) % periodMs) / periodMs
      const eased = (1 - Math.cos(phase * Math.PI * 2)) / 2 // 0→1→0
      const next = min + (max - min) * eased
      if (!draggingRef.current) setPos(next)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [userInteracted])

  const handleUserStart = useCallback((clientX: number) => {
    draggingRef.current = true
    setUserInteracted(true)
    onMove(clientX)
  }, [onMove])

  return (
    <section id="before-after" className="relative border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel number="03">Förvandlingen</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Se{" "}
                <span className="font-display text-primary">autofox-skillnaden</span>.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
                En rå mobilbild in, en komplett studioklassad fordonsannons ut — bakgrund, ljussättning,
                reflektioner och återförsäljarmärkning hanteras automatiskt.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-8 space-y-3">
                {[
                  "Mobilkvalitet in, studiokvalitet ut",
                  "Konsekvent varumärkesstyling för varje bil",
                  "Redo att publicera på under 15 minuter",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-10 grid grid-cols-3 gap-3">
                {STAT_ROW.map((s) => (
                  <div
                    key={s.v}
                    className="rounded-2xl border border-border/60 bg-card px-4 py-3"
                  >
                    <div className="text-xl font-semibold tracking-tight sm:text-2xl">{s.k}</div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Genomsnittligt återförsäljarresultat · under 15 min
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <div
                ref={wrapRef}
                className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl"
                onMouseDown={(e) => handleUserStart(e.clientX)}
                onTouchStart={(e) => {
                  if (e.touches[0]) handleUserStart(e.touches[0].clientX)
                }}
              >
                <Image
                  src="/outputs/audi-before.jpg"
                  alt="Raw phone shot of a white Audi e-tron Sportback in a cluttered workshop"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 720px, 100vw"
                  priority
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
                >
                  <Image
                    src="/outputs/audi-after.jpg"
                    alt="Same Audi e-tron Sportback transformed into a pristine autofox studio render"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 720px, 100vw"
                  />
                </div>

                <div className="absolute left-4 top-4 rounded-full border border-border bg-background/90 px-3 py-1 text-[11px] font-mono uppercase tracking-wider backdrop-blur">
                  Före · Mobilbild
                </div>
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-primary backdrop-blur">
                  <Sparkles className="h-3 w-3" />
                  Efter · autofox
                </div>

                <div
                  className="absolute top-0 h-full w-0.5 bg-primary"
                  style={{ left: `${pos}%`, boxShadow: "0 0 20px rgba(228,14,65,0.55)" }}
                >
                  <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-background shadow-lg">
                    <div className="flex gap-0.5">
                      <span className="block h-3 w-0.5 bg-primary" />
                      <span className="block h-3 w-0.5 bg-primary" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground backdrop-blur">
                  {userInteracted ? "Dra för att jämföra" : "Spelar automatiskt · dra för att ta över"}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Real customer results · right-to-left marquee */}
        <Reveal delay={200} className="mt-20 sm:mt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Verkliga kundresultat
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Liveresultat från <span className="font-display text-primary">återförsäljargolv</span>.
              </h3>
            </div>
            <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
              Varje bil nedan fotograferades med en mobil och levererades publiceringsredo av autofox — med återförsäljarmärkning inbakad.
            </p>
          </div>
        </Reveal>

        <Reveal delay={300} className="mt-8">
          <div className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent sm:w-48"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent sm:w-48"
              aria-hidden="true"
            />
            <div className="flex w-max animate-marquee-slow gap-6">
              {[...RESULTS, ...RESULTS].map((r, i) => (
                <figure
                  key={`${r.src}-${i}`}
                  className="relative h-52 w-[22rem] shrink-0 overflow-hidden rounded-2xl sm:h-60 sm:w-[26rem]"
                >
                  <Image
                    src={r.src || "/placeholder.svg"}
                    alt={r.alt}
                    fill
                    className="object-contain"
                    sizes="(min-width: 640px) 26rem, 22rem"
                  />
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
