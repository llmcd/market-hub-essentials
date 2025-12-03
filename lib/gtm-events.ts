export type EventName =
  | "view_page"
  | "click_solution"
  | "click_location_type"
  | "click_cta"
  | "form_submit"
  | "view_faq"
  | "click_contact_phone"
  | "click_contact_email"
  | "click_external_link"

export interface GTMEvent {
  event: EventName
  [key: string]: unknown
}

/**
 * Push event to Google Tag Manager dataLayer
 * Used for tracking user interactions and page events
 */
export function trackGTMEvent(eventName: EventName, eventData?: Record<string, unknown>) {
  if (typeof window === "undefined") return

  const event: GTMEvent = {
    event: eventName,
    ...eventData,
    timestamp: new Date().toISOString(),
  }

  // Push to GTM dataLayer
  ;(window as any).dataLayer?.push(event)

  console.log("[v0] GTM Event:", event)
}

/**
 * Track page view with custom parameters
 */
export function trackPageView(pageName: string, pageCategory: string) {
  trackGTMEvent("view_page", {
    page_name: pageName,
    page_category: pageCategory,
    page_location: typeof window !== "undefined" ? window.location.href : "",
  })
}

/**
 * Track solution click
 */
export function trackSolutionClick(solutionName: "Micro Markets" | "Smart Stores" | "Smart Coolers") {
  trackGTMEvent("click_solution", {
    solution_name: solutionName,
    solution_category: "Service Offering",
  })
}

/**
 * Track location type click
 */
export function trackLocationClick(locationType: string) {
  trackGTMEvent("click_location_type", {
    location_type: locationType,
    location_category: "Service Location",
  })
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaText: string, ctaType: "button" | "link") {
  trackGTMEvent("click_cta", {
    cta_text: ctaText,
    cta_type: ctaType,
    cta_category: "Call to Action",
  })
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, formFields?: Record<string, string>) {
  trackGTMEvent("form_submit", {
    form_name: formName,
    form_fields: Object.keys(formFields || {}).length,
    form_category: "Lead Generation",
  })
}

/**
 * Track FAQ interaction
 */
export function trackFAQClick(questionNumber: number, questionText: string) {
  trackGTMEvent("view_faq", {
    faq_number: questionNumber,
    faq_question: questionText,
    faq_category: "FAQ Engagement",
  })
}

/**
 * Track contact interaction
 */
export function trackContactInteraction(type: "phone" | "email", value: string) {
  trackGTMEvent(type === "phone" ? "click_contact_phone" : "click_contact_email", {
    contact_type: type,
    contact_value: value,
    contact_category: "Lead Generation",
  })
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string, linkText: string) {
  trackGTMEvent("click_external_link", {
    external_url: url,
    link_text: linkText,
    link_category: "Outbound",
  })
}
