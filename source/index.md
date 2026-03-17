---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "望归客"
  # text: "Welcome to Serein's Blogscape"
  tagline: 技术探索与分享的个人空间
  # image:
  #   src: /img/avatar.png
  #   alt: VitePress
  actions:
    - theme: brand
      text: 进入首页
      link: /workspace/Js/home.html
      class: primary-button

features:
  - icon: 🛠️
    title: 前端开发
    details: Vue、React、TypeScript、Vite 等现代前端技术
    class: feature-card
  - icon: ⚡️
    title: 后端技术
    details: Node.js、Express、MongoDB 等服务端技术
    class: feature-card
  - icon: 🌞
    title: 工具链
    details: Git、Webpack、Docker 等开发工具
    class: feature-card
  - icon: 📱
    title: 移动开发
    details: React Native、Flutter 等跨平台技术
    class: feature-card
  - icon: 🚀
    title: 性能优化
    details: 前端性能优化、构建优化等技术
    class: feature-card
  - icon: 📊
    title: 数据可视化
    details: ECharts、D3.js 等数据可视化库
    class: feature-card
---

<script setup>
// 粒子动画效果
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  // 粒子动画逻辑
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  
  const hero = document.querySelector('.VPHomeHero');
  if (hero) {
    hero.style.position = 'relative';
    hero.appendChild(canvas);
  }
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // 设置 canvas 尺寸
  const setCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);
  
  // 粒子配置
  const particles = [];
  const particleCount = 50;
  
  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
    });
  }
  
  // 动画函数
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // 更新粒子位置
      p.x += p.speedX;
      p.y += p.speedY;
      
      // 边界检测
      if (p.x > canvas.width) p.x = 0;
      if (p.x < 0) p.x = canvas.width;
      if (p.y > canvas.height) p.y = 0;
      if (p.y < 0) p.y = canvas.height;
    }
    
    requestAnimationFrame(animate);
  };
  
  animate();
});
</script>

<style scoped>
/* 自定义样式 */
:deep(.VPHomeHero) {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

:deep(.VPHomeHero .container) {
  position: relative;
  z-index: 1;
}

:deep(.VPHomeHero .actions) {
  margin-top: 2rem;
}

:deep(.primary-button) {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

:deep(.primary-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

:deep(.primary-button::after) {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

:deep(.primary-button:hover::after) {
  width: 300px;
  height: 300px;
}

:deep(.secondary-button) {
  transition: all 0.3s ease;
}

:deep(.secondary-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

:deep(.feature-card) {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

:deep(.feature-card:hover) {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

:deep(.feature-card:hover .icon) {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  :deep(.VPHomeHero) {
    min-height: 70vh;
  }
  
  :deep(.VPHomeHero .actions) {
    flex-direction: column;
    gap: 1rem;
  }
  
  :deep(.VPHomeHero .actions button) {
    width: 100%;
  }
}
</style>