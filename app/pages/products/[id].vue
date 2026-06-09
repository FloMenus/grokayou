<script setup lang="ts">
import { products } from '~/services/products'
import { useCartStore } from '~/stores/cart'
import { trackEvent } from '~/services/tracking'

definePageMeta({ layout: 'main' })

const route = useRoute()
const cartStore = useCartStore()

const product = computed(() => products.find(p => p.id === Number(route.params.id)))

if (!product.value) {
  throw createError({ statusCode: 404, message: 'Produit introuvable' })
}

useSeoMeta({
  title: () => `${product.value?.name} – Eco-Hardware`,
  description: () => product.value?.description,
})

const quantity = ref(1)
const addedToCart = ref(false)

function addToCart() {
  if (!product.value) return
  cartStore.addToCart(product.value, quantity.value)
  trackEvent('add_to_cart', {
    productId: product.value.id,
    productName: product.value.name,
    category: product.value.category,
    unitPrice: product.value.price,
    quantity: quantity.value,
    source: 'product_page',
  })
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 2000)
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}
</script>

<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-8 flex items-center gap-2">
      <NuxtLink to="/" class="hover:text-green-600">Accueil</NuxtLink>
      <span>/</span>
      <span class="text-green-600">{{ product.category }}</span>
      <span>/</span>
      <span class="text-gray-900 font-medium truncate">{{ product.name }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Image -->
      <div class="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
      </div>

      <!-- Details -->
      <div>
        <span class="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {{ product.category }}
        </span>

        <h1 class="text-3xl font-bold text-gray-900 mb-3">{{ product.name }}</h1>

        <!-- Rating -->
        <div class="flex items-center gap-2 mb-4">
          <div class="flex text-amber-400">
            <span v-for="i in 5" :key="i" class="text-lg">{{ i <= Math.round(product.rating) ? '★' : '☆' }}</span>
          </div>
          <span class="text-gray-500 text-sm">{{ product.rating }}/5 ({{ product.reviewCount }} avis)</span>
        </div>

        <p class="text-gray-600 leading-relaxed mb-6">{{ product.longDescription }}</p>

        <!-- Price -->
        <div class="flex items-baseline gap-2 mb-6">
          <span class="text-3xl font-bold text-gray-900">{{ formatPrice(product.price) }}</span>
          <span class="text-sm text-gray-400">TTC, livraison incluse</span>
        </div>

        <!-- Stock -->
        <div class="flex items-center gap-2 mb-6">
          <span :class="product.stock > 0 ? 'bg-green-500' : 'bg-red-500'" class="h-2 w-2 rounded-full"></span>
          <span class="text-sm text-gray-600">
            {{ product.stock > 0 ? `En stock (${product.stock} unités)` : 'Rupture de stock' }}
          </span>
        </div>

        <!-- Quantity + Add to cart -->
        <div class="flex items-center gap-4 mb-8">
          <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              @click="quantity = Math.max(1, quantity - 1)"
              class="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
            >−</button>
            <span class="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">{{ quantity }}</span>
            <button
              @click="quantity = Math.min(product.stock, quantity + 1)"
              class="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
            >+</button>
          </div>

          <button
            @click="addToCart"
            :disabled="product.stock === 0"
            :class="[
              'flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2',
              addedToCart
                ? 'bg-green-500 text-white'
                : product.stock > 0
                  ? 'bg-green-600 hover:bg-green-700 text-white active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            ]"
          >
            <svg v-if="!addedToCart" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ addedToCart ? 'Ajouté !' : 'Ajouter au panier' }}
          </button>
        </div>

        <!-- Specs -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Caractéristiques</h2>
          <dl class="space-y-2">
            <div
              v-for="(value, key) in product.specs"
              :key="key"
              class="flex justify-between text-sm"
            >
              <dt class="text-gray-500">{{ key }}</dt>
              <dd class="font-medium text-gray-900 text-right max-w-[60%]">{{ value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
