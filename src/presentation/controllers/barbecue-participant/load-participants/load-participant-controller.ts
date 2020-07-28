import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { serverError } from '@/presentation/helpers/http/http-helper'

export class LoadParticipantsController implements Controller {
  constructor (private readonly loadParticipants: LoadParticipants) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadParticipants.load(httpRequest.params.barbecueId)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
