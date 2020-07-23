import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'

export interface DbAddAccountRepository {
  add (accountData: AddAccountParams): Promise<AccountModel>
}
