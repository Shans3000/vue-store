<template>
  <div class="cart-item">
    <div class="product-image">
      <img :src="item.imageUrl" :alt="item.name">
    </div>

    <div class="product-info">
      <h3 class="product-name">{{ item.name }}</h3>
      <div class="product-specs">
        <span class="color">{{ item.color }}</span>
        <span class="brand">{{ item.brand }}</span>
      </div>
    </div>

    <div class="product-price">
      {{ formattedPrice }} ₽
    </div>

    <div class="product-quantity">
      <app-button
        size="sm"
        @click="decreaseQuantity"
        :disabled="item.quantity <= 1"
      >
        -
      </app-button>
      <span class="quantity">{{ item.quantity }}</span>
      <app-button size="sm" @click="increaseQuantity">
        +
      </app-button>
    </div>

    <div class="product-total">
      {{ formattedTotal }} ₽
    </div>

    <div class="product-remove">
      <app-button plain @click="removeItem">
        &times;
      </app-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  components: { AppButton },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['update-quantity', 'remove-item'],
  setup(props, { emit }) {
    const formattedPrice = computed(() => {
      const price = props.item.discount_price || props.item.price
      return price.toLocaleString()
    })

    const formattedTotal = computed(() => {
      const price = props.item.discount_price || props.item.price
      return (price * props.item.quantity).toLocaleString()
    })

    const increaseQuantity = () => {
      emit('update-quantity', props.item.id, props.item.quantity + 1)
    }

    const decreaseQuantity = () => {
      if (props.item.quantity > 1) {
        emit('update-quantity', props.item.id, props.item.quantity - 1)
      }
    }

    const removeItem = () => {
      emit('remove-item', props.item.id)
    }

    return {
      formattedPrice,
      formattedTotal,
      increaseQuantity,
      decreaseQuantity,
      removeItem
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-item {
  display: grid;
  grid-template-columns: 100px 2fr 1fr 1fr 1fr 40px;
  gap: $gap-md;
  align-items: center;
  padding: $gap-md 0;
  border-bottom: 1px solid $border-color;

  .product-image {
    img {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }
  }

  .product-info {
    .product-name {
      margin: 0 0 $gap-sm;
      font-size: 16px;
    }

    .product-specs {
      display: flex;
      gap: $gap-md;
      color: $text-light;
      font-size: 14px;
    }
  }

  .product-price,
  .product-total {
    font-weight: bold;
  }

  .product-quantity {
    display: flex;
    align-items: center;
    gap: $gap-sm;

    .quantity {
      min-width: 30px;
      text-align: center;
    }
  }

  .product-remove {
    button {
      font-size: 20px;
      padding: 0;
      min-width: 30px;
    }
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "image info"
      "price price"
      "quantity remove"
      "total total";

    .product-image {
      grid-area: image;
    }

    .product-info {
      grid-area: info;
    }

    .product-price {
      grid-area: price;
    }

    .product-quantity {
      grid-area: quantity;
    }

    .product-remove {
      grid-area: remove;
      justify-self: end;
    }

    .product-total {
      grid-area: total;
      text-align: right;
      font-size: 18px;
    }
  }
}
</style>