import { makeSaveBarbecueValidation } from './save-barbecue-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbSaveBarbecue } from '@/main/factories/usecases/barbecue/save/save-barbecue'
import { SaveBarbecueController } from '@/presentation/controllers/barbecue/save/save-barbecue-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeSaveBarbecueController = (): Controller => {
  const controller = new SaveBarbecueController(makeSaveBarbecueValidation(), makeDbSaveBarbecue())
  return makeLogControllerDecorator(controller)
}
