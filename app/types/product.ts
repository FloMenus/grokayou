export interface Product {
  id: number
  name: string
  description: string
  longDescription: string
  price: number
  image: string
  category: string
  stock: number
  rating: number
  reviewCount: number
  specs: Record<string, string>
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface PaymentForm {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
}
