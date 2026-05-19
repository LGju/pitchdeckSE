"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { Building2, Key, Eye, TrendingUp } from "lucide-react"

const BRANCHES = [
  { code: "FIL‑01", name: "Filial A", token: "AF‑FIL‑001", usage: 320 },
  { code: "FIL‑02", name: "Filial B", token: "AF‑FIL‑002", usage: 245 },
  { code: "FIL‑03", name: "Filial C", token: "AF‑FIL‑003", usage: 412 },
  { code: "FIL‑04", name: "Filial D", token: "AF‑FIL‑004", usage: 188 },
]

const VALUES = [
  { icon: Key, title: "Individuella token", desc: "Varje filial har unika, återkallbara åtkomstuppgifter." },
  { icon: Eye, title: "Fullständig synlighet", desc: "HQ ser varje filial i realtid, över varje mätare." },
  { icon: TrendingUp, title: "Skalbar tillväxt", desc: "Lägg till nya anläggningar direkt — ingen setup-friktion." },
]

export function MultiLocationSection() {
  return (
    <section className="relative border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel className="justify-center" number="13">
              Hantering av flera anläggningar
            </SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              En instrumentpanel. <span className="font-display text-primary">Fullständig kontroll</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Varje filial har sin egen åtkomst-token. HQ övervakar allt — varumärkeskonsistens, efterlevnad, användning — i
              realtid.
            </p>
          </Reveal>
        </div>

        {/* Hierarchy diagram */}
        <Reveal delay={300} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-dot opacity-30" aria-hidden="true" />
            <div className="relative">
              {/* HQ node */}
              <div className="mx-auto flex max-w-md items-center gap-4 rounded-2xl border border-primary/40 bg-primary/5 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary">Huvudkontor för gruppen</div>
                  <div className="text-lg font-medium">Centralt varumärke och övervakning</div>
                </div>
                <div className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[10px] font-mono text-primary">
                  Live
                </div>
              </div>

              {/* Connector */}
              <div className="mx-auto my-6 h-10 w-px bg-gradient-to-b from-primary/60 via-border to-border" />

              {/* Branches grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {BRANCHES.map((b) => (
                  <div
                    key={b.token}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">{b.code}</span>
                    </div>
                    <div className="mt-4 text-sm font-medium">{b.name}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                      <Key className="h-3 w-3" />
                      {b.token}
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 flex justify-between text-[10px] font-mono text-muted-foreground">
                        <span>Månadsanvändning</span>
                        <span>{b.usage} bilar</span>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.min(100, (b.usage / 450) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {VALUES.map((v, i) => {
            const Icon = v.icon
            return (
              <Reveal key={v.title} delay={200 + i * 80}>
                <div className="rounded-2xl border border-border/60 bg-card p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-medium">{v.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground text-pretty">{v.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={400} className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-primary">Kommer Q1 2026</div>
              <div className="mt-1 font-medium">Avancerad HQ-instrumentpanel — övervakning av filialer i realtid och varningssignaler för efterlevnad</div>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase text-muted-foreground">
              {["Övervakning i realtid", "Enhetlig analys", "Automatiserad rapportering", "Varumärkesöverensstämmelse"].map((t) => (
                <span key={t} className="rounded-full border border-border/60 bg-background px-2.5 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
