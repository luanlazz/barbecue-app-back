import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers'
import { SaveParticipant, LoadBarbecueById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class SaveParticipantController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadBarbecueById: LoadBarbecueById,
    private readonly saveParticipant: SaveParticipant
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { id, name, pay, value } = httpRequest.body
      const { barbecueId, participantId } = httpRequest.params

      const barbecue = await this.loadBarbecueById.loadById(barbecueId)
      if (!barbecue) return forbidden(new InvalidParamError('barbecueId'))

      const participant = await this.saveParticipant.save({ barbecueId, participantId: participantId || id, name, pay, value })

      return ok(participant)
    } catch (error) {
      return serverError(error)
    }
  }
}
