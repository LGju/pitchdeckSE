import { AiViewsSection } from "@/components/pitch/ai-views-section"
import { BeforeAfterSection } from "@/components/pitch/before-after-section"
import { CompetitionSection } from "@/components/pitch/competition-section"
import { DashboardSection } from "@/components/pitch/dashboard-section"
import { HumanQcSection } from "@/components/pitch/human-qc-section"
import { ImplementationSection } from "@/components/pitch/implementation-section"
import { IntegrationSection } from "@/components/pitch/integration-section"
import { ListingCompareSection } from "@/components/pitch/listing-compare-section"
import { MobileAppSection } from "@/components/pitch/mobile-app-section"
import { MultiLocationSection } from "@/components/pitch/multi-location-section"
import { PitchDeck, type Slide } from "@/components/pitch/pitch-deck"
import { PitchInputsProvider } from "@/components/pitch/pitch-inputs-context"
import { ResultsSection } from "@/components/pitch/results-section"
import { ShowroomSection } from "@/components/pitch/showroom-section"
import { SolutionSection } from "@/components/pitch/solution-section"
import { TechSpecsSection } from "@/components/pitch/tech-specs-section"
import { TechnologySection } from "@/components/pitch/technology-section"
import { TrustSection } from "@/components/pitch/trust-section"
import { VideoMarketingSection } from "@/components/pitch/video-marketing-section"

const slides: Slide[] = [
  { id: "trust", group: "Socialt bevis", title: "Över 3 800 återförsäljare litar på oss", node: <TrustSection /> },
  { id: "solution", group: "Vår lösning", title: "Studiokvalitet på bara några minuter", node: <SolutionSection /> },
  { id: "before-after", group: "Bevis", title: "Se autofox-skillnaden", node: <BeforeAfterSection /> },
  { id: "app", group: "Produkt", title: "Smart mobilapp — ingen fotograf behövs", node: <MobileAppSection /> },
  { id: "ai-views", group: "Produkt", title: "32 AI-genererade vyer", node: <AiViewsSection /> },
  { id: "technology", group: "Teknik", title: "Avancerad 3D-teknik", node: <TechnologySection /> },
  { id: "showrooms", group: "Produkt", title: "1 000+ exklusiva showroom-bakgrunder", node: <ShowroomSection /> },
  { id: "listing-compare", group: "Bevis", title: "Samma bil, två annonser", node: <ListingCompareSection /> },
  { id: "video", group: "Produkt", title: "AI-genererad videomarknadsföring", node: <VideoMarketingSection /> },
  { id: "qc", group: "Differentiator", title: "Mänsklig kvalitetskontroll dygnet runt", node: <HumanQcSection /> },
  { id: "dashboard", group: "Plattform", title: "En central kontrollpunkt", node: <DashboardSection /> },
  { id: "multi-location", group: "Plattform", title: "Hantering av flera anläggningar", node: <MultiLocationSection /> },
  { id: "integration", group: "Integration", title: "Sömlös integration med era system", node: <IntegrationSection /> },
  { id: "specs", group: "Tekniskt", title: "Specifikationer och efterlevnad", node: <TechSpecsSection /> },
  { id: "competition", group: "Konkurrens", title: "autofox vs. övriga", node: <CompetitionSection /> },
  { id: "results", group: "Effekt", title: "Förvandla varje utmaning till vinst", node: <ResultsSection /> },
  { id: "implementation", group: "Lansering", title: "Kom igång på 2 veckor", node: <ImplementationSection /> },
]

export default function Page() {
  return (
    <PitchInputsProvider>
      <main className="h-dvh w-full overflow-hidden">
        <PitchDeck slides={slides} />
      </main>
    </PitchInputsProvider>
  )
}
