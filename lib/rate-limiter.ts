interface RateLimitStore {
  [key: string]: { count: number; resetTime: number }
}

const rateLimitStore: RateLimitStore = {}
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS_PER_HOUR = 5

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const record = rateLimitStore[identifier]

  if (!record || now > record.resetTime) {
    // Create new rate limit record
    rateLimitStore[identifier] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    return true
  }

  if (record.count < MAX_REQUESTS_PER_HOUR) {
    record.count++
    return true
  }

  return false
}

// Cleanup old records every 2 hours
setInterval(
  () => {
    const now = Date.now()
    Object.keys(rateLimitStore).forEach((key) => {
      if (now > rateLimitStore[key].resetTime) {
        delete rateLimitStore[key]
      }
    })
  },
  2 * 60 * 60 * 1000,
)
