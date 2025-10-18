<template>
  <div class="app-input" :class="{ 'has-error': error }">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    label: String,
    error: String
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  .input-label {
    font-size: 14px;
    color: $text-dark;
    font-weight: 500;
  }

  .input-wrapper {
    position: relative;

    input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid $border-color;
      border-radius: 8px;
      font-size: 16px;
      background-color: white;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: $primary;
      }

      &::placeholder {
        color: $text-light;
      }
    }
  }

  &.has-error {
    .input-wrapper input {
      border-color: #ff4444;
    }

    .error-message {
      color: #ff4444;
      font-size: 12px;
    }
  }
}
</style>