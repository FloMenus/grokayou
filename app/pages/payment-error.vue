<script setup lang="ts">
definePageMeta({ layout: 'main' })

useSeoMeta({ title: 'Erreur de paiement – Eco-Hardware' })
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    <div class="flex items-center justify-center mb-8">
      <div class="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
        </svg>
      </div>
    </div>

    <h1 class="text-3xl font-bold text-gray-900 mb-3">Erreur de paiement</h1>
    <p class="text-gray-500 text-lg mb-10">
      Une erreur est survenue pendant le paiement. Aucun montant n'a été débité.
    </p>

    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <NuxtLink
        to="/payment"
        class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
      >
        Réessayer le paiement
      </NuxtLink>

      <NuxtLink
        to="/cart"
        class="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-green-500 text-gray-700 font-semibold px-8 py-3 rounded-xl transition-colors"
      >
        Retour au panier
      </NuxtLink>
    </div>
  </div>
</template>
