"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { Building2, Car, ChevronLeft, ChevronRight, Expand, ShieldCheck, X } from "lucide-react"

type Photo = { src: string; alt: string; label: string }

type Client = {
  id: string
  name: string
  flag: string
  tagline: string
  partnerSince: string
  facilityImage: string
  facilityAlt: string
  stats: { icon: typeof Building2; k: string; v: string }[]
  listing: {
    title: string
    subtitle: string
    photos: Photo[]
  }
}

const CLIENTS: Client[] = [
  {
    id: "riddermark",
    name: "Riddermark Bil",
    flag: "SE",
    tagline: "Sveriges största begagnatbilsåterförsäljare · Rikstäckande",
    partnerSince: "2026",
    facilityImage: "/clients/riddermark-facility.jpg",
    facilityAlt:
      "Flygvy vid soluppgång över Riddermarks anläggning med tusentals fordon på parkeringen",
    stats: [
      { icon: Building2, k: "Årlig omsättning", v: "€1B+" },
      { icon: Car, k: "Fordon / år", v: "50 000+" },
      { icon: ShieldCheck, k: "Anläggningar", v: "20+" },
    ],
    listing: {
      title: "Audi SQ7 TDI quattro",
      subtitle: "Svart · 4.0 V8 · Fotograferad på 4 min",
      photos: [
        { src: "/clients/sq7-hero.jpg", alt: "Audi SQ7 TDI quattro bakre trekvart studiobild", label: "Bakre 3/4" },
        { src: "/clients/sq7-front34.jpg", alt: "Audi SQ7 främre trekvart studiobild", label: "Främre 3/4" },
        { src: "/clients/sq7-side.jpg", alt: "Audi SQ7 sidoprofil studiobild", label: "Sidoprofil" },
        { src: "/clients/sq7-interior.jpg", alt: "Audi SQ7 quiltat läderinteriör", label: "Interiör" },
        { src: "/clients/sq7-wheel.jpg", alt: "Audi SQ7 fälg och bromsokdetalj", label: "Fälgdetalj" },
      ],
    },
  },
  {
    id: "amag",
    name: "AMAG Group AG",
    flag: "CH",
    tagline: "Schweiz #1 bilåterförsäljare · VW, Audi, Škoda, SEAT, CUPRA, Bentley",
    partnerSince: "2023",
    facilityImage: "/clients/amag-facility.webp",
    facilityAlt:
      "AMAG Autowelt Zürich — flervånings stålfasad med stor VW-rundel och glassshowroom",
    stats: [
      { icon: Building2, k: "Årlig omsättning", v: "CHF 5B" },
      { icon: Car, k: "Leasingavtal", v: "187k+" },
      { icon: ShieldCheck, k: "Anläggningar", v: "90+" },
    ],
    listing: {
      title: "VW Polo R-Line",
      subtitle: "Pure White · 1.0 TSI · Fotograferad på 3 min",
      photos: [
        { src: "/clients/polo-hero.jpg", alt: "VW Polo R-Line främre trekvart studiobild med AMAG Badenerstrasse varumärke", label: "Främre 3/4" },
        { src: "/clients/polo-front.jpg", alt: "VW Polo R-Line alternativ främre trekvart vy", label: "Frontvy" },
        { src: "/clients/polo-side.jpg", alt: "VW Polo R-Line sidoprofil studiobild", label: "Sidoprofil" },
        { src: "/clients/polo-interior.jpg", alt: "VW Polo R-Line kabin med diamantmönstrade R-Line sportstolar", label: "Interiör" },
        { src: "/clients/polo-wheel.jpg", alt: "VW Polo R-Line lättmetallfälg och däckdetalj", label: "Fälgdetalj" },
      ],
    },
  },
]

