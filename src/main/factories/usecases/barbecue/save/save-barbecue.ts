import { SaveBarbecue } from '@/domain/usecases/barbecue/save-barbecue'
import { DbSaveBarbecue } from '@/data/usecases/barbecue/save-barbecue'
import { BarbecueMongoRepository } from '@/infra/db/mongodb/barbecue-repository/barbecue'

export const makeDbSaveBarbecue = (): SaveBarbecue => {
  const saveBarbecueRepository = new BarbecueMongoRepository()
  return new DbSaveBarbecue(saveBarbecueRepository)
}
