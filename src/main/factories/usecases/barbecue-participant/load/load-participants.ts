import { ParticipantsMongoRepository } from '@/infra/db/mongodb/barbecue-participant-repository/participants'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { DbLoadParticipants } from '@/data/usecases/barbecue-participant/load/load-participants'
import { BarbecueMongoRepository } from '@/infra/db/mongodb/barbecue-repository/barbecue'
import { ApplicationCalculateContribution } from '@/data/usecases/barbecue-participant/calculate/calculate-contribution'

export const makeDbLoadParticipants = (): LoadParticipants => {
  const participantsMongoRepository = new ParticipantsMongoRepository()
  const barbecueMongoRepository = new BarbecueMongoRepository()
  const applicationCalculateContribution = new ApplicationCalculateContribution()
  return new DbLoadParticipants(participantsMongoRepository, barbecueMongoRepository, applicationCalculateContribution)
}
