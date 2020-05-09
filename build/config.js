const path = require('path');
const myresolve = p => {
  return path.resolve(__dirname, p);
};
module.exports = {
  dev: {
    port: 8888, // 默认8888
    assetsPublicPath: '/',
    autoOpenBrowser: false, // 是否自动打开浏览器
    errorOverlay: true // 编译出错时，是否在浏览器端遮罩显示错误信息。
  },
  pre: {
    assetsRoot: myresolve('../pre'),
    assetsPublicPath: './'
  },
  build: {
    assetsRoot: myresolve('../dist'),
    assetsPublicPath: './'
  }
};
