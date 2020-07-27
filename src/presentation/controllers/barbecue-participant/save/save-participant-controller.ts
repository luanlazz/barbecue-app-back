import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { SaveParticipant } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'

export class SaveParticipantController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveParticipant: SaveParticipant
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, food, drink, pay } = httpRequest.body
      const { barbecueId, participantId } = httpRequest.params

      const participants = await this.saveParticipant.save({ barbecueId, participantId, name, food, drink, pay })

      return ok(participants)
    } catch (error) {
      return serverError(error)
    }
  }
}