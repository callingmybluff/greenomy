import Model from '../models/user'

export default {
  signin: Model.signin.bind(Model),
  signup: async (name: string, password: string) => Model.create({ name, password }),
}
