<template>
  <router-link :to="productLink" class="product-link">
    <app-card
      class="product-card"
      :title="product.name"
      :price="product.price"
      :color="product.color"
      :model="product.model"
      :image-url="product.imageUrl"
      :is-favorite="isFavorite(product.id)"
      :is-available="product.is_available"
      @add-to-cart.stop="addToCart"
      @toggle-favorite.stop="toggleFavorite"
    />
  </router-link>
</template>

<script>
import {computed} from 'vue'
import useFavorites from '@/composables/useFavorites'
import AppCard from '@/components/ui/AppCard.vue'

export default {
  components: {AppCard},
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['add-to-cart', 'toggle-favorite'],
  setup(props, {emit}) {
    const {isFavorite} = useFavorites()

    const productLink = computed(() => {
      return {
        name: 'Product',
        params: {id: props.product.id},
        state: {product: props.product}
      }
    })

    const addToCart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      emit('add-to-cart', props.product)
    }

    const toggleFavorite = (e) => {
      e.preventDefault()
      e.stopPropagation()
      emit('toggle-favorite', props.product)
    }

    return {
      isFavorite,
      addToCart,
      toggleFavorite,
      productLink
    }
  }
}
</script>

<style lang="scss" scoped>
.product-link {
  text-decoration: none;
  display: block;
  color: inherit;

  &:hover {
    .app-card {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}

.product-card {
  width: 100%;
  transition: all 0.3s ease;
}
</style>