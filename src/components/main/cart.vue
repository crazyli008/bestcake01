<template>
  <div id="cart">
    <!-- 购物车为空时显示 -->
    <div class="empty" v-show="cartList.length === 0">购物车是空的哦~</div>
    <!-- 购物车里有数据显示 -->
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
            <img :src="item.ImgUrl" alt />
          </div>
          <div class="right-2">
            <p>{{ item.Name }}</p>
            <div class="right-2-1">
              <span>{{ item.Size }}</span>
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
        <span>清空</span>
      </div>
      <div class="countall">
        <span>合计:</span>
        <span>{{ allPrice + ".00" }}</span>
      </div>
      <div class="gocount">结算</div>
    </div>
  </div>
</template>

<script>
import Store from "store";
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
    console.log(this.cartList);
  },
  methods: {
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
  height: 667px;
  background: #f7f7f7;
  // 去除默认样式
  * {
    margin: 0;
    padding: 0;
  }
  img {
    vertical-align: middle;
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
