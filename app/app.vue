<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title ? `${title} - Analytic` : "Analytic"),
  script: [
    {
      src: "http://localhost:8001/script.js",
      defer: true,
      "data-website-id": "45a15673-ca2d-4f7c-aed8-cf86855dd7b7",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
