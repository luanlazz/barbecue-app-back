import { LoadBarbecuesController } from './list-barbecues-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { LoadBarbecues } from '@/domain/usecases/barbecue/list-barbecues'
import { mockLoadBarbecues } from '@/presentation/test/mock-barbecue'

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

describe('SaveBarbecue Controller', () => {
  test('should call LoadBarbecues with correct account id', async () => {
    const { sut, loadBarbecuesStub } = makeSut()
    const loadSpy = jest.spyOn(loadBarbecuesStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().accountId)
  })
})
