import * as Sentry from '@sentry/nuxt'

const dsn = 'http://5559fdf51cfb421abebbec9e966e24f1@glitchtip.localhost:3000/1'
const envelopeTunnel = '/api/1/envelope/'

Sentry.init({
  dsn,
  tracesSampleRate: 1.0,
  enabled: Boolean(dsn),
  debug: import.meta.dev,
  tunnel: envelopeTunnel,
})
