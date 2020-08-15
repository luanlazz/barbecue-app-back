import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadBarbecueById } from '@/main/factories/usecases'
import { LoadBarbecueByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadBarbecueByIdController = (): Controller => {
  const controller = new LoadBarbecueByIdController(makeDbLoadBarbecueById())
  return makeLogControllerDecorator(controller)
}
