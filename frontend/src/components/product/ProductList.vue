<template>
  <div class="product-list">
    <div v-if="products.length === 0" class="empty-message">
      Товары не найдены
    </div>

    <div v-else class="grid">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart(product)"
        @toggle-favorite="toggleFavorite(product)"
      />
    </div>

    <app-pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-items="totalItems"
      :per-page="perPage"
      @page-changed="changePage"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import AppPagination from '@/components/ui/AppPagination.vue'

export default {
  components: { ProductCard, AppPagination },
  props: {
    products: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalItems: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 12
    }
  },
  emits: ['add-to-cart', 'toggle-favorite', 'page-changed'],
  setup(props, { emit }) {
    const totalPages = computed(() =>
      Math.ceil(props.totalItems / props.perPage)
    )

    const addToCart = (product) => {
      emit('add-to-cart', product)
    }

    const toggleFavorite = (product) => {
      emit('toggle-favorite', product)
    }

    const changePage = (page) => {
      emit('page-changed', page)
    }

    return {
      totalPages,
      addToCart,
      toggleFavorite,
      changePage
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  padding: 0 20px 40px 20px;

  .empty-message {
    text-align: center;
    padding: $gap-lg;
    color: $text-light;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $gap-lg;
  }
}
</style>