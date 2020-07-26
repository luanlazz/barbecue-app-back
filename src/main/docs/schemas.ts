import {
  authenticationSchema,
  loginParamsSchema,
  signUpParamsSchema,
  barbecueSchema,
  barbecuesSchema,
  saveBarbecueParamsSchema,
  errorSchema
} from './schemas/'

export default {
  authentication: authenticationSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  barbecue: barbecueSchema,
  barbecues: barbecuesSchema,
  saveBarbecueParams: saveBarbecueParamsSchema,
  error: errorSchema
}
