# MPA

基于 webpack 的多页面应用框架

## 使用说明

```bash
# 开发
npm run dev # 或 npm start
# 访问方式
# http://localhost:8888/index.html
# http://localhost:8888/about.html
# http://localhost:8888/contact.html

# 预发布（用于上测试服）打包
npm run pre

# 上线打包
npm run build
# 上线打包可视化分析
npm run builda

# 代码格式校验
npm run lint

# 代码格式自动修复
npm run fix
```

**注意：代码构建过程中 webpack 会注入三个全局变量（原则上只要使用 PRODUCTION 即可）**

- PRODUCTION: true 表示上线环境
- DEVELOPMENT: true 表示开发环境
- PREPRODUCTION: true 表示预发布环境

## 目录结构说明

```bash
.
├── .eslintrc.js  # eslint配置文件
├── .prettierrc.js  # prettier配置文件
├── build # webpack配置文件目录
│   ├── config.js
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── dist # 上线打包目录
├── pre # 预发布打包目录
├── static # 资源目录（有些公共资源不方便通过js引入，直接通过html引入的时候，可以放到这个目录（如 shareinstall），目录结构参考打包后目录结构）
└── src
    ├── api # 公共接口、日志处理目录（代码组织方式供参考）
    │   ├── config.js
    │   ├── data.js
    │   ├── index.js
    │   └── log.js
    ├── common  # 公共资源目录
    │   ├── css # 公共样式资源
    │   │   ├── _base.scss
    │   │   ├── _common.scss
    │   │   ├── _index.scss
    │   │   └── _mixin.scss
    │   └── js  # 公共js资源
    │       ├── SL-es.js
    │       ├── SLAPP-es.js
    │       └── responsive.js
    └── pages # 多页目录，每个页面一个目录，注意：每个页面目录下只允许有一个模板html和一个入口js，否则会影响打包。
        ├── about
        │   ├── about.html  # 模板html
        │   ├── about.js  # 入口js
        │   ├── about.scss  # 页面样式
        │   ├── img
        │   └── js  # 其他专用模块js
        ├── contact
        │   ├── contact.html  # 模板html
        │   ├── contact.js  # 入口js
        │   ├── contact.scss  # 页面样式
        │   ├── img
        │   └── js  # 其他专用模块js
        └── index
            ├── img
            ├── index.html  # 模板html
            ├── index.js  # 入口js
            ├── index.scss  # 页面样式
            └── js  # 其他专用模块js
                ├── math.js
                └── print.js
```

**注意：每个页面目录下只允许有一个模板 html 和一个入口 js，否则会影响打包。**

## 浏览器兼容

原则上是根据 `package.json` 中 `browserslist` 配置来打包兼容，未详细测试验证，如发现有问题，请提 issue 或 pr

```json
// package.json中配置
{
  "browserslist": [">= 1%", "last 2 version", "iOS >= 8", "Android >= 4.4"]
}
```

```bash
# 查看兼容结果列表
npx browserslist
```

## 贡献

如发现有 bug 或有更好的 idea，欢迎提 PR。

## 常见问题

- 如发现打包后样式丢失，有可能是`purifycss-webpack`插件的 css Tree Shaking 功能导致误删了，解决方法，在 `./build/webpack.common.js：PurifyCssPlugin` 配置中新增白名单（如排除包含 swiper 类名的样式：`{whitelist: ['*swiper*']}`），具体配置方法参考：[purifycss-webpack](https://www.npmjs.com/package/purifycss-webpack) 和 [purifycss](https://github.com/purifycss/purifycss#properties-of-options-object)
- 安卓 4.4.3 以下不支持 Promise 的兼容方法：`window.Promise = require('es6-promise').Promise`（请先安装依赖包`npm install -S es6-promise`）;