export function SolutionSection() {
  const [activeClientId, setActiveClientId] = useState<string>(CLIENTS[0].id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const activeClient = CLIENTS.find((c) => c.id === activeClientId) ?? CLIENTS[0]
  const photos = activeClient.listing.photos
  const total = photos.length
  const open = lightboxIndex !== null

  const openAt = useCallback((i: number) => {
    setLightboxIndex(i)
  }, [])

  const goTo = useCallback(
    (i: number) => setLightboxIndex(((i % total) + total) % total),
    [total],
  )
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % total))
  }, [total])
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + total) % total))
  }, [total])
  const close = useCallback(() => setLightboxIndex(null), [])

  // Close lightbox when switching between clients to avoid stale indexes.
  useEffect(() => {
    setLightboxIndex(null)
  }, [activeClientId])

  // Arrow-key + ESC navigation while lightbox is open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        e.stopPropagation()
        next()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        e.stopPropagation()
        prev()
      } else if (e.key === "Escape") {
        e.preventDefault()
        e.stopPropagation()
        close()
      }
    }
    window.addEventListener("keydown", onKey, { capture: true })
    return () => window.removeEventListener("keydown", onKey, { capture: true })
  }, [open, next, prev, close])

  // Lock page scroll while the lightbox is open
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const activePhoto = lightboxIndex !== null ? photos[lightboxIndex] : null

  return (
    <section id="product" className="relative border-t border-border/60 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel number="02">Lösningen</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Studiokvalitet{" "}
                <span className="font-display text-primary">på bara några minuter</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-md text-sm text-muted-foreground text-pretty sm:text-base">
              Används av storföretagsåterförsäljare med{" "}
              <span className="font-medium text-foreground">miljarder i årlig omsättning</span> och
              som flyttar <span className="font-medium text-foreground">tiotusentals fordon per år</span>
              {" "}— till en bråkdel av studiokostnaden.
            </p>
          </Reveal>
        </div>

        {/* Client switcher */}
        <Reveal delay={140}>
          <div
            role="tablist"
            aria-label="Företagskunder"
            className="mt-6 inline-flex items-center gap-1 rounded-full border border-border/60 bg-card p-1"
          >
            {CLIENTS.map((c) => {
              const isActive = c.id === activeClientId
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveClientId(c.id)}
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider ${
                      isActive ? "text-primary-foreground/70" : "text-muted-foreground/70"
                    }`}
                  >
                    {c.flag}
                  </span>
                  {c.name}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Main two-column: Facility (left) · Example listing (right) */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          {/* Facility / client trust card */}
          <Reveal delay={150} key={`${activeClient.id}-facility`}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={activeClient.facilityImage || "/placeholder.svg"}
                  alt={activeClient.facilityAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 720px, 100vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur">
                  <ShieldCheck className="h-3 w-3" />
                  Företagskund
                </div>

                <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        {activeClient.name}
                      </div>
                      <div className="text-xs text-white/70">{activeClient.tagline}</div>
                    </div>
                    <div className="hidden text-right sm:block">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                        Partner sedan
                      </div>
                      <div className="font-mono text-sm text-white/90">
                        {activeClient.partnerSince}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/60">
                {activeClient.stats.map((s) => {
                  const Icon = s.icon
                  return (
                    <div key={s.k} className="flex flex-col justify-between p-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        <Icon className="h-3 w-3 text-primary" />
                        {s.k}
                      </div>
                      <div className="mt-2 text-2xl font-semibold tracking-tight">{s.v}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* Example listing card */}
          <Reveal delay={220} key={`${activeClient.id}-listing`}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl">
              {/* Listing header */}
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Exempelannons · klicka på valfri bild
                </span>
                <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                    autofox
                  </span>
                </div>
              </div>

              {/* Hero listing image — clickable */}
              <button
                type="button"
                onClick={() => openAt(0)}
                aria-label={`Open ${photos[0].label} in full-screen view`}
                className="group relative block aspect-[16/10] w-full cursor-pointer overflow-hidden border-0 bg-background p-0 outline-none ring-offset-card transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Image
                  src={photos[0].src || "/placeholder.svg"}
                  alt={photos[0].alt}
                  fill
                  className="pointer-events-none object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
                <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <Expand className="h-3 w-3" />
                  Förstora
                </span>
              </button>

              {/* Listing meta + thumbnails */}
              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium leading-tight">
                      {activeClient.listing.title}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {activeClient.listing.subtitle}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Vyer levererade
                    </div>
                    <div className="font-mono text-sm tabular-nums text-primary">32 / 32</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {photos.slice(1).map((t, i) => {
                    const index = i + 1
                    return (
                      <button
                        key={t.src}
                        type="button"
                        onClick={() => openAt(index)}
                        aria-label={`Open ${t.label} in full-screen view`}
                        className="group relative block aspect-square cursor-pointer overflow-hidden rounded-md border border-border/60 bg-background p-0 outline-none ring-offset-card transition hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <Image
                          src={t.src || "/placeholder.svg"}
                          alt={t.alt}
                          fill
                          className="pointer-events-none object-cover transition duration-500 group-hover:scale-[1.05]"
                          sizes="120px"
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* KPI proof strip */}
        <Reveal delay={280}>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 shadow-xl sm:grid-cols-4">
            {[
              { k: "Kostnad vs. studio", v: "−90%", sub: "per fordon" },
              { k: "Leveranstid", v: "<30s", sub: "mobil till CRM" },
              { k: "Vyer per bil", v: "32", sub: "alla vinklar" },
              { k: "Perfekt andel", v: "99,7%", sub: "mänsklig QC-kontroll" },
            ].map((s) => (
              <div key={s.k} className="flex items-center justify-between gap-4 bg-card p-4">
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {s.k}
                  </dt>
                  <dd className="mt-0.5 text-[11px] text-muted-foreground">{s.sub}</dd>
                </div>
                <div className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.v}</div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Fullscreen Lightbox — fixed overlay, not a portal, sits above deck chrome (z-40) */}
      {open && activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.label}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 overflow-hidden">
              <Image
                src={activePhoto.src || "/placeholder.svg"}
                alt={activePhoto.alt}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 1100px, 100vw"
                priority
              />

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
                {activePhoto.label} · {(lightboxIndex ?? 0) + 1} / {total}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 overflow-x-auto border-t border-white/10 bg-black/70 p-3">
              {photos.map((p, i) => {
                const active = i === lightboxIndex
                return (
                  <button
                    key={p.src}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`View ${p.label}`}
                    className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md border p-0 transition ${
                      active
                        ? "border-primary ring-2 ring-primary/60"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={p.src || "/placeholder.svg"}
                      alt=""
                      fill
                      className="pointer-events-none object-cover"
                      sizes="80px"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
