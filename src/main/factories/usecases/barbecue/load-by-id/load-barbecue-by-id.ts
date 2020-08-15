import { BarbecueMongoRepository } from '@/infra/db/mongodb'
import { LoadBarbecueById } from '@/domain/usecases'
import { DbLoadBarbecueById } from '@/data/usecases'

export const makeDbLoadBarbecueById = (): LoadBarbecueById => {
  const loadBarbecueByIdRepository = new BarbecueMongoRepository()
  return new DbLoadBarbecueById(loadBarbecueByIdRepository)
}
