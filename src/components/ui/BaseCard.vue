<template>
  <div 
    class="base-card" 
    :class="[paddingClass, hoverEffect ? 'hover-effect' : '']"
    :style="customStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: {
    type: String,
    default: '40px',
    validator: (value) => ['24px', '32px', '40px', '56px'].includes(value)
  },
  hoverEffect: {
    type: Boolean,
    default: true
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const paddingClass = computed(() => {
  const map = {
    '24px': 'padding-24',
    '32px': 'padding-32',
    '40px': 'padding-40',
    '56px': 'padding-56'
  }
  return map[props.padding] || 'padding-40'
})
</script>

<style scoped>
.base-card {
  background: white;
  border-radius: var(--radius-24);
  box-shadow: var(--shadow-card);
  transition: var(--transition);
}

.hover-effect:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.padding-24 { padding: 24px; }
.padding-32 { padding: 32px; }
.padding-40 { padding: 40px; }
.padding-56 { padding: 56px; }

@media (max-width: 768px) {
  .padding-56 { padding: 40px; }
  .padding-40 { padding: 32px; }
}
</style>