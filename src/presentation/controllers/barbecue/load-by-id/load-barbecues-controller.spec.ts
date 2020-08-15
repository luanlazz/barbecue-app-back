import { LoadBarbecueByIdController } from './load-barbecues-controller'
import { HttpRequest } from '@/presentation/protocols'
import { serverError, forbidden, ok } from '@/presentation/helpers'
import { mockLoadBarbecueById } from '@/presentation/test'
import { InvalidParamError } from '@/presentation/errors'
import { LoadBarbecueById } from '@/domain/usecases'
import { throwError, mockBarbecueModel } from '@/domain/test'

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
  test('should call LoadBarbecueById with correct barbecue id', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadBarbecueByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId)
  })

  test('should return 500 if LoadBarbecueById throws', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    jest.spyOn(loadBarbecueByIdStub, 'loadById').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 403 if LoadBarbecueById return null', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    jest.spyOn(loadBarbecueByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('barbecueId')))
  })

  test('should return 200 with barbecue on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockBarbecueModel()))
  })
})
