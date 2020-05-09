module.exports = {
  root: true,
  // 环境配置（根据实际情况做取舍）
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jquery: true,
  },
  globals: {
    PRODUCTION: true,
    PREPRODUCTION: true,
    DEVELOPMENT: true,
  },
  // 继承eslint的默认配置和prettier的配置。
  plugins: ['xmfe'],
  extends: ['plugin:xmfe/recommended'],
  // // 支持babel的使用
  // parser: 'babel-eslint',
  // parserOptions: {
  //   // 支持es6模块语法
  //   sourceType: 'module',
  // }
};
