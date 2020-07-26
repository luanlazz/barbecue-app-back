import { JwtAdapter } from './jwt-adapter'
import { throwError } from '@/domain/test'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string > {
    return Promise.resolve('any_token')
  },

  async verify (): Promise<string > {
    return Promise.resolve('any_value')
  }
}))

const makeSut = (secret: string = 'secret'): JwtAdapter => {
  return new JwtAdapter(secret)
}

describe('Jwt adapter', () => {
  describe('sign', () => {
    test('Should call sign with correct value', async () => {
      const secret = 'secret'
      const sut = makeSut(secret)
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, secret)
    })

    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a token on sign success', async () => {
      const sut = makeSut()
      const token = await sut.encrypt('any_value')
      expect(token).toBe('any_token')
    })
  })

  describe('verify', () => {
    test('Should call verify with correct value', async () => {
      const secret = 'secret'
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', secret)
    })

    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const token = await sut.decrypt('any_token')
      expect(token).toBe('any_value')
    })
  })
})
