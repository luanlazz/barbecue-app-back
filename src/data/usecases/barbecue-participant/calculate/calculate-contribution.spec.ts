import { ApplicationCalculateContribution } from './calculate-contribution'
import { mockBarbecueModel, mockParticipantsModel } from '@/domain/test'

type SutTypes = {
  sut: ApplicationCalculateContribution
}

const makeSut = (): SutTypes => {
  const sut = new ApplicationCalculateContribution()
  return {
    sut
  }
}

describe('CalculateContribution use case', () => {
  test('Should call CalculateContribution with correct values', () => {
    const { sut } = makeSut()
    const calculateSpy = jest.spyOn(sut, 'calculate')
    sut.calculate(mockBarbecueModel(), mockParticipantsModel())
    expect(calculateSpy).toHaveBeenCalledWith(mockBarbecueModel(), mockParticipantsModel())
  })

  test('Should return participants on success', () => {
    const { sut } = makeSut()
    const participants = sut.calculate(mockBarbecueModel(), mockParticipantsModel())
    expect(participants.length).toBeTruthy()
    expect(participants[0].id).toBeTruthy()
  })
})
