<template>
  <div class="favorites-list">
    <h2 v-if="items.length > 0">Избранное ({{ items.length }})</h2>

    <div v-if="items.length === 0" class="empty-favorites">
      В избранном пока ничего нет
      <router-link to="/catalog" class="continue-shopping">
        Перейти в каталог
      </router-link>
    </div>

    <product-list
      v-else
      :products="items"
      @add-to-cart="addToCart"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script>
import ProductList from '@/components/product/ProductList.vue'

export default {
  components: { ProductList },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  emits: ['add-to-cart', 'toggle-favorite'],
  setup(props, { emit }) {
    const addToCart = (product) => {
      emit('add-to-cart', product)
    }

    const toggleFavorite = (product) => {
      emit('toggle-favorite', product)
    }

    return {
      addToCart,
      toggleFavorite
    }
  }
}
</script>

<style lang="scss" scoped>
.favorites-list {
  h2 {
    margin-bottom: $gap-lg;
  }

  .empty-favorites {
    text-align: center;
    padding: $gap-lg;
    font-size: 18px;
    color: $text-light;

    .continue-shopping {
      display: block;
      margin: $gap-md auto;
      color: white;
      background-color: $text-dark;
      border: 1px solid $border-color;
      border-radius: 8px;
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: $font-size-base;
      width: fit-content;

      &:hover {
        background-color: $text-light;
      }
    }
  }
}
</style>