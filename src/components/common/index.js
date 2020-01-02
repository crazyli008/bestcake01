// 底部导航组件
import { Tabbar, TabbarItem } from "vant";
// 引入layout布局，栅格系统24为一行
import { Row, Col } from "vant";
// 引入字体图标
import { Icon } from "vant";
export default function(Vue) {
  // 底部导航条组件
  Vue.use(Tabbar).use(TabbarItem);
  Vue.use(Row).use(Col);
  Vue.use(Icon);
}
