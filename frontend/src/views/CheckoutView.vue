<template>
  <div class="checkout-view">
    <div class="checkout-container">
      <div class="checkout-form">
        <h2>Оформление заказа</h2>

        <div class="form-section">
          <h3>Контактная информация</h3>
          <app-input v-model="form.name" label="ФИО" required />
          <app-input v-model="form.email" label="Email" type="email" required />
          <app-input v-model="form.phone" label="Телефон" required />
        </div>

        <div class="form-section">
          <h3>Адрес доставки</h3>
          <app-input v-model="form.address" label="Адрес" required />
          <app-input v-model="form.comment" label="Комментарий" textarea />
        </div>

        <div class="form-section">
          <h3>Способ оплаты</h3>
          <app-select
            v-model="form.payment"
            :options="paymentOptions"
            label="Выберите способ оплаты"
          />
        </div>

        <app-button size="lg" @click="submitOrder" :loading="submitting">
          Подтвердить заказ
        </app-button>
      </div>

      <div class="order-summary">
        <h3>Ваш заказ</h3>
        <div class="summary-items">
          <div v-for="item in cartItems" :key="item.id" class="summary-item">
            <span class="item-name">{{ item.name }} × {{ item.quantity }}</span>
            <span class="item-price">{{ (item.price * item.quantity).toLocaleString() }} ₽</span>
          </div>
        </div>
        <div class="summary-total">
          <span>Итого:</span>
          <span class="total-price">{{ cartTotal.toLocaleString() }} ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useCart from '@/composables/useCart'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  components: { AppInput, AppSelect, AppButton },
  setup() {
    const router = useRouter()
    const { cartItems, cartTotal, clearCart } = useCart()

    const form = ref({
      name: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
      payment: 'card'
    })

    const paymentOptions = [
      { value: 'card', label: 'Картой онлайн' },
      { value: 'cash', label: 'Наличными при получении' }
    ]

    const submitting = ref(false)

    const submitOrder = async () => {
      submitting.value = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))

        clearCart()
        router.push({
          name: 'OrderSuccess',
          query: { orderId: Math.floor(Math.random() * 1000000) }
        })
      } finally {
        submitting.value = false
      }
    }

    return {
      form,
      paymentOptions,
      cartItems,
      cartTotal,
      submitting,
      submitOrder
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-view {
  padding: 24px 0;

  .checkout-container {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .checkout-form {
    h2 {
      margin-bottom: 24px;
    }

    .form-section {
      margin-bottom: 24px;

      h3 {
        margin-bottom: 16px;
      }
    }
  }

  .order-summary {
    background: $secondary;
    padding: 24px;
    border-radius: 8px;
    height: fit-content;
    position: sticky;
    top: 20px;

    h3 {
      margin-bottom: 16px;
    }

    .summary-items {
      margin-bottom: 16px;

      .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;

        .item-name {
          color: $text-light;
        }
      }
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 18px;
      padding-top: 16px;
      border-top: 1px solid $border-color;

      .total-price {
        color: $text-dark;
      }
    }
  }
}

@media (max-width: 768px) {
  .checkout-view {
    .checkout-container {
      grid-template-columns: 1fr;
    }

    .order-summary {
      position: static;
      margin-top: 32px;
    }
  }
}
</style>