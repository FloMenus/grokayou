import * as Sentry from '@sentry/nuxt'

type LogLevel = 'info' | 'warning' | 'error'
type LogContext = Record<string, string | number | boolean | null | undefined>

type StructuredLogger = {
  info?: (message: string, attributes?: Record<string, unknown>) => void
  warn?: (message: string, attributes?: Record<string, unknown>) => void
  error?: (message: string, attributes?: Record<string, unknown>) => void
}

function toAttributes(context: LogContext): Record<string, unknown> {
  const attributes: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(context)) {
    if (value !== undefined) {
      attributes[key] = value
    }
  }
  return attributes
}

function getStructuredLogger(): StructuredLogger {
  return (Sentry as unknown as { logger?: StructuredLogger }).logger ?? {}
}

function applyContext(scope: Sentry.Scope, context: LogContext) {
  for (const [key, value] of Object.entries(context)) {
    if (value !== undefined) {
      scope.setExtra(key, value)
    }
  }
}

function sendMessage(level: LogLevel, message: string, context: LogContext = {}) {
  const attributes = toAttributes(context)
  const logger = getStructuredLogger()

  if (level === 'info' && typeof logger.info === 'function') {
    logger.info(message, attributes)
    return
  }

  if (level === 'warning' && typeof logger.warn === 'function') {
    logger.warn(message, attributes)
    return
  }

  Sentry.withScope((scope) => {
    scope.setLevel(level)
    applyContext(scope, context)
    Sentry.captureMessage(message)
  })
}

export function logInfo(message: string, context: LogContext = {}) {
  sendMessage('info', message, context)
}

export function logWarn(message: string, context: LogContext = {}) {
  sendMessage('warning', message, context)
}

export function logError(error: unknown, context: LogContext = {}) {
  const attributes = toAttributes(context)
  const logger = getStructuredLogger()

  if (typeof logger.error === 'function') {
    const message = error instanceof Error ? error.message : String(error)
    logger.error(message, attributes)
    return
  }

  Sentry.withScope((scope) => {
    scope.setLevel('error')
    applyContext(scope, context)

    if (error instanceof Error) {
      Sentry.captureException(error)
      return
    }

    Sentry.captureMessage(String(error))
  })
}
