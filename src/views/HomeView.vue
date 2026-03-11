<template>
  <main class="home">
    <!-- 1.头部 -->
    <AppHeader />
    
    <!-- 2.英雄区域 -->
    <HeroSection />
    
    <!-- 3.核心优势 -->
    <FeaturesSection />
    
    <!-- 4.技术伙伴 -->
    <PartnersSection />
    
    <!-- 5.服务项目 -->
    <UseCasesSection />
    
    <!-- 6.第一个CTA横幅 -->
    <CTASection 
      title="从最小可行性产品到企业级应用，我们都能帮您实现"
      buttonText="免费咨询"
    />
    
    <!-- 7.目标用户 -->
    <TargetUsersSection />
    
    <!-- 8.产品优势 -->
    <BenefitsSection />
    
    <!-- 9.客户评价 -->
    <TestimonialsSection />
    
    <!-- 10.技术博客 -->
    <BlogSection />
    
    <!-- 11.第二个CTA横幅（强调色） -->
    <CTASection 
      variant="accent"
      title="准备好开始您的下一个项目了吗？"
      buttonText="立即沟通"
      showPricingLink
    />
    
    <!-- 12.页脚 -->
    <AppFooter />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'

// Layouts
import AppHeader from '@/layouts/AppHeader.vue'
import AppFooter from '@/layouts/AppFooter.vue'

// Sections
import HeroSection from '@/components/sections/HeroSection.vue'
import FeaturesSection from '@/components/sections/FeaturesSection.vue'
import PartnersSection from '@/components/sections/PartnersSection.vue'
import UseCasesSection from '@/components/sections/UseCasesSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import TargetUsersSection from '@/components/sections/TargetUsersSection.vue'
import BenefitsSection from '@/components/sections/BenefitsSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import BlogSection from '@/components/sections/BlogSection.vue'

onMounted(() => {
  // 滚动动画监听
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })

  // 给所有section添加观察
  setTimeout(() => {
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('section')
      observer.observe(section)
    })
  }, 100)
})
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

.section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.section-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 确保所有section之间有一定的间距 */
section {
  scroll-margin-top: 80px;
}
</style>