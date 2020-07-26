import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { AccountModel } from '@/domain/models/account'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async loadByToken (token: string): Promise<AccountModel> {
    await this.loadAccountByToken.loadByToken(token)
    return Promise.resolve(null)
  }
}
