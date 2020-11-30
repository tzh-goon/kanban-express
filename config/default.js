module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 8001,
  MONGODB_URL: 'mongodb://superuser:qwer1234@39.99.175.151:27017/kanban_dev',
  SWAGGER_HOST: 'localhost:8002',
  JWT_SECRET: 'hao123',
  JWT_EXPIRES: 30 * 24 * 60 * 60,
  WECHAT_APP_ID: 'wx7ba7096ea6de67c8',
  WECHAT_APP_SECRET: 'e01305528be8a35139873e3369a95f5c'
}
