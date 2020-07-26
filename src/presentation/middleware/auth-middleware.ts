import { Middleware } from '@/presentation/protocols/middleware'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByTokenStub: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']

      if (accessToken) {
        const account = await this.loadAccountByTokenStub.loadByToken(accessToken)
        if (account) {
          return ok({ accountId: account.id })
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
