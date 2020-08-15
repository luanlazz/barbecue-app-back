import { RemoveParticipantRepository } from '@/data/protocols/db'
import { RemoveParticipant } from '@/domain/usecases'

export class DbRemoveParticipant implements RemoveParticipant {
  constructor (
    private readonly removeParticipantRepository: RemoveParticipantRepository
  ) {}

  async remove (barbecueId: string, participantId: string): Promise<boolean> {
    const result = await this.removeParticipantRepository.remove(barbecueId, participantId)
    return !!result
  }
}
