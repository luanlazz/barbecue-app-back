import { LoadBarbecueByIdRepository, SaveBarbecueRepository, LoadBarbecuesRepository } from '@/data/protocols/db'
import { barbecueParams } from '@/domain/usecases'
import { BarbecueModel } from '@/domain/models'
import { QueryBuilder, MongoHelper } from '@/infra/db/mongodb'
import { ObjectId } from 'mongodb'

export class BarbecueMongoRepository implements SaveBarbecueRepository,
                                                LoadBarbecuesRepository,
                                                LoadBarbecueByIdRepository {
  async save (barbecue: barbecueParams): Promise<BarbecueModel> {
    const barbecueCollection = await MongoHelper.getCollection('barbecues')

    if (!barbecue.barbecueId) barbecue.barbecueId = new ObjectId().toHexString()

    const result = await barbecueCollection.findOneAndUpdate({
      _id: new ObjectId(barbecue.barbecueId),
      accountId: new ObjectId(barbecue.accountId)
    }, {
      $set: {
        date: new Date(barbecue.date),
        description: barbecue.description,
        observation: barbecue.observation,
        valueSuggestDrink: barbecue.valueSuggestDrink,
        valueSuggestFood: barbecue.valueSuggestFood
      }
    }, {
      upsert: true,
      returnOriginal: false
    })

    return MongoHelper.map(this.manipulateResult(result.value))
  }

  async loadAll (accountId: string): Promise<BarbecueModel[]> {
    const barbecueCollection = await MongoHelper.getCollection('barbecues')
    const query = new QueryBuilder()
      .match({
        accountId: new ObjectId(accountId)
      })
      .lookup({
        from: 'participants',
        localField: '_id',
        foreignField: 'barbecueId',
        as: 'participants'
      })
      .project({
        date: 1,
        description: 1,
        observation: 1,
        valueSuggestDrink: 1,
        valueSuggestFood: 1,
        valueTotal: {
          $reduce: {
            input: '$participants',
            initialValue: '$value',
            in: {
              $sum: ['$participants.value']
            }
          }
        },
        numParticipants: {
          $size: '$participants'
        },
        paid: {
          $filter: {
            input: '$participants',
            as: 'item',
            cond: {
              $eq: ['$$item.pay', true]
            }
          }
        }
      })
      .project({
        date: 1,
        description: 1,
        observation: 1,
        valueSuggestDrink: 1,
        valueSuggestFood: 1,
        valueTotal: 1,
        numParticipants: 1,
        valueCollected: {
          $reduce: {
            input: '$paid',
            initialValue: '$value',
            in: {
              $sum: ['$paid.value']
            }
          }
        }
      })
      .build()

    const barbecues = await barbecueCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(barbecues.map(barbecue => this.manipulateResult(barbecue)))
  }

  async loadById (barbecueId: string): Promise<BarbecueModel> {
    const barbecueCollection = await MongoHelper.getCollection('barbecues')
    const query = new QueryBuilder()
      .match({
        _id: new ObjectId(barbecueId)
      })
      .lookup({
        from: 'participants',
        localField: '_id',
        foreignField: 'barbecueId',
        as: 'participants'
      })
      .project({
        date: 1,
        description: 1,
        observation: 1,
        valueSuggestDrink: 1,
        valueSuggestFood: 1,
        valueTotal: {
          $reduce: {
            input: '$participants',
            initialValue: '$value',
            in: {
              $sum: ['$participants.value']
            }
          }
        },
        numParticipants: {
          $size: '$participants'
        },
        paid: {
          $filter: {
            input: '$participants',
            as: 'item',
            cond: {
              $eq: ['$$item.pay', true]
            }
          }
        }
      })
      .project({
        date: 1,
        description: 1,
        observation: 1,
        valueSuggestDrink: 1,
        valueSuggestFood: 1,
        valueTotal: 1,
        numParticipants: 1,
        valueCollected: {
          $reduce: {
            input: '$paid',
            initialValue: '$value',
            in: {
              $sum: ['$paid.value']
            }
          }
        }
      })
      .build()

    const barbecue = await barbecueCollection.aggregate(query).toArray()
    return barbecue[0] ? MongoHelper.map(this.manipulateResult(barbecue[0])) : null
  }

  manipulateResult (barbecue: BarbecueModel): BarbecueModel {
    return ({
      ...barbecue,
      numParticipants: barbecue.numParticipants || 0,
      valueSuggestDrink: barbecue.valueSuggestDrink || 0,
      valueSuggestFood: barbecue.valueSuggestFood || 0,
      valueTotal: barbecue.valueTotal || 0,
      valueCollected: barbecue.valueCollected || 0
    })
  }
}
