<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

definePageMeta({ layout: 'main' })

useSeoMeta({ title: 'Informations de livraison – Eco-Hardware' })

const cartStore = useCartStore()
const router = useRouter()

if (cartStore.isEmpty) {
  navigateTo('/cart')
}

const form = reactive({ ...cartStore.checkoutForm })

const errors = reactive<Record<string, string>>({})

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.firstName.trim()) errors.firstName = 'Prénom requis'
  if (!form.lastName.trim()) errors.lastName = 'Nom requis'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email invalide'
  if (!form.address.trim()) errors.address = 'Adresse requise'
  if (!form.city.trim()) errors.city = 'Ville requise'
  if (!form.postalCode.trim()) errors.postalCode = 'Code postal requis'
  return Object.keys(errors).length === 0
}

function submit() {
  if (!validate()) return
  cartStore.setCheckoutForm(form)
  router.push('/payment')
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Steps indicator -->
    <div class="flex items-center justify-center gap-2 mb-10 text-sm">
      <NuxtLink to="/cart" class="flex items-center gap-2 text-gray-400 hover:text-green-600 transition-colors">
        <span class="h-7 w-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">1</span>
        <span>Panier</span>
      </NuxtLink>
      <span class="text-gray-300 mx-1">──</span>
      <div class="flex items-center gap-2 text-green-700 font-semibold">
        <span class="h-7 w-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">2</span>
        <span>Livraison</span>
      </div>
      <span class="text-gray-300 mx-1">──</span>
      <div class="flex items-center gap-2 text-gray-400">
        <span class="h-7 w-7 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold">3</span>
        <span>Paiement</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h1 class="text-xl font-bold text-gray-900 mb-6">Informations de livraison</h1>

          <form @submit.prevent="submit" class="space-y-5">
            <!-- Name -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Prénom <span class="text-red-500">*</span></label>
                <input
                  v-model="form.firstName"
                  type="text"
                  placeholder="Jean"
                  :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors', errors.firstName ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
                />
                <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom <span class="text-red-500">*</span></label>
                <input
                  v-model="form.lastName"
                  type="text"
                  placeholder="Dupont"
                  :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors', errors.lastName ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
                />
                <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</p>
              </div>
            </div>

            <!-- Email + Phone -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="jean.dupont@email.com"
                  :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors', errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="+33 6 00 00 00 00"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors"
                />
              </div>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Adresse <span class="text-red-500">*</span></label>
              <input
                v-model="form.address"
                type="text"
                placeholder="12 rue de la République"
                :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors', errors.address ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
              />
              <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
            </div>

            <!-- City + Postal -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ville <span class="text-red-500">*</span></label>
                <input
                  v-model="form.city"
                  type="text"
                  placeholder="Paris"
                  :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors', errors.city ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
                />
                <p v-if="errors.city" class="text-red-500 text-xs mt-1">{{ errors.city }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Code postal <span class="text-red-500">*</span></label>
                <input
                  v-model="form.postalCode"
                  type="text"
                  placeholder="75001"
                  :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors', errors.postalCode ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
                />
                <p v-if="errors.postalCode" class="text-red-500 text-xs mt-1">{{ errors.postalCode }}</p>
              </div>
            </div>

            <!-- Country -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Pays</label>
              <select
                v-model="form.country"
                class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors bg-white"
              >
                <option>France</option>
                <option>Belgique</option>
                <option>Suisse</option>
                <option>Luxembourg</option>
                <option>Canada</option>
              </select>
            </div>

            <button
              type="submit"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors mt-2"
            >
              Continuer vers le paiement →
            </button>
          </form>
        </div>
      </div>

      <!-- Order summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
          <h2 class="font-bold text-gray-900 mb-4">Récapitulatif</h2>
          <div class="space-y-3 mb-4">
            <div v-for="item in cartStore.items" :key="item.product.id" class="flex items-center gap-3">
              <img :src="item.product.image" :alt="item.product.name" class="w-10 h-10 rounded object-cover" />
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-gray-800 truncate">{{ item.product.name }}</p>
                <p class="text-xs text-gray-400">× {{ item.quantity }}</p>
              </div>
              <span class="text-xs font-semibold text-gray-900 shrink-0">{{ formatPrice(item.product.price * item.quantity) }}</span>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-4">
            <div class="flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
