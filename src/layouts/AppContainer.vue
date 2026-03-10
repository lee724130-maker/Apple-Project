<template>
  <div class="container-default">
    <slot></slot>
  </div>
</template>

<style scoped>
.container-default {
  max-width: v-bind(containerWidth);
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

@media (max-width: 768px) {
  .container-default {
    padding: 0 16px;
  }
}
</style>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  containerWidth: {
    type: String,
    default: '1200px'
  }
})
</script>