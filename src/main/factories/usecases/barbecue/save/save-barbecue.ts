import { SaveBarbecue } from '@/domain/usecases'
import { DbSaveBarbecue } from '@/data/usecases'
import { BarbecueMongoRepository } from '@/infra/db/mongodb'

export const makeDbSaveBarbecue = (): SaveBarbecue => {
  const saveBarbecueRepository = new BarbecueMongoRepository()
  return new DbSaveBarbecue(saveBarbecueRepository)
}
