import { Encrypter, Decrypter, HasherCompare, Hasher } from '@/data/protocols/cryptography'

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

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<string> {
      return Promise.resolve('dencrypt_token')
    }
  }
  return new DecrypterStub()
}
