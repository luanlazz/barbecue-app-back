import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadBarbecues } from '@/main/factories/usecases'
import { Controller } from '@/presentation/protocols'
import { LoadBarbecuesController } from '@/presentation/controllers'

export const makeLoadBarbecuesController = (): Controller => {
  const controller = new LoadBarbecuesController(makeDbLoadBarbecues())
  return makeLogControllerDecorator(controller)
}
