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
    // Consider score > 0.5 as valid (reCAPTCHA v3)
    return data.success && data.score > 0.5
  } catch (error) {
    console.error("[v0] reCAPTCHA verification error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const INQUIRY_EMAIL = process.env.INQUIRY_EMAIL_ADDRESS
    const FROM_EMAIL = process.env.FROM_EMAIL_ADDRESS
    const INQUIRY_WEBHOOK_URL = process.env.INQUIRY_WEBHOOK_URL

    if (!INQUIRY_EMAIL || !FROM_EMAIL || !INQUIRY_WEBHOOK_URL) {
      return NextResponse.json({ error: "Configuration missing" }, { status: 500 })
    }

    const csrfToken = request.headers.get("X-CSRF-Token")
    if (!csrfToken) {
      return NextResponse.json({ error: "CSRF token missing" }, { status: 403 })
    }

    const body = await request.json()
    const {
      name,
      companyName,
      email,
      phone,
      propertyType,
      message,
      firstPlacement,
      existingVending,
      expectations,
      recaptchaToken,
    } = body

    const recaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!recaptchaValid) {
      return NextResponse.json({ error: "Bot verification failed" }, { status: 403 })
    }

    if (!name || !companyName || !email || !propertyType || !firstPlacement || !existingVending || !expectations) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const sanitizedData = {
      name: sanitizeInput(name),
      companyName: sanitizeInput(companyName),
      email: sanitizeEmail(email),
      phone: sanitizePhone(phone),
      propertyType: sanitizeInput(propertyType),
      message: sanitizeInput(message),
      firstPlacement: sanitizeInput(firstPlacement),
      existingVending: sanitizeInput(existingVending),
      expectations: sanitizeInput(expectations),
    }

    // Validate sanitized data
    if (!sanitizedData.email) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const webhookPayload = {
      ...sanitizedData,
      recaptchaToken,
      submittedAt: new Date().toISOString(),
    }

    const [emailResponse, webhookResponse] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: INQUIRY_EMAIL,
        subject: `New Inquiry from ${sanitizedData.name} - ${sanitizedData.companyName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Inquiry Submission</h2>
            
            <h3 style="color: #666; margin-top: 24px;">Contact Information</h3>
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Company:</strong> ${sanitizedData.companyName}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Phone:</strong> ${sanitizedData.phone || "Not provided"}</p>
            
            <h3 style="color: #666; margin-top: 24px;">Property Details</h3>
            <p><strong>Property Type:</strong> ${sanitizedData.propertyType}</p>
            <p><strong>About Space:</strong></p>
            <p>${sanitizedData.message || "Not provided"}</p>
            
            <h3 style="color: #666; margin-top: 24px;">Questions</h3>
            <p><strong>First unattended retail placement?</strong> ${sanitizedData.firstPlacement}</p>
            <p><strong>Existing traditional vending machines?</strong> ${sanitizedData.existingVending}</p>
            <p><strong>Expectations:</strong></p>
            <p>${sanitizedData.expectations}</p>
            
            <hr style="margin-top: 24px; border: none; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin-top: 16px;">This inquiry was submitted via Market Hub Essentials website</p>
          </div>
        `,
      }),
      fetch(INQUIRY_WEBHOOK_URL, {
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

    if (!webhookResponse.ok) {
      console.error("[v0] Webhook error:", webhookResponse.status)
    }

    console.log("[v0] Inquiry submitted successfully")
    return NextResponse.json({ success: true, message: "Inquiry submitted successfully" })
  } catch (error) {
    console.error("[v0] Error in send-inquiry-email:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
