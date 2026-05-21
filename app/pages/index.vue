<script setup lang="ts">
import * as Sentry from '@sentry/nuxt'

definePageMeta({
  layout: 'main'
})

useSeoMeta({
  title: 'Caillou Store',
  description: 'Description'
})

function sendFrontendError() {
  Sentry.captureException(new Error('Test GlitchTip frontend'))
}
</script>

<template>
  <div>
    <h1>Test</h1>
    <button @click="sendFrontendError">
      Envoyer une erreur frontend
    </button>
  </div>
</template>