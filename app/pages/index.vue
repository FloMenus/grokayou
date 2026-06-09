<script setup lang="ts">
import { products, categories } from '~/services/products'

definePageMeta({ layout: 'main' })

useSeoMeta({
  title: 'Accueil – Eco-Hardware',
  description: 'Matériel informatique reconditionné et éco-responsable.',
})

const route = useRoute()
const selectedCategory = ref((route.query.category as string) || '')
const searchQuery = ref('')

const filteredProducts = computed(() => {
  return products.filter(p => {
    const matchesCategory = !selectedCategory.value || p.category === selectedCategory.value
    const matchesSearch = !searchQuery.value || p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

watch(() => route.query.category, (val) => {
  selectedCategory.value = (val as string) || ''
})

function throwTemporaryError() {
  setTimeout(() => {
    throw new Error('Erreur temporaire de test depuis la page d\'accueil')
  }, 0)
}
</script>

<template>
  <div>

    <section class="bg-gradient-to-br from-green-700 to-green-500 text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Du matériel tech,<br />
          <span class="text-green-200">éco-responsable.</span>
        </h1>
        <p class="text-green-100 text-lg mb-8 max-w-xl mx-auto">
          Ordinateurs reconditionnés, périphériques durables et accessoires fabriqués à partir de matériaux recyclés.
        </p>

        <div class="max-w-md mx-auto relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un produit..."
            class="w-full px-5 py-3 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
          @click="throwTemporaryError"
          class="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Bouton test erreur (temporaire)
        </button>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          @click="selectedCategory = ''"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === '' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-600'
          ]"
        >
          Tous
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-600'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <p class="text-gray-500 text-sm mb-6">
        {{ filteredProducts.length }} produit{{ filteredProducts.length > 1 ? 's' : '' }} trouvé{{ filteredProducts.length > 1 ? 's' : '' }}
      </p>

      <div v-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>

      <div v-else class="text-center py-20 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-lg font-medium">Aucun produit trouvé</p>
        <p class="text-sm mt-1">Essayez d'autres termes de recherche</p>
      </div>
    </div>
  </div>
</template>