import { Validation } from '@/presentation/protocols/validation'
import { MissingParamError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly field: any) {}

  validate (input: any): Error {
    return input[this.field] ? null : new MissingParamError(this.field)
  }
}
