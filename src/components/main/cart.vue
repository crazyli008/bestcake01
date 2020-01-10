<template>
  <div id="cart">
    <!-- 购物车为空时显示 -->
    <div class="empty" v-show="cartList.length === 0">购物车是空的哦~</div>
    <!-- 购物车里有数据显示 -->
    <div class="cartlist1">
      <div
        class="cartlist"
        v-show="cartList.length !== 0"
        v-for="(item, index) in cartList"
        :key="index"
      >
        <div class="cartlist-top">
          <div class="left">
            <img
              v-show="item.bool"
              src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
              alt
              @click="select(item)"
            />
            <img
              v-show="!item.bool"
              src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"
              alt
              @click="select(item)"
            />
          </div>
          <div class="right">
            <div class="right-1">
              <img :src="item.ImgUrl" @click="toPath(item)" alt />
            </div>
            <div class="right-2">
              <!-- 使用过滤器解决名字太长造成的布局混乱 -->
              <p>{{ item.Name | subStr(10) }}</p>
              <div class="right-2-1">
                <span>{{ item.Size | subStr(10) }}</span>
                <div>
                  <button @click="minus(item, index)">-</button>
                  <input type="text" :placeholder="item.num" />
                  <button @click="add(item)">+</button>
                </div>
              </div>
              <p>{{ item.CurrentPrice * item.num + ".00" }}</p>
            </div>
          </div>
        </div>
        <div class="cartlist-bottom">
          <span>优惠方式</span>
          <span>不参与活动</span>
        </div>
      </div>
    </div>
    <!-- 热门商品 -->
    <div class="fill-1">
      <div>Hot Recommend</div>
      <div></div>
      <div>热销新品推荐</div>
    </div>
    <!-- 垫层 -->
    <div class="fill"></div>
    <!-- 结算 -->
    <div class="count">
      <div class="all">
        <img
          src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
          alt
          v-show="bool"
          @click="selectAll"
        />
        <img
          src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"
          alt
          v-show="!bool"
          @click="selectAll"
        />
        <span>全选</span>
        <span @click="clear">清空</span>
      </div>
      <div class="countall">
        <span>合计:</span>
        <span>{{ allPrice + ".00" }}</span>
      </div>
      <div class="gocount" @click="tocount">结算</div>
    </div>
  </div>
</template>

