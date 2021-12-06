import ModelsResolvers from './resolvers/models'
import AuthResolvers from './resolvers/auth'
import JoinsResolvers from './resolvers/joins'

export default {
  ...ModelsResolvers,
  ...JoinsResolvers,
  ...AuthResolvers,
}