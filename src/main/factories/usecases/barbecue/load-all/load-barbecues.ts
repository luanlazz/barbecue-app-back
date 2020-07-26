import { DbLoadBarbecues } from '@/data/usecases/barbecue/load-barbecues/load-barbecue'
import { BarbecueMongoRepository } from '@/infra/db/mongodb/barbecue-repository/barbecue'
import { LoadBarbecues } from '@/domain/usecases/barbecue/list-barbecues'

export const makeDbLoadBarbecues = (): LoadBarbecues => {
  const loadBarbecuesRepository = new BarbecueMongoRepository()
  return new DbLoadBarbecues(loadBarbecuesRepository)
}
