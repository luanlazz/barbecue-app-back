import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { Controller } from '@/presentation/protocols/controller'
import { serverError } from '@/presentation/helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.addAccount.add({
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: httpRequest.body.password
      })

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
