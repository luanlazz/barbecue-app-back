export interface RemoveParticipantRepository {
  remove (barbecueId: string, participantId: string): Promise<boolean>
}
