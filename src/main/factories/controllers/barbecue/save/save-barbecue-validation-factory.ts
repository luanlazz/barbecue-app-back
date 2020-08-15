import { ValidationComposite, RequiredFieldValidation, DateValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { DateValidatorAdapter } from '@/infra/validators'

export const makeSaveBarbecueValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['date', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new DateValidation(new DateValidatorAdapter(), 'date'))

  return new ValidationComposite(validations)
}
