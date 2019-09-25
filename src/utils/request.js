const baseUrl = process.env.urlApi;

export const request = (loading, url, method, param) => {
  return new Promise((resolve, reject) => {
    if (loading === true) {
      wx.showToast({
        title: '数据加载中',
        icon: 'loading'
      });
    }
    wx.request({
      url: baseUrl + url,
      method: method,
      data: param,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    });
  });
};
