"use client"

import { ArrowRight, Calendar, Mail, MapPin, Phone } from "lucide-react"
import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"
import { Wordmark } from "./wordmark"

export function CtaSection() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%), radial-gradient(40% 60% at 80% 100%, color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-4xl text-center">
          <SectionLabel className="justify-center">Redo när du är</SectionLabel>
          <h2 className="mt-6 font-display text-5xl font-light tracking-tight text-balance sm:text-6xl md:text-7xl">
            Låt oss förvandla din <span className="text-primary">återförsäljare</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Boka en 30-minuters live-demo. Vi bearbetar ett av dina riktiga fordon från början till slut och
            visar dig den exakta avkastningen för ditt lager.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14 grid gap-5 md:grid-cols-3">
          <a
            href="#"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:border-primary/40"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Calendar className="size-5" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Boka en live-demo</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                30 minuter. Dina fordon. Realtidsbearbetning. Inget åtagande.
              </p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Boka nu
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </a>

          <a
            href="mailto:hello@autofox.ai"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:border-primary/40"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Maila oss</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Få ett skräddarsytt förslag med prissättning baserad på din månatliga volym.
              </p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
              hello@autofox.ai
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </a>

          <a
            href="tel:+1"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:border-primary/40"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Phone className="size-5" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Prata med sälj</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tala med en produktspecialist om utrullning till flera anläggningar.
              </p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Ring direkt
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </a>
        </Reveal>

        <Reveal delay={200} className="mt-20">
          <div className="flex flex-col items-center gap-8 rounded-3xl border border-border bg-card/50 p-10 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <Wordmark className="text-3xl" />
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                AI-driven fordonsfo­tografering för den moderna återförsäljaren.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground md:items-end">
              <div className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                Paris · New York · Dubai
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                © {new Date().getFullYear()} autofox — alla rättigheter förbehållna
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
