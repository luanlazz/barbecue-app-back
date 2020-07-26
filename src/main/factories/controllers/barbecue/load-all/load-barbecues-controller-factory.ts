import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadBarbecues } from '@/main/factories/usecases/barbecue/load-all/load-barbecues'
import { Controller } from '@/presentation/protocols/controller'
import { LoadBarbecuesController } from '@/presentation/controllers/barbecue/list/list-barbecues-controller'

export const makeLoadBarbecuesController = (): Controller => {
  const controller = new LoadBarbecuesController(makeDbLoadBarbecues())
  return makeLogControllerDecorator(controller)
}
