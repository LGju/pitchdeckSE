"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Check,
  ClipboardList,
  Clock,
  Euro,
  FileCheck2,
  Receipt,
  Save,
  Sparkles,
  Timer,
  TrendingDown,
} from "lucide-react"

import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"
import {
  CURRENCY_META,
  PITCH_GOALS,
  type Currency,
  usePitchInputs,
} from "./pitch-inputs-context"

export function ProblemsSection() {
  return (
    <section
      id="problem"
      className="relative border-t border-border/60 bg-background py-24 sm:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal>
          <SectionLabel number="01">The Problem</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            <span className="font-display">87%</span> of dealerships face these{" "}
            <span className="text-muted-foreground">expensive problems</span>.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg">
            Let&apos;s walk through this with you — your answers feed straight into a personalized
            report we&apos;ll show at the end of the deck.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* LEFT — live dealer discovery card */}
          <Reveal className="lg:col-span-7">
            <DiscoveryCard />
          </Reveal>

          {/* RIGHT — problem statement */}
          <Reveal delay={120} className="lg:col-span-5">
            <ProblemStatement />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ================================ LEFT CARD =============================== */

function DiscoveryCard() {
  const { inputs, setInputs, toggleGoal, saveForReport, hasEnoughForReport, savedAt } =
    usePitchInputs()
  const [justSaved, setJustSaved] = useState(false)

  const handleSave = () => {
    saveForReport()
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2600)
  }

  const symbol = CURRENCY_META[inputs.currency].symbol

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card shadow-xl shadow-primary/5">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Dealer discovery · live
            </div>
            <div className="text-sm font-semibold">Your dealership today</div>
          </div>
        </div>
        <CurrencyToggle
          value={inputs.currency}
          onChange={(c) => setInputs({ currency: c })}
        />
      </div>

      {/* Body */}
      <div className="relative grid gap-5 p-5 sm:p-6">
        {/* Dealer name */}
        <Field label="Dealer / rooftop name" hint="Used on the generated report">
          <input
            type="text"
            value={inputs.dealerName}
            onChange={(e) => setInputs({ dealerName: e.target.value })}
            placeholder="e.g. Emil Frey Deutschland"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        {/* Core discovery numbers */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Field label="Cars sold / year" icon={<Receipt className="h-3 w-3" />}>
            <NumberInput
              value={inputs.carsPerYear}
              onChange={(v) => setInputs({ carsPerYear: v })}
              placeholder="1,200"
              suffix="cars"
            />
          </Field>
          <Field label="Avg. standstill" icon={<Timer className="h-3 w-3" />}>
            <NumberInput
              value={inputs.avgStandstillDays}
              onChange={(v) => setInputs({ avgStandstillDays: v })}
              placeholder="52"
              suffix="days"
            />
          </Field>
          <Field label="Avg. car price" icon={<Euro className="h-3 w-3" />}>
            <NumberInput
              value={inputs.avgCarPrice}
              onChange={(v) => setInputs({ avgCarPrice: v })}
              placeholder="24,500"
              prefix={symbol}
            />
          </Field>
        </div>

        {/* Current cost block */}
        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/40 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Current photo workflow cost
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              benchmark — edit if different
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Field label="Photo + editing / car">
              <NumberInput
                value={inputs.photoCostPerCar}
                onChange={(v) => setInputs({ photoCostPerCar: v ?? 0 })}
                placeholder="55"
                prefix={symbol}
              />
            </Field>
            <Field label="Staff hours / car">
              <NumberInput
                value={inputs.staffHoursPerCar}
                onChange={(v) => setInputs({ staffHoursPerCar: v ?? 0 })}
                placeholder="1.5"
                suffix="h"
                step={0.25}
              />
            </Field>
            <Field label="Hourly rate (loaded)">
              <NumberInput
                value={inputs.hourlyStaffRate}
                onChange={(v) => setInputs({ hourlyStaffRate: v ?? 0 })}
                placeholder="35"
                prefix={symbol}
              />
            </Field>
          </div>
        </div>

        {/* Goals */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Why consider autofox? · tap all that matter
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              {inputs.goals.length} / {PITCH_GOALS.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PITCH_GOALS.map((g) => (
              <GoalChip
                key={g.key}
                active={inputs.goals.includes(g.key)}
                label={g.label}
                hint={g.hint}
                onClick={() => toggleGoal(g.key)}
              />
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <div className="text-xs text-muted-foreground">
            {savedAt ? (
              <span className="inline-flex items-center gap-1.5">
                <FileCheck2 className="h-3.5 w-3.5 text-primary" />
                Saved — the report will generate on slide 17.
              </span>
            ) : hasEnoughForReport ? (
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Ready — hit save to unlock the report.
              </span>
            ) : (
              "Fill in cars/year and avg. car price to unlock the report."
            )}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasEnoughForReport}
            className={[
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
              hasEnoughForReport
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110"
                : "cursor-not-allowed bg-muted text-muted-foreground",
            ].join(" ")}
          >
            {justSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {justSaved ? "Saved" : savedAt ? "Regenerate report" : "Save & generate report"}
          </button>
        </div>
      </div>
    </div>
  )
}

/* =============================== RIGHT COLUMN ============================= */

function ProblemStatement() {
  const PROBLEMS = [
    {
      icon: Clock,
      stat: "9–14 days",
      label: "just to get a car online",
      body: "Photographer booking, moving cars to a studio, waiting on edits. Every day is carrying cost and lost exposure.",
    },
    {
      icon: TrendingDown,
      stat: "€55–€120 / car",
      label: "bleeding into photo + editing",
      body: "Agencies, freelancers, in-house retouchers — none of them scale when your volume doubles.",
    },
    {
      icon: AlertTriangle,
      stat: "Inconsistent",
      label: "brand look across rooftops",
      body: "Different angles, lighting, and backgrounds. Online listings look like classifieds next to OEM-grade competitors.",
    },
  ]

  return (
    <div className="flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background">
          <AlertTriangle className="h-4 w-4" />
        </span>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Why this matters
          </div>
          <div className="text-sm font-semibold">87% of dealers hit the same wall</div>
        </div>
      </div>

      <p className="text-[15px] leading-relaxed text-muted-foreground">
        Photography is the <span className="font-medium text-foreground">#1 bottleneck</span>{" "}
        between a car arriving on the lot and going live online. Here&apos;s what&apos;s costing
        dealerships money today:
      </p>

      <div className="flex flex-1 flex-col gap-3">
        {PROBLEMS.map((p, i) => {
          const Icon = p.icon
          return (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-4"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-lg font-semibold tabular-nums">{p.stat}</span>
                  <span className="text-sm text-muted-foreground">{p.label}</span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-auto rounded-2xl border border-primary/30 bg-primary/5 p-3 text-[12px] leading-relaxed">
        <span className="font-semibold">The opportunity:</span> cut cost/car by ~80%, get cars
        online in hours, and make every rooftop look the same — while staff stay focused on
        selling.
      </div>
    </div>
  )
}

/* ================================= HELPERS ================================ */

function Field({
  label,
  hint,
  icon,
  children,
}: {
  label: string
  hint?: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {icon}
          {label}
        </span>
        {hint ? (
          <span className="truncate text-[10px] text-muted-foreground/70">{hint}</span>
        ) : null}
      </span>
      {children}
    </label>
  )
}

function NumberInput({
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  step,
}: {
  value: number | null
  onChange: (v: number | null) => void
  prefix?: string
  suffix?: string
  placeholder?: string
  step?: number
}) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-border bg-background px-3 py-2 transition-colors focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20">
      {prefix ? (
        <span className="font-mono text-xs text-muted-foreground">{prefix}</span>
      ) : null}
      <input
        type="number"
        inputMode="decimal"
        step={step}
        value={value ?? ""}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === "") {
            onChange(null)
            return
          }
          const n = Number(raw)
          onChange(Number.isFinite(n) ? n : null)
        }}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-sm font-medium tabular-nums outline-none placeholder:text-muted-foreground/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      {suffix ? (
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {suffix}
        </span>
      ) : null}
    </div>
  )
}

function GoalChip({
  active,
  label,
  hint,
  onClick,
}: {
  active: boolean
  label: string
  hint: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all",
        active
          ? "border-primary/60 bg-primary/10"
          : "border-border/60 bg-card hover:border-primary/30 hover:bg-primary/5",
      ].join(" ")}
    >
      <span
        className={[
          "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors",
          active
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background",
        ].join(" ")}
      >
        {active ? <Check className="h-3 w-3" /> : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium leading-tight">{label}</span>
        <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
          {hint}
        </span>
      </span>
    </button>
  )
}

function CurrencyToggle({
  value,
  onChange,
}: {
  value: Currency
  onChange: (c: Currency) => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Currency"
      className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background p-1"
    >
      {(["EUR", "USD"] as Currency[]).map((c) => {
        const active = value === c
        return (
          <button
            key={c}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(c)}
            className={[
              "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {c === "EUR" ? "€ EUR" : "$ USD"}
          </button>
        )
      })}
    </div>
  )
}
