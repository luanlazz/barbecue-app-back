import { LogControllerDecorator } from '@/main/decorators/log-decorator'
import { LogMongoRepository } from '@/infra/db/mongodb'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorControllerRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorControllerRepository)
}
