import { authenticationSchema, loginParamsSchema, signUpParamsSchema, errorSchema } from './schemas/'

export default {
  authentication: authenticationSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  error: errorSchema
}
