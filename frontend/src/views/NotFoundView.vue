<template>
  <div class="not-found-view">
    <div class="not-found-content">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <app-button size="lg" @click="goHome">На главную</app-button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  components: { AppButton },
  setup() {
    const router = useRouter()

    const goHome = () => {
      router.push({ name: 'Home' })
    }

    return {
      goHome
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  text-align: center;

  h1 {
    font-size: 80px;
    margin-bottom: 16px;
    color: $primary;
  }

  p {
    font-size: 24px;
    margin-bottom: 32px;
  }
}
</style>