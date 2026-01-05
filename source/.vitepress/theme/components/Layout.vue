<template>
  <div class="home-page VPContent is-home">
    <!-- 页面内容 -->
    <div class="left">
        <Hitokoto />
    </div>

    <div class="right cards">
      <div class="time">
        <div class="date">
          <span>{{ currentTime.year }}&nbsp;年&nbsp;</span>
          <span>{{ currentTime.month }}&nbsp;月&nbsp;</span>
          <span>{{ currentTime.day }}&nbsp;日&nbsp;</span>
          <span class="sm-hidden">{{ currentTime.weekday }}</span>
        </div>
        <div class="text">
          <span>{{ currentTime.hour }}:{{ currentTime.minute }}:{{ currentTime.second }}</span>
        </div>
      </div>
      <Weather />
    </div>
  </div>
</template>

<script setup>
import { onMounted,onBeforeUnmount, ref, reactive  } from 'vue';
import Weather from "./Weather.vue";
import Hitokoto from "./Hitokoto.vue";
import { getCurrentTime } from "../utils/getTime";

const backgrounds = [
  'url(/img/bcg0.webp)',
  'url(/img/bcg1.webp)',
  'url(/img/bcg2.webp)',
  'url(/img/bcg3.webp)',
  'url(/img/bcg4.webp)',
  'url(/img/bcg5.webp)',
  'url(/img/bcg6.webp)',
  'url(/img/bcg7.webp)',
  'url(/img/bcg8.webp)',
];

// 当前时间
const currentTime = ref({});
const timeInterval = ref(null);

// 更新时间
const updateTimeData = () => {
  currentTime.value = getCurrentTime();
};

/***** 帮助函数：清除首页背景（恢复到默认主题背景） *****/
const clearHomeBackground = () => {
  const homeContent = document.querySelector('.VPContent.is-home');
  if (homeContent) {
    homeContent.style.background = '';
  }
};

let _onGlobalClick = null;

onMounted(() => {
  updateTimeData();
  timeInterval.value = setInterval(updateTimeData, 1000);

  const homeContent = document.querySelector('.VPContent.is-home');
  if (homeContent) {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    homeContent.style.background = backgrounds[randomIndex] + ' no-repeat 0 0 / 100% 100%';
  }

  // 获取所有带有 VPButton 类的链接（保留已有逻辑）
  const links = document.querySelectorAll('.VPButton.brand');
  // 遍历所有链接，并为它们添加点击事件监听器
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      // 阻止默认的链接跳转行为
      event.preventDefault();

      clearHomeBackground();

      // 设置 .VPNavBar.home.top 的样式
      const navbar = document.querySelector('.VPNavBar.home.top');
      if (navbar) {
        navbar.style.backdropFilter = 'none';
        // navbar.style.backgroundColor = '#ffffff'; // 设置背景色为白色
      }

      const navbars = document.querySelectorAll('.VPNavBar:not(.has-sidebar):not(.home.top)');
      navbars.forEach(navbar => {
        navbar.style.backdropFilter = 'none';
        navbar.style.backgroundColor = '#ffffff'; // 设置背景色为白色
      });

      // 获取链接的 href 属性，即跳转目标
      const href = this.getAttribute('href');

      // 如果需要的话，你可以执行其他的操作，比如使用 window.location.href 进行页面跳转
      // window.location.href = href;
    });
  });

  // 全局点击捕获：如果用户点击的是搜索相关控件或搜索结果，清除背景（避免带图片背景）
  _onGlobalClick = (e) => {
    const t = e.target;
    if (!t || !t.closest) return;
    // 常见的 DocSearch / Algolia / VitePress 搜索相关选择器
    const isSearch = !!(
      t.closest('.DocSearch') ||
      t.closest('.DocSearch-Button') ||
      t.closest('.DocSearch-Modal') ||
      t.closest('.DocSearch-Item') ||
      t.closest('.algolia-autocomplete') ||
      t.closest('[role="search"]') ||
      t.closest('.VPSearch') ||
      t.closest('.search-box')
    );
    if (isSearch) clearHomeBackground();
  };
  document.addEventListener('click', _onGlobalClick, true);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval.value);
  if (_onGlobalClick) document.removeEventListener('click', _onGlobalClick, true);
});
</script>

<style scoped lang="scss">
@font-face {
  font-family: "UnidreamLED";
  font-display: swap;
  src: url("../font/UnidreamLED.ttf") format("truetype");
}

.home-page {
  width: 100%; 
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  .left,
    .right {
      width:  373px;
      border-radius: 10px;
      color: #fff;
      backdrop-filter: blur(10px);
      background-color: rgba(0, 0, 0, 0.1);
    }
  .right {
      padding: 20px;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      animation: fade 0.5s;

      
      .time {
        font-size: 1.1rem;
        text-align: center;
        .date {
          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
        }
        .text {
          margin-top: 15px;
          font-size: 3.25rem;
          letter-spacing: 2px;
          font-family: "UnidreamLED";
        }
      }
      .weather {
        margin-top: 10px;
        text-align: center;
        width: 100%;
        text-overflow: ellipsis;
        overflow-x: hidden;
        white-space: nowrap;
      }
    }
}
</style>
