<template>
  <div class="filters-section">
    <div class="filter-group">
      <h3>Цена</h3>
      <div class="price-range">
        <div class="price-inputs">
          <app-input
            v-model.number="priceRange[0]"
            type="number"
            placeholder="От"
            @change="applyPriceFilter"
          />
          <app-input
            v-model.number="priceRange[1]"
            type="number"
            placeholder="До"
            @change="applyPriceFilter"
          />
        </div>
        <div class="price-slider">
          <slider
            v-model="priceRange"
            :min="minPrice"
            :max="maxPrice"
            :tooltips="false"
            :enable-cross="false"
            @end="applyPriceFilter"
          />
        </div>
        <div class="price-values">
          <span>{{ minPrice }} ₽</span>
          <span>{{ maxPrice }} ₽</span>
        </div>
      </div>
    </div>

    <template v-if="currentCategory === 'Смартфоны'">
      <div class="filter-group">
        <h3>Объем памяти</h3>
        <div class="checkbox-list">
          <div
            v-for="memory in availableMemories"
            :key="memory"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="`memory-${memory}`"
              :value="memory"
              v-model="selectedMemories"
              @change="applyFilters"
            >
            <label :for="`memory-${memory}`">{{ memory }} ГБ</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <h3>Процессор</h3>
        <div class="checkbox-list">
          <div
            v-for="cpu in availableCpus"
            :key="cpu"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="`cpu-${cpu}`"
              :value="cpu"
              v-model="selectedCpus"
              @change="applyFilters"
            >
            <label :for="`cpu-${cpu}`">{{ cpu }}</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <h3>Диагональ экрана</h3>
        <div class="range-filter">
          <div class="range-inputs">
            <app-input
              v-model.number="screenSizeRange[0]"
              type="number"
              placeholder="От"
              @change="applyScreenSizeFilter"
            />
            <app-input
              v-model.number="screenSizeRange[1]"
              type="number"
              placeholder="До"
              @change="applyScreenSizeFilter"
            />
          </div>
          <div class="range-slider">
            <slider
              v-model="screenSizeRange"
              :min="minScreenSize"
              :max="maxScreenSize"
              :step="0.1"
              :tooltips="false"
              :enable-cross="false"
              @end="applyScreenSizeFilter"
            />
          </div>
          <div class="range-values">
            <span>{{ minScreenSize.toFixed(1) }} дюйма</span>
            <span>{{ maxScreenSize.toFixed(1) }} дюйма</span>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <h3>Аккумулятор</h3>
        <div class="range-filter">
          <div class="range-inputs">
            <app-input
              v-model.number="batteryRange[0]"
              type="number"
              placeholder="От"
              @change="applyBatteryFilter"
            />
            <app-input
              v-model.number="batteryRange[1]"
              type="number"
              placeholder="До"
              @change="applyBatteryFilter"
            />
          </div>
          <div class="range-slider">
            <slider
              v-model="batteryRange"
              :min="minBattery"
              :max="maxBattery"
              :tooltips="false"
              :enable-cross="false"
              @end="applyBatteryFilter"
            />
          </div>
          <div class="range-values">
            <span>{{ minBattery }} mAh</span>
            <span>{{ maxBattery }} mAh</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="currentCategory === 'Компьютеры'">
      <div class="filter-group">
        <h3>Объем SSD</h3>
        <div class="checkbox-list">
          <div
            v-for="ssd in availableSsds"
            :key="ssd"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="`ssd-${ssd}`"
              :value="ssd"
              v-model="selectedSsds"
              @change="applyFilters"
            >
            <label :for="`ssd-${ssd}`">{{ ssd }} ГБ</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <h3>Процессор</h3>
        <div class="checkbox-list">
          <div
            v-for="cpu in availableCpus"
            :key="cpu"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="`cpu-${cpu}`"
              :value="cpu"
              v-model="selectedCpus"
              @change="applyFilters"
            >
            <label :for="`cpu-${cpu}`">{{ cpu }}</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <h3>Оперативная память</h3>
        <div class="checkbox-list">
          <div
            v-for="ram in availableRams"
            :key="ram"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="`ram-${ram}`"
              :value="ram"
              v-model="selectedRams"
              @change="applyFilters"
            >
            <label :for="`ram-${ram}`">{{ ram }} ГБ</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <h3>Диагональ экрана</h3>
        <div class="range-filter">
          <div class="range-inputs">
            <app-input
              v-model.number="screenSizeRange[0]"
              type="number"
              placeholder="От"
              @change="applyScreenSizeFilter"
            />
            <app-input
              v-model.number="screenSizeRange[1]"
              type="number"
              placeholder="До"
              @change="applyScreenSizeFilter"
            />
          </div>
          <div class="range-slider">
            <slider
              v-model="screenSizeRange"
              :min="minScreenSize"
              :max="maxScreenSize"
              :step="0.1"
              :tooltips="false"
              :enable-cross="false"
              @end="applyScreenSizeFilter"
            />
          </div>
          <div class="range-values">
            <span>{{ minScreenSize.toFixed(1) }} дюйма</span>
            <span>{{ maxScreenSize.toFixed(1) }} дюйма</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="currentCategory === 'Планшеты'">
      <div class="filter-group">
        <h3>Объем памяти</h3>
        <div class="checkbox-list">
          <div
            v-for="memory in availableMemories"
            :key="memory"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="`memory-${memory}`"
              :value="memory"
              v-model="selectedMemories"
              @change="applyFilters"
            >
            <label :for="`memory-${memory}`">{{ memory }} ГБ</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <h3>Процессор</h3>
        <div class="checkbox-list">
          <div
            v-for="cpu in availableCpus"
            :key="cpu"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="`cpu-${cpu}`"
              :value="cpu"
              v-model="selectedCpus"
              @change="applyFilters"
            >
            <label :for="`cpu-${cpu}`">{{ cpu }}</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <h3>Диагональ экрана</h3>
        <div class="range-filter">
          <div class="range-inputs">
            <app-input
              v-model.number="screenSizeRange[0]"
              type="number"
              placeholder="От"
              @change="applyScreenSizeFilter"
            />
            <app-input
              v-model.number="screenSizeRange[1]"
              type="number"
              placeholder="До"
              @change="applyScreenSizeFilter"
            />
          </div>
          <div class="range-slider">
            <slider
              v-model="screenSizeRange"
              :min="minScreenSize"
              :max="maxScreenSize"
              :step="0.1"
              :tooltips="false"
              :enable-cross="false"
              @end="applyScreenSizeFilter"
            />
          </div>
          <div class="range-values">
            <span>{{ minScreenSize.toFixed(1) }} дюйма</span>
            <span>{{ maxScreenSize.toFixed(1) }} дюйма</span>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <h3>Аккумулятор</h3>
        <div class="range-filter">
          <div class="range-inputs">
            <app-input
              v-model.number="batteryRange[0]"
              type="number"
              placeholder="От"
              @change="applyBatteryFilter"
            />
            <app-input
              v-model.number="batteryRange[1]"
              type="number"
              placeholder="До"
              @change="applyBatteryFilter"
            />
          </div>
          <div class="range-slider">
            <slider
              v-model="batteryRange"
              :min="minBattery"
              :max="maxBattery"
              :tooltips="false"
              :enable-cross="false"
              @end="applyBatteryFilter"
            />
          </div>
          <div class="range-values">
            <span>{{ minBattery }} mAh</span>
            <span>{{ maxBattery }} mAh</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="currentCategory === 'Часы'">
      <div class="filter-group">
        <h3>Размер циферблата</h3>
        <div class="range-filter">
          <div class="range-inputs">
            <app-input
              v-model.number="dialSizeRange[0]"
              type="number"
              placeholder="От"
              @change="applyDialSizeFilter"
            />
            <app-input
              v-model.number="dialSizeRange[1]"
              type="number"
              placeholder="До"
              @change="applyDialSizeFilter"
            />
          </div>
          <div class="range-slider">
            <slider
              v-model="dialSizeRange"
              :min="minDialSize"
              :max="maxDialSize"
              :tooltips="false"
              :enable-cross="false"
              @end="applyDialSizeFilter"
            />
          </div>
          <div class="range-values">
            <span>{{ minDialSize }} мм</span>
            <span>{{ maxDialSize }} мм</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/store'
