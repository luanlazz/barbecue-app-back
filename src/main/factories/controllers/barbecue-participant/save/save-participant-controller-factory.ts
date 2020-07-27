import { makeSaveParticipantValidation } from './save-participant-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbSaveParticipant } from '@/main/factories/usecases/barbecue-participant/save/save-participant'
import { SaveParticipantController } from '@/presentation/controllers/barbecue-participant/save/save-participant-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeSaveParticipantController = (): Controller => {
  const controller = new SaveParticipantController(makeSaveParticipantValidation(), makeDbSaveParticipant())
  return makeLogControllerDecorator(controller)
}
