"use client"

import Image from "next/image"
import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"

/* ------------------------------------------------------------------ */
/* Coverage categories — structure mirrors the old Autofox pitch slide.
   Counts reflect what the platform delivers across a full shoot; the
   photo grid below shows 10 real samples from an actual delivery.      */
/* ------------------------------------------------------------------ */

type Category = {
  count: string
  countSuffix?: string
  title: string
  subtitle?: string
  tags: string[]
}

const CATEGORIES: Category[] = [
  {
    count: "18",
    title: "Exteriörvyer",
    tags: ["Fram", "Bak", "Vänster", "Höger", "Främre 3/4", "Bakre 3/4"],
  },
  {
    count: "14",
    title: "Interiörvyer",
    tags: ["Instrumentbräda", "Framsäten", "Baksäten", "Mittkonsol", "Ratt", "Taklucka"],
  },
  {
    count: "20+",
    title: "Detaljbilder",
    tags: ["Fälgar", "Motor", "Ljus", "Emblem", "Bagageutrymme", "Utrustning"],
  },
  {
    count: "Avancerad",
    title: "3D-teknik",
    tags: ["Spegelneutralisering", "Ljuskorrigering", "Bakgrundsbyte"],
  },
]

/* Ten real Autokultur photos — exact same order as the two-row grid
   in the reference pitch. Row 1 = exterior, Row 2 = interior / detail. */
const GRID: { src: string; alt: string }[] = [
  { src: "/coverage/front.png", alt: "Front straight-on" },
  { src: "/coverage/front-34-right.png", alt: "Front 3/4 right" },
  { src: "/coverage/front-34-left.png", alt: "Front 3/4 left" },
  { src: "/coverage/rear.png", alt: "Rear straight-on" },
  { src: "/coverage/rear-34.png", alt: "Rear 3/4 right" },
  { src: "/coverage/door-open.png", alt: "Driver door open" },
  { src: "/coverage/door-panel.png", alt: "Door panel detail" },
  { src: "/coverage/interior-seat.png", alt: "Driver seat and cockpit" },
  { src: "/coverage/trunk.png", alt: "Trunk open" },
  { src: "/coverage/wheel.png", alt: "Wheel and brake caliper" },
]

export function AiViewsSection() {
  return (
    <section className="relative border-t border-border/60 bg-background py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-30"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4">
        {/* Kicker */}
        <Reveal>
          <SectionLabel number="05">Komplett täckning</SectionLabel>
        </Reveal>

        {/* Headline — two-tone like the reference */}
        <Reveal delay={100}>
          <h2 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            <span className="text-primary">32 AI-genererade vyer</span>{" "}
            Komplett fordonstäckning
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Varje vinkel, varje detalj, varje gång — producerat i samma varumärkeskonsekventa
            studio och levererat annonsredo.
          </p>
        </Reveal>

        {/* Category cards */}
        <Reveal delay={250} className="mt-10">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <article
                key={cat.title}
                className="flex h-full flex-col rounded-3xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/40"
              >
                <header
                  className={
                    cat.count === "Advanced"
                      ? "flex flex-col gap-1"
                      : "flex flex-wrap items-baseline gap-x-2 gap-y-1"
                  }
                >
                  <span
                    className={
                      cat.count === "Advanced"
                        ? "font-display text-3xl font-semibold leading-none text-primary sm:text-4xl"
                        : "font-display text-5xl font-semibold leading-none text-primary tabular-nums sm:text-6xl"
                    }
                  >
                    {cat.count}
                  </span>
                  <span className="text-base font-medium text-foreground sm:text-lg">
                    {cat.title}
                  </span>
                </header>

                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {cat.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-center text-[12px] text-foreground/80"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>

        {/* Photo grid — real Autokultur deliveries */}
        <Reveal delay={350} className="mt-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {GRID.map((shot) => (
              <figure
                key={shot.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 768px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Samma ljussättning, samma golv, samma bakgrund — varje bil, varje gång.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
