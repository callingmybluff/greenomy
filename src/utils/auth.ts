import Express from 'express'

import Logger from './logger'

export default {
  middleware: function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    Logger.debug(`Authenticating ${req.url}`)
    next()
  }
}