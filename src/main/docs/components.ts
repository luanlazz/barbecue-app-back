import { badRequest, forbidden, notFound, serverError, unauthorized } from './components/'
import { apiKeyAuthSchema } from './schemas/api-key-schema'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  forbidden,
  notFound,
  serverError,
  unauthorized
}
