import Express from 'express'

import Logger from './utils/logger'
import Auth from './utils/auth'

const app = Express();

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(Logger.middleware)
app.use(Auth.middleware)
app.use(Express.static('./src/public'))

app.set('views', 'src/views')
app.set('view engine', 'ejs')

app.get('/', (_, res) => res.render('home'))

export default app;