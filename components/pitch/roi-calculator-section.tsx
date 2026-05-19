"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { experimental_useObject as useObject } from "@ai-sdk/react"
import * as z from "zod"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Info,
  Loader2,
  RefreshCcw,
  Sparkles,
  Table2,
  Tag,
  TrendingUp,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"
import {
  CURRENCY_META,
  PITCH_GOALS,
  formatMoney,
  usePitchInputs,
} from "./pitch-inputs-context"

/* ================= SCHEMA (mirrors /api/report exactly) ================= */

const pricingOptionSchema = z.object({
  label: z.enum(["Recommended", "Budget alternative"]),
  recommendedModel: z.enum([
    "Prepaid Basic",
    "Prepaid Premium",
    "Subscription Basic",
    "Subscription Premium",
  ]),
  regionTier: z.enum(["Standard", "Regional −20%", "Emerging −30%"]),
  pricePerCar: z.string(),
  yearlyPrice: z.string(),
  yearlyPriceUpfront: z.string(),
  yearlySavings: z.string(),
  rationale: z.string(),
  showroomAddon: z.enum(["Standard €199", "Customized €299", "Fully custom €599"]),
  upfrontDiscountNote: z.string(),
})

const reportSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  impactHighlights: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      context: z.string(),
    }),
  ),
  pricing: pricingOptionSchema,
  alternativePricing: pricingOptionSchema.nullable(),
  nextSteps: z.array(z.string()),
  personalNote: z.string(),
})

type Report = z.infer<typeof reportSchema>
type PartialReport = Partial<Report>

/* =================================== SLIDE ================================ */

export function RoiCalculatorSection() {
  const { inputs, savedAt, hasEnoughForReport, saveForReport } = usePitchInputs()

  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/report",
    schema: reportSchema,
  })

  const lastRequestedRef = useRef<number | null>(null)

  // Auto-trigger on arrival once a report has been saved on slide 02.
  useEffect(() => {
    if (!savedAt || !hasEnoughForReport) return
    if (lastRequestedRef.current === savedAt) return
    lastRequestedRef.current = savedAt
    submit(inputs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAt, hasEnoughForReport])

  const fallback = useMemo(() => buildFallbackReport(inputs), [inputs])
  const displayed: PartialReport | undefined = error ? fallback : object
  const showFallbackNote = Boolean(error)

  const handleRegenerate = () => {
    if (!hasEnoughForReport) return
    saveForReport()
    submit(inputs)
  }

  return (
    <section
      id="report"
      className="relative border-t border-border/60 bg-background py-24 sm:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal>
          <SectionLabel number="17">Your autofox report</SectionLabel>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                A plan built for{" "}
                <span className="text-primary">
                  {inputs.dealerName?.trim() || "your dealership"}
                </span>
                .
              </h2>
            </div>

            <div className="flex flex-col items-end gap-2">
              <StatusBadge
                isLoading={isLoading}
                hasReport={Boolean(object)}
                error={Boolean(error)}
              />
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <button
                    type="button"
                    onClick={() => stop()}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
                  >
                    Stop
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={!hasEnoughForReport || isLoading}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                    hasEnoughForReport && !isLoading
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110"
                      : "cursor-not-allowed bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  <RefreshCcw className="h-4 w-4" />
                  {savedAt ? "Regenerate" : "Generate report"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Empty state — no discovery yet */}
        {!savedAt ? (
          <Reveal delay={120} className="mt-10">
            <EmptyState />
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-6">
            <Reveal delay={120} className="lg:col-span-8">
              <ReportCard
                report={displayed}
                isLoading={isLoading}
                showFallbackNote={showFallbackNote}
              />
            </Reveal>

            <Reveal delay={200} className="lg:col-span-4">
              <DiscoveryRecap pricing={displayed?.pricing ?? undefined} />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}

/* ============================== STATUS BADGE ============================== */

function StatusBadge({
  isLoading,
  hasReport,
  error,
}: {
  isLoading: boolean
  hasReport: boolean
  error: boolean
}) {
  if (isLoading) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary">
        <Loader2 className="h-3 w-3 animate-spin" />
        Generating live
      </span>
    )
  }
  if (error) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-amber-700">
        <Info className="h-3 w-3" />
        Offline fallback
      </span>
    )
  }
  if (hasReport) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary">
        <Sparkles className="h-3 w-3" />
        AI · personalized
      </span>
    )
  }
  return null
}

