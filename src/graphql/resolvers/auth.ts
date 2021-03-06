import AuthController from '../../controllers/auth'

// Should be central and reusable
interface IAuth {
  name: string
  password: string
}

export default {
  signin: async ({ name, password }: IAuth) => AuthController.signin(name, password),
}