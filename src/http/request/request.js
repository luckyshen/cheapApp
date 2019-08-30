/* eslint-disable */
import { getCache } from "../utils";
var Fly = require("flyio/dist/npm/wx");

const request = new Fly();

// 全局加载提示 - 设定时间
let ltime = 0;

function closeLoading(param) {
  ltime--;
}
request.interceptors.request.use(request => {
  // 全局加载提示 - 展示提示
  // wx.showNavigationBarLoading()
  ltime++;

  let dataSource = getCache("dataSource");
  request.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    source: "miniApp",
    dataSource: dataSource ? dataSource : ""
  };
  // 没用到
  if (request.url.indexOf("getReviewInfo") != -1) {
    closeLoading();
    return request;
  }
  // 登录
  console.log("这是token");
  console.log();
  let type = "";
  if (request.url.indexOf("wxLogin") != -1) {
    type = request.body.loginType;
  }
  console.log(getCache("token"));
  console.log("这是token");
  if (request.url.indexOf("wxLogin") == -1 || type == "WORKBENCH") {
    // let storeId = getCache("storeId");
    let storeCode = getCache("storeCode");
    let inviter = getCache("inviter");
    let token = getCache("token");
    request.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      source: "miniApp",
      token: token,
      storeCode: storeCode,
      inviter: inviter
    };
    console.log("打印request");
    console.log(request);
    console.log("打印request");
    let dataSource = getCache("dataSource");
    if (dataSource) {
      request.headers["dataSource"] = dataSource;
    }
  }
  return request;
});

request.interceptors.response.use(
  (response, promise) => {
    closeLoading();
    // wx.hideNavigationBarLoading()
    // 微信运维统计
    if (response.status) {
      wx.reportMonitor("0", +response.status);
    }
    if (response.headers.date) {
      let time =
        new Date().getTime() - new Date(response.headers.date).getTime();
      wx.reportMonitor("1", +time);
    }
    // 错误提示
    if (response.status != 200) {
      wx.showToast({
        title: "出错啦！请稍后再试试哦～",
        icon: "none",
        duration: 2000
      });
    }
    return promise.resolve(response.data);
  },
  (err, promise) => {
    wx.hideNavigationBarLoading();
    return promise.resolve();
  }
);
export default request;
