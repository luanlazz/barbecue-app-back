import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const logErrorCollection = await MongoHelper.getCollection('logErrors')
    await await logErrorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
