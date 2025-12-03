"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"

export function CTA() {
  const [successMessage, setSuccessMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [csrfToken, setCSRFToken] = useState("")
  const [recaptchaReady, setRecaptchaReady] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    propertyType: "",
    message: "",
    firstPlacement: "",
    existingVending: "",
    expectations: "",
  })

  useEffect(() => {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    setCSRFToken(token)

    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    script.async = true
    script.defer = true
    script.onload = () => setRecaptchaReady(true)
    document.head.appendChild(script)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const recaptchaToken = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
        action: "submit",
      })

      if (!recaptchaToken) {
        throw new Error("reCAPTCHA verification failed")
      }

      const response = await fetch("/api/send-inquiry-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form")
      }

      setSuccessMessage(true)
      setFormData({
        name: "",
        companyName: "",
        email: "",
        phone: "",
        propertyType: "",
        message: "",
        firstPlacement: "",
        existingVending: "",
        expectations: "",
      })

      const newToken = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
      setCSRFToken(newToken)

      setTimeout(() => {
        setSuccessMessage(false)
      }, 5000)
    } catch (error) {
      console.log("[v0] Error submitting form:", error)
      setError("Failed to submit form. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Get Started Today</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance">
                Ready to <span className="font-medium">transform your space?</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>Contact us today for a free consultation and custom proposal tailored to your space and needs.</p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <div>
                  <div className="font-medium mb-1">No upfront costs</div>
                  <div className="text-sm text-muted-foreground">We handle all equipment and installation</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <div>
                  <div className="font-medium mb-1">Full service</div>
                  <div className="text-sm text-muted-foreground">We manage everything for you</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background p-8 lg:p-12">
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Thank you for your inquiry.</p>
                  <p className="text-green-700 text-sm">We will contact you within the next 24-48 hours.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3">
                <div>
                  <p className="text-red-800 font-medium">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium mb-2">
                  Property Type *
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select a property type</option>
                  <option value="apartment">Apartment Complex</option>
                  <option value="office">Office Building</option>
                  <option value="student">Student Housing</option>
                  <option value="gym">Gym/Fitness Center</option>
                  <option value="hotel">Hotel</option>
                  <option value="healthcare">Healthcare Facility</option>
                  <option value="warehouse">Warehouse/Distribution</option>
                  <option value="senior">Senior Living</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Tell us about your space
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label htmlFor="firstPlacement" className="block text-sm font-medium mb-2">
                  Is this your first unattended retail (Micro Market, Smart Cooler) placement? *
                </label>
                <select
                  id="firstPlacement"
                  name="firstPlacement"
                  value={formData.firstPlacement}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label htmlFor="existingVending" className="block text-sm font-medium mb-2">
                  Any existing traditional vending machines on your property? *
                </label>
                <select
                  id="existingVending"
                  name="existingVending"
                  value={formData.existingVending}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label htmlFor="expectations" className="block text-sm font-medium mb-2">
                  What are you expecting from unattended retail? *
                </label>
                <textarea
                  id="expectations"
                  name="expectations"
                  value={formData.expectations}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="e.g., increased tenant satisfaction, happy employees, convenience..."
                />
              </div>

              <button
                type="submit"
                disabled={loading || !recaptchaReady}
                className="w-full bg-primary text-primary-foreground px-8 py-4 font-medium hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group"
              >
                {loading ? "Submitting..." : "Request Consultation"}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                This site is protected by reCAPTCHA and the Google
                <a href="https://policies.google.com/privacy" className="underline">
                  {" "}
                  Privacy Policy
                </a>{" "}
                and
                <a href="https://policies.google.com/terms" className="underline">
                  {" "}
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
