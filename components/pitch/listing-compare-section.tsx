"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import {
  Calendar,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  Phone,
  Settings2,
  Share2,
  Sparkles,
  Star,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"

/* --------------------------------- Data --------------------------------- */

type Listing = {
  variant: "before" | "after"
  badge: string
  photos: { src: string; alt: string }[]
  stats: { views: string; saves: string; inquiries: string }
}

const LISTINGS: Listing[] = [
  {
    variant: "before",
    badge: "Telefonfoton",
    photos: [
      { src: "/listing-compare/cupra-01-before.jpg", alt: "Front three-quarter on lot" },
      { src: "/listing-compare/cupra-02-before.jpg", alt: "Front three-quarter outdoor" },
      { src: "/listing-compare/cupra-03-before.jpg", alt: "Dead front outdoor" },
      { src: "/listing-compare/cupra-07-before.jpg", alt: "Profile on asphalt" },
      { src: "/listing-compare/cupra-04-before.jpg", alt: "Rear three-quarter outdoor" },
      { src: "/listing-compare/cupra-06-before.jpg", alt: "Opposite rear three-quarter" },
      { src: "/listing-compare/cupra-05-before.jpg", alt: "Dead rear outdoor" },
    ],
    stats: { views: "142", saves: "3", inquiries: "1" },
  },
  {
    variant: "after",
    badge: "autofox förbättrad",
    photos: [
      { src: "/listing-compare/cupra-01-after.jpg", alt: "Front three-quarter studio" },
      { src: "/listing-compare/cupra-02-after.jpg", alt: "Front three-quarter studio alt" },
      { src: "/listing-compare/cupra-03-after.jpg", alt: "Dead front studio" },
      { src: "/listing-compare/cupra-07-after.jpg", alt: "Profile studio" },
      { src: "/listing-compare/cupra-04-after.jpg", alt: "Rear three-quarter studio" },
      { src: "/listing-compare/cupra-06-after.jpg", alt: "Opposite rear three-quarter studio" },
      { src: "/listing-compare/cupra-05-after.jpg", alt: "Dead rear studio" },
    ],
    stats: { views: "852", saves: "18", inquiries: "6" },
  },
]

const SHARED = {
  title: "CUPRA Formentor VZ 2.0 TSI 4Drive DSG",
  subtitle: "Matte Magnetic Grey · Akrapovič · Sennheiser Sound",
  price: "€ 48,900",
  priceNote: "incl. 20% VAT · financing from €529/mo",
  location: "BM Cartrade · 2326 Maria Lanzendorf, AT",
  rating: "4.9",
  reviews: "312",
  specs: [
    { icon: Calendar, label: "First reg.", value: "05/2024" },
    { icon: Gauge, label: "Mileage", value: "8,420 km" },
    { icon: Fuel, label: "Fuel", value: "Petrol" },
    { icon: Settings2, label: "Gearbox", value: "DSG Auto" },
    { icon: Zap, label: "Power", value: "310 hp" },
    { icon: MapPin, label: "Drive", value: "4Drive AWD" },
  ],
}

/* ------------------------------- Component ------------------------------- */

export function ListingCompareSection() {
  // Shared active-photo index so both listings change together, plus a hover-pause
  // so the sales rep can stop the auto-rotation by hovering either card.
  const photoCount = LISTINGS[0].photos.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % photoCount)
    }, 3200)
    return () => window.clearInterval(id)
  }, [paused, photoCount])

  return (
    <section
      id="listing-compare"
      className="relative border-t border-border/60 bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel number="10">Marknadsplatseffekt</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Samma bil. <span className="font-display text-primary">Två</span> annonser.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                Real CUPRA Formentor VZ från ett liveåterförsäljarlager — telefonbilderna bredvid autofox-förbättrad
                version. Samma metall, samma pris, samma körsträcka. Bara bilderna förändrades.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <div className="font-mono text-[10px] uppercase tracking-wider text-primary">
                Engagemenghöjning
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight">6×</span>
                <span className="text-sm text-muted-foreground">fler visningar i genomsnitt</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Listings */}
        <Reveal delay={200} className="mt-12">
          <div
            className="relative grid gap-6 lg:grid-cols-2 lg:gap-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {LISTINGS.map((l) => (
              <ListingCard
                key={l.variant}
                listing={l}
                active={active}
                onSelect={setActive}
              />
            ))}

            {/* VS divider — only visible on desktop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 items-center lg:flex"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 bg-background font-mono text-xs font-semibold uppercase tracking-wider text-primary shadow-lg shadow-primary/10">
                vs
              </div>
            </div>
          </div>
        </Reveal>

        {/* Footnote */}
        <Reveal delay={400} className="mt-8">
          <p className="text-center text-xs text-muted-foreground">
            Annonsuppsättningen är illustrativ och modellerad på vanliga europeiska marknadsplatskortkort. Fordonsdata
            återspeglar den faktiska enheten BM Cartrade har i lager.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------ Listing Card ----------------------------- */

