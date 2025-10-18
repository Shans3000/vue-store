<template>
  <div class="app-pagination">
    <button
      class="pagination-btn"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      &lt;
    </button>

    <button
      v-for="page in pages"
      :key="page"
      class="pagination-btn"
      :class="{ active: page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button
      class="pagination-btn"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  emits: ['page-changed'],
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage)
    },
    pages() {
      const range = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)

      for (let i = start; i <= end; i++) {
        range.push(i)
      }

      return range
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;

  .pagination-btn {
    width: 36px;
    height: 36px;
    border: 1px solid $border-color;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      background: $secondary;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.active {
      background: $primary;
      color: white;
      border-color: $primary;
    }
  }
}
</style>