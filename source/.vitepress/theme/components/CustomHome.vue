<template>
  <div>
    <h1>我就是FreeStyle组件 Yoo</h1>
    <button class="btn" @click="add">点击加{{ num }}数字</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const num = ref(0)

const add = () => {
  num.value++
}

</script>

<style lang="scss" scoped>
::v-deep(.VPContent.is-home) {
  width: 100%;
  max-width: 100%;
  background: url("https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/5.jpg") no-repeat !important;
}
</style>