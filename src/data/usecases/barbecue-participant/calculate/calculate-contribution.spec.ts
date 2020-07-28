import { CalculateContribution } from './calculate-contribution'
import { mockBarbecueModel, mockParticipantsModel } from '@/domain/test'

type SutTypes = {
  sut: CalculateContribution
}

const makeSut = (): SutTypes => {
  const sut = new CalculateContribution()
  return {
    sut
  }
}

describe('CalculateContribution use case', () => {
  test('Should call CalculateContribution with correct values', async () => {
    const { sut } = makeSut()
    const calculateSpy = jest.spyOn(sut, 'calculate')
    await sut.calculate(mockBarbecueModel(), mockParticipantsModel())
    expect(calculateSpy).toHaveBeenCalledWith(mockBarbecueModel(), mockParticipantsModel())
  })
})
