import Express from 'express'
import CookieParser from 'cookie-parser'

import Logger from './utils/logger'
import AuthRouter from './utils/auth'
import Graph from './graphql/index'
import RestRouter from './controllers/restRouter'

const app = Express()

// Consider using [`https://github.com/expressjs/multer`](https://github.com/expressjs/multer) in case of the need of uploading files
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
// Just make sure `CookieParser` is before `AuthRouter`
app.use(CookieParser())
app.use(Logger.middleware)

app.set('views', 'src/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('home', { name: req.cookies.name }))
app.use(AuthRouter.middleware)
app.use(RestRouter)
app.use('/', AuthRouter.router)
app.use('/api', Graph)

export default app