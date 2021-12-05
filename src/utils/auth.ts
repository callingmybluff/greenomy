/** Auth middleware */
import Express from 'express'
import JWT from 'jsonwebtoken'

import Config from './config'
import Logger from './logger'

const middleware = Express.Router(),
  router = Express.Router()

middleware.use(function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const publicRoutes = ['/', '/signin', '/signup', '/signout', '/api']

  if (publicRoutes.includes(req.url)) {
    next()
  } else {
    const { jwt } = req.cookies
    if (jwt) {
      JWT.verify(req.cookies.jwt, Config.jwtSecret, (err: JWT.VerifyErrors | null, decodedToken: object | undefined) => {
        if (err) {
          Logger.error(err.message)
          res.redirect('/signin')
        } else {
          next()
        }
      });
    } else {
      res.redirect('/signin')
    }
  }
})

router.get('/signin', (_, res) => res.render('signin'))
router.get('/signup', (_, res) => res.render('signup'))
router.get('/signout', (_, res) => res.render('signout'))

export default {
  middleware,
  router,
}