export function ServiceArea() {
  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-primary-foreground/70 font-medium">Service Area</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance">
                Serving the <span className="font-medium">Mid-Atlantic region</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-primary-foreground/90">
              <p>
                We bring cutting-edge unattended retail solutions to properties throughout the Mid-Atlantic region.
                Currently serving from Richmond, Virginia through the Washington DC metro area to Philadelphia,
                Pennsylvania, we partner with property managers and building owners to deliver modern convenience
                services that enhance tenant satisfaction and property value.
              </p>
              <p>
                Our dedicated team provides reliable installation, regular restocking, and responsive support across
                Virginia, Maryland, Washington DC, and Pennsylvania. As we grow, we're planning to expand our service
                area nationwide to bring innovative retail solutions to properties across the country.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="font-serif text-5xl font-light mb-2">4</div>
                <div className="text-primary-foreground/80">States & Growing</div>
              </div>
              <div>
                <div className="font-serif text-5xl font-light mb-2">24/7</div>
                <div className="text-primary-foreground/80">Support & Service</div>
              </div>
            </div>
          </div>

          <div className="relative aspect-square bg-primary-foreground/10 overflow-hidden">
         <img
              src="https://llmdocs.s3.us-east-1.amazonaws.com/markethubessentials/mapimage.jpg"
              alt="Service area map covering Richmond VA, Washington DC metro, and Philadelphia PA"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
