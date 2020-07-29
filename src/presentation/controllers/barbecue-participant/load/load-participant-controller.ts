import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { serverError, noContent, ok } from '@/presentation/helpers/http/http-helper'

export class LoadParticipantsController implements Controller {
  constructor (private readonly loadParticipants: LoadParticipants) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const participants = await this.loadParticipants.load(httpRequest.params.barbecueId)
      return participants.length ? ok(participants) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
