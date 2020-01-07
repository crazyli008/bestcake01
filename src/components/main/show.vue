<template>
  <div id="show">
    <!-- 为了能显示详情，新建一个详情模块，并将它添加到router中 -->
    <!-- 图片详情轮播图 -->
    <div class="banner">
      <Swiper id="banner" :config="bannerConfig">
        <!-- 运用插槽 -->
        <div class="swiper-slide" v-for="(item, index) in 4" :key="index">
          <img :src="ImgUrl + item + '.jpg'" />
        </div>
      </Swiper>
    </div>
    <!-- 商品名称 -->
    <div class="name">
      <p>{{ goodInfo.Name }}</p>
    </div>
    <!-- 商品信息 -->
    <div class="info">
      <!-- 甜度 -->
      <div class="sweet">
        <div>甜度</div>
        <div>
          <!-- 为了解决异步问题，图片需要加v-if，图片的地址根据商品信息中的甜度，来拼出不同的图片 甜度在goodInfo中 找，如果没有就在擦可Type找-->
          <img
            v-if="sizeList.length !== 0"
            :src="`${Sweet}${goodInfo.Sweet || goodInfo.CakeType[0].Sweet}.png`"
            alt
          />
        </div>
      </div>
      <!-- 口味 -->
      <div class="taste">
        <div>口味</div>
        <div>{{ goodInfo.CategoryName }}</div>
      </div>
      <!-- 原材料 -->
      <div class="resource">
        <div>原材料</div>
        <div>{{ goodInfo.Resource || goodInfo.Resourse }}</div>
      </div>
      <!-- 适合人群 -->
      <div class="people">
        <div>适合人群</div>
        <div>所有人群</div>
      </div>
      <!-- 保鲜条件 -->
      <div class="keepfresh">
        <div>保鲜条件</div>
        <div>
          {{
            goodInfo.KeepFresh ||
              "最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。"
          }}
        </div>
      </div>
    </div>
    <!-- 商品评价 -->
    <div class="topic">
      <van-icon class="topic-ico" name="comment-o" />
      <span>商品评价</span>
    </div>
    <!-- 商品尺寸 -->
    <div class="size">
      <div class="size-top">
        <div
          v-for="(item, index) in sizeList"
          :key="index"
          :style="'background:' + (active === index ? '#02d3d6' : '')"
          @click="select(index)"
        >
          {{ item.Size }}
        </div>
      </div>
      <!-- 字段有的有有的没有 -->
      <div class="size-bottom">
        <div class="size-bottom-1">
          <div>
            <img
              src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png"
              alt
            />
            <span>14.5cm*14cm</span>
          </div>
          <div>
            <img
              src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png"
              alt
            />
            <span>适合4-5人分享</span>
          </div>
        </div>
        <div class="size-bottom-2">
          <div>
            <img
              src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png"
              alt
            />
            <span>含五人份餐具</span>
          </div>
          <div>
            <img
              src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png"
              alt
            />
            <span>至少需提前一天预约</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 购买 -->
    <div class="buy">
      <div>购买数量</div>
      <div></div>
      <div>
        <button @click="add(false)">-</button>
        <input type="text" :placeholder="num" />
        <button @click="add(true)">+</button>
      </div>
    </div>
    <!-- 提示信息 -->
    <div class="state1">
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
    </div>
    <!-- 购买按钮 -->
    <div class="buy1">
      <div>
        {{ (currentdata.CurrentPrice || 0) * num + ".00" }}
      </div>
      <!-- 加入购物车添加点击事件 -->
      <div @click="addCart">加入购物车</div>
      <div>立即购买</div>
    </div>
    <!-- 垫层 -->
    <div class="fill"></div>
  </div>
</template>

