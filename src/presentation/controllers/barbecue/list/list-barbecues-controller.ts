import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { serverError, noContent, ok } from '@/presentation/helpers/http/http-helper'
import { LoadBarbecues } from '@/domain/usecases/barbecue/list-barbecues'

export class LoadBarbecuesController implements Controller {
  constructor (private readonly loadBarbecues: LoadBarbecues) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const barbecues = await this.loadBarbecues.load(httpRequest.accountId)
      return barbecues.length ? ok(barbecues) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
