<script setup lang="ts">
import { ref, computed } from 'vue'
import { SUBNET_MASKS } from '../constants/masks'
import { isIpValid } from '../utils/validation'
import { getNetworkAddress, getAddressesCount } from '../utils/calculations'

const ipAddress = ref<string>('')
const selectedMask = ref<string>(
  SUBNET_MASKS.find((m) => m.cidr === 24)?.value || SUBNET_MASKS[0].value,
)

const result = ref<{
  ip: string
  mask: string
  network: string
  count: number
} | null>(null)

const isIpCorrect = computed(() => isIpValid(ipAddress.value))

const handleCalculate = () => {
  if (!isIpCorrect.value) return

  result.value = {
    ip: ipAddress.value,
    mask: selectedMask.value,
    network: getNetworkAddress(ipAddress.value, selectedMask.value),
    count: getAddressesCount(selectedMask.value),
  }
}
</script>

<template>
  <div class="calculator-card">
    <h2 class="calculator-title">Калькулятор подсетей</h2>

    <!-- Поле IP -->
    <div class="input-group">
      <label class="input-label" for="ip-input">IP Адрес</label>
      <input
        id="ip-input"
        v-model="ipAddress"
        type="text"
        class="input-field"
        :class="{ 'input-error': ipAddress.length > 0 && !isIpCorrect }"
        placeholder="192.168.1.150"
        @keydown.enter="handleCalculate"
      />
      <span v-if="ipAddress.length > 0 && !isIpCorrect" class="error-text">
        Некорректный формат IP (пример: 192.168.0.1)
      </span>
    </div>

    <!-- Выбор Маски -->
    <div class="input-group">
      <label class="input-label" for="mask-select">Маска подсети</label>
      <select id="mask-select" v-model="selectedMask" class="input-field select-field">
        <option v-for="mask in SUBNET_MASKS" :key="mask.cidr" :value="mask.value">
          {{ mask.label }}
        </option>
      </select>
    </div>

    <!-- Кнопка -->
    <button
      class="calc-button"
      :disabled="!isIpCorrect || ipAddress.length === 0"
      @click="handleCalculate"
    >
      Рассчитать
    </button>

    <!-- Результат -->
    <div v-if="result" class="result-container">
      <div class="result-item">
        <span class="result-label">IP / Маска:</span>
        <span class="result-value">{{ result.ip }} / {{ result.mask }}</span>
      </div>
      <div class="result-item">
        <span class="result-label">Адрес сети:</span>
        <span class="result-value">{{ result.network }}</span>
      </div>
      <div class="result-item">
        <span class="result-label">Кол-во адресов:</span>
        <span class="result-value">{{ result.count }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator-card {
  --primary-color: #42b983;
  --primary-hover: #3aa876;
  --error-color: #ff5252;
  --bg-color: #ffffff;
  --text-color: #2c3e50;
  --border-color: #ddd;

  background-color: var(--bg-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.calculator-title {
  text-align: center;
  color: var(--text-color);
  margin: 0;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-weight: bold;
  font-size: 0.9rem;
  color: #555;
}

.input-field {
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: 0.2s;
}

.input-field:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.input-error {
  border-color: var(--error-color);
  background-color: #fff0f0;
}

.error-text {
  font-size: 0.8rem;
  color: var(--error-color);
}

.calc-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.calc-button:hover:not(:disabled) {
  background-color: var(--primary-hover);
}

.calc-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.result-container {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border-left: 5px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
}

.result-label {
  color: #666;
}

.result-value {
  font-weight: bold;
  color: var(--text-color);
}
</style>
