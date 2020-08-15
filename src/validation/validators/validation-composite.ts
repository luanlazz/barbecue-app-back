import { Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: Validation[]) {}

  validate (input: any): Error {
    for (const validation of this.validators) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
