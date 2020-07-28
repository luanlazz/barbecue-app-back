import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SaveBarbecueRepository } from '@/data/protocols/db/barbecue/save-barbecue-repository'
import { barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'
import { BarbecueModel } from '@/domain/models/barbecue'
import { ObjectId } from 'mongodb'
import { LoadBarbecuesRepository } from '@/data/protocols/db/barbecue/load-barbecue-repository'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'

export class BarbecueMongoRepository implements SaveBarbecueRepository,
                                                LoadBarbecuesRepository,
                                                LoadBarbecueById {
  async save (barbecue: barbecueParams): Promise<BarbecueModel> {
    const barbecueCollection = await MongoHelper.getCollection('barbecues')

    if (!barbecue.barbecueId) barbecue.barbecueId = new ObjectId().toHexString()

    const result = await barbecueCollection.findOneAndUpdate({
      _id: new ObjectId(barbecue.barbecueId),
      accountId: new ObjectId(barbecue.accountId)
    }, {
      $set: {
        date: barbecue.date,
        description: barbecue.description,
        observation: barbecue.observation,
        valueTotalDrink: barbecue.valueTotalDrink,
        valueTotalFood: barbecue.valueTotalFood
      }
    }, {
      upsert: true,
      returnOriginal: false
    })

    return MongoHelper.map(result.value)
  }

  async loadAll (accountId: string): Promise<BarbecueModel[]> {
    const barbecueCollection = await MongoHelper.getCollection('barbecues')
    const barbecues = await barbecueCollection.find({
      accountId: new ObjectId(accountId)
    }).toArray()
    return MongoHelper.mapCollection(barbecues)
  }

  async loadById (barbecueId: string): Promise<BarbecueModel> {
    const barbecueCollection = await MongoHelper.getCollection('barbecues')
    const barbecue = await barbecueCollection.findOne({
      _id: new ObjectId(barbecueId)
    })
    return barbecue && MongoHelper.map(barbecue)
  }
}
