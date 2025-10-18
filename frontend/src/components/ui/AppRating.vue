<template>
  <div class="app-rating" :class="[size]">
    <div class="stars-container">
      <div class="stars-background">
        <span v-for="star in 5" :key="'bg-'+star" class="star">★</span>
      </div>
      <div class="stars-filled" :style="{ width: `${(value / 5) * 100}%` }">
        <span v-for="star in 5" :key="'fill-'+star" class="star">★</span>
      </div>
    </div>
    <span v-if="showValue" class="rating-value">{{ value.toFixed(1) }}</span>
    <span v-if="count" class="rating-count">({{ count }})</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0 && val <= 5
    },
    showValue: Boolean,
    count: Number,
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['sm', 'md', 'lg'].includes(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background-color: white;
  border-radius: 8px;

  &.lg {
    padding: 12px 16px;
  }

  .stars-container {
    position: relative;
    display: inline-block;
    color: #ddd;
    font-size: 18px;
    line-height: 1;

    &.lg {
      font-size: 24px;
    }

    .stars-filled {
      position: absolute;
      top: 0;
      left: 0;
      white-space: nowrap;
      overflow: hidden;
      color: #ffc107;
    }

    .star {
      display: inline-block;
    }
  }

  .rating-value {
    margin-left: 4px;
    font-weight: bold;
  }

  .rating-count {
    margin-left: 4px;
    color: $text-light;
    font-size: 14px;
  }
}
</style>