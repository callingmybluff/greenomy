/** Using Joi is optional, but it is perfect for validating input */
import Joi from 'joi'
import DotEnv from 'dotenv'

import Logger from './logger'

DotEnv.config()

const devEnvString = 'development',
  testEnvString = 'test',
  prodEnvString = 'production'

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid(devEnvString, testEnvString, prodEnvString)
      .default(devEnvString),
    PORT: Joi.number().port().default(3000),
    DB_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
  })
  .unknown();

function validateConfig(schema: Joi.Schema) {
  const { value, error } = schema.validate(process.env);
  if (error) Logger.error(`Invalid environment: ${error.message}`)
  return value;
}

const envObject = validateConfig(schema)

export default {
  env: {
    isTest: envObject.NODE_ENV === testEnvString,
    isDev: envObject.NODE_ENV === devEnvString,
    isProd: envObject.NODE_ENV === prodEnvString,
    string: envObject.NODE_ENV,
  },
  port: envObject.PORT,
  dbUri: envObject.DB_URI,
  jwtSecret: envObject.JWT_SECRET,
}