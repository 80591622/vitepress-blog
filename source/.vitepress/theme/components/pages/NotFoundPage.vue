<script setup lang="ts">
import { useRouter, withBase } from "vitepress";

const router = useRouter();
const ns = "error-page";
</script>

<template>
  <div :class="ns">
    <div :class="`${ns}__inner`">
      <div :class="`${ns}__art`" aria-hidden="true">
        <img :src="withBase('/img/404-illustration.png')" alt="" />
      </div>
      <div :class="`${ns}__detail`">
        <h2 :class="`${ns}__code`">404</h2>
        <p :class="`${ns}__desc`">抱歉，您访问的页面不存在~ 🤷‍♂️🤷‍♀️</p>
        <button type="button" :class="`${ns}__btn`" @click="router.go('/')">返回首页</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$namespace: error-page;

.#{$namespace} {
  --err-bg: var(--vp-c-bg);
  --err-text-muted: var(--vp-c-text-2);
  --err-btn: #2e5cf6;
  --err-btn-hover: #4a6ef8;

  width: 100%;
  min-height: calc(100vh - var(--vp-nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--err-bg);
  padding: 32px 24px;
  box-sizing: border-box;
}

.dark .#{$namespace} {
  --err-bg: #121212;
  --err-text-muted: #999999;
}

.#{$namespace}__inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: clamp(32px, 6vw, 100px);
  max-width: 960px;
  width: 100%;
}

.#{$namespace}__art {
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 与 vp.teek.top 404 图一致：252×294 → 6:7 */
  img {
    display: block;
    width: min(252px, 42vw);
    max-width: 100%;
    aspect-ratio: 6 / 7;
    height: auto;
    object-fit: contain;
  }
}

.#{$namespace}__detail {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  min-width: 0;
}

.#{$namespace}__code {
  margin: 0;
  font-size: clamp(3rem, 10vw, 4.5rem);
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.#{$namespace}__desc {
  margin: 20px 0 28px;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.6;
  color: var(--err-text-muted);
  max-width: 28em;
}

.#{$namespace}__btn {
  appearance: none;
  color: #ffffff;
  background-color: var(--err-btn);
  border: none;
  border-radius: 6px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(46, 92, 246, 0.25);
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--err-btn-hover);
  }

  &:active {
    transform: translateY(1px);
  }
}

@media (max-width: 768px) {
  .#{$namespace}__inner {
    flex-direction: column;
    gap: 28px;
    text-align: center;
  }

  .#{$namespace}__art img {
    width: min(252px, 72vw);
  }

  .#{$namespace}__detail {
    align-items: center;
    text-align: center;
  }

  .#{$namespace}__desc {
    margin: 16px 0 24px;
    font-size: 1rem;
  }

  .#{$namespace}__btn {
    width: 100%;
    max-width: 280px;
  }
}
</style>