<script>
// 引入提示框，用于加入购物车，让客户点击确认还是取消
import { Dialog } from "vant";
export default {
  data() {
    return {
      ImgUrl: "",
      bannerConfig: {
        // 轮播图配置
        pagination: ".swiper-pagination",
        style: {
          width: "100%",
          height: "100%"
        }
      },
      sizeList: [],
      goodInfo: {},
      Sweet: "https://res.bestcake.com/m-images/ww/jz/tiandu_",
      num: 1,
      active: 0,
      currentdata: {}
    };
  },
  mounted() {
    // 为了让数据初始化页面，在该生命周期执行一波
    this.pageInit();
  },
  methods: {
    pageInit() {
      // 声明变量，用来获取参数，获取路由用route 将传过来的参数用query获取
      var query = this.$route.query;
      // 声明前缀，用来拼图片的地址
      var url = "https://res.bestcake.com/m-images";
      var ImgUrl = "";
      // 声明一个空对象，来接受接口回来的promise对象
      var apiCallBack = null;
      // 根据货号来拼图片地址，根据不同的货号调不同的接口，女神和乳品是一个接口，给对应的参数，经典和伴手礼是一个接口
      if (query.SupplyNo.indexOf("KSK") !== -1) {
        ImgUrl = `${url}/jd-detail/${query.Name}/${query.Name}-`;
        apiCallBack = this.$apis.getShowDataTwo({
          City: this.$store.state.City,
          ProName: query.Name,
          c: "Product",
          m: "GetCakeByName"
        });
      } else if (query.SupplyNo.indexOf("NS") !== -1) {
        ImgUrl = `${url}/ns-detail/${query.Name}/${query.Name}-`;
        apiCallBack = this.$apis.getShowDataOne({
          Name: query.Name,
          m: "GetNSCakeByName"
        });
      } else if (query.SupplyNo.indexOf("JZ") !== -1) {
        ImgUrl = `${url}/jz-detail/${query.Name}/${query.Name}-`;
        apiCallBack = this.$apis.getShowDataTwo({
          City: this.$store.state.City, // 在vuex中去取城市
          ProName: query.Name, //route
          c: "IndexCenter", //参照接口
          m: "GetjzCakeInfo" //参照接口
        });
      } else if (query.SupplyNo.indexOf("RP") !== -1) {
        ImgUrl = `${url}/rp-detail/${query.Name}/${query.Name}-`;
        apiCallBack = this.$apis.getShowDataOne({
          Name: query.Name,
          m: "GetRuPCakeByName"
        });
      }
      this.ImgUrl = ImgUrl;
      // 将返回来的promise做处理，针对返回的数据，有的是对象，有的是数组，根据这个length来判断是数组还是对象
      apiCallBack.then(res => {
        var result = res.data.Tag;
        if (result.length !== undefined) {
          // arr -> 女神 乳品 伴手礼
          // 是数组了，开始遍历
          var sizeList = [];
          result.map(item => {
            if (this.$store.state.City === item.City) {
              sizeList.push(item);
            }
          });
          if (sizeList.length === 0) {
            // sizeList = result[0].CakeType;
            sizeList = result[0].CakeType || [result[0]];
          }
          this.sizeList = sizeList; //蛋糕size
          this.goodInfo = result[0]; //蛋糕信息
        } else {
          //obj ->经典
          // console.log(result);
          this.sizeList = result.infos.CakeType; //蛋糕size
          this.goodInfo = result.infos; //蛋糕信息
        }
        // 测试尺寸列表是否赋值成功
        // console.log(this.sizeList);
        // 测试商品信息是否赋值成功
        // console.log(this.goodInfo);
        // 初始化的时候默认选中第一个，并将数据赋值上
        this.select(0);
      });
    },
    add(bool) {
      // 让数量加减逻辑
      // + -可以复用的方法，传过来布尔值，如果是true的话，数量+1，如果是false的话数量减1
      if (bool) {
        this.num += 1;
      } else {
        this.num--;
        // 减到一不再减下去
        this.num = this.num <= 1 ? 1 : this.num;
      }
    },
    select(index) {
      // 选中逻辑
      // 将点击的下标传给active，让其显示，点击时的状态
      this.active = index;
      // 将尺寸数组，用当前选中的下标来选择，赋值给当前的数据，因为不同的尺寸价钱不一样
      this.currentdata = this.sizeList[this.active];
    },
    addCart() {
      // 加入购物车逻辑
      // 测试选中后，当前的数据，是否发生变化
      // console.log(this.currentdata);
      var temp = {
        // id需要做一个兼容，因为，女神和乳品的id是currentdata.ID，经典和伴手礼是currentdata.Id
        id: this.currentdata.ID || this.currentdata.Id,
        // 传第一张图片
        ImgUrl: this.ImgUrl + "1.jpg",
        // 传对应的尺寸
        Size: this.currentdata.Size,
        // 对应的价格
        CurrentPrice: this.currentdata.CurrentPrice,
        // 对应的数量
        num: this.num,
        // 对应的名字
        Name: this.goodInfo.Name,
        // 数据中加上bool值，为了在购物车中做全选和不全选的操作，默认都是被选中状态
        bool: true
      };
      Dialog.confirm({
        title: "提示",
        message: "是否加入购物车"
      })
        // 确认执行的逻辑
        .then(() => {
          // 如果客户点击确认了，就执行vuex里面的加入购物车的方法，同时将参数带过去，方便在购物车里取到
          this.$store.commit("add", temp);
          this.$router.push("/cart");
        })
        // 取消执行的逻辑
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss" scoped>
#show {
  // 去除默认样式
  * {
    margin: 0;
    padding: 0;
  }
  img {
    vertical-align: middle;
  }
  // 垫层
  .fill {
    height: 58px;
  }
  // 控制轮播图组件的小圆点位置，背景颜色和形状
  /deep/ .swiper-pagination {
    text-align: right;
  }
  /deep/ .swiper-pagination-bullet-active {
    background: #f2495e;
  }
  /deep/ .swiper-pagination-bullet {
    border-radius: 0;
  }
  .banner {
    width: 100%;
    height: 66.7%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    height: 100px;
    p {
      text-align: center;
      font-size: 16px;
      height: 16px;
      line-height: 16px;
      margin-top: 7.5px;
      margin-bottom: 15px;
      font-weight: bold;
    }
  }
  .info {
    // height: 326px;
    border: 15px solid #f7f7f7;
    border-left: none;
    border-right: none;
    .sweet {
      height: 22px;
      margin-top: 35px;
      margin-bottom: 11px;
      overflow: hidden;
      div {
        float: left;
        img {
          width: 84px;
        }
      }
      div:nth-child(1) {
        margin-left: 15px;
        margin-right: 15px;
        width: 60px;
        font-size: 14px;
        color: #9a9a9a;
      }
    }
    .taste {
      height: 22px;
      margin-bottom: 15px;
      overflow: hidden;
      div {
        float: left;
      }
      div:nth-child(1) {
        margin-left: 15px;
        margin-right: 15px;
        width: 60px;
        font-size: 14px;
        color: #9a9a9a;
      }
      div:nth-child(2) {
        color: #252525;
        font-size: 14px;
      }
    }
    .resource {
      margin-bottom: 15px;
      overflow: hidden;
      div {
        float: left;
      }
      div:nth-child(1) {
        margin-left: 15px;
        margin-right: 15px;
        width: 60px;
        font-size: 14px;
        color: #9a9a9a;
      }
      div:nth-child(2) {
        width: 270px;
        color: #252525;
        font-size: 14px;
        margin-right: 15px;
        line-height: 1.6;
      }
    }
    .people {
      height: 22px;
      margin-bottom: 15px;
      overflow: hidden;
      div {
        float: left;
      }
      div:nth-child(1) {
        margin-left: 15px;
        margin-right: 15px;
        width: 60px;
        font-size: 14px;
        color: #9a9a9a;
      }
      div:nth-child(2) {
        color: #252525;
        font-size: 14px;
      }
    }
    .keepfresh {
      margin-bottom: 34px;
      overflow: hidden;
      div {
        float: left;
      }
      div:nth-child(1) {
        margin-left: 15px;
        margin-right: 15px;
        width: 60px;
        font-size: 14px;
        color: #9a9a9a;
      }
      div:nth-child(2) {
        width: 270px;
        color: #252525;
        font-size: 14px;
        margin-right: 15px;
        line-height: 1.6;
      }
    }
  }
  .topic {
    height: 22px;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 14px;
    padding-left: 15px;
    .topic-ico {
      font-size: 20px;
      margin-right: 15px;
    }
    span {
      position: relative;
      top: -5px;
    }
  }
  .size {
    border: 15px solid #f7f7f7;
    border-left: none;
    border-right: none;
    .size-top {
      padding-top: 30px;
      overflow: hidden;
      div {
        float: left;
        font-size: 14px;
        margin-left: 15px;
        margin-bottom: 10px;
        padding-left: 13.5px;
        padding-right: 13.5px;
        border: 1px solid #ddd;
        height: 28px;
        line-height: 28px;
        color: #333;
      }
    }
    .size-bottom {
      margin-top: 42.5px;
      .size-bottom-1 {
        overflow: hidden;
        margin-bottom: 15px;
        div {
          float: left;
          width: 50%;
          height: 24.5px;
          line-height: 24.5px;
          img {
            width: 22.5px;
            height: 22.5px;
            margin-left: 15px;
            margin-right: 10px;
          }
          span {
            font-size: 14px;
            color: #333;
          }
        }
      }
      .size-bottom-2 {
        overflow: hidden;
        margin-bottom: 30px;
        div {
          float: left;
          width: 50%;
          height: 24.5px;
          line-height: 24.5px;
          img {
            width: 22.5px;
            height: 22.5px;
            margin-left: 15px;
            margin-right: 10px;
          }
          span {
            color: #333;
            font-size: 14px;
          }
        }
      }
    }
  }
  .buy {
    height: 22.4px;
    line-height: 22.4px;
    margin-top: 15px;
    margin-bottom: 15px;
    overflow: hidden;
    font-size: 14px;
    div:nth-child(1) {
      width: 172.6px;
      float: left;
      padding-left: 15px;
    }
    div:nth-child(2) {
      height: 22.4px;
      width: 86.3px;
      float: left;
    }
    div:nth-child(3) {
      float: left;
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
  .state1 {
    padding-top: 30px;
    padding-bottom: 30px;
    background: #f7f7f7;
    .state {
      width: 92%;
      margin: 0 auto;
      overflow: hidden;
      margin-top: 15px;
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
  .buy1 {
    background: #fff;
    width: 100%;
    height: 58px;
    line-height: 58px;
    position: fixed;
    bottom: 0;
    overflow: hidden;
    div:nth-child(1) {
      float: left;
      width: 135px;
      height: 100%;
      padding-left: 15px;
      font-size: 17px;
      color: #f2495e;
      font-weight: bold;
    }
    div:nth-child(2) {
      float: left;
      width: 110px;
      height: 100%;
      text-align: center;
      font-size: 18px;
    }
    div:nth-child(3) {
      font-size: 18px;
      color: #fff;
      background: #02d4d7;
      text-align: center;
      float: left;
      width: 115px;
      height: 100%;
    }
  }
}
</style>
