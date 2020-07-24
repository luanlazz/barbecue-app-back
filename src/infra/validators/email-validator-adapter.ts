import { Validation } from '@/presentation/protocols/validation'
import { InvalidParamError } from '@/presentation/errors'
import validator from 'validator'

export class EmailValidator implements Validation {
  constructor (private readonly field: string) {}

  validate (input: any): Error {
    validator.isEmail(input[this.field])
    return new InvalidParamError('email')
  }
}
