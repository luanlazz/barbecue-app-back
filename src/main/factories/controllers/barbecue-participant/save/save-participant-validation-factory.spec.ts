import { makeSaveParticipantValidation } from './save-participant-validation-factory'
import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

jest.mock('@/validation/validators/validation-composite.ts')

describe('SaveParticipantValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveParticipantValidation()

    const validations: Validation[] = []

    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
