import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class NumberValidation implements Validation {
  constructor (private readonly field: any) {}

  validate (input: any): Error {
    return new InvalidParamError(this.field)
  }
}
