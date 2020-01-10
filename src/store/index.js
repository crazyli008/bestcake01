import Vue from "vue";
import Vuex from "vuex";
// 为了将购物车的数据存在localStorage中，下载store模块
// cnpm i store -S
import Store from "store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    City: "上海",
    // vuex怕刷新，在初始化时，将localStorage中数据取回来
    cartList: Store.get("cartList") || [],
    // userInfo: Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : {}
    userInfo: {}
  },
  mutations: {
    // 加入购物车的方法
    add(state, data) {
      // 商品去重逻辑
      var bool = true;
      // 先遍历cartLlist，看看里面有没有对应的商品，如果找到id一致，说明有对应的商品，先看看，穿过来的数据中数量是否大与1，如果是，原有的数据中的num和传过来来的数据中的num相加，如果穿过来的数据中num是1，就直接将carlist中的num++
      // 这里是因为class页面中，和show页面中都用到添加购物车的方法，class页面中，默认点击一次，num是1，而show页面中，可以num添加到大于一的数量
      state.cartList.map(item => {
        if (item.id === data.id) {
          if (data.num > 1) {
            item.num = item.num + data.num;
          } else {
            item.num++;
          }
          bool = false;
        }
      });
      // 里面没有对应的商品，直接将数据，放在vuex中的cartlist中
      if (bool) {
        state.cartList.push(data);
      }
      console.log(this.state.cartList);
      // 将购物车数据放在localStorage中，同时key是cartList
      Store.set("cartList", state.cartList);
    },
    saveUserInfo(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {},
  modules: {}
});
