<script setup lang="ts">
const {
  public: { umamiWebsiteId, umamiScriptUrl },
} = useRuntimeConfig();

useHead({
  titleTemplate: (title) => (title ? `${title} - Analytic` : "Analytic"),
  script: [
    {
      src: umamiScriptUrl,
      defer: true,
      "data-website-id": umamiWebsiteId,
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
