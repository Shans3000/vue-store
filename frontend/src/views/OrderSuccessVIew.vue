<template>
  <div class="order-success-view">
    <div class="success-card">
      <div class="success-icon">✓</div>
      <h2>Заказ успешно оформлен!</h2>
      <p>Номер вашего заказа: <strong>#{{ orderId }}</strong></p>
      <p>Мы свяжемся с вами в ближайшее время для подтверждения заказа.</p>
      <app-button size="lg" @click="goToCatalog">Продолжить покупки</app-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  components: { AppButton },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const orderId = computed(() => route.query.orderId)

    const goToCatalog = () => {
      router.push({ name: 'Catalog' })
    }

    return {
      orderId,
      goToCatalog
    }
  }
}
</script>

<style lang="scss" scoped>
.order-success-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 24px;

  .success-card {
    background: white;
    border-radius: 8px;
    padding: 40px;
    text-align: center;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .success-icon {
      width: 80px;
      height: 80px;
      background: #4CAF50;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      margin: 0 auto 24px;
    }

    h2 {
      margin-bottom: 16px;
    }

    p {
      margin-bottom: 8px;
      color: $text-light;
    }

    button {
      margin-top: 24px;
    }
  }
}
</style>