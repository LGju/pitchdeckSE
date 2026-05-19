import { streamText, Output } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import * as z from "zod"

// Use the OPENAI_API_KEY directly (bypasses the Vercel AI Gateway).
const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const maxDuration = 30

/* -------------------------------------------------------------------------- */
/* COMPACT REPORT SCHEMA — built to fit one sales-meeting slide               */
/* -------------------------------------------------------------------------- */

const pricingOptionSchema = z.object({
  label: z
    .enum(["Recommended", "Budget alternative"])
    .describe(
      "'Recommended' for the primary option, 'Budget alternative' for the cheaper alternative.",
    ),
  recommendedModel: z
    .enum(["Prepaid Basic", "Prepaid Premium", "Subscription Basic", "Subscription Premium"])
    .describe(
      "Strongly prefer Prepaid (yearly). For ≥ 500 cars/yr the primary recommendation MUST be Prepaid Premium for brand protection via manual QC.",
    ),
  regionTier: z.enum(["Standard", "Regional −20%", "Emerging −30%"]),
  pricePerCar: z.string().describe("e.g. '€5.39 / car' (after region discount)"),
  yearlyPrice: z
    .string()
    .describe(
      "Annual price headline = carsPerYear × tier's €/car (after region discount). For Subscription, use monthly fee × 12. Include currency symbol and thousands separators.",
    ),
  yearlyPriceUpfront: z
    .string()
    .describe("Same yearly number with the 10% upfront-payment discount applied. Include currency symbol."),
  yearlySavings: z
    .string()
    .describe("The gap, e.g. 'Save €1,200 / yr'. Include currency symbol."),
  rationale: z.string().describe("One sentence on why this plan fits this dealer."),
  showroomAddon: z
    .enum(["Standard €199", "Customized €299", "Fully custom €599"])
    .describe(
      "Primary (Recommended) for ≥ 500 cars/yr: Customized €299 or Fully custom €599 for brand protection. Budget alternative: always Standard €199.",
    ),
  upfrontDiscountNote: z
    .string()
    .describe("One short sentence pushing the 10% upfront discount — e.g. 'Pay upfront and save €X'."),
})

const reportSchema = z.object({
  headline: z
    .string()
    .describe("Personalized, energetic headline using the dealer name if provided. Max 10 words."),
  summary: z
    .string()
    .describe("Exactly 2 short sentences. Benefit-led, specific, no fluff."),
  impactHighlights: z
    .array(
      z.object({
        label: z.string().describe("Short KPI label, max 4 words."),
        value: z.string().describe("Headline number with units / currency symbol."),
        context: z.string().describe("One short sentence (≤ 14 words) on how it was derived."),
      }),
    )
    .length(3)
    .describe(
      `Exactly 3 KPIs in this order — anchored to REAL dealer inputs and the RECOMMENDED plan's €/car (no invented figures):

1) "Annual savings":
   - todayPerCar = photoCostPerCar + staffHoursPerCar × hourlyStaffRate  (trust the dealer's inputs; if photoCostPerCar is 0, leave it at 0).
   - autofoxPerCar = RECOMMENDED plan's €/car (from pricing.pricePerCar) + staffHoursPerCar × 0.25 × hourlyStaffRate.
   - savedPerCar = todayPerCar − autofoxPerCar.
   - If savedPerCar ≤ 0: value = "Break-even on cost", context = "Cost parity — the real win is speed + revenue upside below."
   - Else: value = "{currencySymbol}{round(savedPerCar × carsPerYear)} / yr", context = "{currencySymbol}{round(savedPerCar)} saved per car × {carsPerYear} cars".
   - NEVER return a savings number larger than savedPerCar × carsPerYear.

2) "Standstill cut": value = "2.5 days". context = one short sentence on faster time-to-listing.

3) "Revenue upside": value = "{currencySymbol}{round(avgCarPrice × carsPerYear × 0.10 × 0.17)} / yr". context = "+17% clicks, ~10% listing-price uplift".`,
    ),
  pricing: pricingOptionSchema.describe(
    "Primary recommendation. For dealers ≥ 500 cars/yr this MUST be Premium (manual QC for brand protection) + Customized or Fully custom showroom. For smaller dealers, Basic + Standard showroom.",
  ),
  alternativePricing: pricingOptionSchema
    .nullable()
    .describe(
      "Lower-cost alternative. Provide this ONLY when carsPerYear ≥ 500 — use Basic tier + Standard €199 showroom so the dealer sees a cheaper path. For smaller dealers, return null.",
    ),
  nextSteps: z
    .array(z.string())
    .length(2)
    .describe("Exactly 2 concrete next steps, each ≤ 14 words."),
  personalNote: z
    .string()
    .describe("One warm closing sentence using the dealer name if provided."),
})

