<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

definePageMeta({ layout: 'main' })

useSeoMeta({ title: 'Mon panier – Eco-Hardware' })

const cartStore = useCartStore()
const router = useRouter()

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Mon panier</h1>

    <!-- Empty state -->
    <div v-if="cartStore.isEmpty" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-gray-200 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p class="text-xl font-semibold text-gray-400 mb-2">Votre panier est vide</p>
      <p class="text-gray-400 text-sm mb-8">Ajoutez des produits pour commencer vos achats.</p>
      <NuxtLink to="/" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
        Voir les produits
      </NuxtLink>
    </div>

    <!-- Cart content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Items list -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4"
        >
          <NuxtLink :to="`/products/${item.product.id}`" class="shrink-0">
            <img
              :src="item.product.image"
              :alt="item.product.name"
              class="w-20 h-20 rounded-lg object-cover"
            />
          </NuxtLink>

          <div class="flex-1 min-w-0">
            <NuxtLink :to="`/products/${item.product.id}`">
              <h3 class="font-semibold text-gray-900 text-sm leading-tight hover:text-green-600 transition-colors">
                {{ item.product.name }}
              </h3>
            </NuxtLink>
            <p class="text-green-600 text-xs mt-1">{{ item.product.category }}</p>
            <p class="text-gray-900 font-bold mt-2">{{ formatPrice(item.product.price) }}</p>
          </div>

          <div class="flex flex-col items-end justify-between">
            <!-- Quantity controls -->
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                class="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"
              >−</button>
              <span class="px-3 py-1 text-sm font-semibold text-gray-900">{{ item.quantity }}</span>
              <button
                @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                class="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"
              >+</button>
            </div>

            <!-- Subtotal -->
            <p class="text-sm font-bold text-gray-900">
              {{ formatPrice(item.product.price * item.quantity) }}
            </p>

            <!-- Remove -->
            <button
              @click="cartStore.removeFromCart(item.product.id)"
              class="text-gray-300 hover:text-red-500 transition-colors"
              title="Supprimer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
          <h2 class="font-bold text-gray-900 text-lg mb-4">Récapitulatif</h2>

          <div class="space-y-3 mb-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Articles ({{ cartStore.totalItems }})</span>
              <span>{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Livraison</span>
              <span class="text-green-600 font-medium">Offerte</span>
            </div>
          </div>

          <div class="border-t border-gray-100 pt-4 mb-6">
            <div class="flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span class="text-xl">{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">TVA incluse</p>
          </div>

          <!-- Eco badge -->
          <div class="bg-green-50 rounded-lg p-3 mb-6 flex items-start gap-2">
            <span class="text-lg shrink-0">🌱</span>
            <p class="text-xs text-green-700">Votre commande sera livrée avec un emballage 100% recyclable et compensée en CO₂.</p>
          </div>

          <NuxtLink
            to="/checkout"
            class="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Commander
          </NuxtLink>

          <NuxtLink to="/" class="block text-center text-sm text-gray-400 hover:text-green-600 mt-4 transition-colors">
            ← Continuer les achats
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
