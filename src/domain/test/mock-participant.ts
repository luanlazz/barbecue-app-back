import { ParticipantModel } from '@/domain/models/participant'
import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-participant'

export const mockParticipantModel = (): ParticipantModel => ({
  id: 'any_participant_id',
  name: 'any_name',
  food: true,
  drink: true,
  pay: false,
  value: 0
})

export const mockParticipantsModel = (): ParticipantModel[] => ([{
  id: 'any_participant_id',
  name: 'any_name',
  food: true,
  drink: true,
  pay: false,
  value: 10
}, {
  id: 'any_participant_id',
  name: 'any_name',
  food: true,
  drink: true,
  pay: false,
  value: 10
}, {
  id: 'any_participant_id',
  name: 'any_name',
  food: true,
  drink: true,
  pay: false,
  value: 20
}])

export const mockParticipantParams = (): SaveParticipantParams => ({
  barbecueId: 'any_barbecue_id',
  participantId: 'any_participant_id',
  name: 'any_name',
  food: true,
  drink: true,
  pay: false
})
