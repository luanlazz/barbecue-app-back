import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { AccountModel } from '@/domain/models/account'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async loadByToken (token: string): Promise<AccountModel> {
    const isValid = await this.decrypter.decrypt(token)
    if (isValid) {
      const account = await this.loadAccountByTokenRepository.loadByToken(token)
      if (account) {
        return account
      }
    }
    return null
  }
}
