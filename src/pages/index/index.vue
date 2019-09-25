<template>
  <div>
    <div class="headinputBg">
      <div id="addlinstion" ref="addlistion">888888</div>
      <div class="usericon" @click="toUserCenter">
        <!-- <i class="iconicon-1"></i> -->
      </div>
      <div class="tt"></div>
      <input class="inputsearch" type="text" value="123" />
      <div class="searchicon">
        <!-- <i class="iconicon-6"></i> -->
      </div>
    </div>
    <!-- <ul class="menuListBg">
      <li
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleMenuClick(index)"
        :style="{color:(index === menuIndex?'#454F63':'#959DAD')}"
      >
        {{item.label}}
        <div v-show="index === menuIndex" class="btmLine">
          <bottomline></bottomline>
        </div>
      </li>
    </ul> -->
    <van-button type="primary">按钮</van-button>
    <button @click="toLocation">点击</button>
    <button @click="handleScale">放大</button>

    <!-- <div class="enlargeAllBg">
      <div class="enlargeBg">
        <i class="iconicon-2"></i>
      </div>
      <div class="enlargeBg" style="margin-top: 14px;">
        <i class="iconiconicon-3"></i>
      </div>
    </div>-->

    <map
      id="map"
      :longitude="longitude"
      :latitude="latitude"
      :scale="scale"
      :markers="markers"
      @markertap="handleMarkertap"
      @callouttap="handleMarkertap"
      @tap="handleCilckMap"
      show-location
    >
      <cover-view class="enlargeAllBg" :style="{'bottom': enlargeBottom}">
        <cover-view class="enlargeBg" @click="handleScaleAdd">
          <cover-image class="enlarge" src="/static/images/plus.png" />
        </cover-view>
        <cover-view class="enlargeBg" style="margin-top: 14px;" @click="handleScaleReduse">
          <cover-image class="minus" src="/static/images/minus.png" />
        </cover-view>
      </cover-view>
      <cover-view class="locBg" :style="{'bottom': enlargeBottom}" @click="handleToLocation">
        <cover-image class="loc" src="/static/images/plus.png" />
      </cover-view>
      <cover-view class="storeBg" v-show="storeIsShow">
        <cover-image class="storeImg" src="/static/images/food.jpg" />
        <cover-view class="storeInfo">
          <cover-view class="storeTitle">{{storeInfo.title}}</cover-view>
          <cover-view class="discounts">{{storeInfo.discounts}}</cover-view>
          <cover-view class="storeType">
            <cover-view class="Sarea">{{storeInfo.Sarea}}</cover-view>
            <cover-view class="Stype">{{storeInfo.Stype}}</cover-view>
          </cover-view>
        </cover-view>
        <cover-view class="storeLoc">{{storeInfo.distance}}km</cover-view>
        <!-- <cover-view class="storeLoc">{{32}}km</cover-view> -->
      </cover-view>
    </map>
  </div>
</template>
 
<script>
import bottomline from "@/components/bottomline";

import QQMapWX from "../../../static/js/qqmap-wx-jssdk";
import BaiduMapWX from "../../../static/js/bmap-wx";
import AMapWX from "../../../static/js/amap-wx";

import icons from '@/components/SvgIcon';

