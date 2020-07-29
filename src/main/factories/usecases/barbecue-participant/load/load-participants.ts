import { ParticipantsMongoRepository } from '@/infra/db/mongodb/barbecue-participant-repository/participants'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { DbLoadParticipants } from '@/data/usecases/barbecue-participant/load/load-participants'

export const makeDbLoadParticipants = (): LoadParticipants => {
  const participantsMongoRepository = new ParticipantsMongoRepository()
  return new DbLoadParticipants(participantsMongoRepository)
}
