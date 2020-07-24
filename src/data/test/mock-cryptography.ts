import { Hasher } from '@/data/protocols/cryptography/hasher'
import { HasherCompare } from '../protocols/cryptography/hasher-compare'
import { Encrypter } from '../protocols/cryptography/encrypter'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

export const mockHasherCompare = (): HasherCompare => {
  class HasherCompareStub implements HasherCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HasherCompareStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('encrypt_token')
    }
  }
  return new EncrypterStub()
}
