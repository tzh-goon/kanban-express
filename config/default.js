module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 8001,
  MONGODB_URL: 'mongodb://127.0.0.1:27017/kanban_dev',
  JWT_SECRET: 'hao123',
  WECHAT_APP_ID: 'wx7ba7096ea6de67c8',
  WECHAT_APP_SECRET: 'e01305528be8a35139873e3369a95f5c'
}
