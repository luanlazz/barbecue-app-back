export type SaveParticipantParams = {
  barbecueId: string
  participantId: string
  name: string
  pay: boolean
  value: number
}

export type SaveParticipantReturn = {
  oldParticipant: any
  status: boolean
}

export interface SaveParticipant {
  save (participant: SaveParticipantParams): Promise<SaveParticipantReturn>
}
