import { SignUpController } from './signup-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'

const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('SignUp Controller', () => {
  test('should call AddAccount with correct values', async () => {
    class AddAccountStub implements AddAccount {
      async add (account: AddAccountParams): Promise<AccountModel> {
        return await Promise.resolve(mockAccountModel())
      }
    }
    const addAccountStub = new AddAccountStub()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const sut = new SignUpController(addAccountStub)
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
  })
})
