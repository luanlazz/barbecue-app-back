import { SaveParticipant } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { DbSaveParticipant } from '@/data/usecases/barbecue-participant/save/save-barbecue-participant'
import { ParticipantsMongoRepository } from '@/infra/db/mongodb/barbecue-participant-repository/participants'

export const makeDbSaveParticipant = (): SaveParticipant => {
  const participantsMongoRepository = new ParticipantsMongoRepository()
  return new DbSaveParticipant(participantsMongoRepository, participantsMongoRepository)
}
