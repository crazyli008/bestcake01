import Apis from "./api";
// 引入common文件夹中的index，也就是将共有组件祖册全局
import Common from "@/components/common";
export default Vue => {
  // 将组件注册全局
  Common(Vue);
  Vue.prototype.$eventBus = new Vue();
  Vue.prototype.$apis = Apis;
};
