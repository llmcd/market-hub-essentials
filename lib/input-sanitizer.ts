export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return ""

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .slice(0, 5000) // Limit length
}

export function sanitizeEmail(email: string): string {
  const sanitized = sanitizeInput(email)
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(sanitized) ? sanitized : ""
}

export function sanitizePhone(phone: string): string {
  return sanitizeInput(phone).replace(/[^\d+\-\s()]/g, "")
}
