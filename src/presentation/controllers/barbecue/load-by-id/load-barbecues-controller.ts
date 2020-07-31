import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'
import { serverError } from '@/presentation/helpers/http/http-helper'

export class LoadBarbecueByIdController implements Controller {
  constructor (private readonly loadBarbecueById: LoadBarbecueById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadBarbecueById.loadById(httpRequest.params.barbecueId)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
