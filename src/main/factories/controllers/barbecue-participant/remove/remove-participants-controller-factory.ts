import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbRemoveParticipant, makeDbLoadBarbecueById, makeDbLoadParticipantById } from '@/main/factories/usecases'
import { RemoveParticipantController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeRemoveParticipantController = (): Controller => {
  const controller = new RemoveParticipantController(makeDbLoadBarbecueById(), makeDbLoadParticipantById(), makeDbRemoveParticipant())
  return makeLogControllerDecorator(controller)
}
