import Express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import Config from '../utils/config'

const schema = buildSchema(`
  type Query {
    amount: Int
  }
`)
const root = {
  amount: () => {
    return 4
  }
}

const router = Express.Router()
router.get('/', graphqlHTTP(
  {
    schema: schema,
    rootValue: root,
    graphiql: !Config.env.isProd,
  })
);

export default {
  router
}