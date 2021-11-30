import Express from 'express'
import JWT from 'jsonwebtoken'

import AuthC from './authC'
import Config from '../utils/config'
import Logger from '../utils/logger'

const jwtDuration = 24 * 60 * 60
function createJWT(textToSign: string): string {
  return JWT.sign(
    {
      textToSign
    },
    Config.jwtSecret,
    {
      expiresIn: jwtDuration
    }
  )
}

function responseWithToken(user: any, res: Express.Response) {
  const token = createJWT(user._id)
  res
    .cookie('jwt', token, { httpOnly: true, maxAge: jwtDuration * 1000 })
    .cookie('name', user.name, { httpOnly: true, maxAge: jwtDuration * 1000 })
    .status(200).redirect('/')
}

const router = Express.Router()

router.use(function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const publicRoutes = ['/', '/signin', '/signup', '/signout']

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

router.get('/signin', (_: Express.Request, res: Express.Response) => res.render('signin'))
router.post('/signin', async (req: Express.Request, res: Express.Response) => {
  const { name, password } = req.body
  try {
    const user = await AuthC.signIn(name, password)
    responseWithToken(user, res)
  }
  catch (err) {
    res.status(400).render( 'signin', {errors: err} );
  }
})

router.get('/signup', (_: Express.Request, res: Express.Response) => res.render('signup'))
router.post('/signup', async (req: Express.Request, res: Express.Response) => {
  const { name, password } = req.body
  try {
    const user = await AuthC.signUp(name, password)
    responseWithToken(user._id, res)
  }
  catch (err) {
    res.status(400).render( 'signup', {errors: err} );
  }
})

router.get('/signout', (_: Express.Request, res: Express.Response) => {
  res
    .cookie('jwt', '', { maxAge: 1 })
    .cookie('name', '', {maxAge: 1})
    .redirect('/')
})

export default router