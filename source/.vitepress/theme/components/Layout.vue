<template>
  <div class="layout-container" @mousemove="handleMouseMove">
    <!-- 粒子动画 canvas - 仅在首页显示 -->
    <canvas 
      v-if="isHomePage" 
      ref="particlesCanvas" 
      class="particles-canvas"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;"
    ></canvas>
    
    <!-- 插槽内容 -->
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRoute } from 'vitepress';

const route = useRoute();
const particlesCanvas = ref(null);
let animationId = null;
let particles = [];
let mouseX = 0;
let mouseY = 0;
let canvasContext = null;
let canvasElement = null;

// 判断是否为首页
const isHomePage = computed(() => {
  return route.path === '/';
});

// 处理鼠标移动
const handleMouseMove = (event) => {
  if (!isHomePage.value) return;
  
  const rect = particlesCanvas.value?.getBoundingClientRect();
  if (rect) {
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  }
};

// 初始化粒子动画
const initParticles = () => {
  // 只在首页初始化粒子动画
  if (!isHomePage.value) return;
  
  const canvas = particlesCanvas.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // 保存canvas引用
  canvasElement = canvas;
  canvasContext = ctx;
  
  // 设置 canvas 尺寸
  const setCanvasSize = () => {
    if (canvasElement) {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
    }
  };
  
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);
  
  // 粒子配置
  const particleCount = 100; // 增加粒子数量
  particles = [];
  
  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 2, // 增大粒子大小
      speedX: Math.random() * 2 - 1, // 增加初始速度
      speedY: Math.random() * 2 - 1, // 增加初始速度
      color: `rgba(${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55}, 0.7)`, // 增加颜色亮度和透明度
      originalSpeedX: Math.random() * 2 - 1,
      originalSpeedY: Math.random() * 2 - 1
    });
  }
  
  // 动画函数
  const animate = () => {
    if (!canvasContext || !canvasElement) return;
    
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    // 绘制粒子之间的连线
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          canvasContext.beginPath();
          canvasContext.strokeStyle = `rgba(100, 100, 255, ${0.3 * (1 - distance / 100)})`;
          canvasContext.lineWidth = 0.5;
          canvasContext.moveTo(p1.x, p1.y);
          canvasContext.lineTo(p2.x, p2.y);
          canvasContext.stroke();
        }
      }
    }
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // 计算粒子到鼠标的距离
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 如果粒子靠近鼠标，产生吸引力
      if (distance < 200) { // 增大吸引范围
        const force = (200 - distance) / 200;
        p.speedX += (dx / distance) * force * 0.3; // 增加吸引力
        p.speedY += (dy / distance) * force * 0.3; // 增加吸引力
      } else {
        // 恢复原始速度
        p.speedX += (p.originalSpeedX - p.speedX) * 0.05;
        p.speedY += (p.originalSpeedY - p.speedY) * 0.05;
      }
      
      // 绘制粒子
      canvasContext.beginPath();
      canvasContext.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      canvasContext.fillStyle = p.color;
      canvasContext.fill();
      
      // 更新粒子位置
      p.x += p.speedX;
      p.y += p.speedY;
      
      // 边界检测
      if (p.x > canvasElement.width) p.x = 0;
      if (p.x < 0) p.x = canvasElement.width;
      if (p.y > canvasElement.height) p.y = 0;
      if (p.y < 0) p.y = canvasElement.height;
    }
    
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
};

// 清理粒子动画
const cleanupParticles = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  window.removeEventListener('resize', () => {});
  particles = [];
  canvasContext = null;
  canvasElement = null;
};

// 监听路由变化
watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    // 进入首页，初始化粒子
    setTimeout(initParticles, 100); // 延迟初始化，确保DOM已更新
  } else {
    // 离开首页，清理粒子
    cleanupParticles();
  }
});

onMounted(() => {
  // 初始加载时检查是否为首页
  if (isHomePage.value) {
    initParticles();
  }
});

onBeforeUnmount(() => {
  cleanupParticles();
});
</script>

<style lang="scss" scoped>
/* 布局容器样式 */
.layout-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  
  /* 首页鼠标样式 */
  &:has(.VPHomeHero) {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23f39c12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>') 12 12, auto;
    
    /* 鼠标悬停在链接上的样式 */
    a {
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23f39c12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>') 12 12, pointer;
    }
    
    /* 鼠标悬停在按钮上的样式 */
    button {
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>') 12 12, pointer;
    }
  }
}

/* 首页英雄区域样式 */
:deep(.VPHomeHero) {
  position: relative; /* 相对定位，为粒子动画做准备 */
  overflow: hidden; /* 隐藏超出部分 */
}

/* 英雄区域容器样式 */
:deep(.VPHomeHero .container) {
  position: relative; /* 相对定位 */
  z-index: 1; /* 确保内容在粒子动画之上 */
}

/* 主按钮样式 */
:deep(.primary-button) {
  position: relative; /* 相对定位，为波纹效果做准备 */
  overflow: hidden; /* 隐藏超出部分 */
  transition: all 0.3s ease; /* 过渡效果 */
  
  /* 悬停效果 */
  &:hover {
    transform: translateY(-2px); /* 向上移动2px */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  }
  
  /* 波纹效果 */
  &::after {
    content: ''; /* 伪元素内容 */
    position: absolute; /* 绝对定位 */
    top: 50%; /* 垂直居中 */
    left: 50%; /* 水平居中 */
    width: 0; /* 初始宽度为0 */
    height: 0; /* 初始高度为0 */
    border-radius: 50%; /* 圆形 */
    background: rgba(255, 255, 255, 0.3); /* 半透明白色背景 */
    transform: translate(-50%, -50%); /* 居中定位 */
    transition: width 0.6s, height 0.6s; /* 过渡效果 */
  }
  
  /* 悬停时的波纹效果 */
  &:hover::after {
    width: 300px; /* 展开宽度 */
    height: 300px; /* 展开高度 */
  }
}

/* 次要按钮样式 */
:deep(.secondary-button) {
  transition: all 0.3s ease; /* 过渡效果 */
  
  /* 悬停效果 */
  &:hover {
    transform: translateY(-2px); /* 向上移动2px */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  }
}

/* 功能卡片样式 */
:deep(.feature-card) {
  transition: all 0.3s ease; /* 过渡效果 */
  border-radius: 12px; /* 圆角 */
  overflow: hidden; /* 隐藏超出部分 */
  
  /* 悬停效果 */
  &:hover {
    transform: translateY(-5px); /* 向上移动5px */
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    background: rgba(255, 255, 255, 0.05); /* 半透明背景 */
    
    /* 图标缩放效果 */
    .icon {
      transform: scale(1.1); /* 放大1.1倍 */
      transition: transform 0.3s ease; /* 过渡效果 */
    }
  }
}

</style>