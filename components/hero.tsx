import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://llmdocs.s3.us-east-1.amazonaws.com/markethubessentials/mhe_hero6.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 pb-16 md:pb-24 lg:pb-10 text-center">
        <div className="space-y-8">
          <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl text-primary-foreground tracking-tight drop-shadow-lg">
            <span className="block text-balance">Transform any space into</span>
            <span className="block font-medium mt-2 text-balance">a retail opportunity</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed text-balance drop-shadow-md">
            Cutting-edge unattended retail solutions that deliver convenience and satisfaction to your
            property.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 text-lg font-medium hover:bg-background/90 transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 text-lg font-medium hover:bg-primary-foreground hover:text-primary transition-all"
            >
              Explore Solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