import '@vueform/slider/themes/default.css'
import Slider from "@vueform/slider"
import AppInput from '@/components/ui/AppInput.vue'

export default {
  components: { AppInput, Slider },
  setup() {
    const route = useRoute()
    const store = useProductsStore()

    const currentCategory = computed(() => route.query.category || '')

    const currentCategoryProducts = computed(() => {
      if (!currentCategory.value) return store.products
      return store.products.filter(p => p.category === currentCategory.value)
    })

    const priceRange = ref([...store.filters.priceRange])
    const minPrice = computed(() => {
      const prices = currentCategoryProducts.value.map(p => p.price)
      return prices.length ? Math.floor(Math.min(...prices)) : 0
    })
    const maxPrice = computed(() => {
      const prices = currentCategoryProducts.value.map(p => p.price)
      return prices.length ? Math.ceil(Math.max(...prices)) : 100000
    })

    const getCharacteristicValues = (charName) => {
      const values = new Set()
      currentCategoryProducts.value.forEach(product => {
        const char = product.characteristics?.find(c => c.characteristic === charName)
        if (char) values.add(char.value)
      })
      return Array.from(values)
    }

    const getNumericCharacteristicRange = (charName, defaults = { min: 0, max: 100 }) => {
      const values = currentCategoryProducts.value.map(product => {
        const char = product.characteristics?.find(c => c.characteristic === charName);
        return char ? parseFloat(char.value) : NaN;
      }).filter(v => !isNaN(v));

      if (!values.length) return defaults;

      return {
        min: Math.min(...values),
        max: Math.max(...values)
      };
    };

    const screenSizeDefaults = { min: 4, max: 7 };
    const screenSizeRange = ref([screenSizeDefaults.min, screenSizeDefaults.max]);
    const minScreenSize = computed(() => {
      const range = getNumericCharacteristicRange('Диагональ', screenSizeDefaults);
      return range.min;
    });
    const maxScreenSize = computed(() => {
      const range = getNumericCharacteristicRange('Диагональ', screenSizeDefaults);
      return range.max;
    });

    const batteryDefaults = { min: 2000, max: 5000 };
    const batteryRange = ref([batteryDefaults.min, batteryDefaults.max]);
    const minBattery = computed(() => {
      const range = getNumericCharacteristicRange('Аккумулятор', batteryDefaults);
      return range.min;
    });
    const maxBattery = computed(() => {
      const range = getNumericCharacteristicRange('Аккумулятор', batteryDefaults);
      return range.max;
    });

    const selectedMemories = ref([])
    const selectedCpus = ref([])

    const availableMemories = computed(() => {
      const memories = getCharacteristicValues('Объем встроенной памяти')
      return memories.sort((a, b) => parseInt(a) - parseInt(b))
    })

    const availableCpus = computed(() => {
      return getCharacteristicValues('Процессор')
    })

    const selectedSsds = ref([])
    const selectedRams = ref([])

    const availableSsds = computed(() => {
      const ssds = getCharacteristicValues('Объем встроенной памяти')
      return ssds.sort((a, b) => parseInt(a) - parseInt(b))
    })

    const availableRams = computed(() => {
      const rams = getCharacteristicValues('Объем оперативной памяти')
      return rams.sort((a, b) => parseInt(a) - parseInt(b))
    })

    const dialSizeDefaults = { min: 30, max: 50 };
    const dialSizeRange = ref([dialSizeDefaults.min, dialSizeDefaults.max]);
    const minDialSize = computed(() => {
      const range = getNumericCharacteristicRange('Циферблат', dialSizeDefaults);
      return range.min;
    });
    const maxDialSize = computed(() => {
      const range = getNumericCharacteristicRange('Циферблат', dialSizeDefaults);
      return range.max;
    });

    if (store.filters.priceRange[0] === 0 && store.filters.priceRange[1] === 100000) {
      priceRange.value = [minPrice.value, maxPrice.value]
      store.filters.priceRange = [minPrice.value, maxPrice.value]
    }

    const applyPriceFilter = () => {
      priceRange.value[0] = Math.max(priceRange.value[0], minPrice.value)
      priceRange.value[1] = Math.min(priceRange.value[1], maxPrice.value)
      store.filters.priceRange = [...priceRange.value]
      store.applyFilters()
    }

    const applyScreenSizeFilter = () => {
      if (isNaN(screenSizeRange.value[0])) screenSizeRange.value[0] = minScreenSize.value;
      if (isNaN(screenSizeRange.value[1])) screenSizeRange.value[1] = maxScreenSize.value;

      screenSizeRange.value[0] = Math.max(screenSizeRange.value[0], minScreenSize.value);
      screenSizeRange.value[1] = Math.min(screenSizeRange.value[1], maxScreenSize.value);

      store.filters.screenSizeRange = [...screenSizeRange.value];
      store.applyFilters();
    };

    const applyBatteryFilter = () => {
      if (isNaN(batteryRange.value[0])) batteryRange.value[0] = minBattery.value;
      if (isNaN(batteryRange.value[1])) batteryRange.value[1] = maxBattery.value;

      batteryRange.value[0] = Math.max(batteryRange.value[0], minBattery.value)
      batteryRange.value[1] = Math.min(batteryRange.value[1], maxBattery.value)

      store.filters.batteryRange = [...batteryRange.value]
      store.applyFilters()
    }

    const applyDialSizeFilter = () => {
      if (isNaN(dialSizeRange.value[0])) dialSizeRange.value[0] = minDialSize.value;
      if (isNaN(dialSizeRange.value[1])) dialSizeRange.value[1] = maxDialSize.value;

      dialSizeRange.value[0] = Math.max(dialSizeRange.value[0], minDialSize.value)
      dialSizeRange.value[1] = Math.min(dialSizeRange.value[1], maxDialSize.value)

      store.filters.dialSizeRange = [...dialSizeRange.value]
      store.applyFilters()
    }

    const applyFilters = () => {
      store.filters.memories = [...selectedMemories.value]
      store.filters.cpus = [...selectedCpus.value]
      store.filters.ssds = [...selectedSsds.value]
      store.filters.rams = [...selectedRams.value]
      store.applyFilters()
    }

    watch(currentCategory, () => {
      priceRange.value = [minPrice.value, maxPrice.value]
      screenSizeRange.value = [minScreenSize.value, maxScreenSize.value]
      batteryRange.value = [minBattery.value, maxBattery.value]
      dialSizeRange.value = [minDialSize.value, maxDialSize.value]

      store.filters.memories = []
      store.filters.cpus = []
      store.filters.ssds = []
      store.filters.rams = []
      store.filters.priceRange = [minPrice.value, maxPrice.value]
      store.filters.screenSizeRange = [minScreenSize.value, maxScreenSize.value]
      store.filters.batteryRange = [minBattery.value, maxBattery.value]
      store.filters.dialSizeRange = [minDialSize.value, maxDialSize.value]

      selectedMemories.value = []
      selectedCpus.value = []
      selectedSsds.value = []
      selectedRams.value = []

      store.applyFilters()
    }, { immediate: true })

    return {
      store,
      currentCategory,
      priceRange,
      minPrice,
      maxPrice,

      selectedMemories,
      selectedCpus,
      availableMemories,
      availableCpus,
      screenSizeRange,
      batteryRange,
      minScreenSize,
      maxScreenSize,
      minBattery,
      maxBattery,

      selectedSsds,
      selectedRams,
      availableSsds,
      availableRams,

      dialSizeRange,
      minDialSize,
      maxDialSize,

      applyPriceFilter,
      applyScreenSizeFilter,
      applyBatteryFilter,
      applyDialSizeFilter,
      applyFilters
    }
  }
}
</script>

<style lang="scss" scoped>
.filters-section {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-group {
  margin-bottom: 24px;

  h3 {
    margin-bottom: 12px;
    font-size: 16px;
    color: $text-dark;
    font-weight: 500;
  }
}

.price-range,
.range-filter {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-inputs,
.range-inputs {
  display: flex;
  gap: 8px;
}

.price-slider,
.range-slider {
  padding: 10px 0;
}

.price-values,
.range-values {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: $text-light;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    appearance: none;
    border: 1px solid $border-color;
    border-radius: 2px;
    cursor: pointer;
    position: relative;

    &:checked {
      background-color: black;
      border-color: black;

      &::after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 12px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  label {
    font-size: 14px;
    cursor: pointer;
  }
}

/* Стили для слайдера */
:deep(.slider-connects) {
  background: #f0f0f0;
  border-radius: 4px;
}

:deep(.slider-connect) {
  background: black;
}

:deep(.slider-handle) {
  width: 16px;
  height: 16px;
  background: white;
  border: 2px solid black;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

:deep(.slider-tooltip) {
  display: none;
}
</style>