<template>
  <div id="index">
    <!-- 位置 -->
    <div class="position">
      <van-icon name="location-o" />
      <span>上海</span>
      <van-icon name="arrow" />
    </div>
    <!-- 顶部轮播图 需要处理接口异步用v-if -->
    <div class="banner" v-if="SwiperBannerList.length !== 0">
      <!-- 配置全局轮播插件 -->
      <Swiper id="banner" :config="bannerConfig">
        <!-- 运用插槽 -->
        <div
          class="swiper-slide"
          v-for="(item, index) in SwiperBannerList"
          :key="index"
        >
          <img :src="item.ImgUrl" />
        </div>
      </Swiper>
    </div>
    <!-- 小标题 -->
    <div class="title">
      <img src="https://res.bestcake.com/images/newIndex/title.png?v=1" alt />
    </div>
    <!-- 活动 -->
    <div class="activity">
      <img :src="activityUrl" alt />
    </div>
    <div class="iconlist">
      <van-row>
        <van-col span="6" v-for="(item, index) in TopIconList" :key="index">
          <img :src="item.ImgUrl" alt />
          <p>{{ item.ActName }}</p>
        </van-col>
      </van-row>
    </div>
    <!-- 通知栏 -->
    <div class="notice">
      <div class="notice1">
        <span>通知</span>
      </div>
      <van-notice-bar class="noticelist" :text="NoticeList" />
    </div>
    <!--  -->
    <div class="centercontent">
      <van-row>
        <van-col
          span="12"
          v-for="(item, index) in CenterContentList"
          :key="index"
        >
          <img :src="item.ImgUrl" alt />
        </van-col>
      </van-row>
    </div>
    <!-- 横滑轮播主 -->
    <div class="slider-land">
      <div v-for="(item, index) in SaleList" :key="index">
        <!-- 长条 -->
        <div class="tab">
          <img :src="item.TabImgUrl" />
        </div>
        <!-- 横滑轮播  -->
        <div class="slider-land1">
          <Swiper :id="'slider' + index" :config="sliderConfig">
            <div
              class="swiper-slide"
              v-for="(value, idx) in item.CakeList"
              :key="idx"
            >
              <div class="slider_item">
                <a href>
                  <img :src="value.ImgUrl" alt />
                  <p>{{ value.Name }}</p>
                  <p>
                    <span>{{ "￥" + value.Price }}</span>
                    <span>{{ " / " + value.Size }}</span>
                  </p>
                </a>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
    <!-- 垫层 -->
    <div class="fill"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SwiperBannerList: [],
      bannerConfig: {
        pagination: ".swiper-pagination",
        style: {
          width: "100%",
          height: "100%"
        },
        autoplay: 2500
      },
      activityUrl: "",
      TopIconList: [],
      NoticeList: "",
      CenterContentList: [],
      SaleList: [],
      sliderConfig: {
        slidesPerView: 2.3 //设置分栏就不要设宽度，如果设置间距自动，再设置宽度
      }
    };
  },
  mounted() {
    this.$apis.getIndexData().then(res => {
      var mainresult = res.data.Tag.mainresult;
      console.log(mainresult); //打印回来的数据，在SwiperBannerList有对应的图片地址，然后返回的数据放在本组件的bannerlist中
      this.SwiperBannerList = mainresult.SwiperBannerList;
      this.activityUrl = mainresult.AbsoluteBannerList[0].ImgUrl;
      this.TopIconList = mainresult.TopIconList;
      this.NoticeList += mainresult.NoticeList;
      this.CenterContentList = mainresult.CenterContentList;
      var SaleList = mainresult.SaleList; //接收返回的数据
      SaleList.map(item => {
        item.CakeList = JSON.parse(item.CakeList); //由于返回的内容是字符串，需要，将其转为对象
        item.CakeList.map(value => {
          //嵌套遍历
          value.ImgUrl = this.setImgUrl(value);
        });
      });
      this.SaleList = SaleList;
    });
  },
  methods: {
    setImgUrl(item) {
      //由于数据没有返回图片的地址，需要将不同类型，拼出来或得图片地址
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
    }
  }
};
</script>
<style lang="scss" scoped>
#index {
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
    height: 50px;
  }
  .position {
    height: 44px;
    line-height: 44px;
    width: 91.467%;
    margin: 0 auto;
    font-size: 16px;
  }
  // 顶部轮播
  .banner {
    width: 91.47%;
    height: 180px;
    margin: 0 auto;
    #banner {
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // 小标题
  .title {
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 活动
  .activity {
    width: 91.467%;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .iconlist {
    width: 325px;
    height: 196.5px;
    margin: 0 auto;
    margin-bottom: 20px;
    text-align: center;
    img {
      margin-top: 16px;
      margin-left: 3px;
      margin-right: 3px;
      width: 52.03px;
    }
    p {
      margin-top: 11px;
    }
  }
  // 通知栏
  .notice {
    padding-top: 8px;
    padding-bottom: 8px;
    background: #fafafa;
    .notice1 {
      float: left;
      width: 50px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #fff;
      span {
        display: inline-block;
        width: 36px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        background: #1fb1b8;
        color: #fff;
        border-radius: 5px;
      }
    }
    .noticelist {
      color: #1fb1b8;
      background: #fff;
    }
  }
  .centercontent {
    width: 343px;
    height: 209px;
    padding: 16px;
    img {
      width: 167px;
      height: 100px;
      margin-bottom: 9px;
      border-radius: 10px;
    }
  }
  // 横向滑屏
  .slider-land {
    .tab {
      img {
        width: 100%;
        height: 142px;
      }
    }
    .slider-land1 {
      .slider_item {
        margin-top: 12px;
        margin-left: 12px;
        margin-bottom: 24px;
        height: 190px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        a {
          color: #333;
          img {
            width: 120px;
            height: 120px;
          }
          p:nth-of-type(1) {
            font-size: 12px;
            font-weight: bold;
            padding-left: 8px;
            padding-right: 8px;
            text-align: left;
            margin-top: 4px;
            padding-bottom: 6px;
          }
          p:nth-of-type(2) {
            padding-left: 8px;
            padding-right: 8px;
            text-align: left;
            span:nth-child(1) {
              color: #cc2825;
            }
            span:nth-child(2) {
              color: #999999;
            }
          }
        }
      }
      .slider_item:last-child {
        margin-right: 12px;
      }
    }
  }
}
</style>
