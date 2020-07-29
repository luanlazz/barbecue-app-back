import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { SaveBarbecue } from '@/domain/usecases/barbecue/save-barbecue'

export class SaveBarbecueController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveBarbecue: SaveBarbecue
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { barbecueId } = httpRequest.params
      const { accountId } = httpRequest
      const { date, description, observation, numParticipants, valueTotalDrink, valueTotalFood, valueCollected } = httpRequest.body

      const barbecue = await this.saveBarbecue.save({
        barbecueId,
        accountId,
        date,
        description,
        observation,
        numParticipants: numParticipants || 0,
        valueTotalDrink: valueTotalDrink || 0,
        valueTotalFood: valueTotalFood || 0,
        valueCollected: valueCollected || 0
      })

      return ok(barbecue)
    } catch (error) {
      return serverError(error)
    }
  }
}
