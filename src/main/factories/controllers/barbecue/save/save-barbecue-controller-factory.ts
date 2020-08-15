import { makeSaveBarbecueValidation } from './save-barbecue-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbSaveBarbecue } from '@/main/factories/usecases'
import { SaveBarbecueController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols/controller'

export const makeSaveBarbecueController = (): Controller => {
  const controller = new SaveBarbecueController(makeSaveBarbecueValidation(), makeDbSaveBarbecue())
  return makeLogControllerDecorator(controller)
}
