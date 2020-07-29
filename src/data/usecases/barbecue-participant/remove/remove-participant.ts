import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'
import { RemoveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-remove-participant'

export class DbRemoveParticipant implements RemoveParticipant {
  constructor (
    private readonly removeParticipantRepository: RemoveParticipantRepository
  ) {}

  async remove (barbecueId: string, participantId: string): Promise<number> {
    const count = await this.removeParticipantRepository.remove(barbecueId, participantId)
    return count
  }
}
