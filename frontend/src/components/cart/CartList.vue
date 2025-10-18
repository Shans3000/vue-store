<template>
  <div class="cart-list">
    <div v-if="items.length === 0" class="empty-cart">
      Корзина пуста
      <router-link to="/catalog" class="continue-shopping">
        Продолжить покупки
      </router-link>
    </div>

    <template v-else>
      <div class="cart-header">
        <h2>Корзина</h2>
        <div class="total-items">Товаров: {{ totalItems }}</div>
      </div>

      <div class="items">
        <cart-item
          v-for="item in items"
          :key="item.id"
          :item="item"
          @update-quantity="updateQuantity"
          @remove-item="removeItem"
        />
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Итого:</span>
          <span class="total-price">{{ formattedTotal }} ₽</span>
        </div>

        <app-button size="lg" @click="checkout">
          Оформить заказ
        </app-button>
      </div>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue'
import CartItem from './CartItem.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  components: { CartItem, AppButton },
  props: {
    items: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  emits: ['update-quantity', 'remove-item', 'checkout'],
  setup(props, { emit }) {
    const totalItems = computed(() => {
      return props.items.reduce((sum, item) => sum + item.quantity, 0)
    })

    const formattedTotal = computed(() => {
      return props.total.toLocaleString()
    })

    const updateQuantity = (id, quantity) => {
      emit('update-quantity', id, quantity)
    }

    const removeItem = (id) => {
      emit('remove-item', id)
    }

    const checkout = () => {
      emit('checkout')
    }

    return {
      totalItems,
      formattedTotal,
      updateQuantity,
      removeItem,
      checkout
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-list {
  .empty-cart {
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

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $gap-lg;

    h2 {
      margin: 0;
    }

    .total-items {
      color: $text-light;
    }
  }

  .items {
    margin-bottom: $gap-lg;
  }

  .cart-summary {
    border-top: 1px solid $border-color;
    padding-top: $gap-md;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: $gap-lg;

    .summary-row {
      display: flex;
      justify-content: space-between;
      width: 300px;
      font-size: 18px;

      .total-price {
        font-weight: bold;
        font-size: 24px;
      }
    }
  }
}
</style>