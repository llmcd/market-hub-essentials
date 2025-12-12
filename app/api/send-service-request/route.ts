import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/lib/input-sanitizer"
import { checkRateLimit } from "@/lib/rate-limiter"

const resend = new Resend(process.env.RESEND_API_KEY)

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    return data.success && data.score > 0.5
  } catch (error) {
    console.error("[v0] reCAPTCHA verification error:", error)
    return false
  }
}

export async function GET() {
  return NextResponse.json({
    version: "v2-no-recaptcha",
    timestamp: new Date().toISOString(),
    recaptchaDisabled: true
  })
}

export async function POST(request: NextRequest) {
  console.log("========== SERVICE REQUEST STARTED (v2-no-recaptcha) ==========")
  try {
    const SERVICE_EMAIL = process.env.SERVICE_EMAIL_ADDRESS
    const FROM_EMAIL = process.env.FROM_EMAIL_ADDRESS
    const SERVICE_WEBHOOK_URL = process.env.SERVICE_WEBHOOK_URL

    console.log("SERVICE_EMAIL:", SERVICE_EMAIL ? "SET" : "MISSING")
    console.log("FROM_EMAIL:", FROM_EMAIL ? "SET" : "MISSING")
    console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "SET" : "MISSING")

    const missingVars = []
    if (!SERVICE_EMAIL) missingVars.push("SERVICE_EMAIL_ADDRESS")
    if (!FROM_EMAIL) missingVars.push("FROM_EMAIL_ADDRESS")
    if (!SERVICE_WEBHOOK_URL) missingVars.push("SERVICE_WEBHOOK_URL")
    if (!process.env.RESEND_API_KEY) missingVars.push("RESEND_API_KEY")
    if (!process.env.RECAPTCHA_SECRET_KEY) missingVars.push("RECAPTCHA_SECRET_KEY")

    if (missingVars.length > 0) {
      console.error("[v0] Missing environment variables:", missingVars.join(", "))
      return NextResponse.json({
        error: "Configuration missing",
        details: `Missing: ${missingVars.join(", ")}`
      }, { status: 500 })
    }

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      businessName,
      businessAddress,
      city,
      state,
      customerId,
      serviceIssues,
      additionalDetails,
      recaptchaToken,
    } = body

    // Temporarily disable reCAPTCHA for testing
    // const recaptchaValid = await verifyRecaptcha(recaptchaToken)
    // if (!recaptchaValid) {
    //   return NextResponse.json({ error: "Bot verification failed" }, { status: 403 })
    // }

    if (!firstName || !lastName || !email || !businessName || !serviceIssues || serviceIssues.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const sanitizedData = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      email: sanitizeEmail(email),
      phone: sanitizePhone(phone),
      businessName: sanitizeInput(businessName),
      businessAddress: sanitizeInput(businessAddress),
      city: sanitizeInput(city),
      state: sanitizeInput(state),
      customerId: sanitizeInput(customerId),
      serviceIssues: Array.isArray(serviceIssues) ? serviceIssues.map(issue => sanitizeInput(issue)) : [],
      additionalDetails: sanitizeInput(additionalDetails),
    }

    if (!sanitizedData.email) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const serviceIssueLabels: Record<string, string> = {
      card_reader_not_working: "Card Reader not working (not allowing machine access)",
      machine_not_cooling: "Machine not cooling",
      noisy_machine: "Noisy Machine",
      none: "None of the above",
    }

    const issuesList = sanitizedData.serviceIssues
      .map(issue => `<li>${serviceIssueLabels[issue] || issue}</li>`)
      .join("")

    const webhookPayload = {
      ...sanitizedData,
      recaptchaToken,
      submittedAt: new Date().toISOString(),
      formType: "service_request",
    }

    console.log("[v0] Sending service request email from:", FROM_EMAIL, "to:", SERVICE_EMAIL)

    const [emailResponse, webhookResponse] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: SERVICE_EMAIL,
        subject: `Service Request from ${sanitizedData.firstName} ${sanitizedData.lastName} - ${sanitizedData.businessName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Service Request</h2>

            <h3 style="color: #666; margin-top: 24px;">Contact Information</h3>
            <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Phone:</strong> ${sanitizedData.phone || "Not provided"}</p>

            <h3 style="color: #666; margin-top: 24px;">Business Information</h3>
            <p><strong>Business Name:</strong> ${sanitizedData.businessName}</p>
            <p><strong>Business Address:</strong> ${sanitizedData.businessAddress || "Not provided"}</p>
            ${sanitizedData.city || sanitizedData.state ? `<p><strong>Location:</strong> ${[sanitizedData.city, sanitizedData.state].filter(Boolean).join(", ")}</p>` : ""}
            ${sanitizedData.customerId ? `<p><strong>Customer ID:</strong> ${sanitizedData.customerId}</p>` : ""}

            <h3 style="color: #666; margin-top: 24px;">Service Issues</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${issuesList}
            </ul>

            ${sanitizedData.additionalDetails ? `
              <h3 style="color: #666; margin-top: 24px;">Additional Details</h3>
              <p>${sanitizedData.additionalDetails}</p>
            ` : ""}

            <hr style="margin-top: 24px; border: none; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin-top: 16px;">This service request was submitted via Market Hub Essentials website</p>
          </div>
        `,
      }),
      fetch(SERVICE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      }),
    ])

    if (emailResponse.error) {
      console.error("[v0] Resend error:", emailResponse.error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    console.log("[v0] Email sent successfully! ID:", emailResponse.data?.id)

    if (!webhookResponse.ok) {
      console.error("[v0] Webhook error:", webhookResponse.status)
    }

    console.log("[v0] Service request submitted successfully")
    return NextResponse.json({ success: true, message: "Service request submitted successfully" })
  } catch (error) {
    console.error("[v0] Error in send-service-request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
