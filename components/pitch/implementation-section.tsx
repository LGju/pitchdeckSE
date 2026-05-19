"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import {
  Rocket,
  TestTubeDiagonal,
  Plug2,
  LifeBuoy,
  MessageSquare,
  GraduationCap,
  BarChart3,
  Sparkles,
  UserPlus,
  Download,
  Users,
  Palette,
  Images,
  Sliders,
  CheckCheck,
  LineChart,
  Workflow,
  ChevronRight,
  CalendarDays,
  Flag,
  CheckCircle2,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Milestone = { icon: LucideIcon; label: string; day: string }
type Phase = {
  week: string
  days: string
  phase: string
  title: string
  headline: string
  icon: LucideIcon
  progress: number
  milestones: Milestone[]
  deliverable: string
  accent: "muted" | "primary" | "live"
}

const WEEKS: Phase[] = [
  {
    week: "Vecka 01",
    days: "Dag 1 — 5",
    phase: "Start",
    title: "Onboarding",
    headline: "Ditt team, helt uppsatt.",
    icon: Rocket,
    progress: 33,
    milestones: [
      { icon: UserPlus, label: "Konto och användarroller skapade", day: "D1" },
      { icon: Download, label: "App installerad på alla enheter", day: "D2" },
      { icon: Users, label: "Live-utbildning med ditt team", day: "D3" },
      { icon: Palette, label: "Varumärkesmaterial och skyltar uppladdade", day: "D5" },
    ],
    deliverable: "Team utbildat · varumärkeskit live",
    accent: "muted",
  },
  {
    week: "Vecka 02",
    days: "Dag 6 — 10",
    phase: "Pilot",
    title: "Testning",
    headline: "Riktiga bilar, riktigt resultat.",
    icon: TestTubeDiagonal,
    progress: 66,
    milestones: [
      { icon: Images, label: "Pilotbatch om 50 fordon", day: "D6" },
      { icon: Plug2, label: "CRM / FTP / DMS-integration", day: "D7" },
      { icon: CheckCheck, label: "Kvalitetsgenomgång med success manager", day: "D9" },
      { icon: Sliders, label: "Stilanpassning och godkännande", day: "D10" },
    ],
    deliverable: "Integrationer verifierade · arbetsflöde godkänt",
    accent: "primary",
  },
  {
    week: "Vecka 03",
    days: "Dag 11 — 15",
    phase: "Go live",
    title: "Live",
    headline: "Full utrullning i hela gruppen.",
    icon: Flag,
    progress: 100,
    milestones: [
      { icon: Rocket, label: "Full divisionslanserande", day: "D11" },
      { icon: Workflow, label: "Automatiserade publiceringspipelines", day: "D12" },
      { icon: LineChart, label: "KPI-dashboard aktiverad", day: "D13" },
      { icon: Sparkles, label: "Veckovis optimeringscykel", day: "D15" },
    ],
    deliverable: "Publicerar till alla portaler på 15 min / bil",
    accent: "live",
  },
]

const SUPPORT = [
  { icon: LifeBuoy, k: "Teknisk support dygnet runt", d: "Chatt, telefon och e-post" },
  { icon: GraduationCap, k: "Schemalagd utbildning", d: "Regelbundna kompetensuppdateringar" },
  { icon: BarChart3, k: "Analysdashboard", d: "Följ prestandamått" },
  { icon: Sparkles, k: "AI-uppdateringar", d: "Kontinuerliga modellförbättringar" },
]

