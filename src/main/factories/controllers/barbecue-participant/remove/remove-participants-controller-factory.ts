import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbRemoveParticipant } from '@/main/factories/usecases/barbecue-participant/remove/remove-participants'
import { makeDbLoadBarbecueById } from '@/main/factories/usecases/barbecue/load-by-id/load-barbecue-by-id'
import { RemoveParticipantController } from '@/presentation/controllers/barbecue-participant/remove/remove-participant-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeDbLoadParticipantById } from '@/main/factories/usecases/barbecue-participant/load-by-id/load-participant-by-id'

export const makeRemoveParticipantController = (): Controller => {
  const controller = new RemoveParticipantController(makeDbLoadBarbecueById(), makeDbLoadParticipantById(), makeDbRemoveParticipant())
  return makeLogControllerDecorator(controller)
}
