import { Middleware } from '@/presentation/protocols/middleware'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(forbidden(new AccessDeniedError()))
  }
}
