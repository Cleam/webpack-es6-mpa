module.exports = {
  // 环境配置（根据实际情况做取舍）
  env: {
    jquery: true
  },
  globals: {
    PRODUCTION: true,
    PREPRODUCTION: true,
    DEVELOPMENT: true
  },
  plugins: ['xyz'],
  extends: ['plugin:xyz/common']
};
