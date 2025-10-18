<template>
  <div class="catalog-view">
    <div class="sidebar">
      <sidebar />
      <product-filters />
    </div>

    <div class="main-content">
      <h1>{{ categoryTitle }}</h1>

      <div class="controls">
        <app-input
          v-model="searchQuery"
          placeholder="Поиск товаров..."
          class="search-input"
        />
        <app-select
          v-model="sortOption"
          :options="sortOptions"
          label="Сортировка"
        />
      </div>

      <product-list
        :products="filteredProducts"
        :current-page="currentPage"
        :total-items="totalProducts"
        :per-page="productsPerPage"
        @page-changed="changePage"
        @add-to-cart="addToCart"
        @toggle-favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/store'
import Sidebar from '@/components/layout/Sidebar.vue'
import ProductFilters from '@/components/product/ProductFilters.vue'
import ProductList from '@/components/product/ProductList.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppInput from '@/components/ui/AppInput.vue'

export default {
  components: { Sidebar, ProductFilters, ProductList, AppSelect, AppInput },
  setup() {
    const route = useRoute()
    const store = useProductsStore()

    const currentPage = ref(1)
    const productsPerPage = 12
    const searchQuery = ref('')
    const sortOption = ref('price-asc')

    const sortOptions = [
      { value: 'price-asc', label: 'По возрастанию цены' },
      { value: 'price-desc', label: 'По убыванию цены' },
      { value: 'rating', label: 'По рейтингу' }
    ]

    watch(sortOption, (newValue) => {
      store.sortOption = newValue
      store.applyFilters()
    })

    const categoryTitle = computed(() => {
      if (route.query.category) {
        return route.query.category
      }
      return 'Все товары'
    })

    const filteredProducts = computed(() => {
      let products = [...store.filteredProducts]

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        products = products.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
        )
      }

      const start = (currentPage.value - 1) * productsPerPage
      return products.slice(start, start + productsPerPage)
    })

    const totalProducts = computed(() => {
      let products = [...store.filteredProducts]
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        products = products.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
        )
      }
      return products.length
    })

    watch(() => route.query, (newQuery) => {
      currentPage.value = 1
      if (newQuery.category) {
        store.filters.category = newQuery.category
      } else {
        store.filters.category = null
      }
      store.applyFilters()
    }, { immediate: true })

    const changePage = (page) => {
      currentPage.value = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const addToCart = (product) => {
      store.addToCart(product)
    }

    const toggleFavorite = (product) => {
      store.toggleFavorite(product)
    }

    return {
      sortOption,
      sortOptions,
      searchQuery,
      currentPage,
      productsPerPage,
      categoryTitle,
      filteredProducts,
      totalProducts,
      changePage,
      addToCart,
      toggleFavorite
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog-view {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  padding: 24px;

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .main-content {
    h1 {
      margin-bottom: 24px;
    }

    .controls {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      align-items: flex-end;

      .search-input {
        flex-grow: 1;
        max-width: 400px;
      }
    }
  }
}

@media (max-width: 768px) {
  .catalog-view {
    grid-template-columns: 1fr;

    .sidebar {
      display: none;
    }
  }
}
</style>