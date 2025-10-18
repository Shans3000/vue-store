<template>
  <div class="product-view">
    <div v-if="loading" class="loading">
      <app-spinner />
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
      <app-button @click="$router.push('/catalog')">Вернуться в каталог</app-button>
    </div>

    <product-details
      v-else
      :id="parseInt($route.params.id)"
      @add-to-cart="addToCart"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/store'
import ProductDetails from '@/components/product/ProductDetails.vue'
import AppSpinner from '@/components/ui/AppSpinner.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  components: { ProductDetails, AppSpinner, AppButton },
  setup() {
    const route = useRoute()
    const store = useProductsStore()
    const loading = ref(false)
    const error = ref(null)

    const fetchProduct = async () => {
      loading.value = true
      error.value = null
      try {
        await store.fetchProducts()
        if (!store.getProductById(parseInt(route.params.id))) {
          error.value = 'Товар не найден'
        }
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const addToCart = (product) => {
      store.addToCart(product)
    }

    const toggleFavorite = (product) => {
      store.toggleFavorite(product)
    }

    onMounted(fetchProduct)

    return {
      loading,
      error,
      addToCart,
      toggleFavorite
    }
  }
}
</script>

<style lang="scss" scoped>
.product-view {
  padding: 24px;

  .loading, .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    gap: 16px;
  }

  .error {
    color: #f44336;
    font-size: 18px;
    text-align: center;
  }
}
</style>