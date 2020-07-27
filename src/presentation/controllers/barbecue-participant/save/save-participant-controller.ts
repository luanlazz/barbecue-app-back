import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { SaveParticipant } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'

export class SaveParticipantController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveParticipant: SaveParticipant,
    private readonly loadBarbecueById: LoadBarbecueById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, food, drink, pay } = httpRequest.body
      const { barbecueId, participantId } = httpRequest.params

      const participants = await this.saveParticipant.save({ barbecueId, participantId, name, food, drink, pay })

      await this.loadBarbecueById.loadById(barbecueId)

      return ok(participants)
    } catch (error) {
      return serverError(error)
    }
  }
}
