import {
  authenticationSchema,
  loginParamsSchema,
  signUpParamsSchema,
  barbecueSchema,
  saveBarbecueParamsSchema,
  errorSchema
} from './schemas/'

export default {
  authentication: authenticationSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  barbecue: barbecueSchema,
  saveBarbecueParams: saveBarbecueParamsSchema,
  error: errorSchema
}
