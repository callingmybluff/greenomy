import ModelsResolvers from './resolvers/models'
import AuthResolvers from './resolvers/auth'

export default {
  ...ModelsResolvers,
  ...AuthResolvers,
}