import { defineStore } from 'pinia'
import api from '@/services/api.service'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    filteredProducts: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    isLoading: false,
    error: null,
    filters: {
      category: null,
      priceRange: [0, 100000],
      memories: [],
      cpus: [],
      screenSizeRange: [0, 10],
      batteryRange: [0, 10000],
      ssds: [],
      rams: [],
      dialSizeRange: [0, 100]
    },
    sortOption: 'price-asc'
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true
      try {
        const response = await api.getProducts()
        this.products = response.data
        this.applyFilters()
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },

  applyFilters() {
    let result = [...this.products]

    if (this.filters.category) {
      result = result.filter(p => p.category === this.filters.category)
    }

    result = result.filter(p =>
      p.price >= this.filters.priceRange[0] &&
      p.price <= this.filters.priceRange[1]
    )

    if (this.filters.memories.length > 0) {
      result = result.filter(p => {
        const memoryChar = p.characteristics?.find(c =>
          c.characteristic === 'Объем встроенной памяти'
        )
        return memoryChar && this.filters.memories.includes(memoryChar.value)
      })
    }

    if (this.filters.cpus.length > 0) {
      result = result.filter(p => {
        const cpuChar = p.characteristics?.find(c =>
          c.characteristic === 'Процессор'
        )
        return cpuChar && this.filters.cpus.includes(cpuChar.value)
      })
    }

    if (this.filters.screenSizeRange) {
      result = result.filter(p => {
        const sizeChar = p.characteristics?.find(c =>
          c.characteristic === 'Диагональ'
        )
        if (!sizeChar) return true
        const size = parseFloat(sizeChar.value)
        return size >= this.filters.screenSizeRange[0] &&
               size <= this.filters.screenSizeRange[1]
      })
    }

    if (this.filters.batteryRange) {
      result = result.filter(p => {
        const batteryChar = p.characteristics?.find(c =>
          c.characteristic === 'Аккумулятор'
        )
        if (!batteryChar) return true
        const battery = parseInt(batteryChar.value)
        return battery >= this.filters.batteryRange[0] &&
               battery <= this.filters.batteryRange[1]
      })
    }

    if (this.filters.ssds.length > 0) {
      result = result.filter(p => {
        const ssdChar = p.characteristics?.find(c =>
          c.characteristic === 'Объем встроенной памяти'
        )
        return ssdChar && this.filters.ssds.includes(ssdChar.value)
      })
    }

    if (this.filters.rams.length > 0) {
      result = result.filter(p => {
        const ramChar = p.characteristics?.find(c =>
          c.characteristic === 'Объем оперативной памяти'
        )
        return ramChar && this.filters.rams.includes(ramChar.value)
      })
    }

    if (this.filters.dialSizeRange) {
      result = result.filter(p => {
        const dialChar = p.characteristics?.find(c =>
          c.characteristic === 'Циферблат'
        )
        if (!dialChar) return true
        const size = parseFloat(dialChar.value)
        return size >= this.filters.dialSizeRange[0] &&
               size <= this.filters.dialSizeRange[1]
      })
    }

    switch (this.sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    this.filteredProducts = result
  },

    addToCart(product) {
      const existing = this.cart.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this.saveCart()
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
      this.saveCart()
    },

    toggleFavorite(product) {
      const index = this.favorites.findIndex(f => f.id === product.id)
      if (index >= 0) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(product)
      }
      this.saveFavorites()
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },

    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }
  },
  getters: {
    cartTotal: (state) => {
      return state.cart.reduce((total, item) =>
        total + (item.discount_price || item.price) * item.quantity, 0)
    },
    cartCount: (state) => {
      return state.cart.reduce((count, item) => count + item.quantity, 0)
    },
    categories: (state) => {
      return [...new Set(state.products.map(p => p.category))]
    },
    brands: (state) => {
      return [...new Set(state.products.map(p => p.brand))]
    },
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    }
  }
})