import { authenticationSchema, signUpParamsSchema, errorSchema } from './schemas/'

export default {
  authentication: authenticationSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema
}
