<template>
  <button
    :class="['app-button', size, { primary }]"
    @click.stop="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['sm', 'md', 'lg'].includes(val)
    },
    primary: Boolean
  },
  emits: ['click']
}
</script>

<style lang="scss" scoped>
.app-button {
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: $font-size-base;
  background-color: $text-dark;
  color: white;

  &.sm {
    padding: 4px 8px;
    font-size: 14px;
  }

  &.lg {
    padding: 12px 24px;
    font-size: 18px;
  }

  &.primary {
    background-color: $primary;
    color: white;
    border-color: $primary;

    &:hover {
      opacity: 0.9;
    }
  }

  &:hover {
    background-color: $text-light;
  }

  &:disabled {
    background-color: $primary !important;
  }
}
</style>