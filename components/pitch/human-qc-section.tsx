"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { AnimatedCounter } from "./animated-counter"
import { ShieldCheck, Users, AlertTriangle, Check } from "lucide-react"

export function HumanQcSection() {
  return (
    <section className="relative border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel number="11">Vårt hemliga vapen</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                <span className="font-display text-primary">45</span> mänskliga retuscherare. Kvalitetskontroll dygnet runt.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                Konkurrenter med endast AI skickar 5–15% defekta bilder direkt till dina annonser. autofox kombinerar AI med ett
                riktigt mänskligt team — varje bild, varje gång.
              </p>
            </Reveal>

            <Reveal delay={300} className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Users, k: "Expertretuscherare", v: 45 },
                { icon: ShieldCheck, k: "Perfekt andel", v: 99.7, suffix: "%" },
              ].map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="rounded-2xl border border-border/60 bg-card p-5">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="mt-3 text-4xl font-semibold tracking-tight">
                      <AnimatedCounter
                        to={s.v}
                        decimals={s.v % 1 === 0 ? 0 : 1}
                        suffix={s.suffix ?? ""}
                        className="tabular-nums"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">{s.k}</div>
                  </div>
                )
              })}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={150} className="grid gap-4 md:grid-cols-2">
              {/* AI only */}
              <div className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase tracking-wider text-destructive">Problemet med endast AI</div>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <div className="mt-4 text-lg font-medium">Rena AI-konkurrenter</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Kvalitetsbrister hamnar direkt i kundsynliga annonser och skadar återförsäljarens rykte.
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {["100% automatiserat", "5–15% felfrekvens", "Ingen manuell korrigering", "Varumärkesrisk"].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-muted-foreground">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                        ×
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-5xl font-semibold tracking-tight text-destructive/80">85–95%</div>
                <div className="text-xs text-muted-foreground">Acceptabel bildfrekvens</div>
              </div>

              {/* autofox advantage */}
              <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-primary/5 p-6">
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono uppercase tracking-wider text-primary">autofox-fördelen</div>
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div className="mt-4 text-lg font-medium">AI + mänskligt team</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    45 retuscherare arbetar dygnet runt för att fånga och korrigera varje brist.
                  </div>
                  <ul className="mt-6 space-y-3 text-sm">
                    {["AI + mänsklig hybrid", "99,7% perfekt andel", "Omedelbar manuell fix", "Varumärkesskydd"].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <Check className="h-3 w-3" />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-5xl font-semibold tracking-tight text-primary">99,7%</div>
                  <div className="text-xs text-muted-foreground">Perfekt första gången-frekvens</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300} className="mt-4 rounded-2xl border border-border/60 bg-card p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Dygnet runt-övervakning</div>
              <div className="mt-2 text-lg font-medium">Den enda AI-fotograferingslösningen med mänsklig QC</div>
              <div className="mt-6 grid grid-cols-12 gap-1">
                {Array.from({ length: 45 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm bg-primary/30"
                    style={{
                      opacity: 0.35 + ((i * 37) % 65) / 100,
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>45 retuscherare</span>
                <span>Aktiva nu</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
