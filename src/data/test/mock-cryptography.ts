import { Hasher } from '@/data/protocols/cryptography/hasher'
import { HasherComparer } from '../protocols/cryptography/hasher-comparer'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

export const mockHasherComparer = (): HasherComparer => {
  class HasherComparerStub implements HasherComparer {
    async comparer (value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HasherComparerStub()
}
