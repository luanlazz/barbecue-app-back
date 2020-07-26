import { Middleware } from '@/presentation/protocols/middleware'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByTokenStub: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        await this.loadAccountByTokenStub.loadByToken(accessToken)
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