export async function POST(req: Request) {
  const body = await req.json()
  const dealer = body as {
    dealerName?: string
    carsPerYear?: number | null
    avgStandstillDays?: number | null
    avgCarPrice?: number | null
    photoCostPerCar?: number
    staffHoursPerCar?: number
    hourlyStaffRate?: number
    currency?: "EUR" | "USD"
    goals?: string[]
  }

  const symbol = dealer.currency === "USD" ? "$" : "€"
  const goalsBlock =
    dealer.goals && dealer.goals.length
      ? dealer.goals.map((g) => `- ${g}`).join("\n")
      : "- (none selected — infer the 2 most impactful goals from the numbers)"

  const prompt = `
You are a senior automotive retail consultant producing a SHORT, personalized autofox impact report for a live sales meeting. The reader has 60 seconds — keep it tight, credible, and concrete. No hype. No ranges where a single number is possible.

WHAT AUTOFOX DOES
autofox is an AI-powered vehicle photography platform that replaces external photographers and manual editing. Sales staff take a few phone photos of a car; autofox outputs studio-grade imagery, 32 AI-generated views, 1,000+ showroom backgrounds, and AI video — with 24/7 human QC and VSS / AutoScout24 / mobile.de integrations.

HARD BENEFIT CLAIMS (use these — do not invent others)
- Standstill reduced by 2–3 days per car (pick the midpoint: 2.5 days).
- Listings get 15–20% more clicks online thanks to better imagery (use +17% as the midpoint).
- A ~10% listing-price uplift is justifiable on the average car price thanks to better perceived quality and faster decisions (use +10%).
- Photo-workflow cost per car drops to approximately the RECOMMENDED plan's pricePerCar PLUS ~25% of the dealer's current staff time per car (someone still needs to upload photos and click a button). NEVER invent a per-car cost outside this formula.

DEALER INPUTS (source of truth — reason from these numbers)
- Dealer name: ${dealer.dealerName || "(not provided)"}
- Cars sold per year: ${dealer.carsPerYear ?? "(unknown)"}
- Average standstill (days on lot): ${dealer.avgStandstillDays ?? "(unknown)"}
- Average car sale price: ${symbol}${dealer.avgCarPrice ?? "(unknown)"}
- Current photo + editing cost per car: ${symbol}${dealer.photoCostPerCar ?? 55}
- Internal staff hours per car: ${dealer.staffHoursPerCar ?? 1.5} h
- Fully-loaded hourly staff rate: ${symbol}${dealer.hourlyStaffRate ?? 35}
- Currency for all figures: ${dealer.currency ?? "EUR"} (use symbol "${symbol}")
- Goals the dealer selected:
${goalsBlock}

AUTOFOX PRICING — use these exact figures. Pick ONE plan.

Prepaid Model (min 3-yr validity, volume discounts up to 50%)
Vehicles | Basic €/veh | Basic Total | Premium €/veh | Premium Total
   100   |   €5.99     |   €599      |   €9.99       |   €999
   250   |   €5.69     |   €1,423    |   €9.49       |   €2,373
   500   |   €5.39     |   €2,696    |   €8.99       |   €4,496
   750   |   €5.09     |   €3,819    |   €8.49       |   €6,369
  1000   |   €4.79     |   €4,792    |   €7.99       |   €7,992
  2500   |   €4.49     |   €11,231   |   €7.49       |   €18,731
  5000   |   €4.19     |   €20,965   |   €6.99       |   €34,965
  7500   |   €3.89     |   €29,201   |   €6.49       |   €48,701
 10000   |   €3.59     |   €35,940   |   €5.99       |   €59,940

Subscription Model (monthly packages, fixed volume)
Veh/mo | Basic €/veh | Basic €/mo | Premium €/veh | Premium €/mo
  10   |   €5.94     |    €59     |    €9.90      |    €99
  20   |   €5.45     |    €109    |    €8.95      |    €179
  30   |   €4.98     |    €149    |    €8.30      |    €249
  50   |   €4.79     |    €239    |    €7.98      |    €399
  75   |   €3.99     |    €299    |    €6.65      |    €499
 100   |   €3.59     |    €359    |    €5.99      |    €599
 125   |   €3.36     |    €419    |    €5.59      |    €699
 150   |   €3.20     |    €479    |    €5.33      |    €799
 200   |   €3.00     |    €599    |    €5.00      |    €999

Regional tiers (apply AFTER selecting the table price):
- Standard: Europe / USA / Canada → 0% off
- Regional Discount: Eastern Europe / SE Asia → −20%
- Emerging Markets: per country → −30%

Showroom add-ons (one-time):
- Standard showroom: €199
- Customized showroom (logo + floor/wall): €299
- Fully custom (customer idea): €599

Payment incentive:
- 10% discount on the total price when everything is paid UPFRONT.

PLAN-SELECTION LOGIC — PUSH YEARLY PREPAID, OFFER TWO OPTIONS FOR HIGH VOLUME
- DEFAULT to the Prepaid Model. It locks in a 3-year validity commitment and gives the best cash flow. Only recommend Subscription if the dealer explicitly wants month-to-month flexibility.
- Reading the Prepaid table: the "Total" column is simply Vehicles × €/Veh (e.g. 1,000 × €4.79 = €4,792). It is the cost to cover that many vehicles at that volume tier.
- For Prepaid pricing of a dealer that sells X cars/year: pick the table row where row.Vehicles ≤ X, taking the LARGEST such row (rounded DOWN to the nearest tier). Use that row's €/car as the tier price.
- If carsPerYear is not provided, assume 500 and say "estimated" in the rationale.
- If dealer's region is clearly Eastern Europe / Southeast Asia → Regional −20%. Otherwise default to Standard. Apply the region discount to both pricePerCar and yearlyPrice.

TWO-OPTION STRATEGY BY VOLUME:
1) carsPerYear ≥ 500 (brand-conscious, high-volume):
   - \`pricing\` (Recommended): Prepaid Premium + Customized €299 showroom (upgrade to Fully custom €599 only if the dealer explicitly asks for a unique concept). Premium includes manual human QC — essential for brand protection at this volume. Rationale must mention "manual QC" and "brand protection".
   - \`alternativePricing\` (Budget alternative): Prepaid Basic + Standard €199 showroom. Same volume tier, same region, but Basic product and cheapest showroom. Rationale must mention this is the leaner entry point without manual QC.
2) carsPerYear < 500:
   - \`pricing\` (Recommended): Prepaid Basic + Standard €199 showroom. Upgrade showroom to Customized €299 only if the dealer selected a brand / consistency goal.
   - \`alternativePricing\`: return null.

YEARLY PRICE MATH (be precise — no multiplying or dividing by 3)
- Prepaid: yearlyPrice = carsPerYear × tier's €/car × regionDiscount.
  Example: 1,000 cars/year on Prepaid Basic (€4.79/car) at Standard tier → 1,000 × 4.79 = €4,790 / year.
  Example: 1,000 cars/year on Prepaid Premium (€7.99/car) at Standard tier → 1,000 × 7.99 = €7,990 / year.
- Subscription: yearlyPrice = monthly fee × 12 × regionDiscount.
- yearlyPriceUpfront = yearlyPrice × 0.90 (the 10% upfront-payment discount).
- yearlySavings = yearlyPrice − yearlyPriceUpfront.
- Round all money to the nearest whole unit. Use thousands separators.
- pricePerCar is just the tier's €/car after region discount, e.g. "€4.79 / car".
- Apply the SAME math to both \`pricing\` and \`alternativePricing\` when present.

FORMATTING RULES
- All money in ${dealer.currency ?? "EUR"} using the "${symbol}" symbol and thousands separators.
- Numbers in KPI values should be concrete (e.g. "${symbol}84,000 / yr", "+17% clicks", "2.5 days").
- Report is compact — one short screen. Do NOT repeat yourself.
- Do NOT invent benefits beyond the HARD BENEFIT CLAIMS above.
`.trim()

  const result = streamText({
    model: openai("gpt-4o-mini"),
    prompt,
    output: Output.object({ schema: reportSchema }),
  })

  return result.toTextStreamResponse()
}
