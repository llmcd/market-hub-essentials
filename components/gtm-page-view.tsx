"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/gtm-events"

export function GTMPageView({ pageName, pageCategory }: { pageName: string; pageCategory: string }) {
  useEffect(() => {
    trackPageView(pageName, pageCategory)
  }, [pageName, pageCategory])

  return null
}
