const mongoose = require('mongoose')
const config = require('config-lite')({
  config_basedir: __dirname,
  config_dir: 'config'
})
const chalk = require('chalk')
mongoose.connect(config.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) throw err
})

const db = mongoose.connection
const dbConnect = () => {
  db.once('open', () => {
    console.log(chalk.green('MongoDB已连接'))
  })

  db.on('error', function (error) {
    console.error(chalk.red('MongoDB出错：' + error))
    mongoose.disconnect()
  })

  db.on('close', function () {
    console.log(chalk.red('MongoDB断开，重新连接'))
    mongoose.connect(config.mongodbUrl, { server: { auto_reconnect: true } })
  })
}

module.exports = dbConnect
