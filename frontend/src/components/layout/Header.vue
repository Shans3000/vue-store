<template>
  <header class="app-header">
    <div class="container">
      <router-link to="/" class="logo">
        <img :src="logo" alt="iStore logo" class="logo-img" />
      </router-link>

      <div class="search">
        <div class="search-container">
          <img :src="searchIcon" alt="Search" class="search-icon" />
          <app-input
            v-model="searchQuery"
            placeholder="Search"
            @keyup.enter="search"
            class="search-input"
          />
        </div>
      </div>

      <nav class="nav">
        <router-link to="/favorites" class="nav-link">
          <img :src="favorite" alt="favorite" class="nav-icon" />
          <span v-if="favoritesCount > 0" class="badge">{{ favoritesCount }}</span>
        </router-link>
        <router-link to="/cart" class="nav-link">
          <img :src="cart" alt="cart" class="nav-icon" />
          <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
        </router-link>
      </nav>

      <button class="burger-btn" @click="toggleMobileMenu">
        <img :src="burgerIcon" alt="Menu" class="burger-icon" />
      </button>

      <div class="mobile-menu" :class="{ 'mobile-menu--open': isMobileMenuOpen }">
        <div class="mobile-menu-content">
          <button class="close-btn" @click="closeMobileMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="mobile-search">
            <div class="search-container">
              <img :src="searchIcon" alt="Search" class="search-icon" />
              <app-input
                v-model="searchQuery"
                placeholder="Search"
                @keyup.enter="searchMobile"
                class="search-input"
              />
            </div>
          </div>
          <router-link
            to="/favorites"
            class="mobile-menu-item"
            @click="closeMobileMenu"
          >
            <img :src="favorite" alt="favorite" class="mobile-icon" />
            <span>Favorites</span>
            <span v-if="favoritesCount > 0" class="mobile-badge">{{ favoritesCount }}</span>
          </router-link>
          <router-link
            to="/cart"
            class="mobile-menu-item"
            @click="closeMobileMenu"
          >
            <img :src="cart" alt="cart" class="mobile-icon" />
            <span>Cart</span>
            <span v-if="cartCount > 0" class="mobile-badge">{{ cartCount }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/store'
import logo from '@/assets/images/logo.svg'
import cart from '@/assets/images/cart.svg'
import favorite from '@/assets/images/favorite.svg'
import searchIcon from '@/assets/images/search.svg'
import burgerIcon from '@/assets/images/burger.svg'
import AppInput from '@/components/ui/AppInput.vue'

export default {
  components: { AppInput },
  setup() {
    const store = useProductsStore()
    const router = useRouter()
    const searchQuery = ref('')
    const isMobileMenuOpen = ref(false)
    const isMobile = ref(window.innerWidth < 768)

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 768
      if (!isMobile.value) {
        isMobileMenuOpen.value = false
      }
    }

    window.addEventListener('resize', updateIsMobile)

    const search = () => {
      if (searchQuery.value.trim()) {
        router.push({
          name: 'Catalog',
          query: { search: searchQuery.value.trim() }
        })
        searchQuery.value = ''
        isMobileMenuOpen.value = false
      }
    }

    const searchMobile = () => {
      search()
      isMobileMenuOpen.value = false
    }

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    return {
      searchQuery,
      search,
      searchMobile,
      logo,
      cart,
      favorite,
      searchIcon,
      burgerIcon,
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      cartCount: computed(() => store.cartCount),
      favoritesCount: computed(() => store.favorites.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  background-color: white;
  padding: $gap-md 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid $primary;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $gap-lg;
    height: 50px;
    position: relative;
  }

  .logo {
    display: flex;
    align-items: center;
    height: 100%;
    z-index: 101;

    &-img {
      height: 30px;
      width: auto;
      object-fit: contain;
    }
  }

  .search {
    flex-grow: 1;
    max-width: 600px;
    margin: 0 $gap-lg;

    @media (max-width: 768px) {
      display: none;
    }

    &-container {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
    }

    &-icon {
      position: absolute;
      left: 12px;
      width: 18px;
      height: 18px;
      z-index: 2;
    }

    &-input {
      width: 100%;

      :deep(input) {
        padding-left: 40px;
        border-radius: 8px;
        height: 56px;
        border: none;
        font-size: 14px;
        transition: all 0.3s;
        background-color: $secondary;

        &:focus {
          border-color: $primary;
          box-shadow: 0 0 0 2px rgba($primary, 0.2);
        }
      }
    }
  }

  .nav {
    display: flex;
    gap: $gap-lg;
    height: 100%;

    @media (max-width: 768px) {
      display: none;
    }

    &-link {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 $gap-sm;
    }

    &-icon {
      width: 32px;
      height: 32px;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }

    .badge {
      position: absolute;
      top: 5px;
      right: 0;
      background-color: $text-dark;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
    }
  }

  .burger-btn {
    display: none;
    background: none;
    border: none;
    padding: $gap-sm;
    cursor: pointer;
    z-index: 101;

    @media (max-width: 768px) {
      display: block;
    }

    .burger-icon {
      width: 32px;
      height: 32px;
    }
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    &--open {
      opacity: 1;
      visibility: visible;
    }

    &-content {
      position: absolute;
      top: 0;
      right: 0;
      width: 80%;
      max-width: 300px;
      height: 100%;
      background-color: white;
      padding: 80px $gap-lg $gap-lg;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease;
      overflow-y: auto;

      .mobile-menu--open & {
        transform: translateX(0);
      }

      .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: $text-dark;
        z-index: 2;

        svg {
          width: 24px;
          height: 24px;
        }

        &:hover {
          color: $primary;
        }
      }
    }

    .mobile-search {
      margin-bottom: $gap-lg;

      .search-container {
        position: relative;
        width: 100%;
      }

      .search-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        z-index: 2;
      }

      .search-input {
        width: 100%;

        :deep(input) {
          padding-left: 40px;
          border-radius: 8px;
          height: 48px;
          border: none;
          font-size: 14px;
          transition: all 0.3s;
          background-color: $secondary;
          width: 100%;

          &:focus {
            border-color: $primary;
            box-shadow: 0 0 0 2px rgba($primary, 0.2);
          }
        }
      }
    }

    .mobile-menu-item {
      display: flex;
      align-items: center;
      padding: $gap-md;
      text-decoration: none;
      color: $text-dark;
      border-radius: 8px;
      transition: background-color 0.2s;
      position: relative;

      &:hover {
        background-color: $secondary;
      }

      .mobile-icon {
        width: 24px;
        height: 24px;
        margin-right: $gap-md;
      }

      .mobile-badge {
        margin-left: auto;
        background-color: $text-dark;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
}
</style>