import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { ObjectId } from 'mongodb'

export class ParticipantsMongoRepository implements SaveParticipantRepository {
  async save (participant: SaveParticipantParams): Promise<void> {
    const participantCollection = await MongoHelper.getCollection('participants')

    if (!participant.participantId) participant.participantId = new ObjectId().toHexString()

    await participantCollection.findOneAndUpdate({
      _id: participant.participantId,
      barbecueId: participant.barbecueId
    }, {
      $set: {
        name: participant.name,
        drink: participant.drink,
        food: participant.food,
        pay: participant.pay
      }
    }, {
      upsert: true
    })

    return null
  }
}
