import { NumberValidation } from './number-validation'
import { InvalidParamError } from '@/presentation/errors'
import faker from 'faker'

const makeSut = (): NumberValidation => {
  return new NumberValidation('field')
}

describe('Number Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ value: faker.random.number({ min: -100, max: 0 }) })
    expect(error).toEqual(new InvalidParamError('field'))
  })
})
