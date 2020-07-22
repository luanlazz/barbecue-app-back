import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { Controller } from '@/presentation/protocols/controller'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addAccount.add({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })

    return null
  }
}
