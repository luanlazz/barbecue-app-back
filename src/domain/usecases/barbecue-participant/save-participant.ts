export type SaveParticipantParams = {
  barbecueId: string
  participantId: string
  name: string
  pay: boolean
  value: number
}

export interface SaveParticipant {
  save (participant: SaveParticipantParams): Promise<boolean>
}
