import { SignUpController } from './signup-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { throwError } from '@/domain/test/test-helper'
import { ServerError } from '@/presentation/errors'
import { serverError } from '@/presentation/helpers/http/http-helper'

const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountStub()
}

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const sut = new SignUpController(addAccountStub)
  return {
    sut,
    addAccountStub
  }
}

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
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
