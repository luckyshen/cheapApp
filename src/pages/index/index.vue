<template>
  <div>
    <div class="headinputBg">
      <div class="usericon" @click="toUserCenter">
        <i class="iconicon-1"></i>
      </div>
      <div class='searchBg'>
        <input class="inputsearch" type="text" value="123" />
        <i class="iconicon-16 searchicon"></i>
      </div>
      <div class="scanicon">
        <i class="iconicon-33"></i>
      </div>
      <div class="menulisticon">
        <i class="iconicon-12"></i>
      </div>
    </div>
    <ul class="menuListBg">
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
    </ul>
    <!-- <button open-type="getUserInfo" @getuserinfo="getVxUserInfo">点击授权</button> -->

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

export default {
  components: {
    bottomline
  },
  data() {
    return {
      value: "",
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
      },
      loading: true,
      userinfo: {}
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
    // this.testGetRequest();
  },
  methods: {
    toUserCenter() {
      const url = "../storeDetail/main";
      wx.navigateTo({ url });
    },
    handleMenuClick(index) {
      this.menuIndex = index;
    },
    handleCilckMap() {
      this.storeIsShow = false;
      this.enlargeBottom = "6%";
    },
    onloadUserInfo() {
      var that = this;
      // 查看是否授权
      wx.getSetting({
        success: function(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function(res) {
                // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                // 根据自己的需求有其他操作再补充
                // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                wx.login({
                  success: res => {
                    // 获取到用户的 code 之后：res.code
                    console.log("用户的code:" + res.code);
                    // 可以传给后台，再经过解析获取用户的 openid
                    // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                    // wx.request({
                    //     // 自行补上自己的 APPID 和 SECRET
                    //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                    //     success: res => {
                    //         // 获取到用户的 openid
                    //         console.log("用户的openid:" + res.data.openid);
                    //     }
                    // });
                  }
                });
              }
            });
          } else {
            // 用户没有授权
            // 改变 isHide 的值，显示授权页面
            that.setData({
              isHide: true
            });
          }
        }
      });
    },
    getVxUserInfo(e) {
      if (e.target.userInfo) {
        this.userName = e.target.userInfo.nickName;
        this.isCeng = false;
        console.log(e);
        this.isLogin();
      } else {
        this.userName = "";
        this.isCeng = true;
      }
    },
    isLogin() {
      var _this = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.userInfo"]) {
            //未授权getUserInfo
            wx.authorize({
              scope: "scope.getUserInfo",
              success(res) {
                // 用户已经同意小程序使用用户信息，后续调用 wx.userInfo 接口不会弹窗询问
                console.log(res);
                _this.isCeng = false;
                _this.userName = res.target.userInfo.nickName;
              },
              fail(err) {
                console.log(err);
              }
            });
          } else {
            //已授权
            wx.getUserInfo({
              success(res) {
                _this.loginOk(res);
              },
              fail(err) {
                console.log(err);
              }
            });
          }
        }
      });
    },
    loginOk(res) {
      //登录成功后的信息处理
      let _this = this;
      _this.userinfo.encryptedData = res.encryptedData;
      _this.userinfo.iv = res.iv;
      _this.userinfo.rawData = res.rawData;
      _this.userinfo.signature = res.signature;
      _this.userinfo.infos = res.userInfo;
      _this.getOpenId();
      _this.isCeng = false;
      _this.userName = res.userInfo.nickName;
      console.log(_this.userinfo);
    },
    getOpenId() {
      //获取用户的openid
      let _this = this;
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            wx.request({
              url: "https://api.weixin.qq.com/sns/jscode2session",
              data: {
                appid: this.appId, //开发者appid
                secret: secret, //开发者AppSecret(小程序密钥)
                grant_type: "authorization_code", //默认authorization_code
                js_code: res.code //wx.login登录获取的code值
              },
              success(res) {
                _this.userinfo.openid = res.data.openid;
                _this.userinfo.session_key = res.data.session_key;
              }
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
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
      const url = "http://192.168.96.71:8383/mockLogin";
      const res = await this.$request(url, "post", {
        name: "shenzhanping",
        password: "JUrenszp10"
      });
      console.log(res);
    },
    async testGetRequest() {
      const url = "/tags";
      const res = await this.$request(this.loading, url, "get", {});
      console.log(res);
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
  width: 100%;
  height: 88px;
  padding: 16px 34px 0 36px; 
  background: rgba(255, 255, 255, 1);
  background: #ccc;
  box-shadow: 0px 5px 10px rgba(69, 91, 99, 0.08);
  .clearFloat();
  .usericon {
    float: left;
    width: 60px;
    height: 56px;
    margin-right: 15px;
    i {
      font-size: 0.4rem;
      margin-top: 8px;
      color: #2B5BE5;
    }
  }
  .searchBg{
    width: 450px;
    height: 56px;
    position: relative;
    float: left;
    .inputsearch {
      padding-left: 36px;
      padding-right: 30px;
      // width: 450px;
      // height: 56px;
      font-size: 0.28rem;
      color: #939AAE;
      // float: left;
      border:2px solid rgba(223,228,233,1);
      border-radius:28px;
    }
    .searchicon {
      color: #939AAE;
      font-size: 0.28rem;
      position: absolute;
      right: 25px;
      margin-top: -35px;
    }
  }
  
  .scanicon {
    // width: 40px;
    height: 100%;
    float: right;
    i {
      font-size: 0.4rem;
      margin-top: 8px;
      color: #2B5BE5;
    }
  }
  
  .menulisticon {
    // width: 40px;
    height: 100%;
    float: right;
    margin-right: 37px;
    i {
      font-size: 0.4rem;
      margin-top: 8px;
      color: #2B5BE5;
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
  li {
    float: left;
    flex: 1;
    height: 80px;
    position: relative;
    min-width: 176px;
    line-height: 80px;
    text-align: center;
    font-size: 28px;
    color: #535353;
    .btmLine {
      width: 100%;
      height:6px;
      position: absolute;
      margin-top: -4px;
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
