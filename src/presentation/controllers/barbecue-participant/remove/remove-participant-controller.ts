import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'

export class RemoveParticipantController implements Controller {
  constructor (
    private readonly loadBarbecueById: LoadBarbecueById,
    private readonly removeParticipants: RemoveParticipant
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { barbecueId, participantId } = httpRequest.params

      await this.loadBarbecueById.loadById(barbecueId)

      await this.removeParticipants.remove(barbecueId, participantId)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
