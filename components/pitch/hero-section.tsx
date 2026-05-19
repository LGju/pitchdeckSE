"use client"

import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

/**
 * Slide 01 — Cover.
 * Follows the PDF "Stop Losing Money on Vehicle Photography" layout:
 *   eyebrow → display headline (two lines, "fox" gradient in highlight)
 *   → subtitle → AI-powered pill → 3 stat tiles (90% / 50-60 / $200)
 *   Flat white surface, hairline border, no shadow, no blur glow.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh w-full flex-col justify-between bg-background px-6 pb-16 pt-20 sm:px-10"
    >
      {/* Top meta strip */}
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>Säljpresentation &middot; 2026</span>
        <span className="hidden sm:inline">Konfidentiellt</span>
        <span>SE</span>
      </div>

      {/* Center content */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-14">
        <Reveal>
          <span className="af-pill">
            <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--af-red)]" />
            AI-drivna transformationer
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-8 max-w-5xl text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.97] tracking-[-0.01em] text-foreground">
            Sluta förlora pengar på
            <br />
            fordons<span className="af-gradient-text">fotografering</span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.3] text-muted-foreground">
            Tänk om dåliga fordonsbilder kostar dig tusentals kronor varje vecka? autofox förvandlar en enda
            mobilbild till <span className="text-foreground">32 studioklassade vyer</span> — redo för ditt CRM på
            minuter, inte dagar.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--af-red)] px-6 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Boka en live-demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#before-after"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-white px-6 text-[15px] font-medium text-foreground transition-colors hover:bg-[color:var(--af-snow)]"
            >
              Se förvandlingen
            </a>
          </div>
        </Reveal>
      </div>

      {/* Bottom: three stat tiles + cover index */}
      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal delay={320}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="af-tile">
                <div className="af-tile-num">{s.value}</div>
                <div className="flex flex-col gap-1">
                  <div className="af-tile-lbl">{s.label}</div>
                  <div className="af-tile-src">{s.source}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const STATS = [
  { value: "90%", label: "av bilköpare anser att bilder är extremt viktiga", source: "*Cox Automotive" },
  { value: "50–60", label: "Dagar genomsnittlig tid på uppställningsplats", source: "*Deloitte Benchmarks" },
  { value: "2000 kr", label: "Veckovis lagerkostnad per fordon", source: "*Deloitte Benchmarks" },
]
