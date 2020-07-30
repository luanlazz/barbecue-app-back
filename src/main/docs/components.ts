import { badRequest, forbidden, noContent, notFound, serverError, serviceUnavailableError, unauthorized } from './components/'
import { apiKeyAuthSchema } from './schemas/api-key-schema'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  forbidden,
  noContent,
  notFound,
  serverError,
  serviceUnavailableError,
  unauthorized
}
