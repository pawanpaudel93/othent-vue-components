<template>
  <div class="loading-container">
    <div
      class="loading-spinner"
      :style="{
        width: size,
        height: size
      }"
      v-bind="$attrs"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

interface Props {
  size: string;
}
const props = withDefaults(defineProps<Props>(), {
  size: '20px'
});
const { size } = toRefs(props);
</script>

<style>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loading-spinner {
  border: 3px solid #f3f3f3; /* Light gray */
  border-top: 3px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
