import { Hero } from "@/components/hero"
import { UnattendedRetail } from "@/components/unattended-retail"
import { Solutions } from "@/components/solutions"
import { ServiceArea } from "@/components/service-area"
import { Locations } from "@/components/locations"
import { Process } from "@/components/process"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { GTMPageView } from "@/components/gtm-page-view"

export default function Home() {
  return (
    <main className="min-h-screen">
      <GTMPageView pageName="Home" pageCategory="Homepage" />
      <Hero />
      <UnattendedRetail />
      <Solutions />
      <Process />
      <Locations />
      <ServiceArea />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
