import { JwtAdapter } from './jwt-adapter'
import { throwError } from '@/domain/test'
import jwt from 'jsonwebtoken'

describe('Jwt adapter', () => {
  test('Should call sign with correct value', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })

  test('Should throw if sign throws', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'sign').mockImplementation(throwError)
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
