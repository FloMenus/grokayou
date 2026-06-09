<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group">
    <NuxtLink :to="`/products/${product.id}`" class="block" @click="trackProductClick">
      <div class="relative overflow-hidden aspect-[4/3] bg-gray-100">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span class="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
          {{ product.category }}
        </span>
        <span v-if="product.stock < 10" class="absolute top-3 right-3 bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full">
          Plus que {{ product.stock }}
        </span>
      </div>

      <div class="p-4">
        <h3 class="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
          {{ product.name }}
        </h3>
        <p class="text-gray-500 text-xs mb-3 line-clamp-2">
          {{ product.description }}
        </p>

        <!-- Rating -->
        <div class="flex items-center gap-1 mb-3">
          <div class="flex text-amber-400 text-xs">
            <span v-for="i in 5" :key="i">{{ i <= Math.round(product.rating) ? '★' : '☆' }}</span>
          </div>
          <span class="text-gray-400 text-xs">({{ product.reviewCount }})</span>
        </div>

        <!-- Price -->
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold text-gray-900">{{ formatPrice(product.price) }}</span>
        </div>
      </div>
    </NuxtLink>

    <div class="px-4 pb-4">
      <button
        @click.prevent="addToCart"
        class="w-full bg-green-600 hover:bg-green-700 active:scale-95 text-white font-medium text-sm py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Ajouter au panier
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import { useCartStore } from '~/stores/cart'
import { trackEvent } from '~/services/tracking'

const props = defineProps<{ product: Product }>()
const cartStore = useCartStore()

function addToCart() {
  cartStore.addToCart(props.product)
  trackEvent('add_to_cart', {
    productId: props.product.id,
    productName: props.product.name,
    category: props.product.category,
    unitPrice: props.product.price,
    quantity: 1,
    source: 'product_card',
  })
}

function trackProductClick() {
  trackEvent('product_view_click', {
    productId: props.product.id,
    productName: props.product.name,
    category: props.product.category,
    unitPrice: props.product.price,
    source: 'home_grid',
  })
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}
</script>
