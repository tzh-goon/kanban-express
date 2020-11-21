const mongoose = require('mongoose')
const config = require('config-lite')({
  config_basedir: __dirname,
  config_dir: 'config'
})

const db = mongoose.connection
const dbConnect = () => {
  mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  db.on('connected', () => {
    console.log('MoogoDB connect success')
  })

  db.on('error', err => {
    console.log('MoogoDB connect fail ' + err)
  })

  db.on('disconnected', () => {
    console.log('MoogoDB connect disconnected')
  })
}

module.exports = dbConnect
