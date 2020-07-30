import { ParticipantModel } from '@/domain/models/participant'

export type SaveParticipantParams = {
  barbecueId: string
  participantId: string
  name: string
  pay: boolean
  value: number
}

export interface SaveParticipant {
  save (participant: SaveParticipantParams): Promise<ParticipantModel>
}
