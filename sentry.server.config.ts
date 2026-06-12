import * as Sentry from '@sentry/nuxt'

// Dans Docker, le serveur Nuxt ne peut pas joindre "localhost:8000".
// On remplace automatiquement par le nom du service Docker "glitchtip-web".
const rawDsn = process.env.NUXT_PUBLIC_SENTRY_DSN ?? ''
const dsn = rawDsn.replace('localhost:8000', 'glitchtip-web:8000')

Sentry.init({
  dsn,
  tracesSampleRate: 1.0,
  enableLogs: true,
  enabled: Boolean(dsn)
})
