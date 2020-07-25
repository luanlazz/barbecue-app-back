import { JwtAdapter } from './jwt-adapter'
import { throwError } from '@/domain/test'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string > {
    return Promise.resolve('any_token')
  }
}))

const makeSut = (secret: string = 'secret'): JwtAdapter => {
  return new JwtAdapter(secret)
}

describe('Jwt adapter', () => {
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
