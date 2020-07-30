import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { serverError, noContent, forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'
import { LoadParticipantById } from '@/domain/usecases/barbecue-participant/load-participant-by-id'

export class RemoveParticipantController implements Controller {
  constructor (
    private readonly loadBarbecueById: LoadBarbecueById,
    private readonly loadParticipantById: LoadParticipantById,
    private readonly removeParticipants: RemoveParticipant
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { barbecueId, participantId } = httpRequest.params

      const barbecue = await this.loadBarbecueById.loadById(barbecueId)
      if (!barbecue) return forbidden(new InvalidParamError('barbecueId'))

      const participant = await this.loadParticipantById.loadById(participantId)
      if (!participant) return forbidden(new InvalidParamError('participantId'))

      await this.removeParticipants.remove(barbecueId, participantId)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
