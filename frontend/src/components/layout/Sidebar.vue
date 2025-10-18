<template>
  <aside class="app-sidebar">
    <nav class="sidebar-nav">
      <router-link
        v-for="category in categories"
        :key="category"
        :to="{ name: 'Catalog', query: { category } }"
        :class="['nav-item', $route.query.category === category ? 'active' : '']"
      >
        {{ category }}
      </router-link>
    </nav>
  </aside>
</template>

<script>
import { computed } from 'vue'
import { useProductsStore } from '@/store'

export default {
  setup() {
    const store = useProductsStore()

    return {
      categories: computed(() => store.categories)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  width: 250px;
  background-color: white;
  border-radius: 8px;
  padding: $gap-md;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: $gap-sm;
  }

  .nav-item {
    padding: $gap-sm $gap-md;
    border-radius: 8px;
    background-color: $text-dark !important;
    color: white !important;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      background-color: $text-light !important;
    }

    &.active {
      background: none !important;
      color: $text-dark !important;
      border: 2px solid $text-dark;
    }
  }
}
</style>