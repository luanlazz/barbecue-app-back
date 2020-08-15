import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, noContent, forbidden, serviceUnavailable } from '@/presentation/helpers'
import { InvalidParamError, UnexpectedError } from '@/presentation/errors'
import { RemoveParticipant, LoadBarbecueById, LoadParticipantById } from '@/domain/usecases'

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

      const remove = await this.removeParticipants.remove(barbecueId, participantId)
      if (!remove) return serviceUnavailable(new UnexpectedError('remove participant'))

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
