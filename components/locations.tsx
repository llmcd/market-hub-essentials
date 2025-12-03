export function Locations() {
  const locations = [
    {
      name: "Apartments",
      description: "Enhance resident satisfaction with 24/7 convenience",
      image: "/placeholder.svg?height=500&width=700",
    },
    {
      name: "Office Spaces",
      description: "Keep employees happy with on-site refreshments",
      image: "/placeholder.svg?height=500&width=700",
    },
    {
      name: "Breakrooms",
      description: "Transform break areas into premium amenities",
      image: "/placeholder.svg?height=500&width=700",
    },
    {
      name: "Student Housing",
      description: "Provide convenient options for busy students",
      image: "/placeholder.svg?height=500&width=700",
    },
    {
      name: "Wellness Centers",
      description: "Offer healthy choices that align with wellness goals",
      image: "/placeholder.svg?height=500&width=700",
    },
    {
      name: "Gyms",
      description: "Fuel workouts with protein, supplements, and hydration",
      image: "/placeholder.svg?height=500&width=700",
    },
    {
      name: "Hotels",
      description: "Elevate guest experience with 24/7 convenience",
      image: "/placeholder.svg?height=500&width=700",
    },
    {
      name: "Airports",
      description: "Serve travelers with quick, reliable options",
      image: "/placeholder.svg?height=500&width=700",
    },
    {
      name: "Warehouse & Distribution",
      description: "Keep workers fueled during long shifts",
      image: "/placeholder.svg?height=500&width=700",
    }
    
  ]

  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium mb-4">
            Perfect For Any Space
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance">
            Where we <span className="font-medium">make a difference</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <div key={location.name} className="group relative aspect-[4/3] bg-muted overflow-hidden cursor-pointer">
              <img
                src={location.image || "/placeholder.svg"}
                alt={location.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <h3 className="font-serif text-2xl font-medium mb-2">{location.name}</h3>
                <p className="text-background/90 text-sm">{location.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
