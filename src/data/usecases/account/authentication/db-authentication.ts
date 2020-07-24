import { Authentication, AuthParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { HasherComparer } from '@/data/protocols/cryptography/hasher-comparer'
import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import { AuthenticationModel } from '@/domain/models/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter
  ) { }

  async auth (authParams: AuthParams): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authParams.email)
    if (account) {
      await this.hasherComparer.comparer(account.password, authParams.password)
      await this.encrypter.encrypt(account.id)
    }
    return null
  }
}
