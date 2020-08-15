import { DateValidation } from './date-validation'
import { DateValidator } from '@/validation/protocols'
import { mockDateValidator } from '@/validation/test'
import { InvalidParamError } from '@/presentation/errors'
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
    const date = faker.date.recent()
    sut.validate({ date })
    expect(isValidSpy).toHaveBeenCalledWith(date)
  })

  test('Should return a InvalidParamError if validation fails', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ date: faker.date.recent() })
    expect(error).toEqual(new InvalidParamError('date'))
  })

  test('Should return falsy if validation success', () => {
    const { sut } = makeSut()
    const result = sut.validate({ date: faker.date.recent() })
    expect(result).toBeFalsy()
  })
})
