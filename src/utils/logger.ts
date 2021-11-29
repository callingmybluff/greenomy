/** Ideally, plugin an external logger library, like Pino. */
import Express from 'express'

export default {
  middleware: function (req: Express.Request, _: Express.Response, next: Express.NextFunction) {
    console.info(req.method, req.url)
    next()
  },
  debug: function (...data: any[]) {
    // Lazy loading of `config` to prevent other exports from requiring another file
    // This Logger will be undefined if inside `config.ts` otherwise (kinda of a circular dependency)
    import('./config')
      .then(Config => {
        if (!Config.default.env.isProd)
        console.debug(data)
      })
  },
  info: function (...data: any[]) {
    console.info(data)
  },
  error: function (...data: any[]) {
    console.error(data)
  },
}