import {
  getMethod,
  getRequestHeaders,
  getRequestURL,
  readRawBody,
  setResponseHeader,
  setResponseStatus,
} from 'h3'

const SENTY_INGEST_PATH = /^\/api\/\d+\/(envelope|store)\/?$/
const DSN = process.env.NUXT_PUBLIC_SENTRY_DSN || ''
const SENTRY_KEY_MATCH = DSN.match(/^https?:\/\/([^@]+)@/)
const SENTRY_KEY = SENTRY_KEY_MATCH?.[1] || ''

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  if (!SENTY_INGEST_PATH.test(url.pathname)) {
    return
  }

  const upstreamBase = 'http://glitchtip-web:8000'
  const searchParams = new URLSearchParams(url.search)
  if (SENTRY_KEY && !searchParams.has('sentry_key')) {
    searchParams.set('sentry_key', SENTRY_KEY)
  }
  if (!searchParams.has('sentry_version')) {
    searchParams.set('sentry_version', '7')
  }
  const queryString = searchParams.toString()
  const upstreamUrl = `${upstreamBase}${url.pathname}${queryString ? `?${queryString}` : ''}`
  const incomingHeaders = getRequestHeaders(event)
  const forwardedHeaders: Record<string, string> = {}
  if (incomingHeaders['content-type']) {
    forwardedHeaders['content-type'] = incomingHeaders['content-type']
  }
  if (incomingHeaders['user-agent']) {
    forwardedHeaders['user-agent'] = incomingHeaders['user-agent']
  }

  const method = getMethod(event)
  const body = method === 'GET' || method === 'HEAD' ? undefined : await readRawBody(event, false)

  const response = await $fetch.raw(upstreamUrl, {
    method,
    headers: forwardedHeaders,
    body,
  })

  setResponseStatus(event, response.status, response.statusText)

  for (const [key, value] of response.headers.entries()) {
    setResponseHeader(event, key, value)
  }

  return response._data
})
