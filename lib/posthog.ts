import posthog from 'posthog-js'

export function initPostHog() {
  if (typeof window === 'undefined') return
  if (posthog.__loaded) return

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
    capture_pageview: false, // we fire manually so we can attach clientName
    persistence: 'localStorage',
    autocapture: false,
  })
}

export { posthog }
