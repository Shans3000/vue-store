<template>
  <div class="app-select" :class="{ 'has-error': error }">
    <label v-if="label" class="select-label">{{ label }}</label>
    <div class="select-wrapper">
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: [String, Number],
    options: {
      type: Array,
      required: true,
      validator: (arr) => arr.every(opt => 'value' in opt && 'label' in opt)
    },
    label: String,
    error: String
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
.app-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  .select-label {
    font-size: 14px;
    color: $text-dark;
    font-weight: 500;
  }

  .select-wrapper {
    position: relative;

    select {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid $border-color;
      border-radius: 8px;
      font-size: 16px;
      background-color: white;
      appearance: none;
      cursor: pointer;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: $primary;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 16px;
      width: 20px;
      height: 20px;
      background-image: url('@/assets/images/arrow.svg');
      background-size: contain;
      background-repeat: no-repeat;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }

  &.has-error {
    .select-wrapper select {
      border-color: #ff4444;
    }

    .error-message {
      color: #ff4444;
      font-size: 12px;
    }
  }
}
</style>