import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { NumberValidator } from '@/validation/protocols'

export class NumberValidation implements Validation {
  constructor (
    private readonly numberValidation: NumberValidator,
    private readonly field: any
  ) {}

  validate (input: any): Error {
    const isValid = this.numberValidation.isValid(input[this.field])
    if (!isValid) return new InvalidParamError(this.field)
  }
}
