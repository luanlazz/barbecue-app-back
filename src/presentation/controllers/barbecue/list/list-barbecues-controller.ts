import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { LoadBarbecues } from '@/domain/usecases/barbecue/list-barbecues'

export class LoadBarbecuesController implements Controller {
  constructor (private readonly loadBarbecues: LoadBarbecues) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadBarbecues.load(httpRequest.accountId)
    return null
  }
}
