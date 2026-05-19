"use client"

import { useState } from "react"
import Image from "next/image"
import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"
import {
  ScanLine,
  LayoutGrid,
  Camera,
  Images,
  Sparkles,
  Globe,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react"

const WALKTHROUGH_VIDEO_EMBED =
  "https://drive.google.com/file/d/1Zi36FhFptL5jq7FDvA87hVmXYzP7FS-6/preview"

type Step = {
  id: string
  num: string
  label: string
  title: string
  desc: string
  kind: "image" | "video"
  src: string
  orientation: "portrait" | "landscape"
  icon: typeof ScanLine
  highlights: string[]
}

const STEPS: Step[] = [
  {
    id: "vin",
    num: "01",
    label: "Identifiera",
    title: "Skanna VIN",
    desc: "Rikta kameran mot vindrutan. Vår skanner läser VIN via OCR, streckkod eller QR — eller skriv in manuellt. Fordonsdata hämtas automatiskt.",
    kind: "image",
    src: "/app/vin-scan.png",
    orientation: "portrait",
    icon: ScanLine,
    highlights: ["VIN eller registreringsskylt", "Fyller i VIN automatiskt"],
  },
  {
    id: "theme",
    num: "02",
    label: "Konfigurera",
    title: "Välj fordonstyp och showroom",
    desc: "Välj karosstyp så AI:n använder rätt silhuett, välj sedan ett showroom från de som din återförsäljare har tillgång till — redan förgodkänt och varumärkesanpassat.",
    kind: "image",
    src: "/app/vehicle-theme.png",
    orientation: "portrait",
    icon: LayoutGrid,
    highlights: ["5 karosstyper", "Endast dina licensierade showrooms", "Konsekvent utseende för hela flottan"],
  },
  {
    id: "capture",
    num: "03",
    label: "Fånga",
    title: "AR-guidad fotografering",
    desc: "En live 3D-begränsningsruta låser sig på fordonet. Vägledning på skärmen håller dig på rätt höjd, vinkel och avstånd — så varje bild blir perfekt inramad.",
    kind: "image",
    src: "/app/ar-capture.png",
    orientation: "landscape",
    icon: Camera,
    highlights: ["Live AR-begränsningsruta", "Höjd- och lutningsindikator", "Omöjligt att fota fel"],
  },
  {
    id: "grid",
    num: "04",
    label: "Fotografera",
    title: "Följ vinkelrastret",
    desc: "Appen guidar dig genom varje vinkel som krävs: fram, bak, sidor, trekvartsbilder, interiör. Tomma platser visar exakt vad som saknas.",
    kind: "image",
    src: "/app/grid-empty.png",
    orientation: "portrait",
    icon: Images,
    highlights: ["Standardiserat vinkelset", "Inget glöms bort", "VIN-kopplat till varje bild"],
  },
  {
    id: "process",
    num: "05",
    label: "AI-magi",
    title: "32 studioklassade vyer på under 30s",
    desc: "AI:n rengör bakgrunder, normaliserar ljussättning, placerar bilen i valt showroom och genererar alla vinklar som behövs. Varje vy markeras 'Klar'.",
    kind: "image",
    src: "/app/grid-complete.png",
    orientation: "portrait",
    icon: Sparkles,
    highlights: ["Bakgrundsbyte", "Ljus- och färgkorrigering", "Klart på <30 sekunder"],
  },
  {
    id: "live",
    num: "06",
    label: "Publicera",
    title: "Live på din webbplats",
    desc: "Bilderna skickas direkt till ditt CRM och annonsplattformar. Kunder ser en premium, konsekvent showroom-upplevelse — som driver fler förfrågningar per annons.",
    kind: "image",
    src: "/app/live-listing.png",
    orientation: "portrait",
    icon: Globe,
    highlights: ["Direkt CRM-uppladdning", "Fungerar med Blocket, Bytbil", "I snitt +40% förfrågningar"],
  },
  {
    id: "walkthrough",
    num: "▶",
    label: "Se live",
    title: "Hela flödet i en inspelning",
    desc: "Varje steg ovan — filmad från början till slut av en riktig teammedlem på telefonen, utan klipp. Så här ser ett komplett galleri faktiskt ut i appen.",
    kind: "video",
    src: WALKTHROUGH_VIDEO_EMBED,
    orientation: "portrait",
    icon: Play,
    highlights: ["Riktig enhet, riktigt fordon", "Inga redigeringar, ingen berättarröst", "Under 2 minuter totalt"],
  },
]

export function MobileAppSection() {
  const [index, setIndex] = useState(0)
  const step = STEPS[index]
  const totalSteps = STEPS.length
  const isVideo = step.kind === "video"

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + totalSteps) % totalSteps)
  }

  return (
    <section className="relative border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel number="04">Smart mobilapp</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Från VIN till webbplats <span className="font-display text-primary">i sex steg</span>.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Vem som helst i ditt team — säljare, mekaniker, reception — kan fotografera ett komplett galleri på minuter. Ingen
                fotograf, ingen studio, ingen redigering.
              </p>
            </Reveal>
          </div>

          {/* Step rail (desktop) — includes the walkthrough video as the final node */}
          <Reveal delay={200} className="hidden w-full max-w-md md:block">
            <ol className="flex items-center justify-between gap-1">
              {STEPS.map((s, i) => {
                const Icon = s.icon
                const isActive = i === index
                const isDone = i < index
                const isLast = i === STEPS.length - 1
                return (
                  <li key={s.id} className="flex flex-1 items-center last:flex-none">
                    <button
                      onClick={() => setIndex(i)}
                      aria-label={`Go to step ${s.num}: ${s.title}`}
                      className={cn(
                        "group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                        isActive
                          ? "scale-110 border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : isDone
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                      )}
                    >
                      <Icon className={cn("h-4 w-4", s.kind === "video" && "fill-current")} />
                    </button>
                    {!isLast && (
                      <div
                        className={cn(
                          "h-0.5 flex-1 transition-colors",
                          i < index ? "bg-primary/40" : "bg-border",
                        )}
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={300} className="mt-12">
          {isVideo ? (
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
              {/* Full-bleed video */}
              <div
                key={step.id}
                className="relative w-full animate-in fade-in duration-500"
                style={{ aspectRatio: "16 / 9" }}
              >
                <iframe
                  src={step.src}
                  title={step.title}
                  className="absolute inset-0 h-full w-full bg-black"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>

              {/* Controls strip */}
              <div className="flex flex-wrap items-center gap-3 border-t border-border/60 p-4 sm:p-6">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous step"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-foreground/40 hover:bg-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="af-pill af-pill--primary gap-2 px-5"
                >
                  {index === STEPS.length - 1 ? "Back to start" : "Next step"}
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="ml-auto hidden gap-1.5 sm:flex">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setIndex(i)}
                      aria-label={`Jump to step ${i + 1}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        i === index ? "w-8 bg-primary" : "w-4 bg-border hover:bg-foreground/30",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 rounded-3xl border border-border/60 bg-card p-6 sm:p-10 lg:grid-cols-12">
              {/* Phone frame column */}
              <div className="flex items-center justify-center lg:col-span-6">
                <PhoneFrame
                  kind={step.kind}
                  src={step.src}
                  orientation={step.orientation}
                  key={step.id}
                  title={step.title}
                />
              </div>

              {/* Copy column */}
              <div className="flex flex-col justify-center lg:col-span-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-muted-foreground">{`${step.num} / 06`}</span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="af-pill af-pill--outline text-xs">
                    <step.icon className="h-3 w-3" />
                    {step.label}
                  </span>
                </div>

                <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{step.title}</h3>
                <p className="mt-4 text-base text-muted-foreground text-pretty sm:text-lg">{step.desc}</p>

                <ul className="mt-6 space-y-2">
                  {step.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-sm">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      <span className="text-foreground/90">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Controls */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous step"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-foreground/40 hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    className="af-pill af-pill--primary gap-2 px-5"
                  >
                    {index === STEPS.length - 1 ? "Tillbaka till start" : "Nästa steg"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <div className="ml-auto hidden gap-1.5 sm:flex">
                    {STEPS.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => setIndex(i)}
                        aria-label={`Jump to step ${i + 1}`}
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          i === index ? "w-8 bg-primary" : "w-4 bg-border hover:bg-foreground/30",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Reveal>

        {/* Mobile step rail */}
        <div className="mt-6 flex justify-center gap-1.5 md:hidden">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Jump to step ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-primary" : "w-4 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PhoneFrame({
  kind,
  src,
  orientation,
  title,
}: {
  kind: "image" | "video"
  src: string
  orientation: "portrait" | "landscape"
  title: string
}) {
  return (
    <div
      className={cn(
        "relative animate-in fade-in zoom-in-95 duration-500",
        orientation === "portrait" ? "w-[280px] sm:w-[320px]" : "w-full max-w-[580px]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[44px] border border-foreground/10 bg-background shadow-[0_30px_80px_-20px_rgba(24,24,24,0.25)] ring-1 ring-foreground/5",
          orientation === "portrait" ? "aspect-[9/19.5]" : "aspect-[19.5/9]",
        )}
      >
        {kind === "image" ? (
          <Image
            src={src || "/placeholder.svg"}
            alt=""
            fill
            sizes="(max-width: 640px) 280px, 320px"
            className="object-cover"
            priority
          />
        ) : (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full bg-black"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        )}
      </div>
    </div>
  )
}
