<template>
  <div class="home-view">
    <div class="home">
      <h1>Добро пожаловать в iStore</h1>
      <p>Лучшие гаджеты по лучшим ценам</p>
      <app-button size="lg" @click="goToCatalog">Перейти в каталог</app-button>
    </div>

    <section class="featured-section">
      <h2>Популярные товары</h2>
      <product-list
        :products="featuredProducts"
        @add-to-cart="addToCart"
        @toggle-favorite="toggleFavorite"
      />
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/store'
import ProductList from '@/components/product/ProductList.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  components: { ProductList, AppButton },
  setup() {
    const router = useRouter()
    const store = useProductsStore()

    const featuredProducts = computed(() => {
      return store.products
        .filter(p => p.rating >= 4)
        .slice(0, 8)
    })

    const goToCatalog = () => {
      router.push({ name: 'Catalog' })
    }

    const addToCart = (product) => {
      store.addToCart(product)
    }

    const toggleFavorite = (product) => {
      store.toggleFavorite(product)
    }

    onMounted(() => {
      if (store.products.length === 0) {
        store.fetchProducts()
      }
    })

    return {
      featuredProducts,
      goToCatalog,
      addToCart,
      toggleFavorite
    }
  }
}
</script>

<style lang="scss" scoped>
.home-view {
  .home {
    background: $primary;
    color: $text-dark;
    text-align: center;
    padding: 80px 20px;
    border-radius: 8px;
    margin-bottom: 40px;

    h1 {
      font-size: 48px;
      margin-bottom: 16px;
    }

    p {
      font-size: 20px;
      margin-bottom: 32px;
    }
  }

  .featured-section {
    h2 {
      margin-bottom: 24px;
      text-align: center;
    }
  }
}
</style>