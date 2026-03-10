<template>
  <main class="home">
    <!-- 1.头部 -->
    <AppHeader />
    
    <!-- 已创建的组件（保留） -->

    <!-- 2.第二层 -->
    <HeroSection />
    <!-- 3.第三层 -->
    <FeaturesSection />
    <!-- 4.第四层 -->
    <PartnersSection />
    <!-- 5.第五层 -->
    <UseCasesSection />
    
    <!-- 还未创建的组件（暂时注释掉） -->
    <!-- <CTASection 
      title="Pay any bill with Crypto from as little as $1"
      buttonText="Get started"
    />
    <TargetUsersSection />
    <BenefitsSection />
    <TestimonialsSection />
    <BlogSection />
    <CTASection 
      variant="accent"
      title="Start taking control of your investments today!"
      buttonText="Get started"
      showPricingLink
    /> -->
    
    <AppFooter />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'

// Layouts (已创建)
import AppHeader from '@/layouts/AppHeader.vue'
import AppFooter from '@/layouts/AppFooter.vue'

// Sections (已创建)
import HeroSection from '@/components/sections/HeroSection.vue'
import FeaturesSection from '@/components/sections/FeaturesSection.vue'
import PartnersSection from '@/components/sections/PartnersSection.vue'
import UseCasesSection from '@/components/sections/UseCasesSection.vue'

// 还未创建的组件（暂时注释掉）
// import CTASection from '@/components/sections/CTASection.vue'
// import TargetUsersSection from '@/components/sections/TargetUsersSection.vue'
// import BenefitsSection from '@/components/sections/BenefitsSection.vue'
// import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
// import BlogSection from '@/components/sections/BlogSection.vue'

onMounted(() => {
  // 滚动动画监听（等所有组件都有了section类再启用）
  /*
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section)
  })
  */
})
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

/* 暂时注释掉动画样式，等确认所有组件都有section类再启用 */
/*
.section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-visible {
  opacity: 1;
  transform: translateY(0);
}
*/
</style>