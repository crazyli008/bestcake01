import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入核心文件夹core
import core from "./core";
// cnpm i vue-wechat-title@2.0.4 -S 动态路由的配置
import vueWechatTitle from "vue-wechat-title";
// cnpm i lib-flexible -S 配置淘宝响应式框架
import "lib-flexible/flexible.js";
//use 传入一个函数并执行,并传入Vue原型
Vue.use(vueWechatTitle);
Vue.use(core);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
