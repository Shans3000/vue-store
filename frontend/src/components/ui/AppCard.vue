<template>
  <div class="app-card">
    <div class="card-image">
      <img :src="imageUrl" :alt="title" class="product-image">
      <button class="favorite-btn" @click.stop="$emit('toggle-favorite', $event)">
        <img
          :src="isFavorite ? likeIcon : unlikeIcon"
          :alt="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          class="favorite-icon"
        >
      </button>
    </div>
    <div class="card-content">
      <h3 class="product-title">{{ title }}</h3>
      <p class="product-details">{{ color }} · {{ model }}</p>

      <div class="price">
        ${{ price.toLocaleString() }}
      </div>

      <div class="actions">
        <app-button
          class="buy-button"
          :disabled="!isAvailable"
          @click="$emit('add-to-cart', $event)"
        >
          Buy Now
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'
import likeIcon from '@/assets/images/like.svg'
import unlikeIcon from '@/assets/images/unlike.svg'

export default {
  components: { AppButton },
  props: {
    title: String,
    price: Number,
    color: String,
    model: String,
    imageUrl: String,
    isFavorite: Boolean,
    isAvailable: Boolean
  },
  emits: ['add-to-cart', 'toggle-favorite'],
  setup() {
    return {
      likeIcon,
      unlikeIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.app-card {
  border: 1px solid $border-color;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  font-family: 'SF Pro Display', sans-serif;
  position: relative;

  .card-image {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $gap-md;
    background: white;
    position: relative;

    .product-image {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }

    .favorite-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }

      .favorite-icon {
        width: 24px;
        height: 24px;
      }
    }
  }

  .card-content {
    padding: $gap-lg;

    .product-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: $gap-xs;
      color: $text-dark;
    }

    .product-details {
      font-size: 14px;
      color: $text-light;
      margin-bottom: $gap-md;
    }

    .price {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: $gap-md;
      color: $text-dark;
    }

    .actions {
      display: flex;
      gap: $gap-sm;
    }

    .buy-button {
      width: 100%;
      background-color: $text-dark;
      color: white;
      border-radius: 6px;
      padding: $gap-sm;
      font-weight: 500;

      &:hover {
        background-color: $text-light;
      }
    }
  }
}
</style>