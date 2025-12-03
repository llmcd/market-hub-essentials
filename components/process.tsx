export function Process() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We assess your space, understand your needs, and recommend the perfect solution for your property.",
    },
    {
      number: "02",
      title: "Product Selection",
      description: "Our team creates a tailored product selection list thats ideal for your audience.",
    },
    {
      number: "03",
      title: "Professional Installation",
      description: "We handle everything—from delivery and setup to staff training and system configuration.",
    },
    {
      number: "04",
      title: "Ongoing Support",
      description: "Enjoy hassle-free operation with regular restocking, maintenance, and 24/7 technical support.",
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium mb-4">Simple Process</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance">
            From concept to <span className="font-medium">operation</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="space-y-4">
              <div className="font-serif text-6xl font-light text-primary/20">{step.number}</div>
              <h3 className="font-serif text-2xl font-medium">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
