import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { Controller } from '@/presentation/protocols/controller'
import { serverError, badRequest } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases/account/authentication'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      await this.addAccount.add({
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: httpRequest.body.password
      })

      await this.authentication.auth({
        email: httpRequest.body.email,
        password: httpRequest.body.password
      })

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
