import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { ParticipantModel } from '@/domain/models/participant'
import { LoadBarbecueByIdRepository } from '@/data/protocols/db/barbecue/load-barbecue-by-id-repository'
import { CalculateContribution } from '@/domain/usecases/barbecue-participant/calculate-contribution'

export class DbLoadParticipants implements LoadParticipants {
  constructor (
    private readonly loadParticipantsByBqRepository: LoadParticipantsByBqRepository,
    private readonly loadBarbecueByIdRepository: LoadBarbecueByIdRepository,
    private readonly calculateContribution: CalculateContribution
  ) {}

  async load (barbecueId: string): Promise<ParticipantModel[]> {
    const participants = await this.loadParticipantsByBqRepository.load(barbecueId)
    const barbecue = await this.loadBarbecueByIdRepository.loadById(barbecueId)
    this.calculateContribution.calculate(barbecue, participants)
    return participants
  }
}
