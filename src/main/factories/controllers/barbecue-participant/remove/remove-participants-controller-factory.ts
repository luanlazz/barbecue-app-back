import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbRemoveParticipant } from '@/main/factories/usecases/barbecue-participant/remove/remove-participants'
import { makeDbLoadBarbecueById } from '@/main/factories/usecases/barbecue/load-by-id/load-barbecue-by-id'
import { RemoveParticipantController } from '@/presentation/controllers/barbecue-participant/remove/remove-participant-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeRemoveParticipantController = (): Controller => {
  const controller = new RemoveParticipantController(makeDbLoadBarbecueById(), makeDbRemoveParticipant())
  return makeLogControllerDecorator(controller)
}
