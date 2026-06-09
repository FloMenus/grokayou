type TrackingPayload = Record<string, string | number | boolean | null>

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, payload?: TrackingPayload) => void
    }
  }
}

export function trackEvent(eventName: string, payload: TrackingPayload = {}) {
  if (!import.meta.client) return
  if (!window.umami || typeof window.umami.track !== 'function') return

  window.umami.track(eventName, payload)
}
