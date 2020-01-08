<template>
  <div id="user">
    <!-- 头像区 -->
    <div class="img">
      <img
        src="https://res.bestcake.com/m-images/order/mw-person-tx.png"
        alt=""
      />
      <p>lala</p>
    </div>
    <!-- 信息区 -->
    <div class="info">
      <van-row class="msg">
        <van-col span="6">span: 8</van-col>
        <van-col span="6">span: 8</van-col>
        <van-col span="6">span: 8</van-col>
        <van-col span="6">span: 8</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
// 由于判断对象是否是空对象，{}==={}结果是false，所以用lodash来判断对象是否是空对象
// cnpm i --save lodash
import _ from "lodash";
export default {
  beforeMount() {
    console.log(this.$store.state.userInfo);
    if (_.isEmpty(this.$store.state.userInfo)) {
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
    img {
      width: 66px;
      height: 66px;
    }
    p {
      padding-top: 12px;
      padding-bottom: 12px;
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
    }
  }
}
</style>
