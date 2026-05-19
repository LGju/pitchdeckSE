"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { Sparkles, Upload, Share2 } from "lucide-react"

const PLATFORMS = ["Facebook", "Instagram", "TikTok", "YouTube Shorts", "Marketplace"]

const VIDEOS = [
  {
    id: "1kiOF0wy5TtL064QYSZAO__q7RqPq0IPq",
    title: "autofox AI sociala videor — exempel 1",
    tag: "9:16 · Reels / TikTok",
  },
  {
    id: "1l5ufgH491u2KRFHr6S8lG8TEMyvIWLqW",
    title: "autofox AI sociala videor — exempel 2",
    tag: "9:16 · Reels / TikTok",
  },
] as const

export function VideoMarketingSection() {
  return (
    <section className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel number="12">AI video marknadsföring</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Auto‑genererade <span className="font-display text-primary">sociala videor</span>. Noll manuellt
                arbete.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                Omvandla dina fordonsfoton till färdiga sociala mediavideor. Perfekt för Facebook, Instagram &
                TikTok-annonser — automatiskt.
              </p>
            </Reveal>

            <Reveal delay={300} className="mt-8 flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground"
                >
                  {p}
                </span>
              ))}
            </Reveal>

            <Reveal delay={400} className="mt-8 space-y-2">
              <Step n="01" title="Datagenerering" desc="Hämtar dina 32 vinklar + fordonsmetadata." />
              <Step n="02" title="Auto-komposition" desc="Mallar, musik, övergångar & textning tillämpade." />
              <Step n="03" title="Klar för marknadsföring" desc="Vertikala, kvadratiska & landskapsutmatningar levererade." />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <div className="grid gap-4 sm:grid-cols-2">
                {VIDEOS.map((v) => (
                  <div
                    key={v.id}
                    className="group relative aspect-[9/16] overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl shadow-black/40"
                  >
                    <iframe
                      src={`https://drive.google.com/file/d/${v.id}/preview`}
                      title={v.title}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                    <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-[10px] font-mono uppercase backdrop-blur">
                      {v.tag}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300} className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Upload, k: "Inmatning", v: "32 foton" },
                { icon: Sparkles, k: "Process", v: "< 90s" },
                { icon: Share2, k: "Utmatning", v: "3 format" },
              ].map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.k}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-[10px] font-mono uppercase text-muted-foreground">{s.k}</div>
                      <div className="text-sm font-medium">{s.v}</div>
                    </div>
                  </div>
                )
              })}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4">
      <span className="font-mono text-xs text-muted-foreground">{n}</span>
      <div>
        <div className="font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}
