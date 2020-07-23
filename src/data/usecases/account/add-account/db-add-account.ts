import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { Hasher } from '@/data/protocols/cryptography/hasher'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (account: AddAccountParams): Promise<AccountModel> {
    const accountByEmail = await this.loadAccountByEmailRepository.loadByEmail(account.email)
    if (accountByEmail) {
      return null
    }

    const hashedPassword = await this.hasher.hash(account.password)

    const dbAccount = await this.addAccountRepository.add({
      name: account.name,
      email: account.email,
      password: hashedPassword
    })

    return dbAccount
  }
}
