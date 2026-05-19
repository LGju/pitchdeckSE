"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import {
  Aperture,
  Camera as CameraIcon,
  Clock,
  IdCard,
  Layers3,
} from "lucide-react"

type FeatureId = "mirror" | "three-in-one" | "background" | "composition"

const EXCLUSIVE: {
  id: FeatureId
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}[] = [
  {
    id: "mirror",
    icon: Aperture,
    title: "Spegelneutralisering",
    desc: "Reflektioner, fotografer, studiompaneler och annat skräp upptäcks och tas bort automatiskt — inuti och utanför.",
  },
  {
    id: "three-in-one",
    icon: Layers3,
    title: "3-i-1 Shot System",
    desc: "Tre bearbetade varianter från en enda inmatning — exteriör, beskuren och hero-shot.",
  },
  {
    id: "background",
    icon: IdCard,
    title: "Registreringsskylt Inlay",
    desc: "Identifierar automatiskt skyttområdet och placerar din återförsäljarplåt med perfekt perspektiv — sparar 3–5 minuter Photoshop-arbete per fordon.",
  },
  {
    id: "composition",
    icon: CameraIcon,
    title: "Dynamisk komposition",
    desc: "Omkadrerare automatiskt för marknadsplats, annons och hero-användningsfall.",
  },
]