export default {
  components: {
    bottomline,
    icons
  },
  data() {
    return {
      value: '',
      menuList: [
        {
          label: "附近推荐",
          value: "nearby"
        },
        {
          label: "餐饮美食",
          value: "food"
        },
        {
          label: "教育学习",
          value: "education"
        },
        {
          label: "休闲娱乐",
          value: "recreation"
        },
        {
          label: "餐饮美食",
          value: "food"
        }
      ],
      menuIndex: 0,
      value: 123,
      longitude: 31.22114,
      latitude: 121.54409,
      scale: 14,
      markers: [
        // {
        //   iconPath: "/static/images/location.png",
        //   id: 0,
        //   latitude: 31.22124,
        //   longitude: 121.54419,
        //   callout: {
        //     content: "气泡名称",
        //     color: "#FF0000",
        //     fontSize: 15,
        //     borderRadius: 10,
        //     display: "ALWAYS"
        //   },
        //   width: 50,
        //   height: 50
        // },
        // {
        //   iconPath: "/static/images/location.png",
        //   id: 1,
        //   latitude: 31.22157,
        //   longitude: 121.54416,
        //   width: 50,
        //   height: 50
        // },
        {
          iconPath: "/static/images/foodicon.png",
          width: 40,
          height: 40,
          id: 2,
          name: "肯德基(丁香餐厅)",
          latitude: 31.219672422143,
          longitude: 121.54269388413,
          type: "美食",
          area: "浦东新区",
          image: "",
          discounts: "全场7折",
          callout: {
            content: "肯德基(丁香餐厅)",
            color: "#fff",
            bgColor: "#665EFF",
            borderColor: "#665EFF",
            fontSize: 12,
            padding: 6,
            borderRadius: 6,
            display: "ALWAYS"
          }
          // address: "上海市浦东新区世纪大道2002号亚太盛汇(南商场)B1层",
          // province: "上海市",
          // city: "上海市",
          // area: "浦东新区",
          // street_id: "00586108ae5beabc47e274ad",
          // telephone: "(021)68544927",
          // detail: 1,
          // uid: "00586108ae5beabc47e274ad"
        }
        // {
        //   iconPath: "/static/images/location.png",
        //   id: 4,
        //   latitude: 31.216005010235,
        //   longitude: 121.54177745725,
        //   callout: {
        //     content: "御香海(锦延路店)",
        //     color: "#FF0000",
        //     fontSize: 14,
        //     padding: 8,
        //     borderRadius: 10,
        //     display: "ALWAYS"
        //   },
        //   // address: "上海市浦东新区锦延路285号",
        //   // province: "上海市",
        //   // city: "上海市",
        //   // area: "浦东新区",
        //   // street_id: "d3e32940362d550ec9fa5f66",
        //   // telephone: "(021)61092979",
        //   // detail: 1,
        //   // uid: "3a0a78bd5fe4e9e3621809e5"
        // }
      ],
      // circles: [
      //   {
      //     latitude: 31.2211,
      //     longitude: 121.54409,
      //     color: "#ee7788aa",
      //     radius: 50,
      //     fillColor: "#7cb5ec88",
      //     strokeWidth: 1
      //   }
      // ],
      wxMarkerData: [],
      placeData: {},
      storeIsShow: false,
      enlargeBottom: "3%",
      storeInfo: {
        title: "",
        discounts: "",
        Sarea: "",
        Stype: "",
        distance: ""
      }
    };
  },

  created() {
    this.BMap = new BaiduMapWX.BMapWX({
      ak: "8w3DinqB5unkOclpp1vMFzeKf2kw9Kuh"
    });
    this.QQMap = new QQMapWX({
      key: "TSJBZ-GTN3S-4SLOX-6GRTU-SCYJO-MCBYI"
    });
    // let app = getApp()
  },
  mounted() {
    // this.getCurLocationBaidumap();
    // this.getCurLocationQQmap()
    // this.testRequest()
    this.testGetRequest();
  },
  methods: {
    toUserCenter() {
      const url = '../storeDetail/main';
      wx.navigateTo({ url });
    }, 
    handleMenuClick(index) {
      this.menuIndex = index;
    },
    handleCilckMap() {
      this.storeIsShow = false;
      this.enlargeBottom = "6%";
    },
    // // 点击气泡回调
    // calloutTap (marker) {
    //   console.log(marker);

    // // 点击气泡的操作
    // },
    handleMarkertap(marker) {
      console.log(marker, "----");
      this.storeIsShow = true;
      this.enlargeBottom = "28%";
      console.log(this.markers, "----------markers");

      this.markers.map(v => {
        if ((marker.mp.markerId = v.id)) {
          this.storeInfo.title = v.name;
          this.storeInfo.discounts = v.discounts;
          this.storeInfo.Sarea = v.area;
          this.storeInfo.Stype = v.type;

          this.storeInfo.distance = this.GetDistance(
            this.latitude,
            this.longitude,
            v.latitude,
            v.longitude
          );
          console.log(this.storeInfo.distance, "distance");
        }
      });
    },
    onchange(event) {
      console.log(event.mp.detail, "1231");
      this.value = event.mp.detail;
    },
    handleToLocation() {
      const mpCtx = wx.createMapContext("map");
      mpCtx.moveToLocation();
    },
    getCurLocationQQmap() {
      let _this = this;
      wx.getLocation({
        type: "gcj02",
        success(res) {
          console.log(res);
          _this.latitude = res.latitude;
          _this.longitude = res.longitude;

          // const latitude = res.latitude;
          // const longitude = res.longitude;
          // const speed = res.speed;
          // const accuracy = res.accuracy;

          // let qqmapsdk = new QQMapWX({
          //   key: "TSJBZ-GTN3S-4SLOX-6GRTU-SCYJO-MCBYI"
          // });
          _this.QQMap.reverseGeocoder({
            success: function(res) {
              console.log(res, "success");
            },
            fail: function(res) {
              console.log(res, "fail");
            }
          });
        },
        fail(res) {
          console.log(res, "fail");
        },
        complete(res) {
          console.log(res, "complete");
        }
      });
    },
    getCurLocationBaidumap() {
      let _this = this;
      wx.getLocation({
        type: "gcj02",
        success(res) {
          console.log(res);
          _this.latitude = res.latitude;
          _this.longitude = res.longitude;

          _this.BMap.regeocoding({
            success: function(res) {
              console.log(res, "success");
            },
            fail: function(res) {
              console.log(res, "fail");
            }
          });
        },
        fail(res) {
          console.log(res, "fail");
        },
        complete(res) {
          console.log(res, "complete");
        }
      });
    },
    getsearchInfo() {
      const _this = this;
      // let BMap = new BaiduMapWX.BMapWX({
      //   ak: "8w3DinqB5unkOclpp1vMFzeKf2kw9Kuh"
      // });
      this.BMap.search({
        query: "美食",
        // location:'31.03241,121.22654',
        // radius: 2000,
        success: function(res) {
          console.log(this);

          console.log(res, "success");
          // _this.markers = _this.markers.concat(res.wxMarkerData);
        },
        fail: function(res) {
          console.log(res, "fail");
        }
      });
    },
    handleScaleAdd() {
      this.scale < 19 && this.scale++;
    },
    handleScaleReduse() {
      this.scale > 4 && this.scale--;
    },
    // gaodemap() {
    //   // var myAmapFun = new AMapWX.AMapWX({ key: 'b3420cbd88c5b8fab29796f3793c3864' });
    //   // var myAmapFun = new AMapWX.MarkerClusterer();
    //   // console.log(myAmapFun, '---111');
    // },
    //进行经纬度转换为距离的计算
    Rad(d) {
      return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
    },
    //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
    GetDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = this.Rad(lat1);
      var radLat2 = this.Rad(lat2);
      var a = radLat1 - radLat2;
      var b = this.Rad(lng1) - this.Rad(lng2);
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137; // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000; //输出为公里
      s = s.toFixed(2);
      console.log(s, "---------ss");

      return s;
    },
    async testRequest() {
      const url = 'http://192.168.96.71:8383/mockLogin'
      const res = await this.$request(url, 'post', {
        name: 'shenzhanping',
        password: 'JUrenszp10'
      })
      console.log(res)
    },
    async testGetRequest() {
      const url = 'http://192.168.39.184/tags'
      const res = await this.$request(url, 'get', {})
      console.log(res)
    }
  }
};
</script>
 
