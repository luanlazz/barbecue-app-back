import { AccountModel } from '@/domain/models/account'
import { AuthenticationModel } from '@/domain/models/authentication'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AuthParams } from '@/domain/usecases/account/authentication'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hash_password'
})

export const mockAuthenticationModel = (): AuthenticationModel => ({
  ...mockAccountModel(),
  accessToken: 'encrypt_token'
})

export const mockAuthParams = (): AuthParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