export function TechnologySection() {
  const [active, setActive] = useState<FeatureId>("mirror")

  return (
    <section id="technology" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel number="06">Avancerad 3D-teknik</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Motorn bakom{" "}
              <span className="font-display text-primary">varje transformation</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Egen AI + realtids 3D-teknik återbygger varje fordon, fixar ljussättning och placerar det
              i pixelperfekta scener.
            </p>
          </Reveal>
        </div>

        {/* Exclusive features — interactive */}
        <div className="mt-16">
          <Reveal>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Exklusiva funktioner som <span className="font-display text-primary">särskiljer oss</span>
            </h3>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Big demo canvas */}
            <Reveal delay={100} key={active}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
                {active === "mirror" && <MirrorNeutralizing />}
                {active === "three-in-one" && <ThreeInOne />}
                {active === "background" && <LicensePlateInlay />}
                {active === "composition" && <DynamicComposition />}
              </div>
            </Reveal>

            {/* Vertical tab rail */}
            <div className="flex flex-col gap-3">
              {EXCLUSIVE.map((f, i) => {
                const Icon = f.icon
                const isActive = active === f.id
                return (
                  <Reveal key={f.id} delay={150 + i * 60}>
                    <button
                      onClick={() => setActive(f.id)}
                      className={cn(
                        "group w-full rounded-2xl border p-5 text-left transition-all",
                        isActive
                          ? "border-primary/40 bg-card shadow-md"
                          : "border-border/60 bg-card/60 hover:border-primary/30 hover:bg-card",
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors",
                            isActive
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-border/60 bg-background text-primary",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-medium">{f.title}</div>
                            {isActive && (
                              <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                                Aktiv
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed text-pretty">
                            {f.desc}
                          </p>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------- Mirror Neutralizing --------------------------- */

type MirrorView = "exterior" | "interior"

const MIRROR_VIEWS: Record<
  MirrorView,
  { label: string; before: string; after: string }
> = {
  exterior: {
    label: "Exterior",
    before: "/outputs/mirror-exterior-before.png",
    after: "/outputs/mirror-exterior-after.jpg",
  },
  interior: {
    label: "Interior",
    before: "/outputs/mirror-interior-before.jpg",
    after: "/outputs/mirror-interior-after.jpg",
  },
}

function MirrorNeutralizing() {
  const [view, setView] = useState<MirrorView>("exterior")
  const current = MIRROR_VIEWS[view]

  return (
    <>
      {/* Keyed so the comparator re-mounts with a fresh 50/50 split on view change */}
      <BeforeAfterCompare
        key={view}
        beforeSrc={current.before}
        afterSrc={current.after}
        beforeAlt={`${current.label} — before mirror neutralizing: unwanted reflections, studio clutter and photographer visible`}
        afterAlt={`${current.label} — after autofox mirror neutralizing: reflections and clutter automatically removed`}
        beforeLabel="Före · Raw capture"
        afterLabel="Efter · Neutraliserad"
      />

      {/* Interior / Exterior toggle — same pattern as the banner toggle */}
      <div className="absolute bottom-4 right-4 z-10">
        <div
          role="tablist"
          aria-label="Mirror neutralizing view"
          className="flex items-center gap-1 rounded-full border border-white/25 bg-black/65 p-1 text-white shadow-lg backdrop-blur"
        >
          {(Object.keys(MIRROR_VIEWS) as MirrorView[]).map((id) => {
            const isActive = view === id
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setView(id)}
                className={cn(
                  "rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-white/80 hover:text-white",
                )}
              >
                {MIRROR_VIEWS[id].label}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

/* Reusable draggable before/after comparator */
function BeforeAfterCompare({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
}: {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel: string
  afterLabel: string
}) {
  const [pos, setPos] = useState(50)
  const wrapRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const onMove = useCallback((clientX: number) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clientX - rect.left
    const p = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPos(p)
  }, [])

  useEffect(() => {
    const up = () => (draggingRef.current = false)
    const move = (e: MouseEvent) => {
      if (draggingRef.current) onMove(e.clientX)
    }
    const tmove = (e: TouchEvent) => {
      if (draggingRef.current && e.touches[0]) onMove(e.touches[0].clientX)
    }
    window.addEventListener("mouseup", up)
    window.addEventListener("touchend", up)
    window.addEventListener("mousemove", move)
    window.addEventListener("touchmove", tmove)
    return () => {
      window.removeEventListener("mouseup", up)
      window.removeEventListener("touchend", up)
      window.removeEventListener("mousemove", move)
      window.removeEventListener("touchmove", tmove)
    }
  }, [onMove])

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 cursor-ew-resize select-none"
      onMouseDown={(e) => {
        draggingRef.current = true
        onMove(e.clientX)
      }}
      onTouchStart={(e) => {
        draggingRef.current = true
        if (e.touches[0]) onMove(e.touches[0].clientX)
      }}
    >
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 760px, 100vw"
        priority
      />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 760px, 100vw"
        />
      </div>

      <div
        className="pointer-events-none absolute top-4 rounded-full border border-border/60 bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur transition-opacity"
        style={{ left: "1rem", opacity: pos > 15 ? 1 : 0 }}
      >
        {beforeLabel}
      </div>
      <div
        className="pointer-events-none absolute top-4 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary backdrop-blur transition-opacity"
        style={{ right: "1rem", opacity: pos < 85 ? 1 : 0 }}
      >
        {afterLabel}
      </div>

      <div
        className="absolute top-0 h-full w-0.5 bg-primary"
        style={{ left: `${pos}%`, boxShadow: "0 0 20px rgba(228,14,65,0.55)" }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-background shadow-lg">
          <div className="flex gap-0.5">
            <span className="block h-3 w-0.5 bg-primary" />
            <span className="block h-3 w-0.5 bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ 3-in-1 Shot ------------------------------ */

function ThreeInOne() {
  return (
    <Image
      src="/outputs/bmw-3in1.png"
      alt="BMW X5 three-in-one composite: hero exterior with headlight and wheel detail crops"
      fill
      className="object-cover"
      sizes="(min-width: 1024px) 720px, 100vw"
      priority
    />
  )
}

/* --------------------------- License Plate Inlay --------------------------- */

function LicensePlateInlay() {
  const [pos, setPos] = useState(50)
  const wrapRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const onMove = useCallback((clientX: number) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clientX - rect.left
    const p = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPos(p)
  }, [])

  useEffect(() => {
    const up = () => (draggingRef.current = false)
    const move = (e: MouseEvent) => {
      if (draggingRef.current) onMove(e.clientX)
    }
    const tmove = (e: TouchEvent) => {
      if (draggingRef.current && e.touches[0]) onMove(e.touches[0].clientX)
    }
    window.addEventListener("mouseup", up)
    window.addEventListener("touchend", up)
    window.addEventListener("mousemove", move)
    window.addEventListener("touchmove", tmove)
    return () => {
      window.removeEventListener("mouseup", up)
      window.removeEventListener("touchend", up)
      window.removeEventListener("mousemove", move)
      window.removeEventListener("touchmove", tmove)
    }
  }, [onMove])

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 cursor-ew-resize select-none"
      onMouseDown={(e) => {
        draggingRef.current = true
        onMove(e.clientX)
      }}
      onTouchStart={(e) => {
        draggingRef.current = true
        if (e.touches[0]) onMove(e.touches[0].clientX)
      }}
    >
      {/* Before — raw phone shot on the dealer lot with empty plate holder */}
      <Image
        src="/outputs/jaecoo-before.jpg"
        alt="Raw phone shot of a Jaecoo J7 parked on a dealer lot with an empty license plate holder"
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 720px, 100vw"
        priority
      />

      {/* After — autofox studio output with the dealer plate inlaid */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image
          src="/outputs/jaecoo-after-plate.jpg"
          alt="Same Jaecoo J7 placed in an autofox studio with the Spiering & Pluym dealer license plate inlaid"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 720px, 100vw"
        />
      </div>

      {/* Before/After labels on either side of the divider */}
      <div
        className="pointer-events-none absolute top-4 rounded-full border border-border/60 bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur transition-opacity"
        style={{ left: "1rem", opacity: pos > 15 ? 1 : 0 }}
      >
        Före · Återförsäljarlot
      </div>
      <div
        className="pointer-events-none absolute top-4 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary backdrop-blur transition-opacity"
        style={{ right: "1rem", opacity: pos < 85 ? 1 : 0 }}
      >
        Efter · Skylt inlagd
      </div>

      {/* Time saved badge */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-border/60 bg-background/95 px-3 py-2 shadow-lg backdrop-blur">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Clock className="h-4 w-4" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            Tid sparad
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            ~4 min / fordon
          </span>
        </div>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 h-full w-0.5 bg-primary"
        style={{ left: `${pos}%`, boxShadow: "0 0 20px rgba(228,14,65,0.55)" }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-background shadow-lg">
          <div className="flex gap-0.5">
            <span className="block h-3 w-0.5 bg-primary" />
            <span className="block h-3 w-0.5 bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------- Dynamic Composition -------------------------- */

function DynamicComposition() {
  const [bannerOn, setBannerOn] = useState(true)

  return (
    <>
      {/* Base image — never distorted */}
      <Image
        src="/outputs/audi-etron-showroom.jpg"
        alt="Vehicle in a premium showroom with a generic dealership leasing banner overlay"
        fill
        className="object-cover object-center"
        sizes="(min-width: 1024px) 720px, 100vw"
        priority
      />

      {/* Big low-opacity dealership banner across the top.
          Generic — same banner layered on every vehicle. */}
      <div
        aria-hidden={!bannerOn}
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 text-white transition-all duration-300 ease-out",
          bannerOn ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        )}
        style={{
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.78) 0%, rgba(30,58,95,0.68) 100%)",
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="flex items-center justify-between gap-6 px-6 py-4 sm:px-8 sm:py-5">
          {/* Brand lockup (generic dealership) */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 ring-1 ring-inset ring-white/25 sm:h-10 sm:w-10">
              <span className="text-sm font-bold tracking-tight sm:text-base">A</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-tight sm:text-lg">
                AutoMax Motors
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/85">
                www.automax-motors.com
              </span>
            </div>
          </div>

          {/* Offer block */}
          <div className="hidden items-center gap-5 sm:flex">
            <span className="h-10 w-px bg-white/30" aria-hidden="true" />
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/85">
                Summer Leasing Event
              </span>
              <span className="text-base font-semibold tracking-tight sm:text-lg">
                Leasing from €299 / mo · 3.99% APR
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="hidden items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold tracking-tight text-[#0A0A0A] shadow-lg md:inline-flex">
            Book a test drive
          </div>
        </div>

        {/* Compact line for smaller widths */}
        <div className="flex items-center justify-between gap-3 border-t border-white/20 px-6 pb-3 pt-2 sm:hidden">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/90">
            Summer Leasing
          </span>
          <span className="text-sm font-semibold tracking-tight">
            From €299 / mo · 3.99% APR
          </span>
        </div>
      </div>

      {/* Toggle — shows/hides the banner */}
      <div className="absolute bottom-4 right-4 z-10">
        <button
          type="button"
          role="switch"
          aria-checked={bannerOn}
          aria-label={bannerOn ? "Dölj återförsäljarbanner" : "Visa återförsäljarbanner"}
          onClick={() => setBannerOn((v) => !v)}
          className="group flex items-center gap-3 rounded-full border border-white/25 bg-black/60 px-3 py-2 text-white shadow-lg backdrop-blur transition-colors hover:bg-black/75"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/90">
            Banner
          </span>
          <span
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
              bannerOn ? "bg-primary" : "bg-white/25",
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
                bannerOn ? "translate-x-4" : "translate-x-0.5",
              )}
            />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/90">
            {bannerOn ? "On" : "Off"}
          </span>
        </button>
      </div>
    </>
  )
}

