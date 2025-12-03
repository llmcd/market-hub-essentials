export function UnattendedRetail() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                The Future of Convenience
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance">
                What is <span className="font-medium">unattended retail?</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Unattended retail represents the evolution of convenience—autonomous, 24/7 retail spaces that operate
                without traditional staff. These smart solutions bring fresh food, beverages, and essentials directly to
                where people live, work, and play.
              </p>
              <p>
                From micro markets to smart coolers, unattended retail transforms underutilized spaces into
               enhanced property value and tenant satisfaction.
              </p>
              
            </div>
          </div>

          <div className="relative aspect-[4/5] bg-muted overflow-hidden">
            <img
              src="/images/design-mode/modern_retail_24621171_3.png"
              alt="Modern micro market with self-checkout kiosk"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
