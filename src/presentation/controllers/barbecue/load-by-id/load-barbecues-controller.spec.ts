import { LoadBarbecueByIdController } from './load-barbecues-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockLoadBarbecueById } from '@/presentation/test/mock-barbecue'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'

type SutTypes = {
  sut: LoadBarbecueByIdController
  loadBarbecueByIdStub: LoadBarbecueById
}

const makeSut = (): SutTypes => {
  const loadBarbecueByIdStub = mockLoadBarbecueById()
  const sut = new LoadBarbecueByIdController(loadBarbecueByIdStub)
  return {
    sut,
    loadBarbecueByIdStub
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    barbecueId: 'any_barbecue_id'
  }
})

describe('LoadBarbecue Controller', () => {
  test('should call LoadBarbecueById with correct account id', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadBarbecueByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId)
  })
})
