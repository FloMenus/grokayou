import * as Sentry from '@sentry/nuxt'

const { public: publicConfig } = useRuntimeConfig()

Sentry.init({
  dsn: publicConfig.sentryDsn,
  tracesSampleRate: 1.0,
  enabled: Boolean(publicConfig.sentryDsn)
})
