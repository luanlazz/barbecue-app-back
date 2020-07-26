import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadBarbecues } from '@/domain/usecases/barbecue/list-barbecues'

export class LoadBarbecuesController implements Controller {
  constructor (private readonly loadBarbecues: LoadBarbecues) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadBarbecues.load(httpRequest.accountId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
