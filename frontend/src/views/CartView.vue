<template>
  <div class="cart-view">
    <cart-list
      :items="cartItems"
      :total="cartTotal"
      @update-quantity="updateQuantity"
      @remove-item="removeFromCart"
      @checkout="checkout"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import CartList from '@/components/cart/CartList.vue'
import useCart from '@/composables/useCart'

export default {
  components: { CartList },
  setup() {
    const router = useRouter()
    const {
      cartItems,
      cartTotal,
      updateQuantity,
      removeFromCart,
      clearCart
    } = useCart()

    const checkout = () => {
      router.push({ name: 'Checkout' })
    }

    return {
      cartItems,
      cartTotal,
      updateQuantity,
      removeFromCart,
      checkout
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-view {
  padding: 24px 0;
  max-width: 1200px;
  margin: 0 auto;
}
</style>