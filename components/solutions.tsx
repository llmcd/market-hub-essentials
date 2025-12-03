export function Solutions() {
  const solutions = [
    {
      title: "Micro Markets",
      description:
        "Compact, AI-powered retail units with advanced product recognition. Grab what you need and the system automatically charges a credit or debit card. Ideal for snacks & beverages, Chargers & Toiletries ",
      features: [
        "Self-checkout",
        "AI product recognition",
        "Grab-and-go convenience",
        "Compact footprint",
        "Theft prevention technology"
      ],
      image: "https://llmdocs.s3.us-east-1.amazonaws.com/markethubessentials/micromart12_2.png",
    },
    
    {
      title: "Smart Coolers",
      description:
        "Refrigerated units with smart lock technology and cashless payment. Ideal for beverages, fresh meals, and grab-and-go items in any location.",
      features: ["Temperature monitoring", "Smart lock technology", "AI product recognition", "Cashless payments", "Energy efficient"],
      image: "https://llmdocs.s3.us-east-1.amazonaws.com/markethubessentials/smartcooler2_2.png",
    },
  ]

  return (
    <section id="solutions" className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium mb-4">Our Solutions</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance">
            Choose the <span className="font-medium">perfect fit</span>
          </h2>
        </div>

        <div className="space-y-32">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="space-y-4">
                  <h3 className="font-serif text-3xl md:text-4xl font-medium">{solution.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{solution.description}</p>
                </div>

                <ul className="space-y-3">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`relative aspect-[4/3] bg-muted overflow-hidden ${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <img
                  src={solution.image || "/placeholder.svg"}
                  alt={solution.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
