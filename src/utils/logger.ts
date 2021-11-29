/** Ideally, plugin an external logger library, like Pino. */
import Express from 'express'
import config from './config';

export default {
  middleware: function (req: Express.Request, _: Express.Response, next: Express.NextFunction) {
    console.info(req.method, req.url)
    next()
  },
  debug: function (...data: any[]) {
    if (!config.env.isProd)
      console.debug(data)
  },
  info: function (...data: any[]) {
    console.info(data)
  },
  error: function (...data: any[]) {
    console.error(data)
  },
}