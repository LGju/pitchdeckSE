"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"
import { cn } from "@/lib/utils"
import { Sparkles, RotateCw, MoveHorizontal } from "lucide-react"

// NOTE: Google Drive aggressively caches iframe previews per-file-id. Bumping the
// `v` param forces the browser to treat this as a fresh URL and re-fetch the
// current preview (increment if the preview still shows an outdated video).
const SPIN_VIDEO_EMBED =
  "https://drive.google.com/file/d/1BU3u9QcAaBngJm_D-MaGjlQc3NDtyYpu/preview?v=2"

export function ResultsSection() {
  return (
    <section id="roadmap" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <SectionLabel number="18">Vad som kommer</SectionLabel>
        </Reveal>

        <Reveal delay={100} className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Från vårt{" "}
              <span className="font-display text-primary">forskningslabb</span>.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              Två funktioner som vårt forskningslabb förfinar just nu för att hålla autofox i framkant —
              båda lanseras till återförsäljare under de kommande månaderna.
            </p>
          </div>
          <div className="af-pill af-pill--outline shrink-0 gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            I labbet
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal delay={150}>
            <ReflectionRemovalCard />
          </Reveal>
          <Reveal delay={250}>
            <SpinPreviewCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Feature 01 · Reflection Removal ---------------- */

function ReflectionRemovalCard() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(52)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, x)))
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      updateFromClientX(e.clientX)
    }
    const onUp = () => {
      dragging.current = false
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [updateFromClientX])

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card">
      <header className="flex items-start justify-between gap-4 border-b border-border/60 p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3 w-3" />
            Funktion 01
          </div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Reflektioner borta. Bilen intakt.
          </h3>
          <p className="mt-2 min-h-[2.75rem] max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            Studiorigg, fönster och pelare — raderad från lacken, karosslinjer orörda.
          </p>
        </div>
      </header>

      <div
        ref={wrapRef}
        onPointerDown={(e) => {
          dragging.current = true
          ;(e.target as Element).setPointerCapture?.(e.pointerId)
          updateFromClientX(e.clientX)
        }}
        className="relative aspect-[4/3] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-muted"
      >
        {/* AFTER (base) */}
        <Image
          src="/roadmap/reflections-after.jpg"
          alt="After: studio reflections removed from car body"
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
        />
        {/* BEFORE (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src="/roadmap/reflections-before.jpg"
            alt="Before: heavy studio reflections on black paint"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
          Före
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-primary/60 bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
          Efter
        </span>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-primary shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          style={{ left: `${pos}%` }}
        />
        <button
          type="button"
          onPointerDown={(e) => {
            e.stopPropagation()
            dragging.current = true
            ;(e.target as Element).setPointerCapture?.(e.pointerId)
          }}
          aria-label="Dra för att jämföra före och efter reflektionsborttagning"
          className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background text-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ left: `${pos}%` }}
        >
          <MoveHorizontal className="h-4 w-4" />
        </button>
      </div>

      <footer className="grid grid-cols-3 gap-0 border-t border-border/60 text-sm">
        <Stat label="Lackfärg" value="Bevarad" />
        <Stat label="Karosslinjer" value="Orörda" mid />
        <Stat label="Status" value="Lanseras snart" />
      </footer>
    </article>
  )
}

function Stat({ label, value, mid = false }: { label: string; value: string; mid?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 px-4 py-4",
        mid && "border-x border-border/60",
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="text-base font-medium text-foreground">{value}</span>
    </div>
  )
}

/* ---------------- Feature 02 · 360° Spin ---------------- */

function SpinPreviewCard() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card">
      <header className="flex items-start justify-between gap-4 border-b border-border/60 p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            <RotateCw className="h-3 w-3" />
            Funktion 02
          </div>
          <h3 className="mt-2 whitespace-nowrap text-2xl font-semibold tracking-tight sm:text-3xl">
            Den mest realistiska 360° snurran.
          </h3>
          <p className="mt-2 min-h-[2.75rem] max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            Stabiliserade ramar, matchad belysning, noll jitter — inbäddad på din VDP.
          </p>
        </div>
      </header>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <iframe
                key={SPIN_VIDEO_EMBED}
                src={SPIN_VIDEO_EMBED}
                title="autofox realistic 360° spin — preview"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />

        {/* Label */}
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-primary/60 bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
          Förhandsvisning live
        </span>
      </div>

      <footer className="grid grid-cols-3 gap-0 border-t border-border/60 text-sm">
        <Stat label="Belysning" value="Matchad" />
        <Stat label="Inbäddning" value="VDP-färdig" mid />
        <Stat label="Status" value="Lanseras snart" />
      </footer>
    </article>
  )
}
