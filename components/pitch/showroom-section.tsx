"use client"

import Image from "next/image"
import { useState } from "react"
import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"
import { Crown, Building2, Sparkles, Palette } from "lucide-react"

type Scene = {
  name: string
  /** Optional rendered preview. When missing, a stylized placeholder is shown. */
  image?: string
}

type Tier = {
  id: string
  label: string
  icon: typeof Building2
  count: string
  desc: string
  scenes: Scene[]
}

const TIERS: Tier[] = [
  {
    id: "studio",
    label: "Studio Setup",
    icon: Building2,
    count: "50+",
    desc: "Klassiska fotografistudior med märkta bakgrunder och jämn belysning.",
    scenes: [
      { name: "Cove · LED-band", image: "/showrooms/studio-cove-led.png" },
      { name: "Vit gradient", image: "/showrooms/studio-white-gradient.png" },
      { name: "Mörk disk", image: "/showrooms/studio-dark-disc.png" },
      { name: "Tvåton betong", image: "/showrooms/studio-two-tone-concrete.png" },
      { name: "Asfalt disk", image: "/showrooms/studio-asphalt-disc.png" },
      { name: "Split-tone golv", image: "/showrooms/studio-split-tone.png" },
    ],
  },
  {
    id: "dealership",
    label: "Återförsäljarvåningar",
    icon: Sparkles,
    count: "200+",
    desc: "Verkliga showroom-miljöer — glasklaff, polerade golv, varumärkessignering.",
    scenes: [
      { name: "Milanir · Industrifack", image: "/showrooms/dealership-milanir.jpg" },
      { name: "Chery Zala · Kaklad flaggskip", image: "/showrooms/dealership-chery-zala.jpg" },
      { name: "Bentley Luxemburg · Losch", image: "/showrooms/dealership-bentley.jpg" },
      { name: "MH Automobiler · Trälameller", image: "/showrooms/dealership-mh-automobiler.jpg" },
      { name: "Turners · Varumärkesbanner", image: "/showrooms/dealership-turners.jpg" },
      { name: "Garage Christen · Minimal", image: "/showrooms/dealership-garage-christen.jpg" },
    ],
  },
  {
    id: "highend",
    label: "High‑End",
    icon: Palette,
    count: "180+",
    desc: "Cinematiska lyxmiljöer för premium- och prestandafordon.",
    scenes: [
      { name: "MTS · Arkitektonisk garagebyggnad", image: "/showrooms/highend-mts.jpg" },
      { name: "Betongsakrament · Varm accent", image: "/showrooms/highend-concrete-gallery.jpg" },
      { name: "Monogram suite · LED-band", image: "/showrooms/highend-m-monogram.jpg" },
      { name: "Neon tunnel · Ljusribb", image: "/showrooms/highend-neon-tunnel.jpg" },
      { name: "Slatvägg · Vertikal LED", image: "/showrooms/highend-slat-wall.jpg" },
      { name: "Museumgalleri · Takljus", image: "/showrooms/highend-white-gallery.jpg" },
    ],
  },
  {
    id: "oem",
    label: "Exklusiv OEM",
    icon: Crown,
    count: "1000+",
    desc: "Märkesspecifika showrooms för Audi, BMW, Mercedes, Porsche & mer.",
    scenes: [
      { name: "Mercedes-Benz · Stjärnvägg", image: "/showrooms/oem-mercedes.png" },
      { name: "BMW · Signatur rondell", image: "/showrooms/oem-bmw.png" },
      { name: "Audi · Fyra ringar svit", image: "/showrooms/oem-audi.png" },
      { name: "Lexus · Geometrisk vägg", image: "/showrooms/oem-lexus.png" },
      { name: "Tesla · Strömvägg lounger", image: "/showrooms/oem-tesla.png" },
      { name: "Toyota · Arkitektonisk bro", image: "/showrooms/oem-toyota.png" },
    ],
  },
]

export function ShowroomSection() {
  const [active, setActive] = useState(TIERS[0].id)
  const current = TIERS.find((t) => t.id === active)!
  const Icon = current.icon

  return (
    <section id="showroom" className="relative border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel number="09">Showroom-bibliotek</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Obegränsade showroom <span className="font-display text-primary">alternativ</span>.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                1 500+ bakgrunder över studio-, återförsäljare-, lyxuppsättning och officiella OEM-scener — alla renderade i 3D,
                skräddarsydda för ditt varumärke.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Bibliotek</div>
              <div className="mt-1 text-3xl font-semibold tracking-tight">1 500+ scener</div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="mt-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t) => {
              const TIcon = t.icon
              const isActive = t.id === active
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all",
                    isActive
                      ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border/60 bg-card hover:border-primary/30",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                        isActive ? "bg-primary/15 text-primary" : "bg-background text-muted-foreground",
                      )}
                    >
                      <TIcon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-sm text-primary">{t.count}</span>
                  </div>
                  <div className="mt-4 font-medium">{t.label}</div>
                  <p className="mt-1 text-xs text-muted-foreground text-pretty">{t.desc}</p>
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Showroom gallery */}
        <Reveal delay={400} className="mt-10">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
            <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-5 py-3">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{current.label}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono text-primary">
                  {current.count} scener
                </span>
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                Förhandsvisning · {current.scenes.length} / {current.count}
              </div>
            </div>
            <div
              className={cn(
                "grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-3",
                current.scenes.length > 4 && "xl:grid-cols-3",
              )}
            >
              {current.scenes.map((s, i) => (
                <div key={s.name} className="group relative aspect-[4/3] overflow-hidden bg-card">
                  {s.image ? (
                    <Image
                      src={s.image || "/placeholder.svg"}
                      alt={`${current.label} — ${s.name} preview with a vehicle placed into the scene`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-card transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-grid-sm opacity-30" />
                      <div
                        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg viewBox="0 0 200 100" className="h-16 w-40 text-foreground/60" fill="currentColor">
                          <path d="M30 70 Q30 55 45 55 L60 40 Q65 35 75 35 L130 35 Q140 35 145 40 L160 55 Q175 55 175 70 L175 80 L30 80 Z" />
                        </svg>
                      </div>
                      <div className="absolute right-3 top-3 rounded-full border border-border/60 bg-background/80 px-2 py-0.5 text-[9px] font-mono uppercase text-muted-foreground backdrop-blur">
                        [ client image ]
                      </div>
                    </>
                  )}

                  {/* Scene caption overlay — works on both real images and placeholders */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/70">
                      Scen {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-white">{s.name}</div>
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
