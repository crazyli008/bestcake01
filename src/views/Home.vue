<template>
  <div>
    <div class="footer">
      <van-tabbar
        v-model="active"
        @change="setToPath"
        active-color="#1fb1b8"
        :z-index="999"
      >
        <van-tabbar-item
          :icon="item.ico"
          v-for="(item, index) in list"
          :key="index"
          >{{ item.title }}</van-tabbar-item
        >
      </van-tabbar>
    </div>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      list: [
        { title: "首页", path: "/index", ico: "wap-home" },
        { title: "分类", path: "/class", ico: "qr" },
        { title: "购物车", path: "/cart", ico: "shopping-cart" },
        { title: "我的", path: "/my", ico: "manager" }
      ]
    };
  },
  beforeMount() {
    this.active = this.list.findIndex(item => {
      return item.path === this.$route.path; // 返回达成条件的索引
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
