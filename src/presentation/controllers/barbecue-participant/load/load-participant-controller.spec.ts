import { LoadParticipantsController } from './load-participant-controller'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadParticipants, mockLoadBarbecueById } from '@/presentation/test'
import { LoadParticipants, LoadBarbecueById } from '@/domain/usecases'
import { throwError, mockParticipantsModel } from '@/domain/test'
import { serverError, forbidden, noContent, ok } from '@/presentation/helpers'

import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: LoadParticipantsController
  loadParticipantsStub: LoadParticipants
  loadBarbecueByIdStub: LoadBarbecueById
}

const makeSut = (): SutTypes => {
  const loadBarbecueByIdStub = mockLoadBarbecueById()
  const loadParticipantsStub = mockLoadParticipants()
  const sut = new LoadParticipantsController(loadBarbecueByIdStub, loadParticipantsStub)
  return {
    sut,
    loadParticipantsStub,
    loadBarbecueByIdStub
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    barbecueId: 'any_barbecue_id'
  }
})

describe('LoadParticipant Controller', () => {
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

  test('should return 403 if LoadBarbecueById not return a barbecue', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    jest.spyOn(loadBarbecueByIdStub, 'loadById').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('barbecueId')))
  })

  test('should call LoadParticipants with correct barbecue id', async () => {
    const { sut, loadParticipantsStub } = makeSut()
    const loadSpy = jest.spyOn(loadParticipantsStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId)
  })

  test('should return 500 if LoadParticipants throws', async () => {
    const { sut, loadParticipantsStub } = makeSut()
    jest.spyOn(loadParticipantsStub, 'load').mockImplementation(throwError)
    const participants = await sut.handle(mockRequest())
    expect(participants).toEqual(serverError(new Error()))
  })

  test('should return 204 if LoadParticipants returns empty list', async () => {
    const { sut, loadParticipantsStub } = makeSut()
    jest.spyOn(loadParticipantsStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const participants = await sut.handle(mockRequest())
    expect(participants).toEqual(noContent())
  })

  test('should return 200 with participants on success', async () => {
    const { sut } = makeSut()
    const participants = await sut.handle(mockRequest())
    expect(participants).toEqual(ok(mockParticipantsModel()))
  })
})
