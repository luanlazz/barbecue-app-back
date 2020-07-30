import { ParticipantsMongoRepository } from '@/infra/db/mongodb/barbecue-participant-repository/participants'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'
import { DbRemoveParticipant } from '@/data/usecases/barbecue-participant/remove/remove-participant'

export const makeDbRemoveParticipant = (): RemoveParticipant => {
  const participantsMongoRepository = new ParticipantsMongoRepository()
  return new DbRemoveParticipant(participantsMongoRepository)
}
