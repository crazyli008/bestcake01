<template>
  <div>
    <div class="footer">
      <!-- 添加动画  进入动画类名和退出动画的类名固定写法，对应的值在https://daneden.github.io/animate.css/找-->
      <transition
        enter-active-class="fadeInRight"
        leave-active-class="bounceOutRight"
      >
        <!-- class animated 固定写法，因为你引入了animate -->
        <login v-show="bool" class="animated" />
      </transition>
      <!-- 获取路径$route.path -->
      <van-tabbar
        v-model="active"
        @change="setToPath"
        active-color="#1fb1b8"
        :z-index="999"
        v-show="$route.path !== '/show'"
      >
        <van-tabbar-item
          :icon="item.ico"
          v-for="(item, index) in list"
          :info="index === 2 ? $store.state.cartList.length || '' : ''"
          :key="index"
          >{{ item.title }}</van-tabbar-item
        >
      </van-tabbar>
    </div>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>
<script>
// 引入login页面
import login from "@/components/main/login";
// 引入动画
// cnpm i animate.css -S
import "animate.css";
export default {
  components: {
    // 并局部注册
    login
  },
  data() {
    return {
      active: 0,
      list: [
        { title: "首页", path: "/index", ico: "wap-home" },
        { title: "分类", path: "/class", ico: "qr" },
        { title: "购物车", path: "/cart", ico: "shopping-cart" },
        { title: "我的", path: "/my", ico: "manager" }
      ],
      bool: false
    };
  },
  // computed: {
  //   currentPath: {
  //     currentPath() {
  //       this.active = this.list.findIndex(item => {
  //         return item.path === this.$route.path; // 返回达成条件的索引
  //       });
  //       return this.$route.path;
  //     }
  //   }
  // },
  beforeMount() {
    this.active = this.list.findIndex(item => {
      return item.path === this.$route.path; // 返回达成条件的索引
    });
    // 组件通信，触发时改变bool，让login组件显示
    this.$eventBus.$on("showLogin", bool => {
      this.bool = bool;
    });
  },
  methods: {
    setToPath(active) {
      this.active = active;
      this.$router.push(this.list[this.active].path);
    }
  }
};
</script>
