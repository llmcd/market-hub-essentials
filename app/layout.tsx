import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Vending Machines & Micro Markets | Market Hub Essentials | Mid-Atlantic Unattended Retail Solutions",
  description:
    "Market Hub Essentials provides unattended retail solutions including micro markets, smart vending machines, and smart coolers. Serving Richmond VA, Washington DC metro, and Philadelphia PA with plans to expand nationwide.",
  keywords: [
    "vending machines",
    "micro markets",
    "smart vending machines",
    "smart coolers",
    "smart stores",
    "unattended retail",
    "office vending solutions",
    "apartment vending",
    "gym vending machines",
    "hotel convenience services",
    "healthcare vending",
    "workplace convenience",
    "breakroom solutions",
    "student housing vending",
    "senior living amenities",
    "warehouse vending",
    "property management services",
    "automated retail",
    "self-service retail",
    "contactless vending",
    "revenue-generating amenities",
    "IoT vending technology",
    "24/7 retail access",
    "vending machines washington dc",
    "micro markets dc",
    "smart vending dmv",
    "vending machines maryland",
    "vending machines virginia",
    "dc metro vending solutions",
    "vending machines richmond va",
    "vending machines philadelphia pa",
    "micro markets virginia",
    "micro markets pennsylvania",
    "mid atlantic vending solutions",
    "unattended retail mid atlantic",
    "convenience retail solutions",
    "property amenities",
  ],
  authors: [{ name: "Market Hub Essentials" }],
  creator: "Market Hub Essentials",
  publisher: "Market Hub Essentials",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://markethubessentials.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vending Machines & Micro Markets | Market Hub Essentials",
    description:
      "Transform any space into a revenue-generating retail experience. Market Hub Essentials brings convenience and innovation to apartments, offices, gyms, airports, and beyond across the Mid-Atlantic region.",
    url: "https://markethubessentials.com",
    siteName: "Market Hub Essentials",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Market Hub Essentials - Unattended Retail Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vending Machines & Micro Markets | Market Hub Essentials",
    description:
      "Transform any space into a revenue-generating retail experience with smart vending solutions across the Mid-Atlantic.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || ""
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />

        {recaptchaSiteKey && (
          <Script
            id="recaptcha-script"
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="afterInteractive"
          />
        )}

        <meta name="geo.region" content="US-DC,US-VA,US-MD,US-PA" />
        <meta name="geo.placename" content="Washington DC, Richmond VA, Philadelphia PA, College Park MD" />
        <meta name="geo.position" content="38.9072;-77.0369" />
        <meta name="ICBM" content="38.9072, -77.0369" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://markethubessentials.com#organization",
                  name: "Market Hub Essentials",
                  url: "https://markethubessentials.com",
                  logo: "https://markethubessentials.com/logo.png",
                  description:
                    "Transform any space into a revenue-generating retail experience with our smart vending, micro market, and unattended retail solutions. We bring convenience and innovation to apartments, offices, gyms, airports, and beyond—delivering on-demand access to fresh food, drinks, and everyday essentials.",
                  foundingDate: "2025",
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "Customer Support",
                    telephone: "202-630-2245",
                    email: "admin@markethubessentials.com",
                    areaServed: ["US-VA", "US-DC", "US-MD", "US-PA"],
                    availableLanguage: "en",
                    hoursAvailable: [
                      {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        opens: "08:00",
                        closes: "18:00",
                      },
                    ],
                  },
                  sameAs: [
                    // Add social media URLs when available
                    // "https://www.facebook.com/markethubessentials",
                    // "https://www.linkedin.com/company/markethubessentials",
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://markethubessentials.com#localbusiness",
                  name: "Market Hub Essentials",
                  description:
                    "Provider of unattended retail solutions including micro markets, smart stores, and smart coolers for commercial properties.",
                  url: "https://markethubessentials.com",
                  telephone: "202-630-2245",
                  email: "inquiries@markethubessentials.com",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "4815 Calvert Rd Box #3",
                    addressLocality: "College Park",
                    addressRegion: "MD",
                    postalCode: "20740",
                    addressCountry: "US",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: "38.9896",
                    longitude: "-76.9356",
                  },
                  priceRange: "$$",
                  areaServed: [
                    {
                      "@type": "City",
                      name: "Richmond",
                      "@id": "https://en.wikipedia.org/wiki/Richmond,_Virginia",
                    },
                    {
                      "@type": "City",
                      name: "Washington",
                      "@id": "https://en.wikipedia.org/wiki/Washington,_D.C.",
                    },
                    {
                      "@type": "City",
                      name: "Philadelphia",
                      "@id": "https://en.wikipedia.org/wiki/Philadelphia",
                    },
                    {
                      "@type": "State",
                      name: "Maryland",
                    },
                    {
                      "@type": "State",
                      name: "Virginia",
                    },
                    {
                      "@type": "State",
                      name: "Pennsylvania",
                    },
                  ],
                  serviceType: [
                    "Micro Markets",
                    "Smart Vending Machines",
                    "Smart Coolers",
                    "Smart Stores",
                    "Unattended Retail Solutions",
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Unattended Retail Solutions",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Micro Markets",
                          description:
                            "Open-concept retail spaces with fresh food, snacks, and beverages available 24/7 with real-time inventory and seamless transactions.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Smart Stores",
                          description:
                            "Fully automated retail environments with advanced IoT technology and seamless checkout experience.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Smart Coolers",
                          description:
                            "Intelligent refrigerated units with touchless payment, real-time inventory management, and 24/7 access.",
                        },
                      },
                    ],
                  },
                  audience: {
                    "@type": "Audience",
                    audienceType: [
                      "Property Managers",
                      "Building Owners",
                      "Facility Managers",
                      "Corporate Real Estate",
                    ],
                  },
                },
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is unattended retail?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Unattended retail refers to self-service retail environments where customers can purchase products 24/7 without staff assistance. Examples include vending machines, micro markets, and smart coolers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do micro markets work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Micro markets are open-concept retail spaces with refrigerated and shelved products. Customers select items and checkout at a self-service kiosk using contactless payment methods.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What locations can have vending machines?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Vending machines can be placed in apartments, offices, gyms, hotels, airports, healthcare facilities, warehouses, senior living communities, student housing, wellness centers, lobbies, and breakrooms.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {children}
        <Analytics />
      </body>
    </html>
  )
}
