"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { Smartphone, Server, Image as ImageIcon, ShieldCheck } from "lucide-react"

const GROUPS = [
  {
    icon: Smartphone,
    title: "Systemkrav",
    items: [
      { k: "Mobil OS", v: "iOS 12+, Android 8+" },
      { k: "Kamera", v: "Min 12 MP" },
      { k: "Anslutning", v: "Stabil 4G / Wi‑Fi" },
      { k: "Lagring", v: "200 MB appstorlek" },
    ],
  },
  {
    icon: Server,
    title: "Integrationsmöjligheter",
    items: [
      { k: "Filformat", v: "JPG, PNG, HEIC" },
      { k: "Uppladdningsmetod", v: "App, FTP, REST API" },
      { k: "Batchbearbetning", v: "Obegränsad" },
      { k: "Utmatningsöverföring", v: "CRM / Webhook" },
    ],
  },
  {
    icon: ImageIcon,
    title: "Utmatningsspecifikationer",
    items: [
      { k: "Bildförhållanden", v: "4:3, 3:2, 16:9, 2:1" },
      { k: "Upplösning", v: "1600×1200 (std.)" },
      { k: "", v: "2048×1536 (kvalitet)" },
      { k: "", v: "3840×2160 (4K premium)" },
      { k: "Bildvyer", v: "32 AI-genererade vinklar" },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Säkerhet & Compliance",
    items: [
      { k: "Integritet", v: "GDPR-kompatibel" },
      { k: "Transit", v: "SSL / TLS 1.3" },
      { k: "Certifiering", v: "SOC 2 Type II" },
      { k: "Tillgänglighet", v: "99,9% drifttid SLA" },
      { k: "Support", v: "24/7 livegrupp" },
    ],
  },
]

export function TechSpecsSection() {
  return (
    <section className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel className="justify-center" number="14">
              Tekniska specifikationer
            </SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Allt som din IT-grupp <span className="font-display text-primary">behöver veta</span>.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {GROUPS.map((g, i) => {
            const Icon = g.icon
            return (
              <Reveal key={g.title} delay={i * 80}>
                <div className="group h-full rounded-3xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">{g.title}</h3>
                  </div>
                  <dl className="mt-6 divide-y divide-border/60">
                    {g.items.map((it, j) => (
                      <div key={j} className="flex items-center justify-between gap-4 py-3 text-sm">
                        <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{it.k}</dt>
                        <dd className="text-right font-medium">{it.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Stat band */}
        <Reveal delay={300} className="mt-10">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-4">
            {[
              { v: "30s", k: "Genomsnittlig bearbetning" },
              { v: "99,9%", k: "Drifttid SLA" },
              { v: "24/7", k: "Support" },
              { v: "2 veckor", k: "Go-live garanti" },
            ].map((s) => (
              <div key={s.k} className="bg-card p-6">
                <div className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
