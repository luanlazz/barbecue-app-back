import { JwtAdapter } from './jwt-adapter'
import { throwError } from '@/domain/test'
import jwt from 'jsonwebtoken'

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
    jest.spyOn(jwt, 'sign').mockImplementation(throwError)
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
