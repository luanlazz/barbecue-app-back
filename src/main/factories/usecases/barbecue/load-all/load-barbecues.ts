import { DbLoadBarbecues } from '@/data/usecases'
import { BarbecueMongoRepository } from '@/infra/db/mongodb'
import { LoadBarbecues } from '@/domain/usecases'

export const makeDbLoadBarbecues = (): LoadBarbecues => {
  const loadBarbecuesRepository = new BarbecueMongoRepository()
  return new DbLoadBarbecues(loadBarbecuesRepository)
}
