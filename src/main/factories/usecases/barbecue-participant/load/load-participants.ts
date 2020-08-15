import { ParticipantsMongoRepository } from '@/infra/db/mongodb'
import { LoadParticipants } from '@/domain/usecases'
import { DbLoadParticipants } from '@/data/usecases'

export const makeDbLoadParticipants = (): LoadParticipants => {
  const participantsMongoRepository = new ParticipantsMongoRepository()
  return new DbLoadParticipants(participantsMongoRepository)
}
