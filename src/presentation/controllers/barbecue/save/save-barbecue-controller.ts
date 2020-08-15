import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers'
import { SaveBarbecue } from '@/domain/usecases'

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
      const { date, description, observation, valueSuggestDrink, valueSuggestFood } = httpRequest.body

      const barbecue = await this.saveBarbecue.save({
        barbecueId,
        accountId,
        date,
        description,
        observation,
        valueSuggestDrink: valueSuggestDrink || 0,
        valueSuggestFood: valueSuggestFood || 0
      })

      return ok(barbecue)
    } catch (error) {
      return serverError(error)
    }
  }
}
