<template>
  <div v-if="product" class="product-details">
    <div class="product-gallery">
      <div class="main-image">
        <img :src="mainImage" :alt="product.name">
      </div>
      <div class="thumbnails">
        <img
          v-for="(img, index) in product.images"
          :key="index"
          :src="getImageUrl(img)"
          :alt="`${product.name} - фото ${index + 1}`"
          @click="mainImage = getImageUrl(img)"
          :class="{ active: getImageUrl(img) === mainImage }"
        >
      </div>
    </div>

    <div class="product-info">
      <h1>{{ product.name }}</h1>

      <div class="meta">
        <app-rating
          :value="product.rating"
          :count="product.count_review"
          :show-value="true"
        />
        <span class="sku">Артикул: {{ product.id }}</span>
      </div>

      <div class="price-block">
        <div class="price" :class="{ discounted: product.discount_price }">
          {{ formattedPrice }} ₽
        </div>
        <div v-if="product.discount_price" class="discount-price">
          {{ formattedDiscountPrice }} ₽
        </div>
      </div>

      <div class="availability" :class="[product.is_available ? 'available' : 'not-available']">
        {{ product.is_available ? 'В наличии' : 'Нет в наличии' }}
      </div>

      <div class="actions">
        <app-button
          size="lg"
          :disabled="!product.is_available"
          @click="addToCart"
        >
          Добавить в корзину
        </app-button>
        <app-button
          plain
          size="lg"
          @click="toggleFavorite"
        >
          {{ isFavorite ? 'В избранном ♥' : 'В избранное ♡' }}
        </app-button>
      </div>

      <div class="specs">
        <h3>Характеристики</h3>
        <table>
          <tr v-for="(spec, index) in product.characteristics" :key="index">
            <td>{{ spec.characteristic }}</td>
            <td>{{ spec.value }} {{ spec.unit_type !== 'значение' ? spec.unit_type : '' }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="reviews-section">
      <h2>Отзывы</h2>
      <div class="reviews-container">
        <div class="overall-rating">
          <div class="rating-value">{{ product.rating.toFixed(1) }}</div>
          <div class="rating-count">из {{ product.count_review }} отзывов</div>
          <app-rating
            :value="product.rating"
            :show-value="false"
            size="lg"
          />
        </div>

        <div class="rating-bars">
          <div
            v-for="(star, index) in 5"
            :key="index"
            class="rating-bar"
          >
            <div class="bar-label">{{ 5 - index }} звезд</div>
            <div class="bar-container">
              <div
                class="bar-fill"
                :style="{ width: `${(getStarDistribution()[index] / product.count_review) * 100}%` }"
              ></div>
            </div>
            <div class="bar-count">
              {{ getStarDistribution()[index] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useProductsStore } from '@/store'
import AppButton from '@/components/ui/AppButton.vue'
import AppRating from '@/components/ui/AppRating.vue'

export default {
  components: {AppButton, AppRating},
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const store = useProductsStore()
    const mainImage = ref('')

    const product = computed(() =>
        store.products.find(p => p.id === Number(props.id))
    )

    const isFavorite = computed(() =>
        store.favorites.some(f => f.id === product.value?.id)
    )

    const formattedPrice = computed(() => {
      return product.value?.price.toLocaleString()
    })

    const formattedDiscountPrice = computed(() => {
      return product.value?.discount_price?.toLocaleString()
    })

    const getImageUrl = (imgPath) => {
      return `${import.meta.env.VITE_API_BASE_URL}/${imgPath}`
    }

    const addToCart = () => {
      store.addToCart(product.value)
    }

    const toggleFavorite = () => {
      store.toggleFavorite(product.value)
    }

    if (product.value && product.value.images.length > 0) {
      mainImage.value = getImageUrl(product.value.images[0])
    }

    const getStarDistribution = () => {
      const totalReviews = product.value.count_review;
      const avgRating = product.value.rating;

      const distribution = [0, 0, 0, 0, 0];

      const mainStar = Math.round(avgRating);
      distribution[mainStar - 1] = Math.round(totalReviews * 0.7);

      let remaining = totalReviews - distribution[mainStar - 1];
      for (let i = 4; i >= 0 && remaining > 0; i--) {
        if (i === mainStar - 1) continue;
        const count = Math.min(remaining, Math.round(totalReviews * 0.1));
        distribution[i] = count;
        remaining -= count;
      }

      if (remaining > 0) {
        distribution[mainStar - 1] += remaining;
      }

      return distribution.reverse();
    };

    return {
      product,
      mainImage,
      isFavorite,
      formattedPrice,
      formattedDiscountPrice,
      getImageUrl,
      addToCart,
      toggleFavorite,
      getStarDistribution
    };
  }
}
</script>

<style lang="scss" scoped>
.product-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $gap-lg;
  margin: $gap-lg 0;

  .product-gallery {
    .main-image {
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 8px;
      padding: $gap-md;
      margin-bottom: $gap-md;

      img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
      }
    }

    .thumbnails {
      display: flex;
      gap: $gap-sm;
      overflow-x: auto;
      padding-bottom: $gap-sm;

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 4px;
        border: 2px solid transparent;
        cursor: pointer;

        &.active {
          border-color: $primary;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .product-info {
    h1 {
      margin-bottom: $gap-md;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: $gap-lg;
      margin-bottom: $gap-md;

      .sku {
        color: $text-light;
        font-size: 14px;
      }
    }

    .price-block {
      margin: $gap-lg 0;

      .price {
        font-size: 28px;
        font-weight: bold;

        &.discounted {
          font-size: 20px;
          text-decoration: line-through;
          color: $text-light;
        }
      }

      .discount-price {
        font-size: 28px;
        font-weight: bold;
        color: #f44336;
      }
    }

    .availability {
      font-weight: bold;
      margin-bottom: $gap-lg;
    }

    .available {
      color: #4CAF50;
    }

    .not-available {
      color: #f44336;
    }

    .actions {
      display: flex;
      gap: $gap-md;
      margin-bottom: $gap-lg;
    }

    .specs {
      table {
        width: 100%;
        border-collapse: collapse;

        tr {
          border-bottom: 1px solid $border-color;

          td {
            padding: $gap-sm $gap-md;
            vertical-align: top;

            &:first-child {
              width: 40%;
              color: $text-light;
            }
          }
        }
      }
    }
  }
  }

.reviews-section {
  grid-column: 1 / -1;
  margin-top: $gap-xl;
  padding: $gap-xl;
  background-color: #f5f5f5;
  border-radius: 8px;

  h2 {
    margin-bottom: $gap-lg;
    font-size: 24px;
    color: black;
    font-weight: 700;
  }

  .reviews-container {
    display: flex;
    gap: $gap-xl;
    background: white;
    padding: $gap-lg;
    border-radius: 8px;
  }

  .overall-rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 200px;

    .rating-value {
      font-size: 48px;
      font-weight: bold;
      line-height: 1;
      color: black;
    }

    .rating-count {
      color: $text-light;
      margin: $gap-sm 0;
    }
  }

  .rating-bars {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: $gap-md;

    .rating-bar {
      display: flex;
      align-items: center;
      gap: $gap-md;

      .bar-label {
        width: 80px;
        font-weight: 500;
      }

      .bar-container {
        flex-grow: 1;
        height: 8px;
        background-color: #eee;
        border-radius: 4px;
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        background-color: #ffc107;
        border-radius: 4px;
      }

      .bar-count {
        width: 40px;
        text-align: right;
        color: $text-light;
      }
    }
  }
}

@media (max-width: 768px) {
  .reviews-container {
    flex-direction: column;
  }
}
</style>