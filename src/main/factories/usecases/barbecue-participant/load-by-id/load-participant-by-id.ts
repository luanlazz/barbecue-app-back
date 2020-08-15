import { ParticipantsMongoRepository } from '@/infra/db/mongodb'
import { LoadParticipantById } from '@/domain/usecases'
import { DbLoadParticipantById } from '@/data/usecases'

export const makeDbLoadParticipantById = (): LoadParticipantById => {
  const participantsMongoRepository = new ParticipantsMongoRepository()
  return new DbLoadParticipantById(participantsMongoRepository)
}
