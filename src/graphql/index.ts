import Express from 'express'
import { graphqlHTTP } from 'express-graphql'

import Schema from './schema'
import Resolvers from './resolvers'
import Config from '../utils/config'

const router = Express.Router()

/** Only show GUI and allow GET in development */
if (Config.env.isDev)
  router.get('/', graphqlHTTP(
    {
      schema: Schema,
      rootValue: Resolvers,
      graphiql: true,
    })
  )

router.post('/', graphqlHTTP(
  {
    schema: Schema,
    rootValue: Resolvers,
    graphiql: false,
  })
)

export default router