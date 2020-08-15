import { SaveParticipant } from '@/domain/usecases'
import { DbSaveParticipant } from '@/data/usecases'
import { ParticipantsMongoRepository } from '@/infra/db/mongodb'

export const makeDbSaveParticipant = (): SaveParticipant => {
  const participantsMongoRepository = new ParticipantsMongoRepository()
  return new DbSaveParticipant(participantsMongoRepository)
}
