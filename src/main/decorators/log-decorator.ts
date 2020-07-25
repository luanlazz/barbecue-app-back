import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse, HttpRequest } from '@/presentation/protocols/http'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
