<template>
  <div class="app-spinner"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.app-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid $border-color;
  border-top: 4px solid $primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>