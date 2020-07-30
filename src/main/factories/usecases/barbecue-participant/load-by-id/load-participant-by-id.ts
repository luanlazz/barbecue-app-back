import { ParticipantsMongoRepository } from '@/infra/db/mongodb/barbecue-participant-repository/participants'
import { LoadParticipantById } from '@/domain/usecases/barbecue-participant/load-participant-by-id'
import { DbLoadParticipantById } from '@/data/usecases/barbecue-participant/load-by-id/load-by-id-participant'

export const makeDbLoadParticipantById = (): LoadParticipantById => {
  const participantsMongoRepository = new ParticipantsMongoRepository()
  return new DbLoadParticipantById(participantsMongoRepository)
}
