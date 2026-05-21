<script setup lang="ts">
const { public: { umamiWebsiteId } } = useRuntimeConfig();

useHead({
  titleTemplate: (title) => (title ? `${title} - Analytic` : "Analytic"),
  script: [
    {
      src: "http://localhost:8001/script.js",
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
