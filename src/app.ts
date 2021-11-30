import Express from 'express'
import CookieParser from 'cookie-parser'

import Logger from './utils/logger'
import AuthRouter from './auth/authR'
import Graph from './graphql/graphC'

const app = Express();

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
// Just make sure `CookieParser` is before `AuthRouter`
app.use(CookieParser())
app.use(Logger.middleware)
app.use(Express.static('./src/public'))

app.set('views', 'src/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('home', {name: req.cookies.name}))
app.use(AuthRouter)
app.use('/api', Graph)

export default app;