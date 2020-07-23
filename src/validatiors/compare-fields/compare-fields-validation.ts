import { Validation } from '@/presentation/protocols/validation'
import { InvalidParamError } from '@/presentation/errors'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly field: any,
    private readonly otherField: any
  ) {}

  validate (input: any): Error {
    return new InvalidParamError(this.otherField)
  }
}
