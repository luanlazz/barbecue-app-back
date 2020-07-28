import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'

export class LoadParticipantsController implements Controller {
  constructor (private readonly loadParticipants: LoadParticipants) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadParticipants.load(httpRequest.params.barbecueId)
    return Promise.resolve(null)
  }
}
