var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  urlApi: '"http://192.168.96.33"',
  urlHost: '"."', // 前端站点地址
  urlUpload: '"http://192.168.183.206"', // 图片上传的地址
  urlAvatar: '"http://192.168.183.206"', // 头像上传的地址
})
