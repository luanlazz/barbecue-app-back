import { ValidationComposite, RequiredFieldValidation, DateValidation, NumberValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { DateValidatorAdapter, NumberValidatorAdapter } from '@/infra/validators'

export const makeSaveBarbecueValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['date', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new DateValidation(new DateValidatorAdapter(), 'date'))

  validations.push(new NumberValidation(new NumberValidatorAdapter(), 'valueSuggestDrink'))
  validations.push(new NumberValidation(new NumberValidatorAdapter(), 'valueSuggestFood'))

  return new ValidationComposite(validations)
}
