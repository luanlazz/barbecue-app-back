import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { AccountModel } from '@/domain/models/account'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async loadByToken (token: string): Promise<AccountModel> {
    const isValid = await this.decrypter.decrypt(token)
    if (isValid) {
      const account = await this.loadAccountByToken.loadByToken(token)
      if (account) return account
    }
    return Promise.resolve(null)
  }
}
