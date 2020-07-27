import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { ObjectId } from 'mongodb'
import { ParticipantModel } from '@/domain/models/participant'
import { QueryBuilder } from '../helpers/query-builder'

export class ParticipantsMongoRepository implements SaveParticipantRepository,
                                                    LoadParticipantsByBqRepository {
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

  async load (barbecueId: string): Promise<ParticipantModel[]> {
    const participantCollection = await MongoHelper.getCollection('participants')
    const participantsRes = await participantCollection.find({
      barbecueId: barbecueId
    }).toArray()

    const { valueTotalDrink, valueTotalFood } = await this.getTotal(barbecueId)
    const countDrink = participantsRes.filter(participant => participant.drink)
    const countFood = participantsRes.filter(participant => participant.food)

    const drinkDivide = valueTotalDrink / countDrink.length
    const foodDivide = valueTotalFood / countFood.length

    const participantsCalculate = participantsRes.map(participant => (
      {
        ...participant,
        value: this.calculateContribution(drinkDivide, foodDivide, participant.drink, participant.food)
      }
    ))

    return participantsCalculate
  }

  calculateContribution (valueDrink: number, valueFood: number, drink: boolean, food: boolean): number {
    const drinkTotal = drink ? valueDrink : 0
    const foodTotal = food ? valueFood : 0
    return drinkTotal + foodTotal
  }

  async getTotal (barbecueId: string): Promise<any> {
    const barbecuesCollection = await MongoHelper.getCollection('barbecues')

    const query = new QueryBuilder()
      .match({
        _id: new ObjectId(barbecueId)
      })
      .project({
        valueTotalDrink: 1,
        valueTotalFood: 1,
        _id: 0
      })
      .build()

    const surveyResult = await barbecuesCollection.aggregate(query).toArray()
    return surveyResult[0]
  }
}
