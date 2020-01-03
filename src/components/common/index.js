// 底部导航组件
import { Tabbar, TabbarItem } from "vant";
// 引入layout布局，栅格系统24为一行
import { Row, Col } from "vant";
// 引入字体图标
import { Icon } from "vant";
// 引入轮播组件
import Swiper from "./swiper";
// 引入NoticeBar 通知栏
import { NoticeBar } from "vant";
export default function(Vue) {
  // 底部导航条组件
  Vue.use(Tabbar).use(TabbarItem);
  // layout布局
  Vue.use(Row).use(Col);
  // 字体图标
  Vue.use(Icon);
  // 将轮播组件注册全局
  Vue.component("Swiper", Swiper);
  // 将NoticeBar注册全局
  Vue.use(NoticeBar);
}
