import { LoadParticipantsController } from './load-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockLoadParticipants } from '@/presentation/test/mock-participant'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { throwError, mockParticipantsModel } from '@/domain/test'
import { serverError, noContent, ok } from '@/presentation/helpers/http/http-helper'
import { mockLoadBarbecueById } from '@/presentation/test'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'

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
