<script setup lang="ts">
const { accept, refuse } = useCookieConsent()
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 p-4">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div class="flex-1">
        <p class="text-sm font-semibold text-gray-900 mb-1">Cookies & analytics</p>
        <p class="text-xs text-gray-500">
          Nous utilisons Umami pour mesurer l'audience de notre site. Ces données sont anonymes et hébergées sur nos propres serveurs.
        </p>
      </div>
      <div class="flex gap-2 shrink-0">
        <button @click="refuse" class="text-xs px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          Refuser
        </button>
        <button @click="accept" class="text-xs px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium">
          Accepter
        </button>
      </div>
    </div>
  </div>
</template>
