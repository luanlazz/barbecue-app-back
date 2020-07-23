import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { Hasher } from '@/data/protocols/cryptography/hasher'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (account: AddAccountParams): Promise<AccountModel> {
    await this.hasher.hash(account.password)
    return Promise.resolve(null)
  }
}
