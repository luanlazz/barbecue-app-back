export interface RemoveParticipant {
  remove(barbecueId: string, participantId: string): Promise<boolean>
}
