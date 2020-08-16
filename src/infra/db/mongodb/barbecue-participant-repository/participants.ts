import { SaveParticipantRepository, LoadParticipantsByBqRepository, RemoveParticipantRepository, LoadParticipantsByIdRepository } from '@/data/protocols/db'
import { SaveParticipantParams } from '@/domain/usecases'
import { ParticipantModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db/mongodb'
import { ObjectId } from 'mongodb'

export class ParticipantsMongoRepository implements SaveParticipantRepository,
                                                    LoadParticipantsByIdRepository,
                                                    LoadParticipantsByBqRepository,
                                                    RemoveParticipantRepository {
  async save (participant: SaveParticipantParams): Promise<ParticipantModel> {
    const participantCollection = await MongoHelper.getCollection('participants')

    if (!participant.participantId) participant.participantId = new ObjectId().toHexString()

    const result = await participantCollection.findOneAndUpdate({
      _id: new ObjectId(participant.participantId),
      barbecueId: new ObjectId(participant.barbecueId)
    }, {
      $set: {
        name: participant.name,
        pay: participant.pay,
        value: participant.value
      }
    }, {
      upsert: true,
      returnOriginal: false
    })

    return result.value && MongoHelper.map(result.value)
  }

  async loadById (participantId: string): Promise<ParticipantModel> {
    const participantCollection = await MongoHelper.getCollection('participants')

    const participant = await participantCollection.findOne({
      _id: new ObjectId(participantId)
    })

    return participant && MongoHelper.map(participant)
  }

  async load (barbecueId: string): Promise<ParticipantModel[]> {
    const participantCollection = await MongoHelper.getCollection('participants')

    const participants = await participantCollection.find({
      barbecueId: new ObjectId(barbecueId)
    }).toArray()

    return MongoHelper.mapCollection(participants)
  }

  async remove (barbecueId: string, participantId: string): Promise<boolean> {
    const participantCollection = await MongoHelper.getCollection('participants')

    const participant = await participantCollection.deleteOne({
      _id: new ObjectId(participantId),
      barbecueId: new ObjectId(barbecueId)
    })

    return !!participant.deletedCount
  }
}
