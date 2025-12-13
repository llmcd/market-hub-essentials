"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"

export function ServiceRequestForm() {
  const [successMessage, setSuccessMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [recaptchaReady, setRecaptchaReady] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    businessAddress: "",
    city: "",
    state: "",
    customerId: "",
    serviceIssues: [] as string[],
    additionalDetails: "",
  })

  useEffect(() => {
    const checkRecaptcha = () => {
      if (typeof window !== "undefined" && (window as any).grecaptcha && (window as any).grecaptcha.ready) {
        ;(window as any).grecaptcha.ready(() => {
          setRecaptchaReady(true)
        })
      }
    }

    checkRecaptcha()

    const interval = setInterval(() => {
      if (!recaptchaReady) {
        checkRecaptcha()
      }
    }, 100)

    return () => clearInterval(interval)
  }, [recaptchaReady])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!recaptchaReady || typeof window === "undefined" || !(window as any).grecaptcha) {
        throw new Error("reCAPTCHA not ready. Please try again.")
      }

      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

      if (!siteKey) {
        throw new Error("reCAPTCHA configuration error")
      }

      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        ;(window as any).grecaptcha.ready(async () => {
          try {
            const token = await (window as any).grecaptcha.execute(siteKey, {
              action: "submit_service_request",
            })
            resolve(token)
          } catch (err) {
            reject(err)
          }
        })
      })

      if (!recaptchaToken) {
        throw new Error("reCAPTCHA verification failed")
      }

      const webhookPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        businessAddress: formData.businessAddress,
        city: formData.city,
        state: formData.state,
        customerId: formData.customerId,
        serviceIssues: formData.serviceIssues,
        additionalDetails: formData.additionalDetails,
        recaptchaToken,
        submittedAt: new Date().toISOString(),
        formType: "service_request",
      }

      console.log("Submitting to:", "/api/send-service-request")
      console.log("Payload:", webhookPayload)

      const response = await fetch("/api/send-service-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))

      const contentType = response.headers.get("content-type")
      console.log("Content-Type:", contentType)

      const responseText = await response.text()
      console.log("Response body (first 500 chars):", responseText.substring(0, 500))

      if (!response.ok) {
        throw new Error("Failed to submit service request")
      }

      if (contentType?.includes("text/html")) {
        throw new Error("API returned HTML instead of JSON - routing issue")
      }

      setSuccessMessage(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        businessName: "",
        businessAddress: "",
        city: "",
        state: "",
        customerId: "",
        serviceIssues: [],
        additionalDetails: "",
      })

      setTimeout(() => {
        setSuccessMessage(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting service request:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to submit service request. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleServiceIssuesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value)
    setFormData({
      ...formData,
      serviceIssues: selectedOptions,
    })
  }

  const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
  ]

  return (
    <>
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">Service request submitted successfully.</p>
            <p className="text-green-700 text-sm">Our team will contact you shortly to address your issue.</p>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-xl font-medium mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
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
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-4">Business Information</h2>
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="businessAddress" className="block text-sm font-medium mb-2">
              Business Address
            </label>
            <input
              type="text"
              id="businessAddress"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-2">
                State
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select a state</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="customerId" className="block text-sm font-medium mb-2">
              Customer ID
            </label>
            <input
              type="text"
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-4">Service Issues</h2>
          <div>
            <label htmlFor="serviceIssues" className="block text-sm font-medium mb-2">
              Select All That Apply *
            </label>
            <select
              id="serviceIssues"
              name="serviceIssues"
              multiple
              value={formData.serviceIssues}
              onChange={handleServiceIssuesChange}
              required
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors min-h-[120px]"
            >
              <option value="card_reader_not_working">Card Reader not working (not allowing machine access)</option>
              <option value="machine_not_cooling">Machine not cooling</option>
              <option value="noisy_machine">Noisy Machine</option>
              <option value="none">None of the above</option>
            </select>
            <p className="text-xs text-muted-foreground mt-2">
              Hold Ctrl (Windows) or Cmd (Mac) to select multiple options
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="additionalDetails" className="block text-sm font-medium mb-2">
              Please specify any additional details
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Provide any additional information about the issue..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground px-8 py-4 font-medium hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group"
        >
          {loading ? "Submitting..." : "Submit Service Request"}
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
    </>
  )
}
