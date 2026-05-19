"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { Check, Minus, X } from "lucide-react"

const FEATURES = [
  { label: "AI-genererade vyer (32 vinklar)", af: true, other: "begränsat" },
  { label: "Spegelneutralisering", af: true, other: false },
  { label: "Manuell fokusjustering", af: true, other: "begränsat" },
  { label: "Vidvinkelkamera", af: true, other: true },
  { label: "Zoomfunktion", af: true, other: true },
  { label: "Val av fordonstyp", af: true, other: "begränsat" },
  { label: "3D-showroom rendering", af: true, other: false },
  { label: "Interaktiv bildvisare", af: true, other: false },
  { label: "Webbuppladdningsplattform", af: true, other: "begränsat" },
  { label: "Live-support dygnet runt", af: true, other: false },
  { label: "Mänskliga QC-retuscherare", af: true, other: false },
  { label: "Varumärkesspecifika OEM-showrooms", af: true, other: false },
]

export function CompetitionSection() {
  return (
    <section className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel className="justify-center" number="10">
              autofox vs. konkurrensen
            </SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Varför 3 800+ återförsäljare väljer{" "}
              <span className="font-display text-primary">autofox</span>.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Marknadsledare", v: "3 800+", d: "återförsäljare" },
            { k: "Mest avancerad", v: "32 vyer", d: "vs. 8–12 hos konkurrenter" },
            { k: "Bäst support", v: "Dygnet runt", d: "live-chatt och telefon" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{s.k}</div>
              <div className="mt-1 text-3xl font-semibold tracking-tight">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.d}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={300} className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
            <div className="grid grid-cols-[1fr_140px_140px] items-center gap-3 border-b border-border/60 bg-background/50 px-6 py-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <span>Funktion</span>
              <span className="text-center text-primary">autofox</span>
              <span className="text-center">Andra leverantörer</span>
            </div>
            <div className="divide-y divide-border/60">
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-[1fr_140px_140px] items-center gap-3 px-6 py-4 hover:bg-secondary/20"
                >
                  <span className="text-sm">{f.label}</span>
                  <div className="flex justify-center">
                    <Cell value={f.af} highlight />
                  </div>
                  <div className="flex justify-center">
                    <Cell value={f.other} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (value === true) {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
        }`}
      >
        <Check className="h-4 w-4" />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <X className="h-4 w-4" />
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[10px] font-mono uppercase text-muted-foreground">
      <Minus className="h-3 w-3" />
      {value}
    </span>
  )
}
