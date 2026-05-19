"use client"

import { SectionLabel } from "./section-label"
import { Reveal } from "./reveal"
import { Folder, Code2, Check } from "lucide-react"

export function IntegrationSection() {
  return (
    <section className="relative border-t border-border/60 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel className="justify-center" number="15">
              Integration
            </SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Sömlös med dina <span className="font-display text-primary">befintliga system</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground">
              Två integrationssökvägar. Båda är live på 2 veckor eller mindre.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {/* Option 1 */}
          <Reveal delay={200}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Alternativ 01</div>
                <Folder className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-2xl font-medium">Externa foton — FTP</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                För återförsäljare som redan använder externa fotografer. Vi tar emot, bearbetar och levererar — automatiskt.
              </p>

              {/* Flow diagram */}
              <div className="mt-8 rounded-xl border border-border/60 bg-background/60 p-5">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/60 bg-card">
                      📷
                    </div>
                    <span>Foton</span>
                  </div>
                  <div className="h-px flex-1 mx-3 bg-gradient-to-r from-border via-primary/40 to-border" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                      FTP
                    </div>
                    <span>autofox</span>
                  </div>
                  <div className="h-px flex-1 mx-3 bg-gradient-to-r from-border via-primary/40 to-border" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/60 bg-card">
                      CRM
                    </div>
                    <span>Ditt system</span>
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {["FTP-serverintegration", "Realtidsbearbetning", "Automatisk synkronisering", "Ingen kod krävs"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>

          {/* Option 2 */}
          <Reveal delay={300}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-primary/40 bg-card p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary">Alternativ 02 · Rekommenderad</div>
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-2xl font-medium">Direkt API</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">
                  Anslut autofox direkt i din stack med ett enkelt REST API. Fullständig händelseströmning och anpassade
                  arbetsflöden.
                </p>

                {/* Code block */}
                <div className="mt-8 overflow-hidden rounded-xl border border-border/60 bg-background font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-border/60 bg-card/60 px-4 py-2 text-muted-foreground">
                    <span>POST /v1/vehicles/process</span>
                    <span className="text-primary">api.autofox.ai</span>
                  </div>
                  <pre className="overflow-x-auto p-4 leading-relaxed">
                    {`{
  "vin": "WAUZZZ8V5LA000000",
  "input_images": ["https://.../1.jpg", …],
  "output": {
    "views": 32,
    "resolution": "4K",
    "background": "oem/audi-terminal"
  },
  "webhook": "https://dealer.com/af/callback"
}`}
                  </pre>
                </div>

                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "99,9% drifttid",
                    "Stöd för anpassat arbetsflöde",
                    "24/7 prioritetsstöd",
                    "Swagger docs & sandlådenycklar",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
