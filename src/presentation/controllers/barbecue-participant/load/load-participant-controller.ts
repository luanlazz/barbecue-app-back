import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols'
import { serverError, noContent, ok, forbidden } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { LoadParticipants, LoadBarbecueById } from '@/domain/usecases'

export class LoadParticipantsController implements Controller {
  constructor (
    private readonly loadBarbecueById: LoadBarbecueById,
    private readonly loadParticipants: LoadParticipants
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const barbecue = await this.loadBarbecueById.loadById(httpRequest.params.barbecueId)
      if (!barbecue) return forbidden(new InvalidParamError('barbecueId'))

      const participants = await this.loadParticipants.load(httpRequest.params.barbecueId)

      return participants.length ? ok(participants) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
