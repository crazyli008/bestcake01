<template>
  <div id="login">
    <div class="page1" v-show="bool">
      <!-- 返回 -->
      <div class="back">
        <van-icon class="back-ico" name="arrow-left" @click="goback" />
      </div>
      <!-- 主页面 -->
      <div class="main">
        <!-- 快速登录 -->
        <div class="login">快速登录</div>
        <!-- 手机 -->
        <div class="phone">手机号</div>
        <!-- 输入手机号 -->
        <div class="phonenum">
          <div>+86</div>
          <input type="text" />
          <div>发送验证码</div>
        </div>
        <!--温馨提示  -->
        <div class="msg">
          温馨提示：未注册的手机号，登录时将自动注册，且代表您已同意
          <a href>《贝思客用户协议》</a>
        </div>
        <!-- 使用密码登录 -->
        <div class="switch">
          <button @click="shift">使用密码登录</button>
        </div>
      </div>
    </div>
    <div class="page2" v-show="!bool">
      <!-- 返回 -->
      <div class="back">
        <van-icon class="back-ico" name="arrow-left" @click="goback" />
      </div>
      <div class="main">
        <!-- 快速登录 -->
        <div class="login">密码登录</div>
        <!-- 手机 -->
        <div class="phone">手机号</div>
        <!-- 输入手机号 -->
        <div class="phonenum">
          <div>+86</div>
          <input type="text" />
        </div>
        <!-- 输入密码 -->
        <div class="pwd">
          <div class="top">
            <div class="left">密码</div>
            <div class="right">隐藏</div>
          </div>
          <p>
            <input type="password" />
          </p>
        </div>
        <!-- 底部 -->
        <div class="bottom">
          <div @click="shift">切换快速登录</div>
          <div @click="login">
            <van-icon class="bottom-ico" name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 存入用户数据登录数据，一般用cookie存储，在打包app中hbuilder中不能使用cookie，这里使用localStorage
// import Cookie from "js-cookie";
import Store from "store";
export default {
  data() {
    return {
      bool: true
    };
  },
  methods: {
    shift() {
      this.bool = !this.bool;
    },
    goback() {
      // 返回上一次的路由
      this.$router.go(-1);
      // 并将遮罩隐藏
      this.$eventBus.$emit("showLogin", false);
    },
    login() {
      // 这里应该接收客户输入的信息后端增加新用户信息，或者查找信息，返回的数据，这里先写死
      var userInfo = {
        name: "crazyli008",
        iphone: "13027009926",
        ImgUrl: "https://res.bestcake.com/m-images/order/mw-person-tx.png",
        uname: "疯子里",
        upwd: "123456"
      };
      // 得到的数据存在localStorage中，或者cookie中
      Store.set("userInfo", userInfo);
      // Cookie.set("userInfo", userInfo, { expires: 7 });
      // 同时在vuex中存储
      this.$store.commit("saveUserInfo", userInfo);
      // 有了数据再让遮罩撤去
      this.$eventBus.$emit("showLogin", false);
      this.$router.push({
        path: "/my"
      });
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgb(54, 209, 220);
  z-index: 9999;
  //快速登录
  .page1 {
    .back {
      height: 42px;
      .back-ico {
        font-weight: bold;
        color: #ffffff;
        font-size: 20px;
        margin-left: 15px;
        margin-top: 15px;
      }
    }
    .main {
      width: 89.3%;
      margin: 0 auto;
      .login {
        font-size: 32px;
        color: #ffffff;
      }
      .phone {
        font-size: 14px;
        padding-top: 8px;
        padding-bottom: 8px;
        color: #ffffff;
      }
      .phonenum {
        border-bottom: 1px solid #dddddd;
        height: 40px;
        position: relative;
        div:nth-of-type(1) {
          top: 5px;
          position: absolute;
          left: 0;
          height: 26px;
          width: 40px;
          line-height: 26px;
          font-size: 14px;
          background: #ffffff;
          color: #157f83;
          text-align: center;
        }
        input {
          color: #ffffff;
          margin-top: 5px;
          font-size: 14px;
          margin-left: 50px;
          height: 24px;
          border: none;
          background: none;
        }
        div:nth-of-type(2) {
          font-size: 14px;
          color: #89dfe3;
          top: 0;
          height: 40px;
          line-height: 40px;
          position: absolute;
          right: 0;
        }
      }
      .msg {
        padding-top: 8px;
        color: #ffffff;
        padding-bottom: 8px;
        a {
          color: #0e90d2;
        }
      }
      .switch {
        padding-top: 8px;
        text-align: center;
        button {
          width: 122px;
          height: 30px;
          background: none;
          outline: none;
          border: 1px solid #ffffff;
          font-size: 14px;
          border-radius: 15px;
          color: #ffffff;
        }
      }
    }
  }
  // 密码登录
  .page2 {
    .back {
      height: 42px;
      .back-ico {
        font-weight: bold;
        color: #ffffff;
        font-size: 20px;
        margin-left: 15px;
        margin-top: 15px;
      }
    }
    .main {
      width: 89.3%;
      margin: 0 auto;
    }
    .login {
      font-size: 32px;
      color: #ffffff;
    }
    .phone {
      font-size: 14px;
      padding-top: 8px;
      padding-bottom: 8px;
      color: #ffffff;
    }
    .phonenum {
      border-bottom: 1px solid #dddddd;
      height: 40px;
      position: relative;
      div {
        top: 5px;
        position: absolute;
        left: 0;
        height: 26px;
        width: 40px;
        line-height: 26px;
        font-size: 14px;
        background: #ffffff;
        color: #157f83;
        text-align: center;
      }
      input {
        color: #ffffff;
        margin-top: 5px;
        font-size: 14px;
        margin-left: 50px;
        height: 24px;
        border: none;
        background: none;
      }
    }
    .pwd {
      height: 62px;
      border-bottom: 1px solid #dddddd;
      .top {
        height: 20px;
        margin-top: 20px;
        overflow: hidden;
        font-size: 14px;
        .left {
          color: #ffffff;
          float: left;
        }
        .right {
          color: #ffffff;
          float: right;
        }
      }
      p {
        padding: 0;
        margin: 0;
        input {
          color: #ffffff;
          margin-top: 5px;
          font-size: 14px;
          height: 24px;
          border: none;
          background: none;
        }
      }
    }
    .bottom {
      margin-top: 20px;
      height: 46px;
      overflow: hidden;
      line-height: 46px;
      div:nth-child(1) {
        width: 122px;
        height: 30px;
        float: left;
        border: 1px solid #fff;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
        border-radius: 15px;
        margin-top: 7px;
      }
      div:nth-child(2) {
        width: 44px;
        height: 44px;
        float: right;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        position: relative;
        .bottom-ico {
          top: 50%;
          left: 50%;
          color: #22aeb3;
          margin-top: -10px;
          margin-left: -10px;
          position: absolute;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
