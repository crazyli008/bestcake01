import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "index",
        component: () => import("@/components/main/index.vue"),
        meta: {
          // 路由标记
          title: "贝思客烘培"
        }
      },
      {
        path: "class",
        component: () => import("@/components/main/class.vue"),
        meta: {
          title: "分类"
        }
      },
      {
        path: "cart",
        component: () => import("@/components/main/cart.vue"),
        meta: {
          title: "购物车"
        }
      },
      {
        path: "my",
        component: () => import("@/components/main/my.vue"),
        meta: {
          title: "我的"
        }
      }
    ],
    redirect: "/index"
  }
];

const router = new VueRouter({
  routes
});

export default router;
