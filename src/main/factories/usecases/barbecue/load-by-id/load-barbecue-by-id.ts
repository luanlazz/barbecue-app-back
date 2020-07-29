import { BarbecueMongoRepository } from '@/infra/db/mongodb/barbecue-repository/barbecue'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'
import { DbLoadBarbecueById } from '@/data/usecases/barbecue/load-by-id/load-barbecue-by-id'

export const makeDbLoadBarbecueById = (): LoadBarbecueById => {
  const loadBarbecueByIdRepository = new BarbecueMongoRepository()
  return new DbLoadBarbecueById(loadBarbecueByIdRepository)
}
