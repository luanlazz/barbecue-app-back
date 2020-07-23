import { Validation } from '@/presentation/protocols/validation'
import { InvalidParamError } from '@/presentation/errors'

export class EmailValidation implements Validation {
  constructor (private readonly field: any) {}

  validate (input: any): Error {
    return new InvalidParamError(this.field)
  }
}
