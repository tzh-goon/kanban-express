import { connection, connect } from 'mongoose'
import config from '../utils/config'

const dbConnect = () => {
  connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  connection.on('connected', () => {
    console.log('MoogoDB connect success')
  })

  connection.on('error', err => {
    console.log('MoogoDB connect fail ' + err)
  })

  connection.on('disconnected', () => {
    console.log('MoogoDB connect disconnected')
  })
}

export default dbConnect
