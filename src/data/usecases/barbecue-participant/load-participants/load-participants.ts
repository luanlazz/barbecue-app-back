import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { ParticipantModel } from '@/domain/models/participant'
import { LoadBarbecueByIdRepository } from '@/data/protocols/db/barbecue/load-barbecue-by-id-repository'

export class DbLoadParticipants implements LoadParticipants {
  constructor (
    private readonly loadParticipantsByBqRepository: LoadParticipantsByBqRepository,
    private readonly loadBarbecueByIdRepository: LoadBarbecueByIdRepository
  ) {}

  async load (barbecueId: string): Promise<ParticipantModel[]> {
    const participants = await this.loadParticipantsByBqRepository.load(barbecueId)
    await this.loadBarbecueByIdRepository.loadById(barbecueId)
    return participants
  }
}
