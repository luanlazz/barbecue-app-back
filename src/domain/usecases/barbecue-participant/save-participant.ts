export type SaveParticipantParams = {
  barbecueId: string
  participantId: string
  name: string
  food: boolean
  drink: boolean
  pay: boolean
}

export interface SaveParticipant {
  save (participant: SaveParticipantParams): Promise<void>
}
