<template>
  <div id="app">
    <header-component />
    <router-view />
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from '@/components/layout/Header.vue'
import FooterComponent from '@/components/layout/Footer.vue'

export default {
  components: { HeaderComponent, FooterComponent }
}
</script>

<style lang="scss">
@use "@/assets/styles/base.scss";
</style>