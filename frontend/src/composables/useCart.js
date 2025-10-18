import { computed } from 'vue'
import { useProductsStore } from '@/store'

export default function useCart() {
  const store = useProductsStore()

  const cartItems = computed(() => store.cart)
  const cartTotal = computed(() => store.cartTotal)
  const cartCount = computed(() => store.cartCount)

  const addToCart = (product) => {
    store.addToCart(product)
  }

  const removeFromCart = (productId) => {
    store.removeFromCart(productId)
  }

  const updateQuantity = (productId, quantity) => {
    const item = store.cart.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        store.saveCart()
      }
    }
  }

  const clearCart = () => {
    store.cart = []
    store.saveCart()
  }

  return {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
}