import Express from 'express'
import JWT from 'jsonwebtoken'

import Config from '../utils/config'
import UserC from './user'

const jwtDuration = 24 * 60 * 60
function createJWT(textToSign: string): string {
  return JWT.sign(
    {
      textToSign
    },
    Config.jwtSecret,
    {
      expiresIn: jwtDuration
    }
  )
}

function responseWithToken(user: any) {
  return {
    token: createJWT(user._id),
    user: user.name,
    id: user._id,
  }
}


export default {
  signin: async (name: string, password: string) => {
    const user = await UserC.signin(name, password)
    return responseWithToken(user)
  },
  signup: async (name: string, password: string) => {
    const user = await UserC.signup(name, password)
    return responseWithToken(user)
  },
}