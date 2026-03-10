<template>
  <div class="accordion-item" :class="{ 'is-open': isOpen }">
    <div class="accordion-header" @click="toggle">
      <h3 class="accordion-title">{{ title }}</h3>
      <span class="accordion-icon" :class="{ 'rotate': isOpen }">▼</span>
    </div>
    <Transition
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-if="isOpen" class="accordion-content">
        <div class="accordion-body">
          <slot></slot>
          <BaseButton v-if="showLearnMore" type="link" @click="handleLearnMore">
            Learn More →
          </BaseButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showLearnMore: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle', 'learn-more'])

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}

const handleLearnMore = () => {
  emit('learn-more')
}

// 动画钩子
const beforeEnter = (el) => {
  el.style.height = '0'
  el.style.opacity = '0'
}

const enter = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
  el.style.transition = 'height 0.3s ease, opacity 0.3s ease'
}

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
}

const leave = (el) => {
  el.style.height = '0'
  el.style.opacity = '0'
  el.style.transition = 'height 0.3s ease, opacity 0.3s ease'
}
</script>

<style scoped>
.accordion-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  user-select: none;
  transition: var(--transition);
}

.accordion-header:hover {
  padding-left: 8px;
}

.accordion-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-neutral-800);
  margin: 0;
}

.accordion-icon {
  font-size: 0.875rem;
  transition: transform 0.3s ease;
}

.accordion-icon.rotate {
  transform: rotate(180deg);
}

.accordion-content {
  overflow: hidden;
  will-change: height;
}

.accordion-body {
  padding-bottom: 24px;
  color: var(--color-neutral-700);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .accordion-title {
    font-size: 1.25rem;
  }
}
</style>