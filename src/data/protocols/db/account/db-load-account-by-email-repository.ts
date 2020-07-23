import { AccountModel } from '@/domain/models/account'

export interface DbLoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<AccountModel>
}
