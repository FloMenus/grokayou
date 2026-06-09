<script setup lang="ts">
definePageMeta({ layout: 'main' })

useSeoMeta({ title: 'Commande confirmée – Eco-Hardware' })

const orderNumber = computed(() => `ECO-${Date.now().toString(36).toUpperCase()}`)
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    <!-- Success icon -->
    <div class="flex items-center justify-center mb-8">
      <div class="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <h1 class="text-3xl font-bold text-gray-900 mb-3">Commande confirmée !</h1>
    <p class="text-gray-500 text-lg mb-2">Merci pour votre achat éco-responsable 🌱</p>
    <p class="text-gray-400 text-sm mb-8">
      Numéro de commande : <span class="font-mono font-semibold text-gray-600">{{ orderNumber }}</span>
    </p>

    <!-- Steps -->
    <div class="bg-gray-50 rounded-2xl p-6 mb-10 text-left">
      <h2 class="font-semibold text-gray-900 mb-4 text-center">La suite de votre commande</h2>
      <div class="space-y-4">
        <div class="flex items-start gap-4">
          <div class="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">1</div>
          <div>
            <p class="font-medium text-gray-900 text-sm">Email de confirmation</p>
            <p class="text-gray-500 text-xs mt-0.5">Vous recevrez un récapitulatif de votre commande dans quelques minutes.</p>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">2</div>
          <div>
            <p class="font-medium text-gray-900 text-sm">Préparation & emballage éco</p>
            <p class="text-gray-500 text-xs mt-0.5">Votre commande est emballée dans des matériaux 100% recyclables sous 24h.</p>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="h-8 w-8 rounded-full bg-green-400 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">3</div>
          <div>
            <p class="font-medium text-gray-900 text-sm">Livraison neutre en carbone</p>
            <p class="text-gray-500 text-xs mt-0.5">Livraison estimée sous 3 à 5 jours ouvrés. La livraison est offerte et compensée en CO₂.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Eco message -->
    <div class="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
      <p class="text-green-800 text-sm">
        🌍 En choisissant Eco-Hardware, vous avez contribué à éviter environ
        <strong>2,3 kg de CO₂</strong> par rapport à l'achat d'un produit neuf. Merci !
      </p>
    </div>

    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Retour à l'accueil
    </NuxtLink>
  </div>
</template>
