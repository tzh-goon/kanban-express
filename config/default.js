module.exports = {
  port: parseInt(process.env.PORT, 10) || 8001,
  mongodbUrl: 'mongodb://127.0.0.1:27017/kanban_dev',
  jwtSecret: 'hao123',
  wechatAppId: '',
  wechatAppSecret: ''
}
