import { baseUrlApi } from '../utils/api'
import request from '../utils/request'

export default {
 // 登录
    wxLogin: (data) =>
        request.post(`/store-miniApp-web/external/interface/wechat/wxLogin`, data, { baseURL: baseUrlApi }),

 // 收藏
  addCollect: (goodId, status) =>
    request.get(`/store-miniApp-web/store/member/addCollect?goodId=${goodId}&status=${status}`,
      null, {
        baseURL: baseUrlApi
      }),

}
// export async function getRecommendList(sendData) {
//   const res = await request.get('/site/index', sendData);
//   console.log(res);
//   // console.log(res)
//   return res;
// }