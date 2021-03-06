import { LoadBarbecuesController } from './load-barbecues-controller'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadBarbecues } from '@/presentation/test'
import { serverError, noContent, ok } from '@/presentation/helpers'
import { LoadBarbecues } from '@/domain/usecases'
import { throwError, mockBarbecuesList } from '@/domain/test'

type SutTypes = {
  sut: LoadBarbecuesController
  loadBarbecuesStub: LoadBarbecues
}

const makeSut = (): SutTypes => {
  const loadBarbecuesStub = mockLoadBarbecues()
  const sut = new LoadBarbecuesController(loadBarbecuesStub)
  return {
    sut,
    loadBarbecuesStub
  }
}

const mockRequest = (): HttpRequest => ({
  accountId: 'any_account_id'
})

describe('LoadBarbecue Controller', () => {
  test('should call LoadBarbecues with correct account id', async () => {
    const { sut, loadBarbecuesStub } = makeSut()
    const loadSpy = jest.spyOn(loadBarbecuesStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().accountId)
  })

  test('should return 500 if LoadBarbecues throws', async () => {
    const { sut, loadBarbecuesStub } = makeSut()
    jest.spyOn(loadBarbecuesStub, 'load').mockImplementation(throwError)
    const barbecues = await sut.handle(mockRequest())
    expect(barbecues).toEqual(serverError(new Error()))
  })

  test('should return 204 if LoadBarbecues returns empty list', async () => {
    const { sut, loadBarbecuesStub } = makeSut()
    jest.spyOn(loadBarbecuesStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const barbecues = await sut.handle(mockRequest())
    expect(barbecues).toEqual(noContent())
  })

  test('should return 200 with barbecues on success', async () => {
    const { sut } = makeSut()
    const barbecues = await sut.handle(mockRequest())
    expect(barbecues).toEqual(ok(mockBarbecuesList()))
  })
})
