"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { AnimatedCounter } from "./animated-counter"

const ROW_A = [
  { src: "/logos/porsche.png", alt: "Porsche" },
  { src: "/logos/emil-frey.png", alt: "Emil Frey Deutschland" },
  { src: "/logos/amag.png", alt: "AMAG" },
  { src: "/logos/merbag.png", alt: "Merbag" },
  { src: "/logos/glinicke.png", alt: "Glinicke" },
  { src: "/logos/fleischhauer.png", alt: "Fleischhauer" },
  { src: "/logos/scherer.png", alt: "Scherer" },
  { src: "/logos/hoffmann.png", alt: "Hoffmann Autohaus" },
  { src: "/logos/mansory.png", alt: "Mansory" },
  { src: "/logos/graf-hardenberg.png", alt: "Graf Hardenberg" },
]

const ROW_B = [
  { src: "/logos/avp-autoland.png", alt: "AVP Autoland" },
  { src: "/logos/starke.png", alt: "Starke Automobilgruppe" },
  { src: "/logos/ehrhardt.png", alt: "Ehrhardt AG" },
  { src: "/logos/mueller.png", alt: "Müller Gruppe" },
  { src: "/logos/brass.png", alt: "Brass" },
  { src: "/logos/giltrap.png", alt: "Giltrap Group" },
  { src: "/logos/cloppenburg.png", alt: "Cloppenburg" },
  { src: "/logos/rhein.png", alt: "Rhein" },
  { src: "/logos/kuhn-witte.png", alt: "Kuhn+Witte" },
]

const ROW_C = [
  { src: "/logos/epple.png", alt: "Epple Das Autohaus" },
  { src: "/logos/toelke-fischer.png", alt: "Tölke + Fischer Gruppe" },
  { src: "/logos/ruckstuhl.png", alt: "Ruckstuhl" },
  { src: "/logos/bierschneider.png", alt: "Bierschneider" },
  { src: "/logos/gautschi.png", alt: "Gautschi" },
  { src: "/logos/binelli.png", alt: "Binelli Group" },
  { src: "/logos/gelder-sorg.png", alt: "Gelder & Sorg" },
  { src: "/logos/jepsen.png", alt: "Jepsen Autogruppe" },
  { src: "/logos/becker-tiemann.png", alt: "Autohaus Becker Tiemann" },
  { src: "/logos/winter.png", alt: "Winter Automobil-Partner" },
]

export function TrustSection() {
  return (
    <section className="relative border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel className="justify-center" number="07">
              Betrott världen över
            </SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Den <span className="font-display text-primary">#1</span> AI-fotograferingslösningen för återförsäljare.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-16">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-4">
            {[
              { label: "Återförsäljare litar på autofox", value: 3800, suffix: "+" },
              { label: "Bilder bearbetade", value: 65, suffix: "M" },
              { label: "Typisk ROI", value: "300–800%" },
              { label: "Länder betjänade", value: 40, suffix: "+" },
            ].map((s) => (
              <div key={s.label} className="bg-card p-8">
                <div className="whitespace-nowrap text-4xl font-semibold tracking-tight sm:text-5xl">
                  {typeof s.value === "number" ? (
                    <AnimatedCounter to={s.value} suffix={s.suffix} className="tabular-nums" />
                  ) : (
                    <span>{s.value}</span>
                  )}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Three counter-scrolling logo rows */}
        <Reveal delay={300} className="mt-16">
          <div className="space-y-3">
            <LogoRow logos={ROW_A} direction="left" />
            <LogoRow logos={ROW_B} direction="right" />
            <LogoRow logos={ROW_C} direction="left" />
          </div>
        </Reveal>

        <Reveal delay={400} className="mt-8 text-center text-sm text-muted-foreground">
          Och 3 788+ fler återförsäljargrupper i Europa, Nordamerika och APAC.
        </Reveal>
      </div>
    </section>
  )
}

function LogoRow({
  logos,
  direction,
}: {
  logos: { src: string; alt: string }[]
  direction: "left" | "right"
}) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent sm:w-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent sm:w-40"
        aria-hidden="true"
      />
      <div
        className={[
          "flex w-max gap-3 animate-marquee",
          direction === "right" ? "[animation-direction:reverse]" : "",
        ].join(" ")}
      >
        {[...logos, ...logos].map((l, i) => (
          <div
            key={`${l.src}-${i}`}
            className="flex h-24 w-48 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-card sm:h-24 sm:w-52"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={l.src || "/placeholder.svg"}
              alt={l.alt}
              className="h-full w-full scale-[1.6] object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
