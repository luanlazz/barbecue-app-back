import { ParticipantsMongoRepository } from '@/infra/db/mongodb'
import { RemoveParticipant } from '@/domain/usecases'
import { DbRemoveParticipant } from '@/data/usecases'

export const makeDbRemoveParticipant = (): RemoveParticipant => {
  const participantsMongoRepository = new ParticipantsMongoRepository()
  return new DbRemoveParticipant(participantsMongoRepository)
}
