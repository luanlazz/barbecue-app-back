import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { Controller } from '@/presentation/protocols/controller'
import { serverError, badRequest, forbidden } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases/account/authentication'
import { EmailInUseError } from '@/presentation/errors'

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

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({ name, email, password })
      if (!account) {
        return forbidden(new EmailInUseError())
      }

      await this.authentication.auth({ email, password })

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
