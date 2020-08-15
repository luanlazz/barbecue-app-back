import { DateValidation } from './date-validation'
import { DateValidator } from '@/validation/protocols'
import { mockDateValidator } from '@/validation/test'
import { InvalidParamError } from '@/presentation/errors'
import faker from 'faker'

type SutTypes = {
  sut: DateValidation
  dateValidatorStub: DateValidator
}

const makeSut = (field = faker.database.column()): SutTypes => {
  const dateValidatorStub = mockDateValidator()
  const sut = new DateValidation(dateValidatorStub, field)
  return {
    sut,
    dateValidatorStub
  }
}

describe('DateValidation Validation', () => {
  test('Should DateValidation calls dateValidator with correct date', () => {
    const field = faker.database.column()
    const { sut, dateValidatorStub } = makeSut(field)
    const isValidSpy = jest.spyOn(dateValidatorStub, 'isValid')
    const date = faker.date.recent()
    sut.validate({ [field]: date })
    expect(isValidSpy).toHaveBeenCalledWith(date)
  })

  test('Should return a InvalidParamError if validation fails', () => {
    const field = faker.database.column()
    const { sut, dateValidatorStub } = makeSut(field)
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ date: faker.date.recent() })
    expect(error).toEqual(new InvalidParamError(field))
  })
})
