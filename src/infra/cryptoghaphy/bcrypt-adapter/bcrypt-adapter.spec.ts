import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'
import faker from 'faker'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash_value')
  }
}))

const makeSut = (salt: number = 12): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = makeSut(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const value = faker.internet.password()
    await sut.hash(value)
    expect(hashSpy).toHaveBeenCalledWith(value, salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash(faker.internet.password())
    expect(hash).toBe('hash_value')
  })
})
