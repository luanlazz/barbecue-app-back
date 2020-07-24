import { Authentication, AuthParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { AuthenticationModel } from '@/domain/models/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async auth (authParams: AuthParams): Promise<AuthenticationModel> {
    await this.loadAccountByEmailRepository.loadByEmail(authParams.email)
    return null
  }
}
