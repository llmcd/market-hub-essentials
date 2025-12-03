export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-medium">Unattended Retail</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Transforming spaces into retail opportunities with cutting-edge solutions.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#solutions" className="hover:text-background transition-colors">
                  Micro Markets
                </a>
              </li>
              
              <li>
                <a href="#solutions" className="hover:text-background transition-colors">
                  Smart Coolers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
             <li className="pt-2">
              <a href="#contact" className="hover:text-background transition-colors">Service Request </a>
             </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>(202) 630-2245</li>
              
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>© {new Date().getFullYear()} Market Hub Essentials. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
