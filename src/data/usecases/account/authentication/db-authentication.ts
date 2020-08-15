import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'
import { HasherCompare, Encrypter } from '@/data/protocols/cryptography'
import { Authentication, AuthParams } from '@/domain/usecases'
import { AuthenticationModel } from '@/domain/models'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasherCompare: HasherCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authParams: AuthParams): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authParams.email)
    if (account) {
      const validPassword = await this.hasherCompare.compare(authParams.password, account.password)
      if (validPassword) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return {
          ...account,
          accessToken
        }
      }
    }
    return null
  }
}
