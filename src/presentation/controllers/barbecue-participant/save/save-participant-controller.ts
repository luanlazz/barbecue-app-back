import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { SaveParticipant } from '@/domain/usecases/barbecue-participant/save-participant'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'
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
