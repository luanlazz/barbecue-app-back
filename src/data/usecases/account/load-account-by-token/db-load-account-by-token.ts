import { LoadAccountByTokenRepository } from '@/data/protocols/db'
import { Decrypter } from '@/data/protocols/cryptography'
import { LoadAccountByToken } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

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
