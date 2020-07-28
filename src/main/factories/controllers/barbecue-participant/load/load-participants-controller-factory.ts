import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadParticipants } from '@/main/factories/usecases/barbecue-participant/load/load-participants'
import { LoadParticipantsController } from '@/presentation/controllers/barbecue-participant/load-participants/load-participant-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeLoadParticipantsController = (): Controller => {
  const controller = new LoadParticipantsController(makeDbLoadParticipants())
  return makeLogControllerDecorator(controller)
}
