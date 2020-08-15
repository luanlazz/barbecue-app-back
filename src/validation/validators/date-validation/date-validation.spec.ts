import { DateValidation } from './date-validation'
import { DateValidator } from '@/validation/protocols'
import { mockDateValidator } from '@/validation/test'
import faker from 'faker'

type SutTypes = {
  sut: DateValidation
  dateValidatorStub: DateValidator
}

const makeSut = (): SutTypes => {
  const dateValidatorStub = mockDateValidator()
  const sut = new DateValidation(dateValidatorStub, 'date')
  return {
    sut,
    dateValidatorStub
  }
}

describe('DateValidation Validation', () => {
  test('Should DateValidation calls dateValidator with correct date', () => {
    const { sut, dateValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(dateValidatorStub, 'isValid')
    const date = faker.date.recent().toISOString()
    sut.validate({ date })
    expect(isValidSpy).toHaveBeenCalledWith(date)
  })
})