<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
<style lang="less" scoped>
@import "../../assets/styles/mixin.less";
.card-panel-icon {
  float: left;
  font-size: 48px;
}
.headinputBg {
  width: 690px;
  height: 86px;
  margin-left: 31px;
  background: rgba(255, 255, 255, 1);
  // background: #ccc;
  box-shadow: 0px 5px 10px rgba(69, 91, 99, 0.08);
  opacity: 1;
  border-radius: 12px;
  // padding: 0.23rem 0.24rem 0.23rem 0.32rem;
  .clearFloat();
  .usericon {
    float: left;
    width: 116px;
    height: 100%;
    i {
      font-size: 0.28rem;
      line-height: 86px;
      margin-left: 32px;
      color: #454f63;
    }
  }
  .tt {
    float: left;
    width: 0.2px;
    height: 39px;
    background: rgba(244, 244, 246, 1);
    opacity: 1;
    border-radius: 1px;
    margin-top: 23px;
  }
  .inputsearch {
    padding-left: 36px;
    padding-right: 30px;
    width: 450px;
    height: 100%;
    font-size: 0.28rem;
    color: #78849e;
    float: left;
  }
  .searchicon {
    width: 50px;
    height: 100%;
    float: right;
    i {
      line-height: 86px;
      margin-right: 24px;
      font-size: 0.28rem;
      color: #454f63;
    }
  }
}
.menuListBg {
  width: 100%;
  // height: 72px;
  .clearFloat();
  display: flex;
  overflow-x: auto;
  margin-top: 4px;
  box-shadow: 0px 5px 10px rgba(69, 91, 99, 0.08);
  li {
    float: left;
    flex: 1;
    height: 72px;
    position: relative;
    border-right: 1px solid #f4f4f6;
    min-width: 176px;
    line-height: 72px;
    text-align: center;
    font-size: 20px;
    color: #959dad;
    .btmLine {
      width: 100%;
      position: absolute;
      margin-top: -10px;
    }
  }
  li:nth(last-child) {
    border-right: none;
  }
}
.menuListBg::-webkit-scrollbar {
  display: none;
}
// .coverBg {
//   width: auto;
//   height: auto;
.enlargeAllBg {
  position: fixed;
  left: 100%;
  margin-left: -105px;
  bottom: 3%;
  // margin-top: 775px;
  width: 85px;
  .enlargeBg {
    width: 85px;
    height: 85px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 12px 16px rgba(69, 91, 99, 0.1);
    opacity: 1;
    border-radius: 12px;
    .enlarge {
      width: 32px;
      height: 32px;
      position: relative;
      left: 50%;
      top: 50%;
      margin-left: -16px;
      margin-top: -16px;
    }
    .minus {
      width: 36px;
      height: 36px;
      position: relative;
      left: 50%;
      top: 50%;
      margin-left: -18px;
      margin-top: -18px;
    }
  }
}
.locBg {
  position: fixed;
  left: 18px;
  bottom: 3%;
  width: 85px;
  height: 85px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 12px 16px rgba(69, 91, 99, 0.1);
  opacity: 1;
  border-radius: 12px;
  .loc {
    width: 32px;
    height: 32px;
    position: relative;
    left: 50%;
    top: 50%;
    margin-left: -16px;
    margin-top: -16px;
  }
}
// }
.bgup {
  margin-top: 40%;
}
.storeListBg {
  width: 738px;
  height: 141px;
  background: rgba(42, 46, 67, 1);
  opacity: 1;
  border-radius: 12px 12px 0px 0px;
  margin-left: 6px;
}
.storeBg {
  position: fixed;
  bottom: 2%;
  width: 672px;
  height: 284px;
  background: rgba(53, 58, 80, 1);
  // border: 1px solid rgba(112, 112, 112, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
  margin-left: 39px;
  .storeImg {
    width: 260px;
    height: 220px;
    // background:rgba(0,0,0,0);
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.18);
    opacity: 1;
    border-radius: 12px;
    margin-left: 44px;
    margin-top: 32px;
    float: left;
  }
  .storeInfo {
    width: 240px;
    font-size: 53px;
    margin-left: 29px;
    margin-top: 32px;
    float: left;
    .storeTitle {
      width: 100%;
      font-size: 40px;
      color: #fff;
      margin-top: 12px;
      .ellipsis();
    }
    .discounts {
      width: 100%;
      font-size: 30px;
      color: #fff;
      margin-top: 20px;
      word-break: break-all;
      word-wrap: break-word;
      white-space: normal;
      height: 72px;
      line-height: 36px;
      overflow: hidden;
      // .multiLine();
    }
    .storeType {
      font-size: 30px;
      color: #b1b0b0;
      margin-top: 18px;
      .Sarea {
        float: left;
      }
      .Stype {
        margin-left: 28px;
        float: left;
      }
    }
  }
  .storeLoc {
    // height: 284px;
    // line-height: 284px;
    float: right;
    font-size: 26px;
    color: #b1b0b0;
    margin-right: 20px;
    margin-top: -100px;
  }
}
</style>
