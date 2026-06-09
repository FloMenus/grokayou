import { defineStore } from 'pinia'
import type { CartItem, Product, CheckoutForm, PaymentForm } from '~/types/product'

interface CartState {
  items: CartItem[]
  checkoutForm: CheckoutForm
  paymentForm: PaymentForm
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    checkoutForm: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'France',
    },
    paymentForm: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  }),

  getters: {
    totalItems: (state): number =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state): number =>
      state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

    isEmpty: (state): boolean => state.items.length === 0,
  },

  actions: {
    addToCart(product: Product, quantity = 1) {
      const existing = this.items.find(item => item.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },

    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.product.id !== productId)
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    clearCart() {
      this.items = []
    },

    setCheckoutForm(form: Partial<CheckoutForm>) {
      this.checkoutForm = { ...this.checkoutForm, ...form }
    },

    setPaymentForm(form: Partial<PaymentForm>) {
      this.paymentForm = { ...this.paymentForm, ...form }
    },
  },

  persist: true,
})
