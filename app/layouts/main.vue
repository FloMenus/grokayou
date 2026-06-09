<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <span class="text-2xl">♻️</span>
          <span class="text-xl font-bold text-green-700 group-hover:text-green-600 transition-colors">
            Eco-Hardware
          </span>
        </NuxtLink>

        <!-- Nav links -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink to="/" class="text-gray-600 hover:text-green-700 font-medium transition-colors text-sm">
            Accueil
          </NuxtLink>
          <NuxtLink to="/?category=Ordinateurs" class="text-gray-600 hover:text-green-700 font-medium transition-colors text-sm">
            Ordinateurs
          </NuxtLink>
          <NuxtLink to="/?category=Périphériques" class="text-gray-600 hover:text-green-700 font-medium transition-colors text-sm">
            Périphériques
          </NuxtLink>
          <NuxtLink to="/?category=Énergie" class="text-gray-600 hover:text-green-700 font-medium transition-colors text-sm">
            Énergie
          </NuxtLink>
        </div>

        <!-- Cart -->
        <NuxtLink to="/cart" class="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Panier</span>
          <span
            v-if="cartStore.totalItems > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cartStore.totalItems }}
          </span>
        </NuxtLink>
      </nav>
    </header>

    <!-- Main content -->
    <main class="flex-1 mt-16">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="text-xl">♻️</span>
              <span class="text-lg font-bold text-white">Eco-Hardware</span>
            </div>
            <p class="text-sm leading-relaxed">
              Votre spécialiste en matériel informatique reconditionné et éco-responsable. Réduisons ensemble notre empreinte numérique.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h3 class="text-white font-semibold mb-4">Navigation</h3>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/" class="hover:text-green-400 transition-colors">Accueil</NuxtLink></li>
              <li><NuxtLink to="/cart" class="hover:text-green-400 transition-colors">Panier</NuxtLink></li>
            </ul>
          </div>

          <!-- Eco commitment -->
          <div>
            <h3 class="text-white font-semibold mb-4">Nos engagements</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Matériaux recyclés</li>
              <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Emballages sans plastique</li>
              <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Livraison neutre en carbone</li>
              <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Garantie réparabilité</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2026 Eco-Hardware. Tous droits réservés. Fait avec 💚 pour la planète.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>
<style scoped></style>
