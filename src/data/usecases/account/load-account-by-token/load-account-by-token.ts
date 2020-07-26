import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { AccountModel } from '@/domain/models/account'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async loadByToken (token: string): Promise<AccountModel> {
    await this.decrypter.decrypt(token)
    await this.loadAccountByToken.loadByToken(token)
    return Promise.resolve(null)
  }
}
