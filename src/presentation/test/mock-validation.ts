import { Validation } from '@/presentation/protocols/validation'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

export class ValidationSpy implements Validation {
  error: Error = null
  input: any

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}
