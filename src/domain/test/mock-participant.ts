import { ParticipantModel } from '../models/participant'

export const mockParticipantModel = (): ParticipantModel => ({
  name: 'any_name',
  food: true,
  drink: true,
  pay: false,
  value: 0
})
