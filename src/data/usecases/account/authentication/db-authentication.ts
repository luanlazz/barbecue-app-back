import { Authentication, AuthParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { HasherComparer } from '@/data/protocols/cryptography/hasher-comparer'
import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AuthenticationModel } from '@/domain/models/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authParams: AuthParams): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authParams.email)
    if (account) {
      await this.hasherComparer.comparer(account.password, authParams.password)
      const accessToken = await this.encrypter.encrypt(account.id)
      await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
    }
    return null
  }
}
