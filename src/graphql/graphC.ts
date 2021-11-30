import Express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const schema = buildSchema(`
  # root
  type Query {
    profile: User
    cars: [Car]
    offices: [Office]
  }
  type User {
    id: ID
    name: String
    cars: [Car]
    offices: [Office]
  }
  interface Booking {
    id: ID
    text: String
  }
  interface Car implements Booking {
    id: ID
    text: String
    model: String
  }
  interface Office implements Booking {
    id: ID
    text: String
    city: String
  }
`)
const root = {
  profile: () => {
  },
}

const router = Express.Router()
router.get('/', graphqlHTTP(
  {
    schema: schema,
    rootValue: root,
    /**
     * Replace the `false` with `!Config.env.isProd`
     * However the gui is being a bit buggy so disabled
     */
    //graphiql: false,
  })
);

export default router