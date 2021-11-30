import { Server } from 'http'
import Mongoose from 'mongoose'

import App from './app'
import Logger from './utils/logger'
import Config from './utils/config'


async function appStart(): Promise<Server> {
  return new Promise((resolve) => {
    const server = App.listen(Config.port, () => {
      resolve(server)
    });
  })
}

Mongoose.connect(Config.dbUri)
  .catch((err) => {
    Logger.error(err)
    process.exit(1)
  })
  .then(() => appStart())
  .then(() => Logger.info(
    `started server on :${Config.port} in ${Config.env.string} mode`
  ))
  .catch((e) => {
    Logger.debug(e)
    Logger.error('Error starting the application')
    process.exit(1)
  })
