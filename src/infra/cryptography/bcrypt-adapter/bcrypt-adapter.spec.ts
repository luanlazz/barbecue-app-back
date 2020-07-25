import { BcryptAdapter } from './bcrypt-adapter'
import { throwError } from '@/domain/test'
import bcrypt from 'bcrypt'
import faker from 'faker'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash_value')
  },

  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const makeSut = (salt: number = 12): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash', () => {
    test('Should call hash with correct value', async () => {
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

    test('Should throw if bcrypt throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementation(throwError)
      const promise = sut.hash(faker.internet.password())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'hash_value')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'hash_value')
    })

    test('Should return true if compare success', async () => {
      const sut = makeSut()
      const areEqual = await sut.compare('any_value', 'hash_value')
      expect(areEqual).toBeTruthy()
    })

    test('Should return false if compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
      const areEqual = await sut.compare('any_value', 'hash_value')
      expect(areEqual).toBeFalsy()
    })

    test('Should throws if compare throw', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementation(throwError)
      const promise = sut.compare('any_value', 'hash_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
