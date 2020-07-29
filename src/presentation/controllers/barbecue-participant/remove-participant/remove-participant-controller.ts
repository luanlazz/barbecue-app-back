import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'
import { serverError, noContent, ok } from '@/presentation/helpers/http/http-helper'

export class RemoveParticipantController implements Controller {
  constructor (private readonly removeParticipants: RemoveParticipant) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const participants = await this.removeParticipants.remove(httpRequest.params.barbecueId, httpRequest.params.participantId)
      return participants.length ? ok(participants) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
