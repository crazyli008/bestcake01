<template>
  <div id="class">
    <!-- 自营和贝式严选 一级分类-->
    <div class="list-tabs">
      <span @click="selectTab(true)" :class="{ active: bool }">自营</span>
      <span @click="selectTab(false)" :class="{ active: !bool }">贝式严选</span>
    </div>
    <!-- 二级分类 -->
    <van-tabs v-model="active" @click="selectGoods" :line-width="'10%'">
      <van-tab
        :title="item.title"
        v-for="(item, index) in firstList"
        :key="index"
        ><!-- 分类信息 用layout布局-->
        <van-row class="info">
          <van-col
            span="12"
            v-for="(item, index) in goodList.list"
            :key="index"
          >
            <!-- 遍历图片时将跳转详情页的方法绑定在图片上，点击图片跳转详情页，并将该产品的信息传过去 -->
            <img :src="item.ImgUrl" @click="toPath(item)" />
            <p>{{ item.Name }}</p>
            <p>{{ item.Means | subStr(13) }}</p>
            <div class="left">
              <span>{{ "￥" + item.CurrentPrice }}</span>
              <span>{{ ("/" + item.LabelText) | subStr(11) }}</span>
            </div>
            <van-icon class="right" name="shopping-cart-o" />
          </van-col>
        </van-row>
      </van-tab>
    </van-tabs>
    <dl class="state">
      <dt>划线价格</dt>
      <dd>
        商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。
      </dd>
    </dl>
    <dl class="state">
      <dt>未划线价格</dt>
      <dd>
        商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。
      </dd>
    </dl>
    <!-- 垫层 -->
    <div class="fill"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cakelist: [
        //定义我需要的数据，通过我需要的数据，来进行相对应的遍历设置一个空数组，将或取回来的数据，实现第一个分类，放在对应的数组中
        { title: "女神", mark: "NS", list: [] },
        { title: "经典", mark: "KSK", list: [] },
        { title: "伴手礼", mark: "JZ", list: [] },
        { title: "乳品", mark: "RP", list: [] }
      ],
      bool: true,
      firstList: [],
      goodList: [],
      active: 0,
      firstListTitle: ""
    };
  },
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
  mounted() {
    // 在生命周期大印获取回来的数据，看接口是否成功，调axios的class方法
    this.$apis.getClassData().then(res => {
      // 根据获取回来的数据，来进行处理，因为要进行分类,有用的数据是res.data.Tag.cakelist,通过mark找到对应的数据，放在数组中
      this.cakelist.map(item => {
        res.data.Tag.cakelist.map(value => {
          if (value.SupplyNo.indexOf(item.mark) !== -1) {
            value.ImgUrl = this.setImgUrl(value);
            item.list.push(value);
          }
        });
      });
      this.selectTab(true); //为了让刷新页面默认选择自营，在生命周期中初始化一波
    });
  },
  methods: {
    selectTab(bool) {
      this.bool = bool;
      if (bool) {
        // 点击的时候传入布尔值，将对应的数据筛出来，自营是3个数据，贝式严选是一个数据
        this.firstList = this.cakelist.slice(0, 3); //slice用法是从哪开始截截几个，返回截出后的数组
        this.goodList = this.firstList[0]; //初始化默认显示女神的的数据
      } else {
        this.firstList = this.cakelist.slice(3);
        this.goodList = this.firstList[0];
      }
    },
    selectGoods(index) {
      // 点击的时候传入不同的下标，将对应的数据放在goodList
      this.goodList = this.firstList[index];
      console.log(this.goodList.list);
    },
    setImgUrl(item) {
      // 复用首页拼图片地址的逻辑
      var url = "https://res.bestcake.com/m-images/ww";
      if (item.SupplyNo.indexOf("KSK") !== -1) {
        return url + "/jd/" + item.Name + ".png";
      } else if (item.SupplyNo.indexOf("NS") !== -1) {
        return url + "/ns/" + item.Name + ".jpg";
      } else if (item.SupplyNo.indexOf("JZ") !== -1) {
        return url + "/jz/" + item.Name + ".png";
      } else if (item.SupplyNo.indexOf("RP") !== -1) {
        return url + "/rp/" + item.Name + ".jpg";
      }
    },
    toPath(item) {
      // 路由跳转用router，path，对应query
      this.$router.push({
        path: "/show",
        // 参数是货号和商品名称，因为点击详情的时候根据货号来判断用哪个接口，传入名称是为了辨别商品，和第一个接口需要Name
        query: { Name: item.Name, SupplyNo: item.SupplyNo }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#class {
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
  .list-tabs {
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #d9d9d9;
    box-sizing: border-box;
    span {
      text-align: center;
      display: inline-block;
      width: 50%;
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      box-sizing: border-box;
    }
    .active {
      // 点击选中的颜色
      color: #1db0b8;
      border-bottom: 2px solid #1db0b8;
    }
  }
  /deep/ .van-tabs__line {
    background-color: #1db0b8;
  }
  .info {
    width: 95.8%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 30px;
    img {
      width: 165px;
      height: 165px;
    }
    p {
      text-align: left;
    }
    p:nth-of-type(1) {
      font-size: 14px;
    }
    p:nth-of-type(2) {
      font-size: 12px;
      color: #999999;
      margin-top: 3px;
      margin-bottom: 3px;
    }
    .left {
      float: left;
      span:nth-child(1) {
        font-size: 14px;
        color: #ff3300;
      }
      span:nth-child(2) {
        font-size: 12px;
        color: #bcbcbc;
      }
    }
    .right {
      font-size: 20px;
      float: right;
      padding-right: 20px;
      color: #1db0b8;
    }
  }
  .state {
    width: 92%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 15px;
    margin-bottom: 15px;
    dt {
      font-size: 14px;
      color: #181818;
      width: 101px;
      float: left;
    }
    dd {
      font-size: 14px;
      color: #a2a2a2;
      width: 244px;
      float: right;
    }
  }
}
</style>
