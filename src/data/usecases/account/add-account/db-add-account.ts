import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { DbAddAccountRepository } from '@/data/protocols/db/account/db-add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { Hasher } from '@/data/protocols/cryptography/hasher'
import { DbLoadAccountByEmailRepository } from '@/data/protocols/db/account/db-load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly dbAddAccountRepository: DbAddAccountRepository,
    private readonly dbLoadAccountByEmailRepository: DbLoadAccountByEmailRepository
  ) {}

  async add (account: AddAccountParams): Promise<AccountModel> {
    await this.dbLoadAccountByEmailRepository.loadByEmail(account.email)
    const hashedPassword = await this.hasher.hash(account.password)
    account.password = hashedPassword
    await this.dbAddAccountRepository.add(account)
    return null
  }
}
