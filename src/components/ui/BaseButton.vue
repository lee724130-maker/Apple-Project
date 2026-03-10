<template>
  <button
    class="base-button"
    :class="[typeClass, sizeClass]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const typeClass = computed(() => `button-${props.type}`)
const sizeClass = computed(() => `button-${props.size}`)

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

/* Primary 按钮样式 */
.button-primary {
  background: #4a6cf7;
  color: white;
}

.button-primary:hover:not(:disabled) {
  background: #3a5bd9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 108, 247, 0.3);
}

/* Secondary 按钮样式 */
.button-secondary {
  background: #f1f4f9;
  color: #1e293b;
}

.button-secondary:hover:not(:disabled) {
  background: #e2e8f0;
  transform: translateY(-2px);
}

/* Outline 按钮样式 */
.button-outline {
  background: transparent;
  color: #4a6cf7;
  border: 2px solid #4a6cf7;
}

.button-outline:hover:not(:disabled) {
  background: #4a6cf7;
  color: white;
  transform: translateY(-2px);
}

/* Text 按钮样式 */
.button-text {
  background: transparent;
  color: #4a6cf7;
  padding-left: 0;
  padding-right: 0;
}

.button-text:hover:not(:disabled) {
  color: #3a5bd9;
  text-decoration: underline;
}

/* 按钮尺寸 */
.button-small {
  padding: 8px 16px;
  font-size: 0.875rem;
}

.button-medium {
  padding: 10px 24px;
  font-size: 1rem;
}

.button-large {
  padding: 12px 32px;
  font-size: 1.125rem;
}

/* 禁用状态 */
.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* 确保按钮文本正确显示 */
.base-button :deep(span) {
  display: inline-block;
}
</style>