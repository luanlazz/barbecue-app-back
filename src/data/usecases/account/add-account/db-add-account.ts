import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/db'
import { Hasher } from '@/data/protocols/cryptography'
import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

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
