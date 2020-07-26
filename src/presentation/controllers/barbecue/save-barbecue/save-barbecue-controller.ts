import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
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

      const { date, description, observation, valueTotalDrink, valueTotalFood } = httpRequest.body

      await this.saveBarbecue.save({ date, description, observation, valueTotalDrink, valueTotalFood })

      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
