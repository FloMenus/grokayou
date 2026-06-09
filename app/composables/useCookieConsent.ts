export const useCookieConsent = () => {
  const consent = useState<'accepted' | 'refused' | null>('cookie_consent', () => null)

  const isAccepted = computed(() => consent.value === 'accepted')
  const isPending = computed(() => consent.value === null)

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    localStorage.removeItem('umami.disabled')
    consent.value = 'accepted'
  }

  function refuse() {
    localStorage.setItem('cookie_consent', 'refused')
    localStorage.setItem('umami.disabled', '1')
    consent.value = 'refused'
  }

  function init() {
    const stored = localStorage.getItem('cookie_consent') as 'accepted' | 'refused' | null
    consent.value = stored
    if (stored === 'refused') {
      localStorage.setItem('umami.disabled', '1')
    }
  }

  return { isAccepted, isPending, accept, refuse, init }
}
