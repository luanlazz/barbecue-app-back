import { makeSaveParticipantValidation } from './save-participant-validation-factory'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite, NumberValidation } from '@/validation/validators'
import { NumberValidatorAdapter } from '@/infra/validators/number-validator/number-validator-adapter'

jest.mock('@/validation/validators/validation-composite.ts')

describe('SaveParticipantValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveParticipantValidation()

    const validations: Validation[] = []

    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new NumberValidation(new NumberValidatorAdapter(), 'value'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
