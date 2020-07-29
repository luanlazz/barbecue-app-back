import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, serverError, noContent, forbidden } from '@/presentation/helpers/http/http-helper'
import { SaveParticipant } from '@/domain/usecases/barbecue-participant/save-participant'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'
import { SaveBarbecue } from '@/domain/usecases/barbecue/save-barbecue'
import { InvalidParamError } from '@/presentation/errors'

export class SaveParticipantController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadBarbecueById: LoadBarbecueById,
    private readonly saveParticipant: SaveParticipant,
    private readonly saveBarbecue: SaveBarbecue
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, food, drink, pay } = httpRequest.body
      const { barbecueId, participantId } = httpRequest.params
      const { accountId } = httpRequest

      const barbecue = await this.loadBarbecueById.loadById(barbecueId)
      if (!barbecue) return forbidden(new InvalidParamError('barbecueId'))

      await this.saveParticipant.save({ barbecueId, participantId, name, food, drink, pay })

      await this.saveBarbecue.save({
        barbecueId,
        accountId,
        date: barbecue.date,
        description: barbecue.description,
        observation: barbecue.observation,
        numParticipants: barbecue.numParticipants + 1,
        valueSuggestDrink: barbecue.valueSuggestDrink,
        valueSuggestFood: barbecue.valueSuggestFood,
        valueTotal: barbecue.valueTotal,
        valueCollected: barbecue.valueCollected
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
