import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadParticipants, makeDbLoadBarbecueById } from '@/main/factories/usecases'
import { LoadParticipantsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadParticipantsController = (): Controller => {
  const controller = new LoadParticipantsController(makeDbLoadBarbecueById(), makeDbLoadParticipants())
  return makeLogControllerDecorator(controller)
}
