<template>
  <div id="user">
    <!-- 头像区 -->
    <div class="img">
      <van-icon name="setting-o" class="setting" />
      <img src="https://res.bestcake.com/m-images/order/mw-person-tx.png" alt />
      <p>lala</p>
    </div>
    <!-- 信息区 -->
    <div class="info">
      <van-row class="msg">
        <van-col span="6" v-for="(item, index) in msgList" :key="index"
          ><p>{{ item.title }}</p>
          <p>{{ item.value }}</p></van-col
        >
      </van-row>
    </div>
    <!--引入 Collapse 折叠面板 -->
    <van-collapse v-model="activeNames">
      <van-collapse-item title="我的订单" name="1" icon="point-gift-o"
        >内容</van-collapse-item
      >
      <van-collapse-item title="收货地址" name="2" icon="location-o"
        >内容</van-collapse-item
      >
    </van-collapse>
  </div>
</template>

<script>
// 由于判断对象是否是空对象，{}==={}结果是false，所以用lodash来判断对象是否是空对象
// cnpm i --save lodash
// import _ from "lodash";
// 存入用户数据登录数据，一般用cookie存储，在打包app中hbuilder中不能使用cookie，这里使用localStorage
// import Cookie from "js-cookie";
// cnpm i js-cookie -S
import Store from "store";
export default {
  data() {
    return {
      activeNames: ["0"],
      msgList: [
        { title: "余额", value: "0.00" },
        { title: "吉致币", value: "0" },
        { title: "优惠券", value: "0" },
        { title: "兑换券", value: "0" }
      ]
    };
  },
  beforeMount() {
    // console.log(this.$store.state.userInfo);
    // if (_.isEmpty(this.$store.state.userInfo)) {
    //   this.$eventBus.$emit("showLogin", true);
    // }
    if (Store.get("userInfo")) {
      var userInfo = Store.get("userInfo");
      // console.log(userInfo);
      this.$store.commit("saveUserInfo", userInfo);
    } else {
      this.$eventBus.$emit("showLogin", true);
    }
  }
};
</script>
<style scoped lang="scss">
#user {
  * {
    margin: 0;
    padding: 0;
  }
  img {
    vertical-align: middle;
  }
  height: 660px;
  background: #fafafa;
  .img {
    text-align: center;
    padding-top: 20px;
    height: 120px;
    background: #fff;
    position: relative;
    img {
      width: 66px;
      height: 66px;
    }
    p {
      padding-top: 12px;
      padding-bottom: 12px;
    }
    .setting {
      font-weight: bold;
      font-size: 20px;
      position: absolute;
      top: 15px;
      left: 15px;
    }
  }
  .info {
    height: 56px;
    margin-bottom: 20px;
    background: #fff;
    .msg {
      text-align: center;
      width: 91.4%;
      margin: 0 auto;
      p:nth-child(1) {
        color: #cccccc;
      }
      p:nth-child(2) {
        color: #333;
        font-size: 16px;
        margin-top: 6px;
      }
    }
  }
  /deep/ .van-icon-point-gift-o:before {
    font-weight: bold;
  }
  /deep/ .van-icon-location-o:before {
    font-weight: bold;
  }
}
</style>
