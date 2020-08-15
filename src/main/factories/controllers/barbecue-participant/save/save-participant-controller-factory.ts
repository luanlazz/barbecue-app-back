import { makeSaveParticipantValidation } from './save-participant-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadBarbecueById, makeDbSaveParticipant } from '@/main/factories/usecases'
import { SaveParticipantController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveParticipantController = (): Controller => {
  const controller = new SaveParticipantController(makeSaveParticipantValidation(), makeDbLoadBarbecueById(), makeDbSaveParticipant())
  return makeLogControllerDecorator(controller)
}
