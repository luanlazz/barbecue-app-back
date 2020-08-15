import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, noContent, ok } from '@/presentation/helpers'
import { LoadBarbecues } from '@/domain/usecases'

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
