<script setup lang="ts">
const { public: { umamiWebsiteId, umamiScriptUrl } } = useRuntimeConfig()
const { isAccepted, isPending, init } = useCookieConsent()

const mounted = ref(false)
onMounted(() => {
  init()
  mounted.value = true
})

useHead({
  titleTemplate: (title) => (title ? `${title} - Analytic` : 'Analytic'),
  script: computed(() => isAccepted.value ? [{
    src: umamiScriptUrl,
    defer: true,
    'data-website-id': umamiWebsiteId,
  }] : []),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CookieBanner v-if="mounted && isPending" />
</template>
