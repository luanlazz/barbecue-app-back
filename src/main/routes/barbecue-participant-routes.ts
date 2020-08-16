import { makeLoadParticipantsController, makeRemoveParticipantController, makeSaveParticipantController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (route: Router): void => {
  route.get('/barbecue/:barbecueId/participants/', auth, adaptRoute(makeLoadParticipantsController()))
  route.delete('/barbecue/:barbecueId/participants/:participantId', auth, adaptRoute(makeRemoveParticipantController()))
  route.put('/barbecue/:barbecueId/participants/:participantId?', auth, adaptRoute(makeSaveParticipantController()))
}