function ListingCard({
  listing,
  active,
  onSelect,
}: {
  listing: Listing
  active: number
  onSelect: (i: number) => void
}) {
  const isAfter = listing.variant === "after"
  const current = listing.photos[active]

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card transition-shadow",
        isAfter
          ? "border-primary/40 shadow-xl shadow-primary/10"
          : "border-border/60",
      )}
    >
        {/* Variant ribbon */}
      <div
        className={cn(
          "absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider backdrop-blur",
          isAfter
            ? "bg-primary text-primary-foreground"
            : "border border-border/60 bg-background/80 text-muted-foreground",
        )}
      >
        {isAfter ? <Sparkles className="h-3 w-3" /> : null}
        {listing.badge}
      </div>

      {/* Action icons top-right */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          aria-label="Spara annons"
          tabIndex={-1}
        >
          <Heart className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          aria-label="Dela annons"
          tabIndex={-1}
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Main image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <Image
          key={current.src}
          src={current.src || "/placeholder.svg"}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn(
            "object-cover transition-opacity duration-300",
            isAfter ? "" : "saturate-[0.92]",
          )}
          priority={active === 0}
        />

        {/* Photo counter */}
        <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 font-mono text-[10px] tabular-nums text-white backdrop-blur">
          {String(active + 1).padStart(2, "0")} / {String(listing.photos.length).padStart(2, "0")}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-border/60 bg-muted/30 p-2">
        {listing.photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show photo ${i + 1}`}
            className={cn(
              "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-all",
              i === active
                ? isAfter
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-foreground/60 ring-2 ring-foreground/10"
                : "border-border/60 opacity-70 hover:opacity-100",
            )}
          >
            <Image
              src={p.src || "/placeholder.svg"}
              alt=""
              fill
              sizes="80px"
              className={cn("object-cover", isAfter ? "" : "saturate-[0.92]")}
            />
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5">
        {/* Title + price */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-tight text-pretty">
              {SHARED.title}
            </h3>
            <p className="mt-1 text-[13px] text-muted-foreground">{SHARED.subtitle}</p>
          </div>
          <div className="shrink-0 text-right">
            <div
              className={cn(
                "text-xl font-semibold tracking-tight tabular-nums",
                isAfter ? "text-primary" : "text-foreground",
              )}
            >
              {SHARED.price}
            </div>
            <div className="text-[10px] text-muted-foreground">{SHARED.priceNote}</div>
          </div>
        </div>

        {/* Spec grid */}
        <div className="grid grid-cols-3 gap-2">
          {SHARED.specs.map((s) => {
            const SIcon = s.icon
            return (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/60 px-2.5 py-2"
              >
                <SIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <div className="truncate text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="truncate text-[12px] font-medium tabular-nums">{s.value}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dealer row */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/60 p-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold uppercase text-background">
              BM
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[13px] font-medium">
                <span className="truncate">BM Cartrade</span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-muted px-1.5 py-0.5 font-mono text-[9px] uppercase text-muted-foreground">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  {SHARED.rating}
                  <span className="text-muted-foreground/70">({SHARED.reviews})</span>
                </span>
              </div>
              <div className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {SHARED.location}
              </div>
            </div>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
              isAfter
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border border-border/60 bg-background text-foreground hover:bg-muted",
            )}
          >
            <Phone className="h-3 w-3" />
            Kontakt
          </button>
        </div>

        {/* Engagement stats footer */}
        <div
          className={cn(
            "grid grid-cols-3 gap-2 rounded-xl border p-3 text-center",
            isAfter
              ? "border-primary/30 bg-primary/5"
              : "border-border/50 bg-muted/20",
          )}
        >
          <StatCell label="Views / week" value={listing.stats.views} isAfter={isAfter} />
          <StatCell label="Saves" value={listing.stats.saves} isAfter={isAfter} />
          <StatCell label="Inquiries" value={listing.stats.inquiries} isAfter={isAfter} />
        </div>
      </div>
    </article>
  )
}

function StatCell({
  label,
  value,
  isAfter,
}: {
  label: string
  value: string
  isAfter: boolean
}) {
  return (
    <div>
      <div
        className={cn(
          "text-base font-semibold tabular-nums",
          isAfter ? "text-primary" : "text-foreground",
        )}
      >
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  )
}