/* =============================== REPORT CARD ============================== */

function ReportCard({
  report,
  isLoading,
  showFallbackNote,
}: {
  report: PartialReport | undefined
  isLoading: boolean
  showFallbackNote: boolean
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
      {/* Paper header */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
            <FileText className="h-3.5 w-3.5" />
          </span>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Personalized impact report
            </div>
            <div className="text-sm font-semibold">
              {report?.headline ? (
                report.headline
              ) : isLoading ? (
                <ShimmerText widthClass="w-64" />
              ) : (
                "Generating your report…"
              )}
            </div>
          </div>
        </div>
        {showFallbackNote ? (
          <span className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-amber-700 sm:inline-flex">
            <AlertTriangle className="h-3 w-3" />
            computed locally
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className="grid gap-5 p-5 sm:p-6">
        {/* Summary */}
        <section>
          <SectionHeading icon={<Sparkles className="h-3.5 w-3.5" />} label="Executive summary" />
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">
            {report?.summary ?? (isLoading ? <ShimmerText rows={2} /> : null)}
          </p>
        </section>

        {/* Impact highlights — 3 tiles */}
        <section>
          <SectionHeading icon={<TrendingUp className="h-3.5 w-3.5" />} label="Headline impact" />
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {(report?.impactHighlights && report.impactHighlights.length > 0
              ? report.impactHighlights
              : isLoading
                ? [null, null, null]
                : []
            ).map((h, i) => (
              <HighlightTile
                key={i}
                label={h?.label}
                value={h?.value}
                context={h?.context}
                loading={!h}
              />
            ))}
          </div>
        </section>

        {/* Pricing recommendation */}
        <section>
          <SectionHeading icon={<Tag className="h-3.5 w-3.5" />} label="Recommended pricing" />
          <PricingRecommendation
            pricing={report?.pricing}
            alternativePricing={report?.alternativePricing ?? null}
            loading={isLoading && !report?.pricing}
          />
        </section>

        {/* Next Steps */}
        <section>
          <SectionHeading icon={<ArrowRight className="h-3.5 w-3.5" />} label="Next steps" />
          <ol className="mt-2 grid gap-2 sm:grid-cols-2">
            {(report?.nextSteps && report.nextSteps.length > 0
              ? report.nextSteps
              : isLoading
                ? [null, null]
                : []
            ).map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-2xl border border-border/60 bg-background px-3 py-2.5 text-[13.5px] leading-relaxed"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <span>{s ?? <ShimmerText widthClass="w-56" />}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Personal note */}
        {report?.personalNote ? (
          <section className="rounded-2xl border-t border-border/60 pt-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <p className="text-[14px] italic leading-relaxed text-muted-foreground">
                {report.personalNote}
              </p>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

/* =========================== PRICING RECOMMENDATION ======================= */

const SHOWROOM_OPTIONS = [
  {
    value: "Standard €199",
    title: "Standard",
    price: "€199",
    tag: "Ready-made backgrounds",
  },
  {
    value: "Customized €299",
    title: "Customized",
    price: "€299",
    tag: "Your logo, floor & walls",
  },
  {
    value: "Fully custom €599",
    title: "Fully custom",
    price: "€599",
    tag: "Bespoke showroom concept",
  },
] as const

type PricingOption = Report["pricing"] | Partial<Report["pricing"]>

function PricingRecommendation({
  pricing,
  alternativePricing,
  loading,
}: {
  pricing?: PricingOption
  alternativePricing?: PricingOption | null
  loading: boolean
}) {
  const hasAlt = Boolean(alternativePricing)
  const selectedShowrooms = [
    pricing?.showroomAddon,
    alternativePricing?.showroomAddon,
  ].filter(Boolean) as string[]

  return (
    <div className="mt-3 space-y-3">
      <div className={hasAlt ? "grid gap-3 md:grid-cols-2" : "grid gap-3"}>
        <PricingOptionCard option={pricing} emphasis="primary" loading={loading} />
        {hasAlt ? (
          <PricingOptionCard option={alternativePricing!} emphasis="alt" loading={false} />
        ) : null}
      </div>

      {/* Showroom options strip */}
      <div className="rounded-2xl border border-border/60 bg-background p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Showroom add-ons (one-time)
          </div>
          <div className="text-[11px] text-muted-foreground">Pick one</div>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {SHOWROOM_OPTIONS.map((opt) => {
            const selected = selectedShowrooms.includes(opt.value)
            const isPrimaryPick = pricing?.showroomAddon === opt.value
            return (
              <div
                key={opt.value}
                className={[
                  "relative rounded-xl border px-3 py-2.5 transition-colors",
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border/60 bg-card",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <div className="text-[13px] font-semibold">{opt.title}</div>
                  <div
                    className={[
                      "font-mono text-[12px] tabular-nums",
                      selected ? "text-primary" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {opt.price}
                  </div>
                </div>
                <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {opt.tag}
                </div>
                {isPrimaryPick ? (
                  <span className="absolute -top-2 right-2 inline-flex items-center rounded-full bg-primary px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary-foreground">
                    Picked
                  </span>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function PricingOptionCard({
  option,
  emphasis,
  loading,
}: {
  option?: PricingOption
  emphasis: "primary" | "alt"
  loading: boolean
}) {
  const isPrimary = emphasis === "primary"
  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border",
        isPrimary
          ? "border-primary/40 bg-gradient-to-br from-primary/5 to-transparent"
          : "border-border/60 bg-background",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border/60 px-4 py-2">
        <div className="flex items-center gap-2">
          <span
            className={[
              "inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
              isPrimary
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            ].join(" ")}
          >
            {option?.label ?? (isPrimary ? "Recommended" : "Budget alternative")}
          </span>
          <span className="inline-flex items-center rounded-full border border-border/60 bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground">
            {option?.recommendedModel ??
              (loading ? <ShimmerText widthClass="w-20" /> : "—")}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {option?.regionTier ?? (loading ? <ShimmerText widthClass="w-14" /> : "—")}
        </span>
      </div>

      <div className="px-4 py-3">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Yearly price
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span
            className={[
              "font-semibold tabular-nums",
              isPrimary ? "text-3xl" : "text-2xl",
            ].join(" ")}
          >
            {option?.yearlyPrice ?? (loading ? <ShimmerText widthClass="w-24" /> : "—")}
          </span>
          <span className="text-xs text-muted-foreground">/ year</span>
        </div>
        <div className="mt-0.5 text-[12px] text-muted-foreground tabular-nums">
          {option?.pricePerCar ?? (loading ? <ShimmerText widthClass="w-16" /> : "—")}
        </div>

        {/* Upfront discount row */}
        <div
          className={[
            "mt-3 flex items-center justify-between gap-3 rounded-xl border px-3 py-2",
            isPrimary
              ? "border-primary/30 bg-primary/10"
              : "border-border/60 bg-muted/40",
          ].join(" ")}
        >
          <div className="min-w-0">
            <div
              className={[
                "font-mono text-[10px] uppercase tracking-wider",
                isPrimary ? "text-primary" : "text-muted-foreground",
              ].join(" ")}
            >
              Pay upfront −10%
            </div>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-lg font-semibold tabular-nums">
                {option?.yearlyPriceUpfront ??
                  (loading ? <ShimmerText widthClass="w-20" /> : "—")}
              </span>
              <span className="text-[11px] text-muted-foreground">/ year</span>
            </div>
          </div>
          <div
            className={[
              "whitespace-nowrap text-right font-mono text-[11px] tabular-nums",
              isPrimary ? "text-primary" : "text-foreground/70",
            ].join(" ")}
          >
            {option?.yearlySavings ?? (loading ? <ShimmerText widthClass="w-16" /> : "—")}
          </div>
        </div>

        <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
          {option?.rationale ?? (loading ? <ShimmerText rows={2} /> : null)}
        </p>
      </div>
    </div>
  )
}

/* =========================== DISCOVERY RECAP CARD ========================= */

function DiscoveryRecap({
  pricing,
}: {
  pricing?: Report["pricing"] | Partial<Report["pricing"]>
}) {
  const { inputs } = usePitchInputs()
  const meta = CURRENCY_META[inputs.currency]
  const fmt = (v: number) => formatMoney(v, inputs.currency)

  const cars = inputs.carsPerYear ?? 0
  const annualPhoto =
    cars * (inputs.photoCostPerCar + inputs.staffHoursPerCar * inputs.hourlyStaffRate)

  // Autofox cost = the recommended plan's yearly upfront cost (what the dealer actually pays).
  const autofoxAnnual = parseMoney(pricing?.yearlyPriceUpfront) ?? parseMoney(pricing?.yearlyPrice)
  const saveAnnual =
    autofoxAnnual != null ? Math.max(annualPhoto - autofoxAnnual, 0) : null

  const selectedGoals = PITCH_GOALS.filter((g) => inputs.goals.includes(g.key))

  return (
    <aside className="flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-card p-5 sm:p-6">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          From your discovery
        </div>
        <h3 className="mt-1 text-base font-semibold">The inputs behind the report</h3>
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm">
        <RecapRow
          label="Cars / year"
          value={inputs.carsPerYear != null ? inputs.carsPerYear.toLocaleString() : "—"}
        />
        <RecapRow
          label="Avg. price"
          value={inputs.avgCarPrice != null ? fmt(inputs.avgCarPrice) : "—"}
        />
        <RecapRow
          label="Standstill"
          value={inputs.avgStandstillDays != null ? `${inputs.avgStandstillDays} days` : "—"}
        />
        <RecapRow label="Currency" value={`${meta.symbol} ${inputs.currency}`} />
        <RecapRow label="Photo cost" value={`${fmt(inputs.photoCostPerCar)} / car`} />
        <RecapRow
          label="Staff time"
          value={`${inputs.staffHoursPerCar}h × ${fmt(inputs.hourlyStaffRate)}`}
        />
      </dl>

      <div className="rounded-2xl border border-emerald-600/30 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/30">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
          Quick math · based on inputs
        </div>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <div className="text-3xl font-semibold tabular-nums text-emerald-700 dark:text-emerald-300">
              {saveAnnual != null ? fmt(saveAnnual) : "—"}
            </div>
            <div className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
              {saveAnnual != null && saveAnnual > 0
                ? "estimated annual savings"
                : saveAnnual === 0
                  ? "cost parity — win via speed + revenue"
                  : "waiting for the recommended plan…"}
            </div>
          </div>
          <div className="text-right text-[11px] text-emerald-800/70 dark:text-emerald-300/70">
            today {fmt(annualPhoto)}
            <br />
            autofox {autofoxAnnual != null ? fmt(autofoxAnnual) : "—"}
          </div>
        </div>
      </div>

      <PricingStructureButton />

      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Goals on the table
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selectedGoals.length ? (
            selectedGoals.map((g) => (
              <span
                key={g.key}
                className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] text-foreground"
              >
                {g.label}
              </span>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">No goals selected on slide 02.</span>
          )}
        </div>
      </div>
    </aside>
  )
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background p-2.5">
      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium tabular-nums">{value}</dd>
    </div>
  )
}

/* ================================ EMPTY STATE ============================= */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <FileText className="h-5 w-5" />
      </span>
      <div className="max-w-md">
        <h3 className="text-xl font-semibold">Report not generated yet.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Go back to slide <span className="font-mono text-foreground">02</span>, fill in the
          dealer discovery card with your client, and hit{" "}
          <span className="font-medium text-foreground">Save &amp; generate report</span>. The
          personalized report will appear right here.
        </p>
      </div>
    </div>
  )
}

/* =============================== MICRO PARTS ============================== */

function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      {icon}
      {label}
    </div>
  )
}

function HighlightTile({
  label,
  value,
  context,
  loading,
}: {
  label?: string
  value?: string
  context?: string
  loading: boolean
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background p-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label ?? (loading ? <ShimmerText widthClass="w-24" /> : "—")}
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
        {value ?? (loading ? <ShimmerText widthClass="w-20" /> : "—")}
      </div>
      <div className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
        {context ?? (loading ? <ShimmerText rows={2} /> : null)}
      </div>
    </div>
  )
}

function ShimmerText({ rows = 1, widthClass }: { rows?: number; widthClass?: string }) {
  return (
    <span className="inline-flex w-full flex-col gap-1.5 align-middle">
      {Array.from({ length: rows }).map((_, i) => (
        <span
          key={i}
          className={[
            "block h-3 animate-pulse rounded bg-muted",
            widthClass ?? (i === rows - 1 ? "w-2/3" : "w-full"),
          ].join(" ")}
        />
      ))}
    </span>
  )
}

/* ============================= FALLBACK REPORT ============================ */

/**
 * Deterministic local fallback mirroring the compact API schema exactly.
 * Used if the OpenAI request fails — so the pitch never has a dead slide.
 */
function buildFallbackReport(
  inputs: ReturnType<typeof usePitchInputs>["inputs"],
): PartialReport {
  const cars = inputs.carsPerYear ?? 0

  // Plan selector: push yearly Prepaid. For ≥ 500 cars/yr, offer Premium + Customized
  // showroom as the recommendation AND a Basic + Standard showroom alternative.
  const effectiveCars = cars || 500
  const brandGoal = inputs.goals.includes("consistency")
  const highVolume = effectiveCars >= 500

  const primary = buildPlanOption({
    cars: effectiveCars,
    tier: highVolume ? "premium" : "basic",
    label: "Recommended",
    showroom: highVolume ? "Customized €299" : brandGoal ? "Customized €299" : "Standard €199",
    highVolume,
  })

  const alternative = highVolume
    ? buildPlanOption({
        cars: effectiveCars,
        tier: "basic",
        label: "Budget alternative",
        showroom: "Standard €199",
        highVolume: true,
      })
    : null

  // Savings anchored to the RECOMMENDED plan's real €/car (not a hardcoded number).
  const todayPerCar =
    inputs.photoCostPerCar + inputs.staffHoursPerCar * inputs.hourlyStaffRate
  const autofoxPerCar =
    (parseMoney(primary.pricePerCar) ?? 0) +
    inputs.staffHoursPerCar * 0.25 * inputs.hourlyStaffRate
  const savedPerCar = todayPerCar - autofoxPerCar
  const annualSave = Math.max(Math.round(savedPerCar * cars), 0)

  // Revenue upside: +10% price uplift applied to avg car price × cars/year, scaled
  // conservatively to the share of buyers influenced (use 17% click uplift as the lever).
  const avgPrice = inputs.avgCarPrice ?? 0
  const revenueUpside = Math.round(avgPrice * cars * 0.1 * 0.17)

  const fmt = (v: number) => formatMoney(v, inputs.currency)

  const savingsHighlight =
    savedPerCar > 0
      ? {
          label: "Annual savings",
          value: `${fmt(annualSave)} / yr`,
          context: `${fmt(Math.round(savedPerCar))} saved per car × ${cars.toLocaleString()} cars.`,
        }
      : {
          label: "Cost parity",
          value: "Break-even",
          context: "Real win is speed + revenue upside below.",
        }

  return {
    headline: `A clear win for ${inputs.dealerName?.trim() || "your dealership"}`,
    summary: `Replacing your current ${fmt(todayPerCar)} per-car photo workflow with autofox at ~${fmt(autofoxPerCar)} frees meaningful budget every year. Better imagery also lifts clicks and justifies a small price premium on every listing.`,
    impactHighlights: [
      savingsHighlight,
      {
        label: "Standstill cut",
        value: "2.5 days",
        context: "Listings go live hours, not days, after arrival.",
      },
      {
        label: "Revenue upside",
        value: `${fmt(revenueUpside)} / yr`,
        context: "+17% clicks and ~10% price uplift on listings.",
      },
    ],
    pricing: primary,
    alternativePricing: alternative,
    nextSteps: [
      "Run a 2-week pilot on 200 cars across one rooftop.",
      "Plug autofox into your VSS / AutoScout24 / mobile.de flow.",
    ],
    personalNote: `${inputs.dealerName?.trim() || "Your team"} — low-risk move with outsized impact. We'll partner through pilot and rollout.`,
  }
}

/* ----------------------- Plan picker for the fallback ---------------------- */

type PricingOptionFallback = Report["pricing"]

// Prepaid table — Basic €/car & 3-year total. Premium ≈ Basic × (9.99 / 5.99).
const PREPAID_BASIC = [
  { v: 100, pc: 5.99, tot: 599 },
  { v: 250, pc: 5.69, tot: 1423 },
  { v: 500, pc: 5.39, tot: 2696 },
  { v: 750, pc: 5.09, tot: 3819 },
  { v: 1000, pc: 4.79, tot: 4792 },
  { v: 2500, pc: 4.49, tot: 11231 },
  { v: 5000, pc: 4.19, tot: 20965 },
  { v: 7500, pc: 3.89, tot: 29201 },
  { v: 10000, pc: 3.59, tot: 35940 },
] as const

function buildPlanOption({
  cars,
  tier,
  label,
  showroom,
  highVolume,
}: {
  cars: number
  tier: "basic" | "premium"
  label: PricingOptionFallback["label"]
  showroom: PricingOptionFallback["showroomAddon"]
  highVolume: boolean
}): PricingOptionFallback {
  // Pick the largest Prepaid tier row where row.v <= carsPerYear.
  const target = Math.max(cars, 100)
  const row = [...PREPAID_BASIC].reverse().find((r) => r.v <= target) ?? PREPAID_BASIC[0]

  // Premium multiplier derived from the top row (€9.99 / €5.99).
  const premMult = 9.99 / 5.99
  const perCar = tier === "premium" ? row.pc * premMult : row.pc

  // Yearly price = carsPerYear × tier's €/car. Plain and clear.
  const yearly = Math.round(cars * perCar)
  const yearlyUpfront = Math.round(yearly * 0.9)
  const savings = yearly - yearlyUpfront

  const model: PricingOptionFallback["recommendedModel"] =
    tier === "premium" ? "Prepaid Premium" : "Prepaid Basic"

  const rationale =
    tier === "premium"
      ? `At ${cars.toLocaleString()} cars/year, Premium includes manual human QC — essential for brand protection at this volume.`
      : highVolume
        ? `Same ${row.v.toLocaleString()}-car tier on Basic for a leaner entry point (no manual QC).`
        : `${cars.toLocaleString()} cars/year on the ${row.v.toLocaleString()}-car prepaid tier — best per-car rate (3-year validity).`

  return {
    label,
    recommendedModel: model,
    regionTier: "Standard",
    pricePerCar: `€${perCar.toFixed(2)} / car`,
    yearlyPrice: `€${yearly.toLocaleString()}`,
    yearlyPriceUpfront: `€${yearlyUpfront.toLocaleString()}`,
    yearlySavings: `Save €${savings.toLocaleString()} / yr`,
    rationale,
    showroomAddon: showroom,
    upfrontDiscountNote: `Pay upfront and save €${savings.toLocaleString()}.`,
  }
}

/* =============================== MONEY PARSER ============================= */

/** Parse "€7,192" / "€7.99 / car" / "$1,200" into a number. Returns null if unparseable. */
function parseMoney(input: unknown): number | null {
  if (typeof input !== "string") return null
  const cleaned = input.replace(/[^\d,.\-]/g, "")
  if (!cleaned) return null
  // Assume thousands separators: remove commas, keep the final dot as decimal.
  const dotCount = (cleaned.match(/\./g) ?? []).length
  const normalized =
    dotCount > 1
      ? cleaned.replace(/\./g, "").replace(/,/g, ".")
      : cleaned.replace(/,/g, "")
  const n = Number.parseFloat(normalized)
  return Number.isFinite(n) ? n : null
}

/* ========================= PRICING STRUCTURE DIALOG ======================= */

// Full pricing reference — mirrors the Autofox pricing sheet.
const PREPAID_FULL = [
  { v: 100, basicPc: 5.99, basicTotal: 599, premPc: 9.99, premTotal: 999 },
  { v: 250, basicPc: 5.69, basicTotal: 1423, premPc: 9.49, premTotal: 2373 },
  { v: 500, basicPc: 5.39, basicTotal: 2696, premPc: 8.99, premTotal: 4496 },
  { v: 750, basicPc: 5.09, basicTotal: 3819, premPc: 8.49, premTotal: 6369 },
  { v: 1000, basicPc: 4.79, basicTotal: 4792, premPc: 7.99, premTotal: 7992 },
  { v: 2500, basicPc: 4.49, basicTotal: 11231, premPc: 7.49, premTotal: 18731 },
  { v: 5000, basicPc: 4.19, basicTotal: 20965, premPc: 6.99, premTotal: 34965 },
  { v: 7500, basicPc: 3.89, basicTotal: 29201, premPc: 6.49, premTotal: 48701 },
  { v: 10000, basicPc: 3.59, basicTotal: 35940, premPc: 5.99, premTotal: 59940 },
] as const

const SHOWROOM_FULL = [
  { name: "Standard showroom", price: 199, tag: "Ready-made backgrounds" },
  { name: "Customized showroom", price: 299, tag: "Your logo + floor / wall changes" },
  { name: "Fully custom showroom", price: 599, tag: "Bespoke customer concept" },
] as const

function PricingStructureButton() {
  const { inputs } = usePitchInputs()
  // Keep the input as a raw string so users can freely type / clear / edit
  // without mid-typing clamping (e.g. "1" getting forced to "10").
  const [calcCarsInput, setCalcCarsInput] = useState<string>(
    inputs.carsPerYear && inputs.carsPerYear > 0
      ? String(inputs.carsPerYear)
      : "1000",
  )

  // Derived numeric — clamped only at calculation time, not on keystroke.
  const calcCars = Math.max(1, Number.parseInt(calcCarsInput || "0", 10) || 0)

  // Pick the Prepaid tier by rounding DOWN on carsPerYear. Below 100 → smallest tier.
  const tierRow =
    [...PREPAID_FULL].reverse().find((r) => r.v <= Math.max(calcCars, 100)) ?? PREPAID_FULL[0]
  const basicYearly = Math.round(calcCars * tierRow.basicPc)
  const premYearly = Math.round(calcCars * tierRow.premPc)
  const basicUpfront = Math.round(basicYearly * 0.9)
  const premUpfront = Math.round(premYearly * 0.9)

  const eur = (n: number) => `€${n.toLocaleString("en-US")}`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Table2 className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">View full pricing structure</span>
              <span className="text-[11px] text-muted-foreground">
                Show tables · calculate other volumes
              </span>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-[min(96vw,1200px)] max-w-[1200px] overflow-y-auto p-0 sm:p-0">
        <DialogHeader className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/10 via-card to-card px-6 py-5 text-left">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
              <Table2 className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-xl">Autofox pricing structure</DialogTitle>
              <DialogDescription className="mt-0.5">
                Prepaid plans with 3-year validity. Pay upfront to save an extra 10%.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-5">
          {/* Live calculator */}
          <section className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-5">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  Calculate for your volume
                </div>
                <label className="mt-2 flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Cars / year</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={calcCarsInput}
                    onChange={(e) => {
                      // Allow only digits; keep empty string so the field can be cleared.
                      const cleaned = e.target.value.replace(/[^\d]/g, "")
                      setCalcCarsInput(cleaned)
                    }}
                    onBlur={() => {
                      if (!calcCarsInput) setCalcCarsInput("0")
                    }}
                    placeholder="e.g. 2500"
                    className="w-36 rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-base tabular-nums outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </label>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span>Tier</span>
                  <span className="tabular-nums text-foreground">
                    {tierRow.v.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground/60">·</span>
                  <span>largest row ≤ your volume</span>
                </div>
              </div>

              <div className="grid min-w-[300px] flex-1 grid-cols-2 gap-3">
                <CalcTile
                  kind="basic"
                  perCar={tierRow.basicPc}
                  yearly={basicYearly}
                  upfront={basicUpfront}
                  eur={eur}
                />
                <CalcTile
                  kind="premium"
                  perCar={tierRow.premPc}
                  yearly={premYearly}
                  upfront={premUpfront}
                  eur={eur}
                />
              </div>
            </div>
          </section>

          {/* Prepaid table */}
          <section>
            <div className="mb-2 flex items-end justify-between gap-3">
              <h4 className="text-sm font-semibold">Prepaid model · 3-year validity</h4>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Full table
              </span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-3 py-2.5">Vehicles</th>
                    <th className="px-3 py-2.5">Basic €/veh</th>
                    <th className="px-3 py-2.5">Basic total</th>
                    <th className="px-3 py-2.5">Premium €/veh</th>
                    <th className="px-3 py-2.5">Premium total</th>
                  </tr>
                </thead>
                <tbody>
                  {PREPAID_FULL.map((r, i) => {
                    const active = r.v === tierRow.v
                    return (
                      <tr
                        key={r.v}
                        className={[
                          "border-b border-border/40 tabular-nums transition-colors",
                          active
                            ? "bg-primary/10 font-semibold"
                            : i % 2 === 1
                              ? "bg-muted/20 hover:bg-muted/40"
                              : "hover:bg-muted/30",
                        ].join(" ")}
                      >
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span>{r.v.toLocaleString()}</span>
                            {active && (
                              <span className="inline-flex items-center rounded-full bg-primary px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-primary-foreground">
                                Your tier
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2">€{r.basicPc.toFixed(2)}</td>
                        <td className="px-3 py-2">{eur(r.basicTotal)}</td>
                        <td className="px-3 py-2">€{r.premPc.toFixed(2)}</td>
                        <td className="px-3 py-2">{eur(r.premTotal)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Showrooms + upfront upsell */}
          <section className="grid gap-3 lg:grid-cols-[1.15fr_1fr]">
            <div className="rounded-2xl border border-border/60 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Tag className="h-3.5 w-3.5" />
                </span>
                <h4 className="text-sm font-semibold">Showroom add-ons</h4>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  one-time
                </span>
              </div>
              <ul className="space-y-2">
                {SHOWROOM_FULL.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-background px-3 py-2.5 text-[13px] transition-colors hover:border-primary/30"
                  >
                    <div className="min-w-0">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-[11px] text-muted-foreground">{s.tag}</div>
                    </div>
                    <div className="shrink-0 font-mono font-semibold tabular-nums">
                      {eur(s.price)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  Upfront payment
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight">−10%</span>
                <span className="text-sm text-muted-foreground">off the total</span>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                Applied to any Prepaid plan when paid in a single payment.
              </p>
              <div className="mt-4 space-y-1.5 border-t border-primary/20 pt-3 font-mono text-[11px] tabular-nums">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">
                    Basic · {calcCars.toLocaleString()} cars
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-muted-foreground/80">{eur(basicYearly)}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground/60" />
                    <span className="font-semibold text-primary">{eur(basicUpfront)}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">
                    Premium · {calcCars.toLocaleString()} cars
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-muted-foreground/80">{eur(premYearly)}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground/60" />
                    <span className="font-semibold text-primary">{eur(premUpfront)}</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CalcTile({
  kind,
  perCar,
  yearly,
  upfront,
  eur,
}: {
  kind: "basic" | "premium"
  perCar: number
  yearly: number
  upfront: number
  eur: (n: number) => string
}) {
  const isPremium = kind === "premium"
  const savings = yearly - upfront
  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl border p-3",
        isPremium
          ? "border-primary/50 bg-card shadow-sm shadow-primary/10"
          : "border-border/60 bg-background",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {isPremium ? (
            <Sparkles className="h-3 w-3 text-primary" />
          ) : (
            <Tag className="h-3 w-3" />
          )}
          <span>{isPremium ? "Premium" : "Basic"}</span>
        </div>
        <div className="font-mono text-[11px] tabular-nums text-muted-foreground">
          €{perCar.toFixed(2)} / car
        </div>
      </div>
      <div className="mt-1.5 text-xl font-semibold tabular-nums">{eur(yearly)}</div>
      <div className="text-[11px] text-muted-foreground">per year</div>
      <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-border/40 pt-2 text-[12px]">
        <span className="text-muted-foreground">Upfront −10%</span>
        <span className="font-mono font-semibold tabular-nums text-primary">
          {eur(upfront)}
        </span>
      </div>
      <div className="mt-1 flex items-baseline justify-between gap-2 text-[11px]">
        <span className="text-muted-foreground">You save</span>
        <span className="font-mono tabular-nums text-primary/80">−{eur(savings)}</span>
      </div>
    </div>
  )
}
