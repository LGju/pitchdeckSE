"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Grid3x3, Keyboard, X } from "lucide-react"
import { Wordmark } from "./wordmark"

export type Slide = {
  id: string
  title: string
  group: string
  node: React.ReactNode
  tone?: "light" | "ink"
}

export function PitchDeck({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  const total = slides.length

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next))
      const el = slideRefs.current[clamped]
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setIndex(clamped)
      setMenuOpen(false)
    },
    [total],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault()
        next()
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        prev()
      } else if (e.key === "Home") {
        e.preventDefault()
        goTo(0)
      } else if (e.key === "End") {
        e.preventDefault()
        goTo(total - 1)
      } else if (e.key.toLowerCase() === "m") {
        setMenuOpen((v) => !v)
      } else if (e.key === "?" || e.key === "/") {
        setShowHelp((v) => !v)
      } else if (e.key === "Escape") {
        setMenuOpen(false)
        setShowHelp(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev, goTo, total])

  // Track active slide on scroll
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            const i = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(i)) setIndex(i)
          }
        })
      },
      { root, threshold: [0.55, 0.7, 0.9] },
    )
    slideRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const current = slides[index]
  const progress = ((index + 1) / total) * 100

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background text-foreground">
      {/* Scroll-snap slides container */}
      <div
        ref={containerRef}
        className="h-full w-full snap-y snap-proximity overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar"
      >
        {slides.map((s, i) => (
          <section
            key={s.id}
            ref={(el) => {
              slideRefs.current[i] = el
            }}
            data-index={i}
            id={s.id}
            className={[
              "relative flex min-h-dvh w-full snap-start snap-always flex-col",
              s.tone === "ink" ? "ink-panel" : "bg-background",
            ].join(" ")}
          >
            {s.node}
          </section>
        ))}
      </div>

      {/* Top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between p-4 sm:p-6">
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => goTo(0)}
            className={[
              "inline-flex items-center rounded-full border px-3 py-1.5 text-sm backdrop-blur transition-colors",
              current?.tone === "ink"
                ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "border-border/70 bg-card/80 text-foreground hover:bg-card",
            ].join(" ")}
            aria-label="Back to cover"
          >
            <Wordmark size="sm" />
          </button>
          <div
            className={[
              "hidden rounded-full border px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] backdrop-blur sm:inline-block",
              current?.tone === "ink"
                ? "border-white/15 bg-white/5 text-white/70"
                : "border-border/70 bg-card/80 text-muted-foreground",
            ].join(" ")}
          >
            {current?.group}
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setShowHelp((v) => !v)}
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition-colors",
              current?.tone === "ink"
                ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "border-border/70 bg-card/80 text-foreground hover:bg-card",
            ].join(" ")}
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts (?)"
          >
            <Keyboard className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm backdrop-blur transition-colors",
              current?.tone === "ink"
                ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "border-border/70 bg-card/80 text-foreground hover:bg-card",
            ].join(" ")}
            aria-label="Slide index"
            title="Slide index (M)"
          >
            <Grid3x3 className="h-4 w-4" />
            <span className="hidden sm:inline">Index</span>
          </button>
        </div>
      </header>

      {/* Bottom controls */}
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-end justify-between p-4 sm:p-6">
        {/* Slide counter + title */}
        <div
          className={[
            "pointer-events-auto max-w-[60%] rounded-2xl border px-4 py-2.5 backdrop-blur",
            current?.tone === "ink"
              ? "border-white/15 bg-white/5 text-white"
              : "border-border/70 bg-card/80 text-foreground",
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            <span
              className={[
                "font-mono text-xs tabular-nums",
                current?.tone === "ink" ? "text-white/60" : "text-muted-foreground",
              ].join(" ")}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span
              className={[
                "h-3 w-px",
                current?.tone === "ink" ? "bg-white/20" : "bg-border",
              ].join(" ")}
            />
            <span className="truncate text-sm font-medium">{current?.title}</span>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            className={[
              "inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-all disabled:opacity-40",
              current?.tone === "ink"
                ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "border-border/70 bg-card/80 text-foreground hover:bg-card",
            ].join(" ")}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            disabled={index === total - 1}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:brightness-110 disabled:opacity-40"
            aria-label="Next slide"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </footer>

      {/* Progress bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-0.5 bg-transparent">
        <div
          className="h-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide index overlay */}
      {menuOpen && (
        <div className="absolute inset-0 z-50 flex items-start justify-center bg-foreground/60 p-4 backdrop-blur-md sm:p-8">
          <div className="mt-16 w-full max-w-6xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Slide index</div>
                <h3 className="mt-0.5 text-xl font-semibold">Jump to a section</h3>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background text-foreground hover:bg-muted"
                aria-label="Close index"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid max-h-[70vh] gap-1 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3">
              {slides.map((s, i) => {
                const isActive = i === index
                return (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    className={[
                      "group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                      isActive
                        ? "border-primary/50 bg-primary/10"
                        : "border-border/60 bg-background hover:border-primary/30 hover:bg-muted",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs tabular-nums",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary",
                      ].join(" ")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{s.title}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">{s.group}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard help overlay */}
      {showHelp && (
        <div
          onClick={() => setShowHelp(false)}
          className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <h3 className="text-lg font-semibold">Keyboard shortcuts</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <dl className="divide-y divide-border/60">
              {[
                ["→ / Space", "Next slide"],
                ["←", "Previous slide"],
                ["Home", "First slide"],
                ["End", "Last slide"],
                ["M", "Open slide index"],
                ["?", "This help"],
                ["Esc", "Close overlays"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-5 py-3">
                  <dt className="text-sm text-muted-foreground">{v}</dt>
                  <dd>
                    <kbd className="rounded-md border border-border/70 bg-muted px-2 py-1 font-mono text-xs">{k}</kbd>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}
