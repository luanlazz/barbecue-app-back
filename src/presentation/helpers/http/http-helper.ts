import { HttpResponse } from '@/presentation/protocols/http'
import { ServerError } from '@/presentation/errors'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
