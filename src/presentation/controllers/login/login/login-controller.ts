import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Authentication } from '@/domain/usecases/account/authentication'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      await this.authentication.auth({
        email: httpRequest.body.email,
        password: httpRequest.body.password
      })

      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
