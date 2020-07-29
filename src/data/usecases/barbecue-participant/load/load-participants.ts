import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { ParticipantModel } from '@/domain/models/participant'

export class DbLoadParticipants implements LoadParticipants {
  constructor (
    private readonly loadParticipantsByBqRepository: LoadParticipantsByBqRepository
  ) {}

  async load (barbecueId: string): Promise<ParticipantModel[]> {
    const participants = await this.loadParticipantsByBqRepository.load(barbecueId)
    return participants
  }
}
