import { DbRemoveParticipant } from './remove-participant'
import { mockRemoveParticipantRepository } from '@/data/test'
import { RemoveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-remove-participant'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: DbRemoveParticipant
  removeParticipantRepositoryStub: RemoveParticipantRepository
}

const makeSut = (): SutTypes => {
  const removeParticipantRepositoryStub = mockRemoveParticipantRepository()
  const sut = new DbRemoveParticipant(removeParticipantRepositoryStub)
  return {
    sut,
    removeParticipantRepositoryStub
  }
}

describe('RemoveParticipant use case', () => {
  test('Should call RemoveParticipantRepository with correct values', async () => {
    const { sut, removeParticipantRepositoryStub } = makeSut()
    const removeSpy = jest.spyOn(removeParticipantRepositoryStub, 'remove')
    await sut.remove('any_barbecue_id', 'any_participant_id')
    expect(removeSpy).toHaveBeenCalledWith('any_barbecue_id', 'any_participant_id')
  })

  test('Should throws if RemoveParticipantRepository throws', async () => {
    const { sut, removeParticipantRepositoryStub } = makeSut()
    jest.spyOn(removeParticipantRepositoryStub, 'remove').mockImplementation(throwError)
    const participants = sut.remove('any_barbecue_id', 'any_participant_id')
    await expect(participants).rejects.toThrow()
  })
})