export function ImplementationSection() {
  return (
    <section className="relative border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel className="justify-center" number="17">
              Implementering
            </SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Kom igång på <span className="font-display text-primary">2 veckor</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              En 3-veckors onboarding-sprint med en dedikerad success manager — från start till full utrullning i hela din grupp.
            </p>
          </Reveal>
        </div>

        {/* Header row with phase chips + master progress track */}
        <Reveal delay={250} className="mt-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                15-dagars onboarding-sprint
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                  Start
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  Pilot
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Go live
                </span>
              </div>
            </div>

            {/* Master progress rail */}
            <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/40 via-primary/70 to-primary"
                style={{ width: "100%" }}
              />
              <div className="absolute inset-y-0 left-1/3 w-px -translate-x-1/2 bg-background/80" />
              <div className="absolute inset-y-0 left-2/3 w-px -translate-x-1/2 bg-background/80" />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Dag 1</span>
              <span className="text-center">Dag 5</span>
              <span className="text-right">Dag 15 — live</span>
            </div>
          </div>
        </Reveal>

        {/* Timeline cards */}
        <Reveal delay={300} className="mt-8">
          <div className="relative">
            {/* Desktop connector line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-[4.25rem] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
            />
            <div className="grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
              {WEEKS.map((w, i) => {
                const Icon = w.icon
                const isLive = w.accent === "live"
                const isPrimary = w.accent === "primary"
                return (
                  <div key={w.week} className="relative">
                    {/* Connector arrow between cards (desktop) */}
                    {i < WEEKS.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-[4.25rem] z-10 hidden translate-x-1/2 items-center justify-center md:flex"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background shadow-sm">
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    )}

                    <div
                      className={[
                        "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-colors",
                        isLive
                          ? "border-primary/40 shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]"
                          : "border-border/60 hover:border-border",
                      ].join(" ")}
                    >
                      {/* Top bar */}
                      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                          <span className="text-primary">{w.week}</span>
                          <span className="text-muted-foreground/60">·</span>
                          <span className="text-muted-foreground">{w.days}</span>
                        </div>
                        <span
                          className={[
                            "rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider",
                            isLive
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : isPrimary
                                ? "border-primary/30 bg-primary/5 text-primary"
                                : "border-border/60 bg-background text-muted-foreground",
                          ].join(" ")}
                        >
                          {w.phase}
                        </span>
                      </div>

                      {/* Icon + title block */}
                      <div className="flex items-start gap-4 px-5 pt-5">
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-background">
                          <Icon className="h-5 w-5 text-primary" />
                          {isLive && (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 animate-pulse-ring rounded-2xl border border-primary/60"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-lg font-medium leading-tight">{w.title}</div>
                          <p className="mt-1 text-sm text-muted-foreground">{w.headline}</p>
                        </div>
                      </div>

                      {/* Progress track */}
                      <div className="px-5 pt-5">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          <span>Fasframsteg</span>
                          <span className="text-foreground">{w.progress}%</span>
                        </div>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${w.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Milestones */}
                      <ul className="mt-5 flex-1 space-y-2.5 px-5">
                        {w.milestones.map((m) => {
                          const MIcon = m.icon
                          return (
                            <li
                              key={m.label}
                              className="flex items-start gap-3 rounded-xl border border-transparent px-2 py-1.5 transition-colors hover:border-border/60 hover:bg-background"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background">
                                <MIcon className="h-3.5 w-3.5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm leading-snug">{m.label}</div>
                              </div>
                              <span className="mt-1 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                {m.day}
                              </span>
                            </li>
                          )
                        })}
                      </ul>

                      {/* Deliverable footer */}
                      <div
                        className={[
                          "mt-6 flex items-center gap-2 border-t px-5 py-4 text-sm",
                          isLive
                            ? "border-primary/20 bg-primary/5 text-foreground"
                            : "border-border/60 bg-background/40 text-muted-foreground",
                        ].join(" ")}
                      >
                        <CheckCircle2
                          className={["h-4 w-4 shrink-0", isLive ? "text-primary" : "text-primary/70"].join(" ")}
                        />
                        <span className="truncate">{w.deliverable}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Ongoing support */}
        <Reveal delay={400} className="mt-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-10">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-medium">Löpande optimering</h3>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SUPPORT.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.k} className="rounded-2xl border border-border/60 bg-background p-5">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="mt-3 font-medium">{s.k}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
