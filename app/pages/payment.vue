<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { trackEvent } from '~/services/tracking'

definePageMeta({ layout: 'main' })

useSeoMeta({ title: 'Paiement – Eco-Hardware' })

const cartStore = useCartStore()
const router = useRouter()

if (cartStore.isEmpty) {
  navigateTo('/cart')
}

const form = reactive({ ...cartStore.paymentForm })
const errors = reactive<Record<string, string>>({})
const isProcessing = ref(false)
const FAILING_PRODUCT_ID = 5

function formatCardNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

function onCardNumberInput(e: Event) {
  form.cardNumber = formatCardNumber((e.target as HTMLInputElement).value)
}

function onExpiryInput(e: Event) {
  form.expiryDate = formatExpiry((e.target as HTMLInputElement).value)
}

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  const rawCard = form.cardNumber.replace(/\s/g, '')
  if (rawCard.length < 16) errors.cardNumber = 'Numéro de carte invalide (16 chiffres)'
  if (!form.cardHolder.trim()) errors.cardHolder = 'Nom du porteur requis'
  if (!/^\d{2}\/\d{2}$/.test(form.expiryDate)) errors.expiryDate = 'Date invalide (MM/AA)'
  if (form.cvv.length < 3) errors.cvv = 'CVV invalide'
  return Object.keys(errors).length === 0
}

async function pay() {
  if (!validate()) return

  const totalItems = cartStore.totalItems
  const totalPrice = Number(cartStore.totalPrice.toFixed(2))
  const hasFailingProduct = cartStore.items.some(item => item.product.id === FAILING_PRODUCT_ID)
  cartStore.setPaymentForm(form)
  isProcessing.value = true
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 1800))

  // Simulate a payment failure when a specific product is in the cart.
  if (hasFailingProduct) {
    const paymentError = new Error('Échec de paiement simulé pour le produit pilote')

    trackEvent('payment_failed', {
      totalItems,
      totalPrice,
      country: cartStore.checkoutForm.country,
      reason: 'mock_specific_product_failure',
      failingProductId: FAILING_PRODUCT_ID,
    })

    // Throw asynchronously so error tracking can capture it while preserving UX redirect.
    setTimeout(() => {
      throw paymentError
    }, 0)

    isProcessing.value = false
    router.push('/payment-error')
    return
  }

  trackEvent('payment_success', {
    totalItems,
    totalPrice,
    country: cartStore.checkoutForm.country,
  });
  (window as any).umami?.track('order_completed', { revenue: cartStore.totalPrice, currency: 'EUR' });
  cartStore.clearCart()
  router.push('/success')
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

    <div class="flex items-center justify-center gap-2 mb-10 text-sm">
      <div class="flex items-center gap-2 text-gray-400">
        <span class="h-7 w-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">✓</span>
        <span>Panier</span>
      </div>
      <span class="text-gray-300 mx-1">──</span>
      <div class="flex items-center gap-2 text-gray-400">
        <span class="h-7 w-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">✓</span>
        <span>Livraison</span>
      </div>
      <span class="text-gray-300 mx-1">──</span>
      <div class="flex items-center gap-2 text-green-700 font-semibold">
        <span class="h-7 w-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">3</span>
        <span>Paiement</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl font-bold text-gray-900">Paiement sécurisé</h1>
            <div class="flex gap-2">
              <span class="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">VISA</span>
              <span class="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">MC</span>
              <span class="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">AMEX</span>
            </div>
          </div>

          <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex gap-2 items-start">
            <span class="text-amber-500 text-base shrink-0">⚠️</span>
            <p class="text-xs text-amber-700">
              <strong>Mode démonstration.</strong> Aucun vrai paiement ne sera effectué. Utilisez n'importe quels chiffres valides.
            </p>
          </div>

          <form @submit.prevent="pay" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Numéro de carte <span class="text-red-500">*</span></label>
              <div class="relative">
                <input
                  :value="form.cardNumber"
                  @input="onCardNumberInput"
                  type="text"
                  inputmode="numeric"
                  placeholder="1234 5678 9012 3456"
                  maxlength="19"
                  :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors pr-10', errors.cardNumber ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <p v-if="errors.cardNumber" class="text-red-500 text-xs mt-1">{{ errors.cardNumber }}</p>
            </div>

            <!-- Cardholder -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom du porteur <span class="text-red-500">*</span></label>
              <input
                v-model="form.cardHolder"
                type="text"
                placeholder="JEAN DUPONT"
                :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors uppercase', errors.cardHolder ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
              />
              <p v-if="errors.cardHolder" class="text-red-500 text-xs mt-1">{{ errors.cardHolder }}</p>
            </div>

            <!-- Expiry + CVV -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date d'expiration <span class="text-red-500">*</span></label>
                <input
                  :value="form.expiryDate"
                  @input="onExpiryInput"
                  type="text"
                  inputmode="numeric"
                  placeholder="MM/AA"
                  maxlength="5"
                  :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors', errors.expiryDate ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
                />
                <p v-if="errors.expiryDate" class="text-red-500 text-xs mt-1">{{ errors.expiryDate }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CVV <span class="text-red-500">*</span></label>
                <input
                  v-model="form.cvv"
                  type="text"
                  inputmode="numeric"
                  placeholder="123"
                  maxlength="4"
                  :class="['w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors', errors.cvv ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-400']"
                />
                <p v-if="errors.cvv" class="text-red-500 text-xs mt-1">{{ errors.cvv }}</p>
              </div>
            </div>

            <!-- Delivery summary -->
            <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p class="font-medium text-gray-900 mb-1">Livraison à :</p>
              <p>{{ cartStore.checkoutForm.firstName }} {{ cartStore.checkoutForm.lastName }}</p>
              <p>{{ cartStore.checkoutForm.address }}, {{ cartStore.checkoutForm.postalCode }} {{ cartStore.checkoutForm.city }}</p>
              <p>{{ cartStore.checkoutForm.country }}</p>
            </div>

            <button
              type="submit"
              :disabled="isProcessing"
              :class="[
                'w-full font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2',
                isProcessing ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
              ]"
            >
              <svg v-if="isProcessing" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {{ isProcessing ? 'Traitement en cours...' : `Payer ${formatPrice(cartStore.totalPrice)}` }}
            </button>
          </form>
        </div>
      </div>

      <!-- Order summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
          <h2 class="font-bold text-gray-900 mb-4">Votre commande</h2>
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
          <div class="border-t border-gray-100 pt-4 space-y-2">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Livraison</span>
              <span class="text-green-600 font-medium">Offerte</span>
            </div>
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
