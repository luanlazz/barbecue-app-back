import { ValidationComposite, RequiredFieldValidation, NumberValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { NumberValidatorAdapter } from '@/infra/validators/number-validator/number-validator-adapter'

export const makeSaveParticipantValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new NumberValidation(new NumberValidatorAdapter(), 'value'))

  return new ValidationComposite(validations)
}
