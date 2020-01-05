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
    <div class="info">
      <p>{{ goodInfo.Name }}</p>
    </div>
  </div>
</template>

<script>
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
      goodInfo: {}
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
        console.log(this.sizeList);
        console.log(this.goodInfo);
        // this.select(0);
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
  .info {
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
}
</style>
