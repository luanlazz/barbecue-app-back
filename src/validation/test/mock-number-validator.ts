import { NumberValidator } from '@/validation/protocols/number-validation'

export const mockNumberValidator = (): NumberValidator => {
  class NumberValidatorStub implements NumberValidator {
    isValid (value: string): boolean {
      return true
    }
  }
  return new NumberValidatorStub()
}
