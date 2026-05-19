"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"

const DASHBOARD_VIDEO_EMBED =
  "https://drive.google.com/file/d/1ZK3Bs5PstlgMpaA4DTyVWa1xyWrx4H37/preview"

export function DashboardSection() {
  return (
    <section className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel className="justify-center" number="08">
              CRM-systemet
            </SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              En central punkt för <span className="font-display text-primary">kontroll</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Hantera varje fordon, varje filial, varje bild — live, på ett ställe.
            </p>
          </Reveal>
        </div>

        <Reveal delay={300} className="mt-16">
          <DashboardPreview />
        </Reveal>
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl shadow-black/40">
      {/* Browser chrome */}
      <div className="flex items-center justify-between border-b border-border/60 bg-background/50 px-5 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-muted" />
          <div className="h-3 w-3 rounded-full bg-muted" />
          <div className="h-3 w-3 rounded-full bg-muted" />
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background px-3 py-1 text-xs font-mono text-muted-foreground">
          <span className="text-primary">●</span>
          crm.autofox.ai
        </div>
        <div className="w-16" />
      </div>

      {/* Video player fills the browser body at the same size as the old dashboard */}
      <div className="relative w-full bg-black" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          src={DASHBOARD_VIDEO_EMBED}
          title="autofox CRM walkthrough"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  )
}
