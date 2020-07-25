import { LogControllerDecorator } from '@/main/decorators/log-decorator'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { Controller } from '@/presentation/protocols/controller'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorControllerRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorControllerRepository)
}
