import { makeSaveParticipantController } from '@/main/factories/controllers/barbecue-participant/save/save-participant-controller-factory'
import { makeRemoveParticipantController } from '@/main/factories/controllers/barbecue-participant/remove/remove-participants-controller-factory'
import { makeLoadParticipantsController } from '@/main/factories/controllers/barbecue-participant/load/load-participants-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares/auth/auth'
import { Router } from 'express'

export default (route: Router): void => {
  route.put('/barbecue/:barbecueId/participants/:participantId?', auth, adaptRoute(makeSaveParticipantController()))
  route.delete('/barbecue/:barbecueId/participants/:participantId', auth, adaptRoute(makeRemoveParticipantController()))
  route.get('/barbecue/:barbecueId/participants/', auth, adaptRoute(makeLoadParticipantsController()))
}
