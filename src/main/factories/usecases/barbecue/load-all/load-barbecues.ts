import { DbLoadBarbecues } from '@/data/usecases/barbecue/load/load-barbecue'
import { BarbecueMongoRepository } from '@/infra/db/mongodb/barbecue-repository/barbecue'
import { LoadBarbecues } from '@/domain/usecases/barbecue/load-barbecues'

export const makeDbLoadBarbecues = (): LoadBarbecues => {
  const loadBarbecuesRepository = new BarbecueMongoRepository()
  return new DbLoadBarbecues(loadBarbecuesRepository)
}
