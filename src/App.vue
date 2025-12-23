<script setup lang="ts">
import SubnetCalculator from './components/SubnetCalculator.vue'
</script>

<template>
  <main class="page-container">
    <SubnetCalculator />
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
}

.page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>
