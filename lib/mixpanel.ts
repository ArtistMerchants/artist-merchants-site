import mixpanel from 'mixpanel-browser'

export function initMixpanel() {
  if (typeof window === 'undefined') return
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? '', {
    track_pageview: false, // we fire manually to attach clientName
    persistence: 'localStorage',
    ignore_dnt: true,
  })
}

export { mixpanel }
