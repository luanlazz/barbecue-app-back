import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'

export class RemoveParticipantController implements Controller {
  constructor (private readonly removeParticipants: RemoveParticipant) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.removeParticipants.remove(httpRequest.params.barbecueId, httpRequest.params.participantId)
    return Promise.resolve(null)
  }
}
