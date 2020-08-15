import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, forbidden, ok } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { LoadBarbecueById } from '@/domain/usecases'

export class LoadBarbecueByIdController implements Controller {
  constructor (private readonly loadBarbecueById: LoadBarbecueById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const barbecue = await this.loadBarbecueById.loadById(httpRequest.params.barbecueId)
      if (!barbecue) return forbidden(new InvalidParamError('barbecueId'))

      return ok(barbecue)
    } catch (error) {
      return serverError(error)
    }
  }
}
