<template>
  <div class="favorites-view">
    <favorites-list
      :items="favorites"
      @add-to-cart="addToCart"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useProductsStore } from '@/store'
import FavoritesList from '@/components/favorites/FavoritesList.vue'

export default {
  components: { FavoritesList },
  setup() {
    const store = useProductsStore()

    const favorites = computed(() => store.favorites)

    const addToCart = (product) => {
      store.addToCart(product)
    }

    const toggleFavorite = (product) => {
      store.toggleFavorite(product)
    }

    return {
      favorites,
      addToCart,
      toggleFavorite
    }
  }
}
</script>

<style lang="scss" scoped>
.favorites-view {
  padding: 24px 0;
  max-width: 1200px;
  margin: 0 auto;
}
</style>