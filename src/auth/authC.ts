import Express from 'express'

import UserM from '../user/userM'


export default {
  signUp: async (name: string, password: string) => await UserM.create({ name, password }),
  signIn: async (name: string, password: string) => await UserM.signin(name, password),
}