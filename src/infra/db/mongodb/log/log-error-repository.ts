import { LogErrorRepository } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db/mongodb'

export class LogMongoRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const logErrorCollection = await MongoHelper.getCollection('logErrors')
    await await logErrorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
