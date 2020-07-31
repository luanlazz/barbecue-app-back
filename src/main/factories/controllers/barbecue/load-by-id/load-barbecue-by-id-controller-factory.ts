import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadBarbecueById } from '@/main/factories/usecases/barbecue/load-by-id/load-barbecue-by-id'
import { LoadBarbecueByIdController } from '@/presentation/controllers/barbecue/load-by-id/load-barbecues-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeLoadBarbecueByIdController = (): Controller => {
  const controller = new LoadBarbecueByIdController(makeDbLoadBarbecueById())
  return makeLogControllerDecorator(controller)
}
