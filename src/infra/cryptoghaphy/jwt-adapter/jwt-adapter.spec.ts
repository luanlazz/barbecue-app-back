import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

describe('Jwt adapter', () => {
  test('Should call encrypt with correct value', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })
})
