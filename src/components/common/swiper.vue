<template>
  <!--  注册全局的轮播图组件 -->
  <div class="swiper-container" :id="id" :style="this.config.style || {}">
    <div class="swiper-wrapper">
      <!-- <div class="swiper-slide>Slide 1</div> -->
      <!-- 对应的插槽 -->
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
// cnpm i swiper@3.4.2 -S 下载swiper模块
import Swiper from "swiper"; //引入swiper模块
import "swiper/dist/css/swiper.min.css"; //引入swiper的css，参照swiperapi
export default {
  props: ["config", "id"], //组件通信，传入对应的参数，congfig，是为了不同轮播图的不同配置，id是为了每个轮播图的不同id，避免覆盖
  mounted() {
    new Swiper("#" + this.id, this.config || {});
  }
};
</script>