<script>
import Store from "store";
// 引入Toast轻提示，跳转到详情页中加载数据用
import { Toast } from "vant";
export default {
  data() {
    return {
      cartList: [],
      allPrice: 0,
      bool: false
    };
  },
  beforeMount() {
    // 数据渲染的生命周期，从vuex中取数据
    this.cartList = this.$store.state.cartList;
    // console.log(this.cartList);
  },
  // mounted() {
  //   console.log(this.cartList);
  // },
  filters: {
    //这里写过滤器
    // 这里写函数
    // 第一个参数是管道符前面的值，
    // 第二个参数是传入的参数
    subStr(val, length) {
      var str = ""; //用来接收处理后的结果
      if (val.length > length) {
        //如果字符串的长度大于传入的参数，就执行
        str = val.slice(0, length) + "..."; //这里将字符串从头开始截截对应的长度
      } else {
        str = val; //否则就返回原值
      }
      return str; //将处理后的字符串返回
    }
  },
  methods: {
    // 加入跳转到show页面的方法
    toPath(item) {
      Toast.loading({
        message: "加载中...",
        duration: 1500,
        forbidClick: true
      });
      // 路由跳转用router，path，对应query，同时携带参数
      this.$router.push({
        path: "/show",
        // 参数是货号和商品名称，因为点击详情的时候根据货号来判断用哪个接口，传入名称是为了辨别商品，和第一个接口需要Name
        query: { Name: item.Name, SupplyNo: item.SupplyNo }
      });
    },
    clear() {
      // 清空购物车
      this.cartList.splice(0);
      // 同时更新localStorage
      Store.set("cartList", this.$store.state.cartList);
    },
    add(item) {
      // 加的点击事件
      item.num++;
      // 此时vuex数据是更新的但localStorage的数据没有更新，这时，将localStorage数据用vuex更新
      Store.set("cartList", this.$store.state.cartList);
    },
    minus(item, index) {
      // 减的点击事件
      item.num--;
      if (item.num == 0) {
        // 如果num等于0，在carlist中删除一条数据
        this.cartList.splice(index, 1);
        // 同时还得删除购物车中的数据
        Store.set("cartList", this.$store.state.cartList);
      }
    },
    select(item) {
      item.bool = !item.bool;
      // 只要改变购物车的数据，就在localStorage更新一波
      Store.set("cartList", this.$store.state.cartList);
    },
    selectAll() {
      // 点击的时候让bool值切换
      this.bool = !this.bool;
      this.cartList.map(item => {
        // 遍历购物车列表，如果全选被选中，那么，让每条数据的bool值为true，否则全为false
        if (this.bool === true) {
          item.bool = true;
        } else {
          item.bool = false;
        }
      });
      // 只要改变购物车的数据，就在localStorage更新一波
      Store.set("cartList", this.$store.state.cartList);
    },
    // 结算如何判断localStorage中登录状态
    tocount() {
      // 去结算，判断用户登录状态，如果没有登录，遮罩显示先登录，登录后在撤销遮罩
      // if (Store.get("userInfo")) {
      // this.$eventBus.$emit("showLogin", false);
      // } else {
      this.$eventBus.$emit("showLogin", true);
      // }
    }
  },
  watch: {
    cartList: {
      handler() {
        // 声明一个总价变量
        var allPrice = 0;
        // 声明一个空数组
        var arr = [];
        // 遍历购物车
        this.cartList.map(item => {
          // 每一条数据中都有bool值，如果是true时，计算总价
          if (item.bool) {
            allPrice += item.num * item.CurrentPrice;
            // 同时放在总计的数组中
            arr.push(item);
          }
        });
        if (arr.length === this.cartList.length) {
          // 如果总计的数组长度和购物车的数组长度相等，那么旧是全选
          this.bool = true;
        } else {
          this.bool = false;
        }
        if (this.cartList.length === 0) {
          this.bool = false;
        }
        this.allPrice = allPrice;
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
#cart {
  height: 100%;
  background: #f7f7f7;
  // 去除默认样式
  * {
    margin: 0;
    padding: 0;
  }
  img {
    vertical-align: middle;
  }
  .fill-1 {
    width: 100%;
    height: 500px;
    text-align: center;
    div:nth-child(1) {
      font-size: 25px;
      color: #333;
      font-weight: bold;
    }
    div:nth-child(2) {
      width: 200px;
      height: 3px;
      margin: 8px auto;
      background: #333;
    }
    div:nth-child(3) {
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
  }
  .fill {
    height: 50px;
  }
  .empty {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #141414;
    font-size: 12px;
    background: #fff;
  }
  .cartlist1 {
    padding-bottom: 50px;
    .cartlist {
      background: #fff;
      width: 100%;
      height: 186.5px;
      margin-bottom: 15px;
      .cartlist-top {
        height: 137px;
        width: 100%;
        overflow: hidden;
        .left {
          width: 12.27%;
          float: left;
          height: 137px;
          img {
            margin-top: 64px;
            margin-right: 11px;
            margin-left: 15px;
            width: 20px;
            height: 20px;
          }
        }
        .right {
          width: 87.73%;
          float: left;
          height: 122px;
          padding-bottom: 15px;
          border-bottom: 1px solid #333;
          box-sizing: border-box;
          overflow: hidden;
          .right-1 {
            float: left;
            padding-top: 15px;
            margin-right: 15px;
            img {
              width: 105px;
              height: 114px;
            }
          }
          .right-2 {
            float: left;
            p:nth-of-type(1) {
              padding-top: 19px;
              font-size: 16px;
              color: #333;
            }
            .right-2-1 {
              padding-top: 4.5px;
              padding-bottom: 4.5px;
              height: 25.6px;
              line-height: 25.6px;
              overflow: hidden;
              width: 195px;
              span {
                font-size: 11px;
                color: #cccccc;
                float: left;
              }
              div {
                float: right;
                input {
                  width: 28px;
                  outline: none;
                  text-align: center;
                  border: none;
                }
                button {
                  outline: none;
                  border: none;
                  background: none;
                  font-size: 20px;
                }
              }
            }
            p:nth-of-type(2) {
              font-weight: bold;
            }
          }
        }
      }
      .cartlist-bottom {
        height: 49.5px;
        padding-left: 12.27%;
        font-size: 14px;
        line-height: 49.5px;
        span:nth-child(1) {
          font-weight: bold;
          color: #f2495e;
          margin-right: 5px;
        }
        span:nth-child(2) {
          color: #333;
        }
      }
    }
  }
  .fill {
    width: 100%;
    height: 110px;
  }

  .count {
    width: 100%;
    height: 56px;
    position: fixed;
    bottom: 50px;
    overflow: hidden;
    background: #fff;
    .all {
      width: 33%;
      float: left;
      height: 56px;
      line-height: 56px;
      img {
        width: 20px;
        height: 20px;
        margin-left: 11px;
        margin-right: 5px;
      }
      span:nth-of-type(1) {
        font-size: 15px;
        color: #333;
        margin-right: 15px;
      }
      span:nth-of-type(2) {
        font-size: 13px;
        color: #333;
      }
    }
    .countall {
      width: 41%;
      float: left;
      height: 56px;
      line-height: 56px;
      text-align: right;
      span:nth-of-type(1) {
        font-size: 15px;
        color: #333;
        margin-right: 15px;
      }
      span:nth-of-type(2) {
        font-size: 15px;
        color: #f2495e;
        margin-right: 15px;
        font-weight: bold;
      }
    }
    .gocount {
      width: 25%;
      float: left;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background: #02d4d7;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
