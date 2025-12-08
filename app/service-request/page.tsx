import { ServiceRequestForm } from "@/components/service-request-form"
import { Footer } from "@/components/footer"
import { GTMPageView } from "@/components/gtm-page-view"

export const metadata = {
  title: "Service Request | Market Hub Essentials",
  description: "Submit a service request for your vending machines, micro markets, or smart coolers. Our team is ready to help with any issues.",
}

export default function ServiceRequestPage() {
  return (
    <main className="min-h-screen">
      <GTMPageView pageName="Service Request" pageCategory="Support" />

      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-4">
              Service <span className="font-medium">Request</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Need help with your equipment? Fill out the form below and our team will get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-background p-8 lg:p-12">
            <ServiceRequestForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
